/**
 * Sync InvitationDressCodeGroup (+ InvitationDressColor.groupId) from the
 * legacy dress-code columns. Idempotent — re-running converges to the same
 * state, so it can be run before the deploy, right after it, and again later
 * to pick up writes from stale clients.
 *
 * Legacy sources, per invitation:
 *   Gentlemen (order 0): Invitation.dressCodeGentleman
 *                        InvitationCoverPhoto.type = 'dressCodeGentleman'
 *                        InvitationDressColor.type = 'gentleman'
 *   Ladies    (order 1): Invitation.dressCodeLady
 *                        InvitationCoverPhoto.type = 'dressCodeLady'
 *                        InvitationDressColor.type = 'lady'
 *
 * The legacy columns are never modified.
 *
 * Modes
 *   (default)       Legacy is the source of truth for the order-0/1 groups.
 *                   Creates missing groups, overwrites description/photoKey,
 *                   attaches legacy colors, and removes group colors that did
 *                   not come from legacy (rows with type IS NULL, written by
 *                   the new group UI) when legacy has colors for that side.
 *                   A group whose legacy side is now empty is deleted.
 *                   Use while the OLD dress-code UI is still what users see.
 *   --only-missing  Legacy only fills gaps: creates groups that don't exist,
 *                   attaches orphan legacy colors (groupId IS NULL), fills a
 *                   NULL description/photoKey. Never overwrites or deletes.
 *                   Safe to run AFTER the new UI is live.
 *
 * A group with a non-NULL label was made by the new UI; its description /
 * photoKey are left alone in both modes (orphan colors are still attached).
 *
 *   node -r dotenv/config prisma/migrations/manual/sync_dress_code_groups.cjs --dry
 *   node -r dotenv/config prisma/migrations/manual/sync_dress_code_groups.cjs
 *
 * Flags:
 *   --dry               print the plan, write nothing
 *   --only-missing      see Modes
 *   --id=N              restrict to one invitation id
 *   --include-internal  also process invitations owned by internal accounts
 */
const { PrismaClient } = require('../../../generated/prisma');
const prisma = new PrismaClient();

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const ONLY_MISSING = argv.includes('--only-missing');
const INCLUDE_INTERNAL = argv.includes('--include-internal');
const ONLY_ID = (() => {
  const a = argv.find((x) => x.startsWith('--id='));
  return a ? Number(a.slice(5)) : null;
})();

// Internal/test accounts — their invitations carry new-UI test data, so they
// are skipped unless --include-internal is passed.
const INTERNAL_EMAILS = new Set([
  'minseong.lee.korea@gmail.com',
  'pleiades9638@gmail.com',
]);

const SIDES = [
  { order: 0, name: 'Gentlemen', textCol: 'dressCodeGentleman', photoType: 'dressCodeGentleman', colorType: 'gentleman' },
  { order: 1, name: 'Ladies', textCol: 'dressCodeLady', photoType: 'dressCodeLady', colorType: 'lady' },
];

const normText = (v) => {
  if (v == null) return null;
  const s = String(v);
  return s.trim() ? s : null;
};
const sortColors = (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id - b.id;
const colorSig = (list) => list.map((c) => `${c.color}@${c.order}`).join(',');

/**
 * Build the plan for one invitation. Returns { actions: [], notes: [] } where
 * each action is { kind, ...data } and gets applied inside one transaction.
 */
function plan(inv, groups, colors, photos) {
  const actions = [];
  const notes = [];

  for (const side of SIDES) {
    const legacyText = normText(inv[side.textCol]);
    const legacyPhoto = photos.find((p) => p.type === side.photoType)?.croppedKey ?? null;
    const legacyColors = colors.filter((c) => c.type === side.colorType).sort(sortColors);
    const hasLegacy = Boolean(legacyText || legacyPhoto || legacyColors.length);
    const group = groups.find((g) => g.order === side.order) ?? null;
    const tag = `${side.name}(order ${side.order})`;

    if (!hasLegacy) {
      if (!group) continue;
      if (ONLY_MISSING) continue;
      if (group.label != null) {
        notes.push(`${tag}: legacy empty but group #${group.id} has label "${group.label}" (new UI) — kept`);
        continue;
      }
      const foreign = group.colors.filter((c) => c.type !== side.colorType);
      if (foreign.length) {
        notes.push(`${tag}: legacy empty but group #${group.id} has ${foreign.length} new-UI colors — kept`);
        continue;
      }
      actions.push({ kind: 'deleteGroup', tag, groupId: group.id, why: 'legacy side is empty' });
      continue;
    }

    // ---- legacy has content -------------------------------------------------
    let groupRef;
    if (!group) {
      groupRef = { create: true, key: side.order };
      actions.push({
        kind: 'createGroup', tag, order: side.order,
        data: { description: legacyText, photoKey: legacyPhoto },
        colorIds: legacyColors.map((c) => c.id),
      });
    } else {
      groupRef = { id: group.id };
      const newUiOwned = group.label != null;
      const patch = {};
      const curText = normText(group.description);
      const curPhoto = group.photoKey ?? null;
      if (!newUiOwned) {
        if (ONLY_MISSING) {
          if (curText == null && legacyText != null) patch.description = legacyText;
          if (curPhoto == null && legacyPhoto != null) patch.photoKey = legacyPhoto;
        } else {
          if (curText !== legacyText) patch.description = legacyText;
          if (curPhoto !== legacyPhoto) patch.photoKey = legacyPhoto;
        }
      } else if (curText !== legacyText || curPhoto !== legacyPhoto) {
        notes.push(`${tag}: group #${group.id} has label "${group.label}" (new UI) — description/photo not overwritten`);
      }
      if (Object.keys(patch).length) {
        actions.push({ kind: 'updateGroup', tag, groupId: group.id, patch, before: { description: curText, photoKey: curPhoto } });
      }

      // colors: attach legacy rows not yet on this group
      const orphan = legacyColors.filter((c) => c.groupId !== group.id);
      if (orphan.length) {
        actions.push({ kind: 'attachColors', tag, groupId: group.id, colorIds: orphan.map((c) => c.id), colors: orphan.map((c) => `${c.color}@${c.order}`) });
      }
      // colors: drop new-UI rows when legacy has colors (sync mode only)
      if (!ONLY_MISSING && legacyColors.length) {
        const foreign = group.colors.filter((c) => c.type !== side.colorType);
        if (foreign.length) {
          actions.push({ kind: 'deleteColors', tag, groupId: group.id, colorIds: foreign.map((c) => c.id), colors: foreign.map((c) => `${c.color}@${c.order}`) });
        }
      } else if (!ONLY_MISSING) {
        const foreign = group.colors.filter((c) => c.type !== side.colorType);
        if (foreign.length) notes.push(`${tag}: legacy has no colors; kept ${foreign.length} new-UI colors on group #${group.id}`);
      }
    }
  }

  // Groups beyond order 1 can only come from the new UI — report, never touch.
  for (const g of groups) {
    if (g.order > 1) notes.push(`extra group #${g.id} (order ${g.order}, label ${JSON.stringify(g.label)}) — untouched`);
  }

  return { actions, notes };
}

async function apply(inv, actions) {
  await prisma.$transaction(async (tx) => {
    const now = new Date();
    for (const a of actions) {
      if (a.kind === 'deleteGroup') {
        await tx.invitationDressCodeGroup.delete({ where: { id: a.groupId } }); // colors cascade
      } else if (a.kind === 'createGroup') {
        const g = await tx.invitationDressCodeGroup.create({
          data: { invitationId: inv.id, label: null, order: a.order, ...a.data, createdAt: now, updatedAt: now },
        });
        if (a.colorIds.length) {
          await tx.invitationDressColor.updateMany({ where: { id: { in: a.colorIds } }, data: { groupId: g.id } });
        }
      } else if (a.kind === 'updateGroup') {
        await tx.invitationDressCodeGroup.update({ where: { id: a.groupId }, data: { ...a.patch, updatedAt: now } });
      } else if (a.kind === 'attachColors') {
        await tx.invitationDressColor.updateMany({ where: { id: { in: a.colorIds } }, data: { groupId: a.groupId } });
      } else if (a.kind === 'deleteColors') {
        await tx.invitationDressColor.deleteMany({ where: { id: { in: a.colorIds } } });
      }
    }
  });
}

function describe(a) {
  switch (a.kind) {
    case 'deleteGroup': return `DELETE group #${a.groupId} [${a.tag}] — ${a.why}`;
    case 'createGroup': return `CREATE group [${a.tag}] desc=${JSON.stringify(a.data.description?.slice(0, 40) ?? null)} photo=${a.data.photoKey ? 'yes' : 'no'} colors=${a.colorIds.length}`;
    case 'updateGroup': return `UPDATE group #${a.groupId} [${a.tag}] ${Object.keys(a.patch).map((k) => `${k}: ${JSON.stringify(a.before[k]?.slice?.(0, 30) ?? a.before[k])} -> ${JSON.stringify(a.patch[k]?.slice?.(0, 30) ?? a.patch[k])}`).join('; ')}`;
    case 'attachColors': return `ATTACH ${a.colorIds.length} legacy colors -> group #${a.groupId} [${a.tag}] (${a.colors.join(' ')})`;
    case 'deleteColors': return `DROP ${a.colorIds.length} new-UI colors from group #${a.groupId} [${a.tag}] (${a.colors.join(' ')})`;
    default: return JSON.stringify(a);
  }
}

async function main() {
  const invitations = await prisma.invitation.findMany({
    where: ONLY_ID ? { id: ONLY_ID } : {},
    select: { id: true, uniqueId: true, dressCodeGentleman: true, dressCodeLady: true, user: { select: { email: true } } },
    orderBy: { id: 'asc' },
  });

  const stats = { scanned: 0, skippedInternal: 0, changed: 0, actions: {}, notes: 0 };
  console.log(`mode=${ONLY_MISSING ? 'only-missing' : 'sync(legacy authoritative)'} dry=${DRY} invitations=${invitations.length}`);

  for (const inv of invitations) {
    if (!INCLUDE_INTERNAL && inv.user?.email && INTERNAL_EMAILS.has(inv.user.email)) {
      stats.skippedInternal += 1;
      continue;
    }
    stats.scanned += 1;

    const [groups, colors, photos] = await Promise.all([
      prisma.invitationDressCodeGroup.findMany({
        where: { invitationId: inv.id },
        include: { colors: { select: { id: true, color: true, order: true, type: true } } },
        orderBy: [{ order: 'asc' }, { id: 'asc' }],
      }),
      prisma.invitationDressColor.findMany({ where: { invitationId: inv.id }, select: { id: true, color: true, order: true, type: true, groupId: true } }),
      prisma.invitationCoverPhoto.findMany({
        where: { invitationId: inv.id, type: { in: SIDES.map((s) => s.photoType) } },
        select: { type: true, croppedKey: true },
        orderBy: { id: 'desc' },
      }),
    ]);

    const { actions, notes } = plan(inv, groups, colors, photos);
    if (!actions.length && !notes.length) continue;

    console.log(`\n#${inv.id} ${inv.uniqueId}`);
    for (const a of actions) {
      console.log(`  ${describe(a)}`);
      stats.actions[a.kind] = (stats.actions[a.kind] ?? 0) + 1;
    }
    for (const n of notes) console.log(`  note: ${n}`);
    stats.notes += notes.length;

    if (actions.length) {
      stats.changed += 1;
      if (!DRY) await apply(inv, actions);
    }
  }

  console.log(`\n${DRY ? '[dry] ' : ''}scanned=${stats.scanned} skippedInternal=${stats.skippedInternal} invitationsChanged=${stats.changed} notes=${stats.notes}`);
  console.log(`actions: ${JSON.stringify(stats.actions)}`);
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
