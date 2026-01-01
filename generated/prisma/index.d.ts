
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model InvitationPlace
 * 
 */
export type InvitationPlace = $Result.DefaultSelection<Prisma.$InvitationPlacePayload>
/**
 * Model Place
 * 
 */
export type Place = $Result.DefaultSelection<Prisma.$PlacePayload>
/**
 * Model InvitationPlaceTime
 * 
 */
export type InvitationPlaceTime = $Result.DefaultSelection<Prisma.$InvitationPlaceTimePayload>
/**
 * Model InvitationPhoto
 * 
 */
export type InvitationPhoto = $Result.DefaultSelection<Prisma.$InvitationPhotoPayload>
/**
 * Model InvitationCoverPhoto
 * 
 */
export type InvitationCoverPhoto = $Result.DefaultSelection<Prisma.$InvitationCoverPhotoPayload>
/**
 * Model InvitationRSVP
 * 
 */
export type InvitationRSVP = $Result.DefaultSelection<Prisma.$InvitationRSVPPayload>
/**
 * Model InvitationMusic
 * 
 */
export type InvitationMusic = $Result.DefaultSelection<Prisma.$InvitationMusicPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationPlace`: Exposes CRUD operations for the **InvitationPlace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationPlaces
    * const invitationPlaces = await prisma.invitationPlace.findMany()
    * ```
    */
  get invitationPlace(): Prisma.InvitationPlaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.place`: Exposes CRUD operations for the **Place** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Places
    * const places = await prisma.place.findMany()
    * ```
    */
  get place(): Prisma.PlaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationPlaceTime`: Exposes CRUD operations for the **InvitationPlaceTime** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationPlaceTimes
    * const invitationPlaceTimes = await prisma.invitationPlaceTime.findMany()
    * ```
    */
  get invitationPlaceTime(): Prisma.InvitationPlaceTimeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationPhoto`: Exposes CRUD operations for the **InvitationPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationPhotos
    * const invitationPhotos = await prisma.invitationPhoto.findMany()
    * ```
    */
  get invitationPhoto(): Prisma.InvitationPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationCoverPhoto`: Exposes CRUD operations for the **InvitationCoverPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationCoverPhotos
    * const invitationCoverPhotos = await prisma.invitationCoverPhoto.findMany()
    * ```
    */
  get invitationCoverPhoto(): Prisma.InvitationCoverPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationRSVP`: Exposes CRUD operations for the **InvitationRSVP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationRSVPS
    * const invitationRSVPS = await prisma.invitationRSVP.findMany()
    * ```
    */
  get invitationRSVP(): Prisma.InvitationRSVPDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitationMusic`: Exposes CRUD operations for the **InvitationMusic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvitationMusics
    * const invitationMusics = await prisma.invitationMusic.findMany()
    * ```
    */
  get invitationMusic(): Prisma.InvitationMusicDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Invitation: 'Invitation',
    InvitationPlace: 'InvitationPlace',
    Place: 'Place',
    InvitationPlaceTime: 'InvitationPlaceTime',
    InvitationPhoto: 'InvitationPhoto',
    InvitationCoverPhoto: 'InvitationCoverPhoto',
    InvitationRSVP: 'InvitationRSVP',
    InvitationMusic: 'InvitationMusic'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "invitation" | "invitationPlace" | "place" | "invitationPlaceTime" | "invitationPhoto" | "invitationCoverPhoto" | "invitationRSVP" | "invitationMusic"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      InvitationPlace: {
        payload: Prisma.$InvitationPlacePayload<ExtArgs>
        fields: Prisma.InvitationPlaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationPlaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationPlaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          findFirst: {
            args: Prisma.InvitationPlaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationPlaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          findMany: {
            args: Prisma.InvitationPlaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>[]
          }
          create: {
            args: Prisma.InvitationPlaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          createMany: {
            args: Prisma.InvitationPlaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationPlaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          update: {
            args: Prisma.InvitationPlaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          deleteMany: {
            args: Prisma.InvitationPlaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationPlaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationPlaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlacePayload>
          }
          aggregate: {
            args: Prisma.InvitationPlaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationPlace>
          }
          groupBy: {
            args: Prisma.InvitationPlaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationPlaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationPlaceCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationPlaceCountAggregateOutputType> | number
          }
        }
      }
      Place: {
        payload: Prisma.$PlacePayload<ExtArgs>
        fields: Prisma.PlaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          findFirst: {
            args: Prisma.PlaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          findMany: {
            args: Prisma.PlaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>[]
          }
          create: {
            args: Prisma.PlaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          createMany: {
            args: Prisma.PlaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          update: {
            args: Prisma.PlaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          deleteMany: {
            args: Prisma.PlaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacePayload>
          }
          aggregate: {
            args: Prisma.PlaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlace>
          }
          groupBy: {
            args: Prisma.PlaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaceCountArgs<ExtArgs>
            result: $Utils.Optional<PlaceCountAggregateOutputType> | number
          }
        }
      }
      InvitationPlaceTime: {
        payload: Prisma.$InvitationPlaceTimePayload<ExtArgs>
        fields: Prisma.InvitationPlaceTimeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationPlaceTimeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationPlaceTimeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          findFirst: {
            args: Prisma.InvitationPlaceTimeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationPlaceTimeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          findMany: {
            args: Prisma.InvitationPlaceTimeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>[]
          }
          create: {
            args: Prisma.InvitationPlaceTimeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          createMany: {
            args: Prisma.InvitationPlaceTimeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationPlaceTimeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          update: {
            args: Prisma.InvitationPlaceTimeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          deleteMany: {
            args: Prisma.InvitationPlaceTimeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationPlaceTimeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationPlaceTimeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPlaceTimePayload>
          }
          aggregate: {
            args: Prisma.InvitationPlaceTimeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationPlaceTime>
          }
          groupBy: {
            args: Prisma.InvitationPlaceTimeGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationPlaceTimeGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationPlaceTimeCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationPlaceTimeCountAggregateOutputType> | number
          }
        }
      }
      InvitationPhoto: {
        payload: Prisma.$InvitationPhotoPayload<ExtArgs>
        fields: Prisma.InvitationPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          findFirst: {
            args: Prisma.InvitationPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          findMany: {
            args: Prisma.InvitationPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>[]
          }
          create: {
            args: Prisma.InvitationPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          createMany: {
            args: Prisma.InvitationPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          update: {
            args: Prisma.InvitationPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          deleteMany: {
            args: Prisma.InvitationPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPhotoPayload>
          }
          aggregate: {
            args: Prisma.InvitationPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationPhoto>
          }
          groupBy: {
            args: Prisma.InvitationPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationPhotoCountAggregateOutputType> | number
          }
        }
      }
      InvitationCoverPhoto: {
        payload: Prisma.$InvitationCoverPhotoPayload<ExtArgs>
        fields: Prisma.InvitationCoverPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationCoverPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationCoverPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          findFirst: {
            args: Prisma.InvitationCoverPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationCoverPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          findMany: {
            args: Prisma.InvitationCoverPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>[]
          }
          create: {
            args: Prisma.InvitationCoverPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          createMany: {
            args: Prisma.InvitationCoverPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationCoverPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          update: {
            args: Prisma.InvitationCoverPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          deleteMany: {
            args: Prisma.InvitationCoverPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationCoverPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationCoverPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationCoverPhotoPayload>
          }
          aggregate: {
            args: Prisma.InvitationCoverPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationCoverPhoto>
          }
          groupBy: {
            args: Prisma.InvitationCoverPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationCoverPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCoverPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCoverPhotoCountAggregateOutputType> | number
          }
        }
      }
      InvitationRSVP: {
        payload: Prisma.$InvitationRSVPPayload<ExtArgs>
        fields: Prisma.InvitationRSVPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationRSVPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationRSVPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          findFirst: {
            args: Prisma.InvitationRSVPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationRSVPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          findMany: {
            args: Prisma.InvitationRSVPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>[]
          }
          create: {
            args: Prisma.InvitationRSVPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          createMany: {
            args: Prisma.InvitationRSVPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationRSVPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          update: {
            args: Prisma.InvitationRSVPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          deleteMany: {
            args: Prisma.InvitationRSVPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationRSVPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationRSVPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationRSVPPayload>
          }
          aggregate: {
            args: Prisma.InvitationRSVPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationRSVP>
          }
          groupBy: {
            args: Prisma.InvitationRSVPGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationRSVPGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationRSVPCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationRSVPCountAggregateOutputType> | number
          }
        }
      }
      InvitationMusic: {
        payload: Prisma.$InvitationMusicPayload<ExtArgs>
        fields: Prisma.InvitationMusicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationMusicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationMusicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          findFirst: {
            args: Prisma.InvitationMusicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationMusicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          findMany: {
            args: Prisma.InvitationMusicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>[]
          }
          create: {
            args: Prisma.InvitationMusicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          createMany: {
            args: Prisma.InvitationMusicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InvitationMusicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          update: {
            args: Prisma.InvitationMusicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          deleteMany: {
            args: Prisma.InvitationMusicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationMusicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvitationMusicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationMusicPayload>
          }
          aggregate: {
            args: Prisma.InvitationMusicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitationMusic>
          }
          groupBy: {
            args: Prisma.InvitationMusicGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationMusicGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationMusicCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationMusicCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    invitation?: InvitationOmit
    invitationPlace?: InvitationPlaceOmit
    place?: PlaceOmit
    invitationPlaceTime?: InvitationPlaceTimeOmit
    invitationPhoto?: InvitationPhotoOmit
    invitationCoverPhoto?: InvitationCoverPhotoOmit
    invitationRSVP?: InvitationRSVPOmit
    invitationMusic?: InvitationMusicOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    invitationList: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationList?: boolean | UserCountOutputTypeCountInvitationListArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitationListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }


  /**
   * Count Type InvitationCountOutputType
   */

  export type InvitationCountOutputType = {
    invitationCoverPhotoList: number
    photoList: number
    placeList: number
    invitationRSVP: number
  }

  export type InvitationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationCoverPhotoList?: boolean | InvitationCountOutputTypeCountInvitationCoverPhotoListArgs
    photoList?: boolean | InvitationCountOutputTypeCountPhotoListArgs
    placeList?: boolean | InvitationCountOutputTypeCountPlaceListArgs
    invitationRSVP?: boolean | InvitationCountOutputTypeCountInvitationRSVPArgs
  }

  // Custom InputTypes
  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCountOutputType
     */
    select?: InvitationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountInvitationCoverPhotoListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationCoverPhotoWhereInput
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountPhotoListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPhotoWhereInput
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountPlaceListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPlaceWhereInput
  }

  /**
   * InvitationCountOutputType without action
   */
  export type InvitationCountOutputTypeCountInvitationRSVPArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationRSVPWhereInput
  }


  /**
   * Count Type InvitationPlaceCountOutputType
   */

  export type InvitationPlaceCountOutputType = {
    timeList: number
  }

  export type InvitationPlaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeList?: boolean | InvitationPlaceCountOutputTypeCountTimeListArgs
  }

  // Custom InputTypes
  /**
   * InvitationPlaceCountOutputType without action
   */
  export type InvitationPlaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceCountOutputType
     */
    select?: InvitationPlaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvitationPlaceCountOutputType without action
   */
  export type InvitationPlaceCountOutputTypeCountTimeListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPlaceTimeWhereInput
  }


  /**
   * Count Type PlaceCountOutputType
   */

  export type PlaceCountOutputType = {
    invitationPlaceList: number
  }

  export type PlaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationPlaceList?: boolean | PlaceCountOutputTypeCountInvitationPlaceListArgs
  }

  // Custom InputTypes
  /**
   * PlaceCountOutputType without action
   */
  export type PlaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaceCountOutputType
     */
    select?: PlaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaceCountOutputType without action
   */
  export type PlaceCountOutputTypeCountInvitationPlaceListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPlaceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invitationList?: boolean | User$invitationListArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationList?: boolean | User$invitationListArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      invitationList: Prisma.$InvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string | null
      password: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitationList<T extends User$invitationListArgs<ExtArgs> = {}>(args?: Subset<T, User$invitationListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.invitationList
   */
  export type User$invitationListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationAvgAggregateOutputType = {
    id: number | null
    templateNo: number | null
    userId: number | null
  }

  export type InvitationSumAggregateOutputType = {
    id: number | null
    templateNo: number | null
    userId: number | null
  }

  export type InvitationMinAggregateOutputType = {
    id: number | null
    templateNo: number | null
    uniqueId: string | null
    date: Date | null
    userId: number | null
    title: string | null
    pointColor: string | null
    mainTextColor: string | null
    dressCodeGentleman: string | null
    dressCodeLady: string | null
    bgColor: string | null
    musicKey: string | null
    musicFilename: string | null
    musicFileKey: string | null
    notice: string | null
    brideFirstName: string | null
    brideMiddleName: string | null
    dressCodeMainColor: string | null
    dressCodeSubColor: string | null
    dressCodeThirdColor: string | null
    brideLastName: string | null
    brideMomName: string | null
    greetingTitle: string | null
    greetingContent: string | null
    brideDadName: string | null
    bridePhone: string | null
    groomFirstName: string | null
    groomMiddleName: string | null
    groomLastName: string | null
    groomPhone: string | null
    primarySponsor: string | null
    secondarySponsor: string | null
    maidOfHonor: string | null
    groomsMen: string | null
    bestMan: string | null
    bridesMaids: string | null
    groomMomName: string | null
    groomDadName: string | null
    endingText: string | null
    ogImageKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: number | null
    templateNo: number | null
    uniqueId: string | null
    date: Date | null
    userId: number | null
    title: string | null
    pointColor: string | null
    mainTextColor: string | null
    dressCodeGentleman: string | null
    dressCodeLady: string | null
    bgColor: string | null
    musicKey: string | null
    musicFilename: string | null
    musicFileKey: string | null
    notice: string | null
    brideFirstName: string | null
    brideMiddleName: string | null
    dressCodeMainColor: string | null
    dressCodeSubColor: string | null
    dressCodeThirdColor: string | null
    brideLastName: string | null
    brideMomName: string | null
    greetingTitle: string | null
    greetingContent: string | null
    brideDadName: string | null
    bridePhone: string | null
    groomFirstName: string | null
    groomMiddleName: string | null
    groomLastName: string | null
    groomPhone: string | null
    primarySponsor: string | null
    secondarySponsor: string | null
    maidOfHonor: string | null
    groomsMen: string | null
    bestMan: string | null
    bridesMaids: string | null
    groomMomName: string | null
    groomDadName: string | null
    endingText: string | null
    ogImageKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    templateNo: number
    uniqueId: number
    date: number
    userId: number
    title: number
    pointColor: number
    mainTextColor: number
    dressCodeGentleman: number
    dressCodeLady: number
    bgColor: number
    musicKey: number
    musicFilename: number
    musicFileKey: number
    notice: number
    brideFirstName: number
    brideMiddleName: number
    dressCodeMainColor: number
    dressCodeSubColor: number
    dressCodeThirdColor: number
    brideLastName: number
    brideMomName: number
    greetingTitle: number
    greetingContent: number
    brideDadName: number
    bridePhone: number
    groomFirstName: number
    groomMiddleName: number
    groomLastName: number
    groomPhone: number
    primarySponsor: number
    secondarySponsor: number
    maidOfHonor: number
    groomsMen: number
    bestMan: number
    bridesMaids: number
    groomMomName: number
    groomDadName: number
    layoutOrder: number
    endingText: number
    ogImageKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvitationAvgAggregateInputType = {
    id?: true
    templateNo?: true
    userId?: true
  }

  export type InvitationSumAggregateInputType = {
    id?: true
    templateNo?: true
    userId?: true
  }

  export type InvitationMinAggregateInputType = {
    id?: true
    templateNo?: true
    uniqueId?: true
    date?: true
    userId?: true
    title?: true
    pointColor?: true
    mainTextColor?: true
    dressCodeGentleman?: true
    dressCodeLady?: true
    bgColor?: true
    musicKey?: true
    musicFilename?: true
    musicFileKey?: true
    notice?: true
    brideFirstName?: true
    brideMiddleName?: true
    dressCodeMainColor?: true
    dressCodeSubColor?: true
    dressCodeThirdColor?: true
    brideLastName?: true
    brideMomName?: true
    greetingTitle?: true
    greetingContent?: true
    brideDadName?: true
    bridePhone?: true
    groomFirstName?: true
    groomMiddleName?: true
    groomLastName?: true
    groomPhone?: true
    primarySponsor?: true
    secondarySponsor?: true
    maidOfHonor?: true
    groomsMen?: true
    bestMan?: true
    bridesMaids?: true
    groomMomName?: true
    groomDadName?: true
    endingText?: true
    ogImageKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    templateNo?: true
    uniqueId?: true
    date?: true
    userId?: true
    title?: true
    pointColor?: true
    mainTextColor?: true
    dressCodeGentleman?: true
    dressCodeLady?: true
    bgColor?: true
    musicKey?: true
    musicFilename?: true
    musicFileKey?: true
    notice?: true
    brideFirstName?: true
    brideMiddleName?: true
    dressCodeMainColor?: true
    dressCodeSubColor?: true
    dressCodeThirdColor?: true
    brideLastName?: true
    brideMomName?: true
    greetingTitle?: true
    greetingContent?: true
    brideDadName?: true
    bridePhone?: true
    groomFirstName?: true
    groomMiddleName?: true
    groomLastName?: true
    groomPhone?: true
    primarySponsor?: true
    secondarySponsor?: true
    maidOfHonor?: true
    groomsMen?: true
    bestMan?: true
    bridesMaids?: true
    groomMomName?: true
    groomDadName?: true
    endingText?: true
    ogImageKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    templateNo?: true
    uniqueId?: true
    date?: true
    userId?: true
    title?: true
    pointColor?: true
    mainTextColor?: true
    dressCodeGentleman?: true
    dressCodeLady?: true
    bgColor?: true
    musicKey?: true
    musicFilename?: true
    musicFileKey?: true
    notice?: true
    brideFirstName?: true
    brideMiddleName?: true
    dressCodeMainColor?: true
    dressCodeSubColor?: true
    dressCodeThirdColor?: true
    brideLastName?: true
    brideMomName?: true
    greetingTitle?: true
    greetingContent?: true
    brideDadName?: true
    bridePhone?: true
    groomFirstName?: true
    groomMiddleName?: true
    groomLastName?: true
    groomPhone?: true
    primarySponsor?: true
    secondarySponsor?: true
    maidOfHonor?: true
    groomsMen?: true
    bestMan?: true
    bridesMaids?: true
    groomMomName?: true
    groomDadName?: true
    layoutOrder?: true
    endingText?: true
    ogImageKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _avg?: InvitationAvgAggregateInputType
    _sum?: InvitationSumAggregateInputType
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: number
    templateNo: number | null
    uniqueId: string | null
    date: Date | null
    userId: number | null
    title: string | null
    pointColor: string | null
    mainTextColor: string | null
    dressCodeGentleman: string | null
    dressCodeLady: string | null
    bgColor: string | null
    musicKey: string | null
    musicFilename: string | null
    musicFileKey: string | null
    notice: string | null
    brideFirstName: string | null
    brideMiddleName: string | null
    dressCodeMainColor: string | null
    dressCodeSubColor: string | null
    dressCodeThirdColor: string | null
    brideLastName: string | null
    brideMomName: string | null
    greetingTitle: string | null
    greetingContent: string | null
    brideDadName: string | null
    bridePhone: string | null
    groomFirstName: string | null
    groomMiddleName: string | null
    groomLastName: string | null
    groomPhone: string | null
    primarySponsor: string | null
    secondarySponsor: string | null
    maidOfHonor: string | null
    groomsMen: string | null
    bestMan: string | null
    bridesMaids: string | null
    groomMomName: string | null
    groomDadName: string | null
    layoutOrder: JsonValue | null
    endingText: string | null
    ogImageKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: InvitationCountAggregateOutputType | null
    _avg: InvitationAvgAggregateOutputType | null
    _sum: InvitationSumAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateNo?: boolean
    uniqueId?: boolean
    date?: boolean
    userId?: boolean
    title?: boolean
    pointColor?: boolean
    mainTextColor?: boolean
    dressCodeGentleman?: boolean
    dressCodeLady?: boolean
    bgColor?: boolean
    musicKey?: boolean
    musicFilename?: boolean
    musicFileKey?: boolean
    notice?: boolean
    brideFirstName?: boolean
    brideMiddleName?: boolean
    dressCodeMainColor?: boolean
    dressCodeSubColor?: boolean
    dressCodeThirdColor?: boolean
    brideLastName?: boolean
    brideMomName?: boolean
    greetingTitle?: boolean
    greetingContent?: boolean
    brideDadName?: boolean
    bridePhone?: boolean
    groomFirstName?: boolean
    groomMiddleName?: boolean
    groomLastName?: boolean
    groomPhone?: boolean
    primarySponsor?: boolean
    secondarySponsor?: boolean
    maidOfHonor?: boolean
    groomsMen?: boolean
    bestMan?: boolean
    bridesMaids?: boolean
    groomMomName?: boolean
    groomDadName?: boolean
    layoutOrder?: boolean
    endingText?: boolean
    ogImageKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Invitation$userArgs<ExtArgs>
    invitationCoverPhotoList?: boolean | Invitation$invitationCoverPhotoListArgs<ExtArgs>
    photoList?: boolean | Invitation$photoListArgs<ExtArgs>
    placeList?: boolean | Invitation$placeListArgs<ExtArgs>
    invitationRSVP?: boolean | Invitation$invitationRSVPArgs<ExtArgs>
    _count?: boolean | InvitationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>



  export type InvitationSelectScalar = {
    id?: boolean
    templateNo?: boolean
    uniqueId?: boolean
    date?: boolean
    userId?: boolean
    title?: boolean
    pointColor?: boolean
    mainTextColor?: boolean
    dressCodeGentleman?: boolean
    dressCodeLady?: boolean
    bgColor?: boolean
    musicKey?: boolean
    musicFilename?: boolean
    musicFileKey?: boolean
    notice?: boolean
    brideFirstName?: boolean
    brideMiddleName?: boolean
    dressCodeMainColor?: boolean
    dressCodeSubColor?: boolean
    dressCodeThirdColor?: boolean
    brideLastName?: boolean
    brideMomName?: boolean
    greetingTitle?: boolean
    greetingContent?: boolean
    brideDadName?: boolean
    bridePhone?: boolean
    groomFirstName?: boolean
    groomMiddleName?: boolean
    groomLastName?: boolean
    groomPhone?: boolean
    primarySponsor?: boolean
    secondarySponsor?: boolean
    maidOfHonor?: boolean
    groomsMen?: boolean
    bestMan?: boolean
    bridesMaids?: boolean
    groomMomName?: boolean
    groomDadName?: boolean
    layoutOrder?: boolean
    endingText?: boolean
    ogImageKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateNo" | "uniqueId" | "date" | "userId" | "title" | "pointColor" | "mainTextColor" | "dressCodeGentleman" | "dressCodeLady" | "bgColor" | "musicKey" | "musicFilename" | "musicFileKey" | "notice" | "brideFirstName" | "brideMiddleName" | "dressCodeMainColor" | "dressCodeSubColor" | "dressCodeThirdColor" | "brideLastName" | "brideMomName" | "greetingTitle" | "greetingContent" | "brideDadName" | "bridePhone" | "groomFirstName" | "groomMiddleName" | "groomLastName" | "groomPhone" | "primarySponsor" | "secondarySponsor" | "maidOfHonor" | "groomsMen" | "bestMan" | "bridesMaids" | "groomMomName" | "groomDadName" | "layoutOrder" | "endingText" | "ogImageKey" | "createdAt" | "updatedAt", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Invitation$userArgs<ExtArgs>
    invitationCoverPhotoList?: boolean | Invitation$invitationCoverPhotoListArgs<ExtArgs>
    photoList?: boolean | Invitation$photoListArgs<ExtArgs>
    placeList?: boolean | Invitation$placeListArgs<ExtArgs>
    invitationRSVP?: boolean | Invitation$invitationRSVPArgs<ExtArgs>
    _count?: boolean | InvitationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      invitationCoverPhotoList: Prisma.$InvitationCoverPhotoPayload<ExtArgs>[]
      photoList: Prisma.$InvitationPhotoPayload<ExtArgs>[]
      placeList: Prisma.$InvitationPlacePayload<ExtArgs>[]
      invitationRSVP: Prisma.$InvitationRSVPPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      templateNo: number | null
      uniqueId: string | null
      date: Date | null
      userId: number | null
      title: string | null
      pointColor: string | null
      mainTextColor: string | null
      dressCodeGentleman: string | null
      dressCodeLady: string | null
      bgColor: string | null
      musicKey: string | null
      musicFilename: string | null
      musicFileKey: string | null
      notice: string | null
      brideFirstName: string | null
      brideMiddleName: string | null
      dressCodeMainColor: string | null
      dressCodeSubColor: string | null
      dressCodeThirdColor: string | null
      brideLastName: string | null
      brideMomName: string | null
      greetingTitle: string | null
      greetingContent: string | null
      brideDadName: string | null
      bridePhone: string | null
      groomFirstName: string | null
      groomMiddleName: string | null
      groomLastName: string | null
      groomPhone: string | null
      primarySponsor: string | null
      secondarySponsor: string | null
      maidOfHonor: string | null
      groomsMen: string | null
      bestMan: string | null
      bridesMaids: string | null
      groomMomName: string | null
      groomDadName: string | null
      layoutOrder: Prisma.JsonValue | null
      endingText: string | null
      ogImageKey: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Invitation$userArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    invitationCoverPhotoList<T extends Invitation$invitationCoverPhotoListArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$invitationCoverPhotoListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photoList<T extends Invitation$photoListArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$photoListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    placeList<T extends Invitation$placeListArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$placeListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitationRSVP<T extends Invitation$invitationRSVPArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$invitationRSVPArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'Int'>
    readonly templateNo: FieldRef<"Invitation", 'Int'>
    readonly uniqueId: FieldRef<"Invitation", 'String'>
    readonly date: FieldRef<"Invitation", 'DateTime'>
    readonly userId: FieldRef<"Invitation", 'Int'>
    readonly title: FieldRef<"Invitation", 'String'>
    readonly pointColor: FieldRef<"Invitation", 'String'>
    readonly mainTextColor: FieldRef<"Invitation", 'String'>
    readonly dressCodeGentleman: FieldRef<"Invitation", 'String'>
    readonly dressCodeLady: FieldRef<"Invitation", 'String'>
    readonly bgColor: FieldRef<"Invitation", 'String'>
    readonly musicKey: FieldRef<"Invitation", 'String'>
    readonly musicFilename: FieldRef<"Invitation", 'String'>
    readonly musicFileKey: FieldRef<"Invitation", 'String'>
    readonly notice: FieldRef<"Invitation", 'String'>
    readonly brideFirstName: FieldRef<"Invitation", 'String'>
    readonly brideMiddleName: FieldRef<"Invitation", 'String'>
    readonly dressCodeMainColor: FieldRef<"Invitation", 'String'>
    readonly dressCodeSubColor: FieldRef<"Invitation", 'String'>
    readonly dressCodeThirdColor: FieldRef<"Invitation", 'String'>
    readonly brideLastName: FieldRef<"Invitation", 'String'>
    readonly brideMomName: FieldRef<"Invitation", 'String'>
    readonly greetingTitle: FieldRef<"Invitation", 'String'>
    readonly greetingContent: FieldRef<"Invitation", 'String'>
    readonly brideDadName: FieldRef<"Invitation", 'String'>
    readonly bridePhone: FieldRef<"Invitation", 'String'>
    readonly groomFirstName: FieldRef<"Invitation", 'String'>
    readonly groomMiddleName: FieldRef<"Invitation", 'String'>
    readonly groomLastName: FieldRef<"Invitation", 'String'>
    readonly groomPhone: FieldRef<"Invitation", 'String'>
    readonly primarySponsor: FieldRef<"Invitation", 'String'>
    readonly secondarySponsor: FieldRef<"Invitation", 'String'>
    readonly maidOfHonor: FieldRef<"Invitation", 'String'>
    readonly groomsMen: FieldRef<"Invitation", 'String'>
    readonly bestMan: FieldRef<"Invitation", 'String'>
    readonly bridesMaids: FieldRef<"Invitation", 'String'>
    readonly groomMomName: FieldRef<"Invitation", 'String'>
    readonly groomDadName: FieldRef<"Invitation", 'String'>
    readonly layoutOrder: FieldRef<"Invitation", 'Json'>
    readonly endingText: FieldRef<"Invitation", 'String'>
    readonly ogImageKey: FieldRef<"Invitation", 'String'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly updatedAt: FieldRef<"Invitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data?: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitation.user
   */
  export type Invitation$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Invitation.invitationCoverPhotoList
   */
  export type Invitation$invitationCoverPhotoListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    where?: InvitationCoverPhotoWhereInput
    orderBy?: InvitationCoverPhotoOrderByWithRelationInput | InvitationCoverPhotoOrderByWithRelationInput[]
    cursor?: InvitationCoverPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationCoverPhotoScalarFieldEnum | InvitationCoverPhotoScalarFieldEnum[]
  }

  /**
   * Invitation.photoList
   */
  export type Invitation$photoListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    where?: InvitationPhotoWhereInput
    orderBy?: InvitationPhotoOrderByWithRelationInput | InvitationPhotoOrderByWithRelationInput[]
    cursor?: InvitationPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationPhotoScalarFieldEnum | InvitationPhotoScalarFieldEnum[]
  }

  /**
   * Invitation.placeList
   */
  export type Invitation$placeListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    where?: InvitationPlaceWhereInput
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    cursor?: InvitationPlaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationPlaceScalarFieldEnum | InvitationPlaceScalarFieldEnum[]
  }

  /**
   * Invitation.invitationRSVP
   */
  export type Invitation$invitationRSVPArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    where?: InvitationRSVPWhereInput
    orderBy?: InvitationRSVPOrderByWithRelationInput | InvitationRSVPOrderByWithRelationInput[]
    cursor?: InvitationRSVPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationRSVPScalarFieldEnum | InvitationRSVPScalarFieldEnum[]
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model InvitationPlace
   */

  export type AggregateInvitationPlace = {
    _count: InvitationPlaceCountAggregateOutputType | null
    _avg: InvitationPlaceAvgAggregateOutputType | null
    _sum: InvitationPlaceSumAggregateOutputType | null
    _min: InvitationPlaceMinAggregateOutputType | null
    _max: InvitationPlaceMaxAggregateOutputType | null
  }

  export type InvitationPlaceAvgAggregateOutputType = {
    id: number | null
    invitationId: number | null
    order: number | null
    placeId: number | null
  }

  export type InvitationPlaceSumAggregateOutputType = {
    id: number | null
    invitationId: number | null
    order: number | null
    placeId: number | null
  }

  export type InvitationPlaceMinAggregateOutputType = {
    id: number | null
    invitationId: number | null
    order: number | null
    placeId: number | null
    placeDetail: string | null
  }

  export type InvitationPlaceMaxAggregateOutputType = {
    id: number | null
    invitationId: number | null
    order: number | null
    placeId: number | null
    placeDetail: string | null
  }

  export type InvitationPlaceCountAggregateOutputType = {
    id: number
    invitationId: number
    order: number
    placeId: number
    placeDetail: number
    _all: number
  }


  export type InvitationPlaceAvgAggregateInputType = {
    id?: true
    invitationId?: true
    order?: true
    placeId?: true
  }

  export type InvitationPlaceSumAggregateInputType = {
    id?: true
    invitationId?: true
    order?: true
    placeId?: true
  }

  export type InvitationPlaceMinAggregateInputType = {
    id?: true
    invitationId?: true
    order?: true
    placeId?: true
    placeDetail?: true
  }

  export type InvitationPlaceMaxAggregateInputType = {
    id?: true
    invitationId?: true
    order?: true
    placeId?: true
    placeDetail?: true
  }

  export type InvitationPlaceCountAggregateInputType = {
    id?: true
    invitationId?: true
    order?: true
    placeId?: true
    placeDetail?: true
    _all?: true
  }

  export type InvitationPlaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPlace to aggregate.
     */
    where?: InvitationPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaces to fetch.
     */
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationPlaces
    **/
    _count?: true | InvitationPlaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationPlaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationPlaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationPlaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationPlaceMaxAggregateInputType
  }

  export type GetInvitationPlaceAggregateType<T extends InvitationPlaceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationPlace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationPlace[P]>
      : GetScalarType<T[P], AggregateInvitationPlace[P]>
  }




  export type InvitationPlaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPlaceWhereInput
    orderBy?: InvitationPlaceOrderByWithAggregationInput | InvitationPlaceOrderByWithAggregationInput[]
    by: InvitationPlaceScalarFieldEnum[] | InvitationPlaceScalarFieldEnum
    having?: InvitationPlaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationPlaceCountAggregateInputType | true
    _avg?: InvitationPlaceAvgAggregateInputType
    _sum?: InvitationPlaceSumAggregateInputType
    _min?: InvitationPlaceMinAggregateInputType
    _max?: InvitationPlaceMaxAggregateInputType
  }

  export type InvitationPlaceGroupByOutputType = {
    id: number
    invitationId: number | null
    order: number | null
    placeId: number | null
    placeDetail: string | null
    _count: InvitationPlaceCountAggregateOutputType | null
    _avg: InvitationPlaceAvgAggregateOutputType | null
    _sum: InvitationPlaceSumAggregateOutputType | null
    _min: InvitationPlaceMinAggregateOutputType | null
    _max: InvitationPlaceMaxAggregateOutputType | null
  }

  type GetInvitationPlaceGroupByPayload<T extends InvitationPlaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationPlaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationPlaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationPlaceGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationPlaceGroupByOutputType[P]>
        }
      >
    >


  export type InvitationPlaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    order?: boolean
    placeId?: boolean
    placeDetail?: boolean
    place?: boolean | InvitationPlace$placeArgs<ExtArgs>
    invitation?: boolean | InvitationPlace$invitationArgs<ExtArgs>
    timeList?: boolean | InvitationPlace$timeListArgs<ExtArgs>
    _count?: boolean | InvitationPlaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitationPlace"]>



  export type InvitationPlaceSelectScalar = {
    id?: boolean
    invitationId?: boolean
    order?: boolean
    placeId?: boolean
    placeDetail?: boolean
  }

  export type InvitationPlaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "order" | "placeId" | "placeDetail", ExtArgs["result"]["invitationPlace"]>
  export type InvitationPlaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    place?: boolean | InvitationPlace$placeArgs<ExtArgs>
    invitation?: boolean | InvitationPlace$invitationArgs<ExtArgs>
    timeList?: boolean | InvitationPlace$timeListArgs<ExtArgs>
    _count?: boolean | InvitationPlaceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InvitationPlacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationPlace"
    objects: {
      place: Prisma.$PlacePayload<ExtArgs> | null
      invitation: Prisma.$InvitationPayload<ExtArgs> | null
      timeList: Prisma.$InvitationPlaceTimePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: number | null
      order: number | null
      placeId: number | null
      placeDetail: string | null
    }, ExtArgs["result"]["invitationPlace"]>
    composites: {}
  }

  type InvitationPlaceGetPayload<S extends boolean | null | undefined | InvitationPlaceDefaultArgs> = $Result.GetResult<Prisma.$InvitationPlacePayload, S>

  type InvitationPlaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationPlaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationPlaceCountAggregateInputType | true
    }

  export interface InvitationPlaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationPlace'], meta: { name: 'InvitationPlace' } }
    /**
     * Find zero or one InvitationPlace that matches the filter.
     * @param {InvitationPlaceFindUniqueArgs} args - Arguments to find a InvitationPlace
     * @example
     * // Get one InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationPlaceFindUniqueArgs>(args: SelectSubset<T, InvitationPlaceFindUniqueArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationPlace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationPlaceFindUniqueOrThrowArgs} args - Arguments to find a InvitationPlace
     * @example
     * // Get one InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationPlaceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationPlaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPlace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceFindFirstArgs} args - Arguments to find a InvitationPlace
     * @example
     * // Get one InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationPlaceFindFirstArgs>(args?: SelectSubset<T, InvitationPlaceFindFirstArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPlace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceFindFirstOrThrowArgs} args - Arguments to find a InvitationPlace
     * @example
     * // Get one InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationPlaceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationPlaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationPlaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationPlaces
     * const invitationPlaces = await prisma.invitationPlace.findMany()
     * 
     * // Get first 10 InvitationPlaces
     * const invitationPlaces = await prisma.invitationPlace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationPlaceWithIdOnly = await prisma.invitationPlace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationPlaceFindManyArgs>(args?: SelectSubset<T, InvitationPlaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationPlace.
     * @param {InvitationPlaceCreateArgs} args - Arguments to create a InvitationPlace.
     * @example
     * // Create one InvitationPlace
     * const InvitationPlace = await prisma.invitationPlace.create({
     *   data: {
     *     // ... data to create a InvitationPlace
     *   }
     * })
     * 
     */
    create<T extends InvitationPlaceCreateArgs>(args: SelectSubset<T, InvitationPlaceCreateArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationPlaces.
     * @param {InvitationPlaceCreateManyArgs} args - Arguments to create many InvitationPlaces.
     * @example
     * // Create many InvitationPlaces
     * const invitationPlace = await prisma.invitationPlace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationPlaceCreateManyArgs>(args?: SelectSubset<T, InvitationPlaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationPlace.
     * @param {InvitationPlaceDeleteArgs} args - Arguments to delete one InvitationPlace.
     * @example
     * // Delete one InvitationPlace
     * const InvitationPlace = await prisma.invitationPlace.delete({
     *   where: {
     *     // ... filter to delete one InvitationPlace
     *   }
     * })
     * 
     */
    delete<T extends InvitationPlaceDeleteArgs>(args: SelectSubset<T, InvitationPlaceDeleteArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationPlace.
     * @param {InvitationPlaceUpdateArgs} args - Arguments to update one InvitationPlace.
     * @example
     * // Update one InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationPlaceUpdateArgs>(args: SelectSubset<T, InvitationPlaceUpdateArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationPlaces.
     * @param {InvitationPlaceDeleteManyArgs} args - Arguments to filter InvitationPlaces to delete.
     * @example
     * // Delete a few InvitationPlaces
     * const { count } = await prisma.invitationPlace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationPlaceDeleteManyArgs>(args?: SelectSubset<T, InvitationPlaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationPlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationPlaces
     * const invitationPlace = await prisma.invitationPlace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationPlaceUpdateManyArgs>(args: SelectSubset<T, InvitationPlaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationPlace.
     * @param {InvitationPlaceUpsertArgs} args - Arguments to update or create a InvitationPlace.
     * @example
     * // Update or create a InvitationPlace
     * const invitationPlace = await prisma.invitationPlace.upsert({
     *   create: {
     *     // ... data to create a InvitationPlace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationPlace we want to update
     *   }
     * })
     */
    upsert<T extends InvitationPlaceUpsertArgs>(args: SelectSubset<T, InvitationPlaceUpsertArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationPlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceCountArgs} args - Arguments to filter InvitationPlaces to count.
     * @example
     * // Count the number of InvitationPlaces
     * const count = await prisma.invitationPlace.count({
     *   where: {
     *     // ... the filter for the InvitationPlaces we want to count
     *   }
     * })
    **/
    count<T extends InvitationPlaceCountArgs>(
      args?: Subset<T, InvitationPlaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationPlaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationPlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationPlaceAggregateArgs>(args: Subset<T, InvitationPlaceAggregateArgs>): Prisma.PrismaPromise<GetInvitationPlaceAggregateType<T>>

    /**
     * Group by InvitationPlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationPlaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationPlaceGroupByArgs['orderBy'] }
        : { orderBy?: InvitationPlaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationPlaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationPlaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationPlace model
   */
  readonly fields: InvitationPlaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationPlace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationPlaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    place<T extends InvitationPlace$placeArgs<ExtArgs> = {}>(args?: Subset<T, InvitationPlace$placeArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    invitation<T extends InvitationPlace$invitationArgs<ExtArgs> = {}>(args?: Subset<T, InvitationPlace$invitationArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    timeList<T extends InvitationPlace$timeListArgs<ExtArgs> = {}>(args?: Subset<T, InvitationPlace$timeListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationPlace model
   */
  interface InvitationPlaceFieldRefs {
    readonly id: FieldRef<"InvitationPlace", 'Int'>
    readonly invitationId: FieldRef<"InvitationPlace", 'Int'>
    readonly order: FieldRef<"InvitationPlace", 'Int'>
    readonly placeId: FieldRef<"InvitationPlace", 'Int'>
    readonly placeDetail: FieldRef<"InvitationPlace", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InvitationPlace findUnique
   */
  export type InvitationPlaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlace to fetch.
     */
    where: InvitationPlaceWhereUniqueInput
  }

  /**
   * InvitationPlace findUniqueOrThrow
   */
  export type InvitationPlaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlace to fetch.
     */
    where: InvitationPlaceWhereUniqueInput
  }

  /**
   * InvitationPlace findFirst
   */
  export type InvitationPlaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlace to fetch.
     */
    where?: InvitationPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaces to fetch.
     */
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPlaces.
     */
    cursor?: InvitationPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPlaces.
     */
    distinct?: InvitationPlaceScalarFieldEnum | InvitationPlaceScalarFieldEnum[]
  }

  /**
   * InvitationPlace findFirstOrThrow
   */
  export type InvitationPlaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlace to fetch.
     */
    where?: InvitationPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaces to fetch.
     */
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPlaces.
     */
    cursor?: InvitationPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPlaces.
     */
    distinct?: InvitationPlaceScalarFieldEnum | InvitationPlaceScalarFieldEnum[]
  }

  /**
   * InvitationPlace findMany
   */
  export type InvitationPlaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaces to fetch.
     */
    where?: InvitationPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaces to fetch.
     */
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationPlaces.
     */
    cursor?: InvitationPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaces.
     */
    skip?: number
    distinct?: InvitationPlaceScalarFieldEnum | InvitationPlaceScalarFieldEnum[]
  }

  /**
   * InvitationPlace create
   */
  export type InvitationPlaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationPlace.
     */
    data?: XOR<InvitationPlaceCreateInput, InvitationPlaceUncheckedCreateInput>
  }

  /**
   * InvitationPlace createMany
   */
  export type InvitationPlaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationPlaces.
     */
    data: InvitationPlaceCreateManyInput | InvitationPlaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationPlace update
   */
  export type InvitationPlaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationPlace.
     */
    data: XOR<InvitationPlaceUpdateInput, InvitationPlaceUncheckedUpdateInput>
    /**
     * Choose, which InvitationPlace to update.
     */
    where: InvitationPlaceWhereUniqueInput
  }

  /**
   * InvitationPlace updateMany
   */
  export type InvitationPlaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationPlaces.
     */
    data: XOR<InvitationPlaceUpdateManyMutationInput, InvitationPlaceUncheckedUpdateManyInput>
    /**
     * Filter which InvitationPlaces to update
     */
    where?: InvitationPlaceWhereInput
    /**
     * Limit how many InvitationPlaces to update.
     */
    limit?: number
  }

  /**
   * InvitationPlace upsert
   */
  export type InvitationPlaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationPlace to update in case it exists.
     */
    where: InvitationPlaceWhereUniqueInput
    /**
     * In case the InvitationPlace found by the `where` argument doesn't exist, create a new InvitationPlace with this data.
     */
    create: XOR<InvitationPlaceCreateInput, InvitationPlaceUncheckedCreateInput>
    /**
     * In case the InvitationPlace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationPlaceUpdateInput, InvitationPlaceUncheckedUpdateInput>
  }

  /**
   * InvitationPlace delete
   */
  export type InvitationPlaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    /**
     * Filter which InvitationPlace to delete.
     */
    where: InvitationPlaceWhereUniqueInput
  }

  /**
   * InvitationPlace deleteMany
   */
  export type InvitationPlaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPlaces to delete
     */
    where?: InvitationPlaceWhereInput
    /**
     * Limit how many InvitationPlaces to delete.
     */
    limit?: number
  }

  /**
   * InvitationPlace.place
   */
  export type InvitationPlace$placeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    where?: PlaceWhereInput
  }

  /**
   * InvitationPlace.invitation
   */
  export type InvitationPlace$invitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }

  /**
   * InvitationPlace.timeList
   */
  export type InvitationPlace$timeListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    where?: InvitationPlaceTimeWhereInput
    orderBy?: InvitationPlaceTimeOrderByWithRelationInput | InvitationPlaceTimeOrderByWithRelationInput[]
    cursor?: InvitationPlaceTimeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationPlaceTimeScalarFieldEnum | InvitationPlaceTimeScalarFieldEnum[]
  }

  /**
   * InvitationPlace without action
   */
  export type InvitationPlaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
  }


  /**
   * Model Place
   */

  export type AggregatePlace = {
    _count: PlaceCountAggregateOutputType | null
    _avg: PlaceAvgAggregateOutputType | null
    _sum: PlaceSumAggregateOutputType | null
    _min: PlaceMinAggregateOutputType | null
    _max: PlaceMaxAggregateOutputType | null
  }

  export type PlaceAvgAggregateOutputType = {
    id: number | null
    lat: number | null
    lng: number | null
  }

  export type PlaceSumAggregateOutputType = {
    id: number | null
    lat: number | null
    lng: number | null
  }

  export type PlaceMinAggregateOutputType = {
    id: number | null
    googlePlaceId: string | null
    name: string | null
    address: string | null
    lat: number | null
    lng: number | null
  }

  export type PlaceMaxAggregateOutputType = {
    id: number | null
    googlePlaceId: string | null
    name: string | null
    address: string | null
    lat: number | null
    lng: number | null
  }

  export type PlaceCountAggregateOutputType = {
    id: number
    googlePlaceId: number
    name: number
    address: number
    lat: number
    lng: number
    _all: number
  }


  export type PlaceAvgAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PlaceSumAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PlaceMinAggregateInputType = {
    id?: true
    googlePlaceId?: true
    name?: true
    address?: true
    lat?: true
    lng?: true
  }

  export type PlaceMaxAggregateInputType = {
    id?: true
    googlePlaceId?: true
    name?: true
    address?: true
    lat?: true
    lng?: true
  }

  export type PlaceCountAggregateInputType = {
    id?: true
    googlePlaceId?: true
    name?: true
    address?: true
    lat?: true
    lng?: true
    _all?: true
  }

  export type PlaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Place to aggregate.
     */
    where?: PlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Places to fetch.
     */
    orderBy?: PlaceOrderByWithRelationInput | PlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Places
    **/
    _count?: true | PlaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaceMaxAggregateInputType
  }

  export type GetPlaceAggregateType<T extends PlaceAggregateArgs> = {
        [P in keyof T & keyof AggregatePlace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlace[P]>
      : GetScalarType<T[P], AggregatePlace[P]>
  }




  export type PlaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaceWhereInput
    orderBy?: PlaceOrderByWithAggregationInput | PlaceOrderByWithAggregationInput[]
    by: PlaceScalarFieldEnum[] | PlaceScalarFieldEnum
    having?: PlaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaceCountAggregateInputType | true
    _avg?: PlaceAvgAggregateInputType
    _sum?: PlaceSumAggregateInputType
    _min?: PlaceMinAggregateInputType
    _max?: PlaceMaxAggregateInputType
  }

  export type PlaceGroupByOutputType = {
    id: number
    googlePlaceId: string | null
    name: string | null
    address: string | null
    lat: number | null
    lng: number | null
    _count: PlaceCountAggregateOutputType | null
    _avg: PlaceAvgAggregateOutputType | null
    _sum: PlaceSumAggregateOutputType | null
    _min: PlaceMinAggregateOutputType | null
    _max: PlaceMaxAggregateOutputType | null
  }

  type GetPlaceGroupByPayload<T extends PlaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaceGroupByOutputType[P]>
            : GetScalarType<T[P], PlaceGroupByOutputType[P]>
        }
      >
    >


  export type PlaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googlePlaceId?: boolean
    name?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
    invitationPlaceList?: boolean | Place$invitationPlaceListArgs<ExtArgs>
    _count?: boolean | PlaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["place"]>



  export type PlaceSelectScalar = {
    id?: boolean
    googlePlaceId?: boolean
    name?: boolean
    address?: boolean
    lat?: boolean
    lng?: boolean
  }

  export type PlaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googlePlaceId" | "name" | "address" | "lat" | "lng", ExtArgs["result"]["place"]>
  export type PlaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationPlaceList?: boolean | Place$invitationPlaceListArgs<ExtArgs>
    _count?: boolean | PlaceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PlacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Place"
    objects: {
      invitationPlaceList: Prisma.$InvitationPlacePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      googlePlaceId: string | null
      name: string | null
      address: string | null
      lat: number | null
      lng: number | null
    }, ExtArgs["result"]["place"]>
    composites: {}
  }

  type PlaceGetPayload<S extends boolean | null | undefined | PlaceDefaultArgs> = $Result.GetResult<Prisma.$PlacePayload, S>

  type PlaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaceCountAggregateInputType | true
    }

  export interface PlaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Place'], meta: { name: 'Place' } }
    /**
     * Find zero or one Place that matches the filter.
     * @param {PlaceFindUniqueArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaceFindUniqueArgs>(args: SelectSubset<T, PlaceFindUniqueArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Place that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaceFindUniqueOrThrowArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaceFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Place that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceFindFirstArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaceFindFirstArgs>(args?: SelectSubset<T, PlaceFindFirstArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Place that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceFindFirstOrThrowArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaceFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Places that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Places
     * const places = await prisma.place.findMany()
     * 
     * // Get first 10 Places
     * const places = await prisma.place.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placeWithIdOnly = await prisma.place.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaceFindManyArgs>(args?: SelectSubset<T, PlaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Place.
     * @param {PlaceCreateArgs} args - Arguments to create a Place.
     * @example
     * // Create one Place
     * const Place = await prisma.place.create({
     *   data: {
     *     // ... data to create a Place
     *   }
     * })
     * 
     */
    create<T extends PlaceCreateArgs>(args: SelectSubset<T, PlaceCreateArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Places.
     * @param {PlaceCreateManyArgs} args - Arguments to create many Places.
     * @example
     * // Create many Places
     * const place = await prisma.place.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaceCreateManyArgs>(args?: SelectSubset<T, PlaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Place.
     * @param {PlaceDeleteArgs} args - Arguments to delete one Place.
     * @example
     * // Delete one Place
     * const Place = await prisma.place.delete({
     *   where: {
     *     // ... filter to delete one Place
     *   }
     * })
     * 
     */
    delete<T extends PlaceDeleteArgs>(args: SelectSubset<T, PlaceDeleteArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Place.
     * @param {PlaceUpdateArgs} args - Arguments to update one Place.
     * @example
     * // Update one Place
     * const place = await prisma.place.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaceUpdateArgs>(args: SelectSubset<T, PlaceUpdateArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Places.
     * @param {PlaceDeleteManyArgs} args - Arguments to filter Places to delete.
     * @example
     * // Delete a few Places
     * const { count } = await prisma.place.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaceDeleteManyArgs>(args?: SelectSubset<T, PlaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Places
     * const place = await prisma.place.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaceUpdateManyArgs>(args: SelectSubset<T, PlaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Place.
     * @param {PlaceUpsertArgs} args - Arguments to update or create a Place.
     * @example
     * // Update or create a Place
     * const place = await prisma.place.upsert({
     *   create: {
     *     // ... data to create a Place
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Place we want to update
     *   }
     * })
     */
    upsert<T extends PlaceUpsertArgs>(args: SelectSubset<T, PlaceUpsertArgs<ExtArgs>>): Prisma__PlaceClient<$Result.GetResult<Prisma.$PlacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceCountArgs} args - Arguments to filter Places to count.
     * @example
     * // Count the number of Places
     * const count = await prisma.place.count({
     *   where: {
     *     // ... the filter for the Places we want to count
     *   }
     * })
    **/
    count<T extends PlaceCountArgs>(
      args?: Subset<T, PlaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Place.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaceAggregateArgs>(args: Subset<T, PlaceAggregateArgs>): Prisma.PrismaPromise<GetPlaceAggregateType<T>>

    /**
     * Group by Place.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaceGroupByArgs['orderBy'] }
        : { orderBy?: PlaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Place model
   */
  readonly fields: PlaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Place.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitationPlaceList<T extends Place$invitationPlaceListArgs<ExtArgs> = {}>(args?: Subset<T, Place$invitationPlaceListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Place model
   */
  interface PlaceFieldRefs {
    readonly id: FieldRef<"Place", 'Int'>
    readonly googlePlaceId: FieldRef<"Place", 'String'>
    readonly name: FieldRef<"Place", 'String'>
    readonly address: FieldRef<"Place", 'String'>
    readonly lat: FieldRef<"Place", 'Float'>
    readonly lng: FieldRef<"Place", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Place findUnique
   */
  export type PlaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter, which Place to fetch.
     */
    where: PlaceWhereUniqueInput
  }

  /**
   * Place findUniqueOrThrow
   */
  export type PlaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter, which Place to fetch.
     */
    where: PlaceWhereUniqueInput
  }

  /**
   * Place findFirst
   */
  export type PlaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter, which Place to fetch.
     */
    where?: PlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Places to fetch.
     */
    orderBy?: PlaceOrderByWithRelationInput | PlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Places.
     */
    cursor?: PlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Places.
     */
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * Place findFirstOrThrow
   */
  export type PlaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter, which Place to fetch.
     */
    where?: PlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Places to fetch.
     */
    orderBy?: PlaceOrderByWithRelationInput | PlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Places.
     */
    cursor?: PlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Places.
     */
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * Place findMany
   */
  export type PlaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter, which Places to fetch.
     */
    where?: PlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Places to fetch.
     */
    orderBy?: PlaceOrderByWithRelationInput | PlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Places.
     */
    cursor?: PlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Places.
     */
    skip?: number
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * Place create
   */
  export type PlaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Place.
     */
    data?: XOR<PlaceCreateInput, PlaceUncheckedCreateInput>
  }

  /**
   * Place createMany
   */
  export type PlaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Places.
     */
    data: PlaceCreateManyInput | PlaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Place update
   */
  export type PlaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Place.
     */
    data: XOR<PlaceUpdateInput, PlaceUncheckedUpdateInput>
    /**
     * Choose, which Place to update.
     */
    where: PlaceWhereUniqueInput
  }

  /**
   * Place updateMany
   */
  export type PlaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Places.
     */
    data: XOR<PlaceUpdateManyMutationInput, PlaceUncheckedUpdateManyInput>
    /**
     * Filter which Places to update
     */
    where?: PlaceWhereInput
    /**
     * Limit how many Places to update.
     */
    limit?: number
  }

  /**
   * Place upsert
   */
  export type PlaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Place to update in case it exists.
     */
    where: PlaceWhereUniqueInput
    /**
     * In case the Place found by the `where` argument doesn't exist, create a new Place with this data.
     */
    create: XOR<PlaceCreateInput, PlaceUncheckedCreateInput>
    /**
     * In case the Place was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaceUpdateInput, PlaceUncheckedUpdateInput>
  }

  /**
   * Place delete
   */
  export type PlaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
    /**
     * Filter which Place to delete.
     */
    where: PlaceWhereUniqueInput
  }

  /**
   * Place deleteMany
   */
  export type PlaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Places to delete
     */
    where?: PlaceWhereInput
    /**
     * Limit how many Places to delete.
     */
    limit?: number
  }

  /**
   * Place.invitationPlaceList
   */
  export type Place$invitationPlaceListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    where?: InvitationPlaceWhereInput
    orderBy?: InvitationPlaceOrderByWithRelationInput | InvitationPlaceOrderByWithRelationInput[]
    cursor?: InvitationPlaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationPlaceScalarFieldEnum | InvitationPlaceScalarFieldEnum[]
  }

  /**
   * Place without action
   */
  export type PlaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Place
     */
    select?: PlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Place
     */
    omit?: PlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaceInclude<ExtArgs> | null
  }


  /**
   * Model InvitationPlaceTime
   */

  export type AggregateInvitationPlaceTime = {
    _count: InvitationPlaceTimeCountAggregateOutputType | null
    _avg: InvitationPlaceTimeAvgAggregateOutputType | null
    _sum: InvitationPlaceTimeSumAggregateOutputType | null
    _min: InvitationPlaceTimeMinAggregateOutputType | null
    _max: InvitationPlaceTimeMaxAggregateOutputType | null
  }

  export type InvitationPlaceTimeAvgAggregateOutputType = {
    id: number | null
    invitationPlaceId: number | null
  }

  export type InvitationPlaceTimeSumAggregateOutputType = {
    id: number | null
    invitationPlaceId: number | null
  }

  export type InvitationPlaceTimeMinAggregateOutputType = {
    id: number | null
    invitationPlaceId: number | null
    time: Date | null
    name: string | null
    description: string | null
  }

  export type InvitationPlaceTimeMaxAggregateOutputType = {
    id: number | null
    invitationPlaceId: number | null
    time: Date | null
    name: string | null
    description: string | null
  }

  export type InvitationPlaceTimeCountAggregateOutputType = {
    id: number
    invitationPlaceId: number
    time: number
    name: number
    description: number
    _all: number
  }


  export type InvitationPlaceTimeAvgAggregateInputType = {
    id?: true
    invitationPlaceId?: true
  }

  export type InvitationPlaceTimeSumAggregateInputType = {
    id?: true
    invitationPlaceId?: true
  }

  export type InvitationPlaceTimeMinAggregateInputType = {
    id?: true
    invitationPlaceId?: true
    time?: true
    name?: true
    description?: true
  }

  export type InvitationPlaceTimeMaxAggregateInputType = {
    id?: true
    invitationPlaceId?: true
    time?: true
    name?: true
    description?: true
  }

  export type InvitationPlaceTimeCountAggregateInputType = {
    id?: true
    invitationPlaceId?: true
    time?: true
    name?: true
    description?: true
    _all?: true
  }

  export type InvitationPlaceTimeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPlaceTime to aggregate.
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaceTimes to fetch.
     */
    orderBy?: InvitationPlaceTimeOrderByWithRelationInput | InvitationPlaceTimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationPlaceTimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaceTimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaceTimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationPlaceTimes
    **/
    _count?: true | InvitationPlaceTimeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationPlaceTimeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationPlaceTimeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationPlaceTimeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationPlaceTimeMaxAggregateInputType
  }

  export type GetInvitationPlaceTimeAggregateType<T extends InvitationPlaceTimeAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationPlaceTime]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationPlaceTime[P]>
      : GetScalarType<T[P], AggregateInvitationPlaceTime[P]>
  }




  export type InvitationPlaceTimeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPlaceTimeWhereInput
    orderBy?: InvitationPlaceTimeOrderByWithAggregationInput | InvitationPlaceTimeOrderByWithAggregationInput[]
    by: InvitationPlaceTimeScalarFieldEnum[] | InvitationPlaceTimeScalarFieldEnum
    having?: InvitationPlaceTimeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationPlaceTimeCountAggregateInputType | true
    _avg?: InvitationPlaceTimeAvgAggregateInputType
    _sum?: InvitationPlaceTimeSumAggregateInputType
    _min?: InvitationPlaceTimeMinAggregateInputType
    _max?: InvitationPlaceTimeMaxAggregateInputType
  }

  export type InvitationPlaceTimeGroupByOutputType = {
    id: number
    invitationPlaceId: number | null
    time: Date | null
    name: string | null
    description: string | null
    _count: InvitationPlaceTimeCountAggregateOutputType | null
    _avg: InvitationPlaceTimeAvgAggregateOutputType | null
    _sum: InvitationPlaceTimeSumAggregateOutputType | null
    _min: InvitationPlaceTimeMinAggregateOutputType | null
    _max: InvitationPlaceTimeMaxAggregateOutputType | null
  }

  type GetInvitationPlaceTimeGroupByPayload<T extends InvitationPlaceTimeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationPlaceTimeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationPlaceTimeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationPlaceTimeGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationPlaceTimeGroupByOutputType[P]>
        }
      >
    >


  export type InvitationPlaceTimeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationPlaceId?: boolean
    time?: boolean
    name?: boolean
    description?: boolean
    invitationPlace?: boolean | InvitationPlaceTime$invitationPlaceArgs<ExtArgs>
  }, ExtArgs["result"]["invitationPlaceTime"]>



  export type InvitationPlaceTimeSelectScalar = {
    id?: boolean
    invitationPlaceId?: boolean
    time?: boolean
    name?: boolean
    description?: boolean
  }

  export type InvitationPlaceTimeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationPlaceId" | "time" | "name" | "description", ExtArgs["result"]["invitationPlaceTime"]>
  export type InvitationPlaceTimeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitationPlace?: boolean | InvitationPlaceTime$invitationPlaceArgs<ExtArgs>
  }

  export type $InvitationPlaceTimePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationPlaceTime"
    objects: {
      invitationPlace: Prisma.$InvitationPlacePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationPlaceId: number | null
      time: Date | null
      name: string | null
      description: string | null
    }, ExtArgs["result"]["invitationPlaceTime"]>
    composites: {}
  }

  type InvitationPlaceTimeGetPayload<S extends boolean | null | undefined | InvitationPlaceTimeDefaultArgs> = $Result.GetResult<Prisma.$InvitationPlaceTimePayload, S>

  type InvitationPlaceTimeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationPlaceTimeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationPlaceTimeCountAggregateInputType | true
    }

  export interface InvitationPlaceTimeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationPlaceTime'], meta: { name: 'InvitationPlaceTime' } }
    /**
     * Find zero or one InvitationPlaceTime that matches the filter.
     * @param {InvitationPlaceTimeFindUniqueArgs} args - Arguments to find a InvitationPlaceTime
     * @example
     * // Get one InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationPlaceTimeFindUniqueArgs>(args: SelectSubset<T, InvitationPlaceTimeFindUniqueArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationPlaceTime that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationPlaceTimeFindUniqueOrThrowArgs} args - Arguments to find a InvitationPlaceTime
     * @example
     * // Get one InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationPlaceTimeFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationPlaceTimeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPlaceTime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeFindFirstArgs} args - Arguments to find a InvitationPlaceTime
     * @example
     * // Get one InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationPlaceTimeFindFirstArgs>(args?: SelectSubset<T, InvitationPlaceTimeFindFirstArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPlaceTime that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeFindFirstOrThrowArgs} args - Arguments to find a InvitationPlaceTime
     * @example
     * // Get one InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationPlaceTimeFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationPlaceTimeFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationPlaceTimes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationPlaceTimes
     * const invitationPlaceTimes = await prisma.invitationPlaceTime.findMany()
     * 
     * // Get first 10 InvitationPlaceTimes
     * const invitationPlaceTimes = await prisma.invitationPlaceTime.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationPlaceTimeWithIdOnly = await prisma.invitationPlaceTime.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationPlaceTimeFindManyArgs>(args?: SelectSubset<T, InvitationPlaceTimeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationPlaceTime.
     * @param {InvitationPlaceTimeCreateArgs} args - Arguments to create a InvitationPlaceTime.
     * @example
     * // Create one InvitationPlaceTime
     * const InvitationPlaceTime = await prisma.invitationPlaceTime.create({
     *   data: {
     *     // ... data to create a InvitationPlaceTime
     *   }
     * })
     * 
     */
    create<T extends InvitationPlaceTimeCreateArgs>(args: SelectSubset<T, InvitationPlaceTimeCreateArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationPlaceTimes.
     * @param {InvitationPlaceTimeCreateManyArgs} args - Arguments to create many InvitationPlaceTimes.
     * @example
     * // Create many InvitationPlaceTimes
     * const invitationPlaceTime = await prisma.invitationPlaceTime.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationPlaceTimeCreateManyArgs>(args?: SelectSubset<T, InvitationPlaceTimeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationPlaceTime.
     * @param {InvitationPlaceTimeDeleteArgs} args - Arguments to delete one InvitationPlaceTime.
     * @example
     * // Delete one InvitationPlaceTime
     * const InvitationPlaceTime = await prisma.invitationPlaceTime.delete({
     *   where: {
     *     // ... filter to delete one InvitationPlaceTime
     *   }
     * })
     * 
     */
    delete<T extends InvitationPlaceTimeDeleteArgs>(args: SelectSubset<T, InvitationPlaceTimeDeleteArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationPlaceTime.
     * @param {InvitationPlaceTimeUpdateArgs} args - Arguments to update one InvitationPlaceTime.
     * @example
     * // Update one InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationPlaceTimeUpdateArgs>(args: SelectSubset<T, InvitationPlaceTimeUpdateArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationPlaceTimes.
     * @param {InvitationPlaceTimeDeleteManyArgs} args - Arguments to filter InvitationPlaceTimes to delete.
     * @example
     * // Delete a few InvitationPlaceTimes
     * const { count } = await prisma.invitationPlaceTime.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationPlaceTimeDeleteManyArgs>(args?: SelectSubset<T, InvitationPlaceTimeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationPlaceTimes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationPlaceTimes
     * const invitationPlaceTime = await prisma.invitationPlaceTime.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationPlaceTimeUpdateManyArgs>(args: SelectSubset<T, InvitationPlaceTimeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationPlaceTime.
     * @param {InvitationPlaceTimeUpsertArgs} args - Arguments to update or create a InvitationPlaceTime.
     * @example
     * // Update or create a InvitationPlaceTime
     * const invitationPlaceTime = await prisma.invitationPlaceTime.upsert({
     *   create: {
     *     // ... data to create a InvitationPlaceTime
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationPlaceTime we want to update
     *   }
     * })
     */
    upsert<T extends InvitationPlaceTimeUpsertArgs>(args: SelectSubset<T, InvitationPlaceTimeUpsertArgs<ExtArgs>>): Prisma__InvitationPlaceTimeClient<$Result.GetResult<Prisma.$InvitationPlaceTimePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationPlaceTimes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeCountArgs} args - Arguments to filter InvitationPlaceTimes to count.
     * @example
     * // Count the number of InvitationPlaceTimes
     * const count = await prisma.invitationPlaceTime.count({
     *   where: {
     *     // ... the filter for the InvitationPlaceTimes we want to count
     *   }
     * })
    **/
    count<T extends InvitationPlaceTimeCountArgs>(
      args?: Subset<T, InvitationPlaceTimeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationPlaceTimeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationPlaceTime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationPlaceTimeAggregateArgs>(args: Subset<T, InvitationPlaceTimeAggregateArgs>): Prisma.PrismaPromise<GetInvitationPlaceTimeAggregateType<T>>

    /**
     * Group by InvitationPlaceTime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPlaceTimeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationPlaceTimeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationPlaceTimeGroupByArgs['orderBy'] }
        : { orderBy?: InvitationPlaceTimeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationPlaceTimeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationPlaceTimeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationPlaceTime model
   */
  readonly fields: InvitationPlaceTimeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationPlaceTime.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationPlaceTimeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitationPlace<T extends InvitationPlaceTime$invitationPlaceArgs<ExtArgs> = {}>(args?: Subset<T, InvitationPlaceTime$invitationPlaceArgs<ExtArgs>>): Prisma__InvitationPlaceClient<$Result.GetResult<Prisma.$InvitationPlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationPlaceTime model
   */
  interface InvitationPlaceTimeFieldRefs {
    readonly id: FieldRef<"InvitationPlaceTime", 'Int'>
    readonly invitationPlaceId: FieldRef<"InvitationPlaceTime", 'Int'>
    readonly time: FieldRef<"InvitationPlaceTime", 'DateTime'>
    readonly name: FieldRef<"InvitationPlaceTime", 'String'>
    readonly description: FieldRef<"InvitationPlaceTime", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InvitationPlaceTime findUnique
   */
  export type InvitationPlaceTimeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaceTime to fetch.
     */
    where: InvitationPlaceTimeWhereUniqueInput
  }

  /**
   * InvitationPlaceTime findUniqueOrThrow
   */
  export type InvitationPlaceTimeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaceTime to fetch.
     */
    where: InvitationPlaceTimeWhereUniqueInput
  }

  /**
   * InvitationPlaceTime findFirst
   */
  export type InvitationPlaceTimeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaceTime to fetch.
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaceTimes to fetch.
     */
    orderBy?: InvitationPlaceTimeOrderByWithRelationInput | InvitationPlaceTimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPlaceTimes.
     */
    cursor?: InvitationPlaceTimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaceTimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaceTimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPlaceTimes.
     */
    distinct?: InvitationPlaceTimeScalarFieldEnum | InvitationPlaceTimeScalarFieldEnum[]
  }

  /**
   * InvitationPlaceTime findFirstOrThrow
   */
  export type InvitationPlaceTimeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaceTime to fetch.
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaceTimes to fetch.
     */
    orderBy?: InvitationPlaceTimeOrderByWithRelationInput | InvitationPlaceTimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPlaceTimes.
     */
    cursor?: InvitationPlaceTimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaceTimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaceTimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPlaceTimes.
     */
    distinct?: InvitationPlaceTimeScalarFieldEnum | InvitationPlaceTimeScalarFieldEnum[]
  }

  /**
   * InvitationPlaceTime findMany
   */
  export type InvitationPlaceTimeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPlaceTimes to fetch.
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPlaceTimes to fetch.
     */
    orderBy?: InvitationPlaceTimeOrderByWithRelationInput | InvitationPlaceTimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationPlaceTimes.
     */
    cursor?: InvitationPlaceTimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPlaceTimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPlaceTimes.
     */
    skip?: number
    distinct?: InvitationPlaceTimeScalarFieldEnum | InvitationPlaceTimeScalarFieldEnum[]
  }

  /**
   * InvitationPlaceTime create
   */
  export type InvitationPlaceTimeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationPlaceTime.
     */
    data?: XOR<InvitationPlaceTimeCreateInput, InvitationPlaceTimeUncheckedCreateInput>
  }

  /**
   * InvitationPlaceTime createMany
   */
  export type InvitationPlaceTimeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationPlaceTimes.
     */
    data: InvitationPlaceTimeCreateManyInput | InvitationPlaceTimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationPlaceTime update
   */
  export type InvitationPlaceTimeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationPlaceTime.
     */
    data: XOR<InvitationPlaceTimeUpdateInput, InvitationPlaceTimeUncheckedUpdateInput>
    /**
     * Choose, which InvitationPlaceTime to update.
     */
    where: InvitationPlaceTimeWhereUniqueInput
  }

  /**
   * InvitationPlaceTime updateMany
   */
  export type InvitationPlaceTimeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationPlaceTimes.
     */
    data: XOR<InvitationPlaceTimeUpdateManyMutationInput, InvitationPlaceTimeUncheckedUpdateManyInput>
    /**
     * Filter which InvitationPlaceTimes to update
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * Limit how many InvitationPlaceTimes to update.
     */
    limit?: number
  }

  /**
   * InvitationPlaceTime upsert
   */
  export type InvitationPlaceTimeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationPlaceTime to update in case it exists.
     */
    where: InvitationPlaceTimeWhereUniqueInput
    /**
     * In case the InvitationPlaceTime found by the `where` argument doesn't exist, create a new InvitationPlaceTime with this data.
     */
    create: XOR<InvitationPlaceTimeCreateInput, InvitationPlaceTimeUncheckedCreateInput>
    /**
     * In case the InvitationPlaceTime was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationPlaceTimeUpdateInput, InvitationPlaceTimeUncheckedUpdateInput>
  }

  /**
   * InvitationPlaceTime delete
   */
  export type InvitationPlaceTimeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
    /**
     * Filter which InvitationPlaceTime to delete.
     */
    where: InvitationPlaceTimeWhereUniqueInput
  }

  /**
   * InvitationPlaceTime deleteMany
   */
  export type InvitationPlaceTimeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPlaceTimes to delete
     */
    where?: InvitationPlaceTimeWhereInput
    /**
     * Limit how many InvitationPlaceTimes to delete.
     */
    limit?: number
  }

  /**
   * InvitationPlaceTime.invitationPlace
   */
  export type InvitationPlaceTime$invitationPlaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlace
     */
    select?: InvitationPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlace
     */
    omit?: InvitationPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceInclude<ExtArgs> | null
    where?: InvitationPlaceWhereInput
  }

  /**
   * InvitationPlaceTime without action
   */
  export type InvitationPlaceTimeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPlaceTime
     */
    select?: InvitationPlaceTimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPlaceTime
     */
    omit?: InvitationPlaceTimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPlaceTimeInclude<ExtArgs> | null
  }


  /**
   * Model InvitationPhoto
   */

  export type AggregateInvitationPhoto = {
    _count: InvitationPhotoCountAggregateOutputType | null
    _avg: InvitationPhotoAvgAggregateOutputType | null
    _sum: InvitationPhotoSumAggregateOutputType | null
    _min: InvitationPhotoMinAggregateOutputType | null
    _max: InvitationPhotoMaxAggregateOutputType | null
  }

  export type InvitationPhotoAvgAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    order: number | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    thumbX: number | null
    thumbY: number | null
    thumbZoom: number | null
  }

  export type InvitationPhotoSumAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    order: number | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    thumbX: number | null
    thumbY: number | null
    thumbZoom: number | null
  }

  export type InvitationPhotoMinAggregateOutputType = {
    id: number | null
    invitationId: string | null
    width: number | null
    height: number | null
    order: number | null
    originalKey: string | null
    croppedKey: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    thumbKey: string | null
    thumbX: number | null
    thumbY: number | null
    thumbZoom: number | null
  }

  export type InvitationPhotoMaxAggregateOutputType = {
    id: number | null
    invitationId: string | null
    width: number | null
    height: number | null
    order: number | null
    originalKey: string | null
    croppedKey: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    thumbKey: string | null
    thumbX: number | null
    thumbY: number | null
    thumbZoom: number | null
  }

  export type InvitationPhotoCountAggregateOutputType = {
    id: number
    invitationId: number
    width: number
    height: number
    order: number
    originalKey: number
    croppedKey: number
    cropX: number
    cropY: number
    cropZoom: number
    thumbKey: number
    thumbX: number
    thumbY: number
    thumbZoom: number
    _all: number
  }


  export type InvitationPhotoAvgAggregateInputType = {
    id?: true
    width?: true
    height?: true
    order?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    thumbX?: true
    thumbY?: true
    thumbZoom?: true
  }

  export type InvitationPhotoSumAggregateInputType = {
    id?: true
    width?: true
    height?: true
    order?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    thumbX?: true
    thumbY?: true
    thumbZoom?: true
  }

  export type InvitationPhotoMinAggregateInputType = {
    id?: true
    invitationId?: true
    width?: true
    height?: true
    order?: true
    originalKey?: true
    croppedKey?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    thumbKey?: true
    thumbX?: true
    thumbY?: true
    thumbZoom?: true
  }

  export type InvitationPhotoMaxAggregateInputType = {
    id?: true
    invitationId?: true
    width?: true
    height?: true
    order?: true
    originalKey?: true
    croppedKey?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    thumbKey?: true
    thumbX?: true
    thumbY?: true
    thumbZoom?: true
  }

  export type InvitationPhotoCountAggregateInputType = {
    id?: true
    invitationId?: true
    width?: true
    height?: true
    order?: true
    originalKey?: true
    croppedKey?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    thumbKey?: true
    thumbX?: true
    thumbY?: true
    thumbZoom?: true
    _all?: true
  }

  export type InvitationPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPhoto to aggregate.
     */
    where?: InvitationPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPhotos to fetch.
     */
    orderBy?: InvitationPhotoOrderByWithRelationInput | InvitationPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationPhotos
    **/
    _count?: true | InvitationPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationPhotoMaxAggregateInputType
  }

  export type GetInvitationPhotoAggregateType<T extends InvitationPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationPhoto[P]>
      : GetScalarType<T[P], AggregateInvitationPhoto[P]>
  }




  export type InvitationPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationPhotoWhereInput
    orderBy?: InvitationPhotoOrderByWithAggregationInput | InvitationPhotoOrderByWithAggregationInput[]
    by: InvitationPhotoScalarFieldEnum[] | InvitationPhotoScalarFieldEnum
    having?: InvitationPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationPhotoCountAggregateInputType | true
    _avg?: InvitationPhotoAvgAggregateInputType
    _sum?: InvitationPhotoSumAggregateInputType
    _min?: InvitationPhotoMinAggregateInputType
    _max?: InvitationPhotoMaxAggregateInputType
  }

  export type InvitationPhotoGroupByOutputType = {
    id: number
    invitationId: string | null
    width: number | null
    height: number | null
    order: number | null
    originalKey: string | null
    croppedKey: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    thumbKey: string | null
    thumbX: number | null
    thumbY: number | null
    thumbZoom: number | null
    _count: InvitationPhotoCountAggregateOutputType | null
    _avg: InvitationPhotoAvgAggregateOutputType | null
    _sum: InvitationPhotoSumAggregateOutputType | null
    _min: InvitationPhotoMinAggregateOutputType | null
    _max: InvitationPhotoMaxAggregateOutputType | null
  }

  type GetInvitationPhotoGroupByPayload<T extends InvitationPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationPhotoGroupByOutputType[P]>
        }
      >
    >


  export type InvitationPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    width?: boolean
    height?: boolean
    order?: boolean
    originalKey?: boolean
    croppedKey?: boolean
    cropX?: boolean
    cropY?: boolean
    cropZoom?: boolean
    thumbKey?: boolean
    thumbX?: boolean
    thumbY?: boolean
    thumbZoom?: boolean
    Invitation?: boolean | InvitationPhoto$InvitationArgs<ExtArgs>
  }, ExtArgs["result"]["invitationPhoto"]>



  export type InvitationPhotoSelectScalar = {
    id?: boolean
    invitationId?: boolean
    width?: boolean
    height?: boolean
    order?: boolean
    originalKey?: boolean
    croppedKey?: boolean
    cropX?: boolean
    cropY?: boolean
    cropZoom?: boolean
    thumbKey?: boolean
    thumbX?: boolean
    thumbY?: boolean
    thumbZoom?: boolean
  }

  export type InvitationPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "width" | "height" | "order" | "originalKey" | "croppedKey" | "cropX" | "cropY" | "cropZoom" | "thumbKey" | "thumbX" | "thumbY" | "thumbZoom", ExtArgs["result"]["invitationPhoto"]>
  export type InvitationPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Invitation?: boolean | InvitationPhoto$InvitationArgs<ExtArgs>
  }

  export type $InvitationPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationPhoto"
    objects: {
      Invitation: Prisma.$InvitationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: string | null
      width: number | null
      height: number | null
      order: number | null
      originalKey: string | null
      croppedKey: string | null
      cropX: number | null
      cropY: number | null
      cropZoom: number | null
      thumbKey: string | null
      thumbX: number | null
      thumbY: number | null
      thumbZoom: number | null
    }, ExtArgs["result"]["invitationPhoto"]>
    composites: {}
  }

  type InvitationPhotoGetPayload<S extends boolean | null | undefined | InvitationPhotoDefaultArgs> = $Result.GetResult<Prisma.$InvitationPhotoPayload, S>

  type InvitationPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationPhotoCountAggregateInputType | true
    }

  export interface InvitationPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationPhoto'], meta: { name: 'InvitationPhoto' } }
    /**
     * Find zero or one InvitationPhoto that matches the filter.
     * @param {InvitationPhotoFindUniqueArgs} args - Arguments to find a InvitationPhoto
     * @example
     * // Get one InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationPhotoFindUniqueArgs>(args: SelectSubset<T, InvitationPhotoFindUniqueArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationPhotoFindUniqueOrThrowArgs} args - Arguments to find a InvitationPhoto
     * @example
     * // Get one InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoFindFirstArgs} args - Arguments to find a InvitationPhoto
     * @example
     * // Get one InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationPhotoFindFirstArgs>(args?: SelectSubset<T, InvitationPhotoFindFirstArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoFindFirstOrThrowArgs} args - Arguments to find a InvitationPhoto
     * @example
     * // Get one InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationPhotos
     * const invitationPhotos = await prisma.invitationPhoto.findMany()
     * 
     * // Get first 10 InvitationPhotos
     * const invitationPhotos = await prisma.invitationPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationPhotoWithIdOnly = await prisma.invitationPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationPhotoFindManyArgs>(args?: SelectSubset<T, InvitationPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationPhoto.
     * @param {InvitationPhotoCreateArgs} args - Arguments to create a InvitationPhoto.
     * @example
     * // Create one InvitationPhoto
     * const InvitationPhoto = await prisma.invitationPhoto.create({
     *   data: {
     *     // ... data to create a InvitationPhoto
     *   }
     * })
     * 
     */
    create<T extends InvitationPhotoCreateArgs>(args: SelectSubset<T, InvitationPhotoCreateArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationPhotos.
     * @param {InvitationPhotoCreateManyArgs} args - Arguments to create many InvitationPhotos.
     * @example
     * // Create many InvitationPhotos
     * const invitationPhoto = await prisma.invitationPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationPhotoCreateManyArgs>(args?: SelectSubset<T, InvitationPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationPhoto.
     * @param {InvitationPhotoDeleteArgs} args - Arguments to delete one InvitationPhoto.
     * @example
     * // Delete one InvitationPhoto
     * const InvitationPhoto = await prisma.invitationPhoto.delete({
     *   where: {
     *     // ... filter to delete one InvitationPhoto
     *   }
     * })
     * 
     */
    delete<T extends InvitationPhotoDeleteArgs>(args: SelectSubset<T, InvitationPhotoDeleteArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationPhoto.
     * @param {InvitationPhotoUpdateArgs} args - Arguments to update one InvitationPhoto.
     * @example
     * // Update one InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationPhotoUpdateArgs>(args: SelectSubset<T, InvitationPhotoUpdateArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationPhotos.
     * @param {InvitationPhotoDeleteManyArgs} args - Arguments to filter InvitationPhotos to delete.
     * @example
     * // Delete a few InvitationPhotos
     * const { count } = await prisma.invitationPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationPhotoDeleteManyArgs>(args?: SelectSubset<T, InvitationPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationPhotos
     * const invitationPhoto = await prisma.invitationPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationPhotoUpdateManyArgs>(args: SelectSubset<T, InvitationPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationPhoto.
     * @param {InvitationPhotoUpsertArgs} args - Arguments to update or create a InvitationPhoto.
     * @example
     * // Update or create a InvitationPhoto
     * const invitationPhoto = await prisma.invitationPhoto.upsert({
     *   create: {
     *     // ... data to create a InvitationPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationPhoto we want to update
     *   }
     * })
     */
    upsert<T extends InvitationPhotoUpsertArgs>(args: SelectSubset<T, InvitationPhotoUpsertArgs<ExtArgs>>): Prisma__InvitationPhotoClient<$Result.GetResult<Prisma.$InvitationPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoCountArgs} args - Arguments to filter InvitationPhotos to count.
     * @example
     * // Count the number of InvitationPhotos
     * const count = await prisma.invitationPhoto.count({
     *   where: {
     *     // ... the filter for the InvitationPhotos we want to count
     *   }
     * })
    **/
    count<T extends InvitationPhotoCountArgs>(
      args?: Subset<T, InvitationPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationPhotoAggregateArgs>(args: Subset<T, InvitationPhotoAggregateArgs>): Prisma.PrismaPromise<GetInvitationPhotoAggregateType<T>>

    /**
     * Group by InvitationPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationPhotoGroupByArgs['orderBy'] }
        : { orderBy?: InvitationPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationPhoto model
   */
  readonly fields: InvitationPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Invitation<T extends InvitationPhoto$InvitationArgs<ExtArgs> = {}>(args?: Subset<T, InvitationPhoto$InvitationArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationPhoto model
   */
  interface InvitationPhotoFieldRefs {
    readonly id: FieldRef<"InvitationPhoto", 'Int'>
    readonly invitationId: FieldRef<"InvitationPhoto", 'String'>
    readonly width: FieldRef<"InvitationPhoto", 'Int'>
    readonly height: FieldRef<"InvitationPhoto", 'Int'>
    readonly order: FieldRef<"InvitationPhoto", 'Int'>
    readonly originalKey: FieldRef<"InvitationPhoto", 'String'>
    readonly croppedKey: FieldRef<"InvitationPhoto", 'String'>
    readonly cropX: FieldRef<"InvitationPhoto", 'Int'>
    readonly cropY: FieldRef<"InvitationPhoto", 'Int'>
    readonly cropZoom: FieldRef<"InvitationPhoto", 'Float'>
    readonly thumbKey: FieldRef<"InvitationPhoto", 'String'>
    readonly thumbX: FieldRef<"InvitationPhoto", 'Int'>
    readonly thumbY: FieldRef<"InvitationPhoto", 'Int'>
    readonly thumbZoom: FieldRef<"InvitationPhoto", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * InvitationPhoto findUnique
   */
  export type InvitationPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPhoto to fetch.
     */
    where: InvitationPhotoWhereUniqueInput
  }

  /**
   * InvitationPhoto findUniqueOrThrow
   */
  export type InvitationPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPhoto to fetch.
     */
    where: InvitationPhotoWhereUniqueInput
  }

  /**
   * InvitationPhoto findFirst
   */
  export type InvitationPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPhoto to fetch.
     */
    where?: InvitationPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPhotos to fetch.
     */
    orderBy?: InvitationPhotoOrderByWithRelationInput | InvitationPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPhotos.
     */
    cursor?: InvitationPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPhotos.
     */
    distinct?: InvitationPhotoScalarFieldEnum | InvitationPhotoScalarFieldEnum[]
  }

  /**
   * InvitationPhoto findFirstOrThrow
   */
  export type InvitationPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPhoto to fetch.
     */
    where?: InvitationPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPhotos to fetch.
     */
    orderBy?: InvitationPhotoOrderByWithRelationInput | InvitationPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationPhotos.
     */
    cursor?: InvitationPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationPhotos.
     */
    distinct?: InvitationPhotoScalarFieldEnum | InvitationPhotoScalarFieldEnum[]
  }

  /**
   * InvitationPhoto findMany
   */
  export type InvitationPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationPhotos to fetch.
     */
    where?: InvitationPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationPhotos to fetch.
     */
    orderBy?: InvitationPhotoOrderByWithRelationInput | InvitationPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationPhotos.
     */
    cursor?: InvitationPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationPhotos.
     */
    skip?: number
    distinct?: InvitationPhotoScalarFieldEnum | InvitationPhotoScalarFieldEnum[]
  }

  /**
   * InvitationPhoto create
   */
  export type InvitationPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationPhoto.
     */
    data?: XOR<InvitationPhotoCreateInput, InvitationPhotoUncheckedCreateInput>
  }

  /**
   * InvitationPhoto createMany
   */
  export type InvitationPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationPhotos.
     */
    data: InvitationPhotoCreateManyInput | InvitationPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationPhoto update
   */
  export type InvitationPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationPhoto.
     */
    data: XOR<InvitationPhotoUpdateInput, InvitationPhotoUncheckedUpdateInput>
    /**
     * Choose, which InvitationPhoto to update.
     */
    where: InvitationPhotoWhereUniqueInput
  }

  /**
   * InvitationPhoto updateMany
   */
  export type InvitationPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationPhotos.
     */
    data: XOR<InvitationPhotoUpdateManyMutationInput, InvitationPhotoUncheckedUpdateManyInput>
    /**
     * Filter which InvitationPhotos to update
     */
    where?: InvitationPhotoWhereInput
    /**
     * Limit how many InvitationPhotos to update.
     */
    limit?: number
  }

  /**
   * InvitationPhoto upsert
   */
  export type InvitationPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationPhoto to update in case it exists.
     */
    where: InvitationPhotoWhereUniqueInput
    /**
     * In case the InvitationPhoto found by the `where` argument doesn't exist, create a new InvitationPhoto with this data.
     */
    create: XOR<InvitationPhotoCreateInput, InvitationPhotoUncheckedCreateInput>
    /**
     * In case the InvitationPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationPhotoUpdateInput, InvitationPhotoUncheckedUpdateInput>
  }

  /**
   * InvitationPhoto delete
   */
  export type InvitationPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
    /**
     * Filter which InvitationPhoto to delete.
     */
    where: InvitationPhotoWhereUniqueInput
  }

  /**
   * InvitationPhoto deleteMany
   */
  export type InvitationPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationPhotos to delete
     */
    where?: InvitationPhotoWhereInput
    /**
     * Limit how many InvitationPhotos to delete.
     */
    limit?: number
  }

  /**
   * InvitationPhoto.Invitation
   */
  export type InvitationPhoto$InvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }

  /**
   * InvitationPhoto without action
   */
  export type InvitationPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationPhoto
     */
    select?: InvitationPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationPhoto
     */
    omit?: InvitationPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationPhotoInclude<ExtArgs> | null
  }


  /**
   * Model InvitationCoverPhoto
   */

  export type AggregateInvitationCoverPhoto = {
    _count: InvitationCoverPhotoCountAggregateOutputType | null
    _avg: InvitationCoverPhotoAvgAggregateOutputType | null
    _sum: InvitationCoverPhotoSumAggregateOutputType | null
    _min: InvitationCoverPhotoMinAggregateOutputType | null
    _max: InvitationCoverPhotoMaxAggregateOutputType | null
  }

  export type InvitationCoverPhotoAvgAggregateOutputType = {
    id: number | null
    invitationId: number | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    width: number | null
    height: number | null
  }

  export type InvitationCoverPhotoSumAggregateOutputType = {
    id: number | null
    invitationId: number | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    width: number | null
    height: number | null
  }

  export type InvitationCoverPhotoMinAggregateOutputType = {
    id: number | null
    invitationId: number | null
    originalKey: string | null
    croppedKey: string | null
    type: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    width: number | null
    height: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationCoverPhotoMaxAggregateOutputType = {
    id: number | null
    invitationId: number | null
    originalKey: string | null
    croppedKey: string | null
    type: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    width: number | null
    height: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvitationCoverPhotoCountAggregateOutputType = {
    id: number
    invitationId: number
    originalKey: number
    croppedKey: number
    type: number
    cropX: number
    cropY: number
    cropZoom: number
    width: number
    height: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvitationCoverPhotoAvgAggregateInputType = {
    id?: true
    invitationId?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    width?: true
    height?: true
  }

  export type InvitationCoverPhotoSumAggregateInputType = {
    id?: true
    invitationId?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    width?: true
    height?: true
  }

  export type InvitationCoverPhotoMinAggregateInputType = {
    id?: true
    invitationId?: true
    originalKey?: true
    croppedKey?: true
    type?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    width?: true
    height?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationCoverPhotoMaxAggregateInputType = {
    id?: true
    invitationId?: true
    originalKey?: true
    croppedKey?: true
    type?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    width?: true
    height?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvitationCoverPhotoCountAggregateInputType = {
    id?: true
    invitationId?: true
    originalKey?: true
    croppedKey?: true
    type?: true
    cropX?: true
    cropY?: true
    cropZoom?: true
    width?: true
    height?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvitationCoverPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationCoverPhoto to aggregate.
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationCoverPhotos to fetch.
     */
    orderBy?: InvitationCoverPhotoOrderByWithRelationInput | InvitationCoverPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationCoverPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationCoverPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationCoverPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationCoverPhotos
    **/
    _count?: true | InvitationCoverPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationCoverPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationCoverPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationCoverPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationCoverPhotoMaxAggregateInputType
  }

  export type GetInvitationCoverPhotoAggregateType<T extends InvitationCoverPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationCoverPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationCoverPhoto[P]>
      : GetScalarType<T[P], AggregateInvitationCoverPhoto[P]>
  }




  export type InvitationCoverPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationCoverPhotoWhereInput
    orderBy?: InvitationCoverPhotoOrderByWithAggregationInput | InvitationCoverPhotoOrderByWithAggregationInput[]
    by: InvitationCoverPhotoScalarFieldEnum[] | InvitationCoverPhotoScalarFieldEnum
    having?: InvitationCoverPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCoverPhotoCountAggregateInputType | true
    _avg?: InvitationCoverPhotoAvgAggregateInputType
    _sum?: InvitationCoverPhotoSumAggregateInputType
    _min?: InvitationCoverPhotoMinAggregateInputType
    _max?: InvitationCoverPhotoMaxAggregateInputType
  }

  export type InvitationCoverPhotoGroupByOutputType = {
    id: number
    invitationId: number | null
    originalKey: string | null
    croppedKey: string | null
    type: string | null
    cropX: number | null
    cropY: number | null
    cropZoom: number | null
    width: number | null
    height: number | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: InvitationCoverPhotoCountAggregateOutputType | null
    _avg: InvitationCoverPhotoAvgAggregateOutputType | null
    _sum: InvitationCoverPhotoSumAggregateOutputType | null
    _min: InvitationCoverPhotoMinAggregateOutputType | null
    _max: InvitationCoverPhotoMaxAggregateOutputType | null
  }

  type GetInvitationCoverPhotoGroupByPayload<T extends InvitationCoverPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationCoverPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationCoverPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationCoverPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationCoverPhotoGroupByOutputType[P]>
        }
      >
    >


  export type InvitationCoverPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    originalKey?: boolean
    croppedKey?: boolean
    type?: boolean
    cropX?: boolean
    cropY?: boolean
    cropZoom?: boolean
    width?: boolean
    height?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invitation?: boolean | InvitationCoverPhoto$invitationArgs<ExtArgs>
  }, ExtArgs["result"]["invitationCoverPhoto"]>



  export type InvitationCoverPhotoSelectScalar = {
    id?: boolean
    invitationId?: boolean
    originalKey?: boolean
    croppedKey?: boolean
    type?: boolean
    cropX?: boolean
    cropY?: boolean
    cropZoom?: boolean
    width?: boolean
    height?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvitationCoverPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "originalKey" | "croppedKey" | "type" | "cropX" | "cropY" | "cropZoom" | "width" | "height" | "createdAt" | "updatedAt", ExtArgs["result"]["invitationCoverPhoto"]>
  export type InvitationCoverPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitation?: boolean | InvitationCoverPhoto$invitationArgs<ExtArgs>
  }

  export type $InvitationCoverPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationCoverPhoto"
    objects: {
      invitation: Prisma.$InvitationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: number | null
      originalKey: string | null
      croppedKey: string | null
      type: string | null
      cropX: number | null
      cropY: number | null
      cropZoom: number | null
      width: number | null
      height: number | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["invitationCoverPhoto"]>
    composites: {}
  }

  type InvitationCoverPhotoGetPayload<S extends boolean | null | undefined | InvitationCoverPhotoDefaultArgs> = $Result.GetResult<Prisma.$InvitationCoverPhotoPayload, S>

  type InvitationCoverPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationCoverPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCoverPhotoCountAggregateInputType | true
    }

  export interface InvitationCoverPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationCoverPhoto'], meta: { name: 'InvitationCoverPhoto' } }
    /**
     * Find zero or one InvitationCoverPhoto that matches the filter.
     * @param {InvitationCoverPhotoFindUniqueArgs} args - Arguments to find a InvitationCoverPhoto
     * @example
     * // Get one InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationCoverPhotoFindUniqueArgs>(args: SelectSubset<T, InvitationCoverPhotoFindUniqueArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationCoverPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationCoverPhotoFindUniqueOrThrowArgs} args - Arguments to find a InvitationCoverPhoto
     * @example
     * // Get one InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationCoverPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationCoverPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationCoverPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoFindFirstArgs} args - Arguments to find a InvitationCoverPhoto
     * @example
     * // Get one InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationCoverPhotoFindFirstArgs>(args?: SelectSubset<T, InvitationCoverPhotoFindFirstArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationCoverPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoFindFirstOrThrowArgs} args - Arguments to find a InvitationCoverPhoto
     * @example
     * // Get one InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationCoverPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationCoverPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationCoverPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationCoverPhotos
     * const invitationCoverPhotos = await prisma.invitationCoverPhoto.findMany()
     * 
     * // Get first 10 InvitationCoverPhotos
     * const invitationCoverPhotos = await prisma.invitationCoverPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationCoverPhotoWithIdOnly = await prisma.invitationCoverPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationCoverPhotoFindManyArgs>(args?: SelectSubset<T, InvitationCoverPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationCoverPhoto.
     * @param {InvitationCoverPhotoCreateArgs} args - Arguments to create a InvitationCoverPhoto.
     * @example
     * // Create one InvitationCoverPhoto
     * const InvitationCoverPhoto = await prisma.invitationCoverPhoto.create({
     *   data: {
     *     // ... data to create a InvitationCoverPhoto
     *   }
     * })
     * 
     */
    create<T extends InvitationCoverPhotoCreateArgs>(args: SelectSubset<T, InvitationCoverPhotoCreateArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationCoverPhotos.
     * @param {InvitationCoverPhotoCreateManyArgs} args - Arguments to create many InvitationCoverPhotos.
     * @example
     * // Create many InvitationCoverPhotos
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCoverPhotoCreateManyArgs>(args?: SelectSubset<T, InvitationCoverPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationCoverPhoto.
     * @param {InvitationCoverPhotoDeleteArgs} args - Arguments to delete one InvitationCoverPhoto.
     * @example
     * // Delete one InvitationCoverPhoto
     * const InvitationCoverPhoto = await prisma.invitationCoverPhoto.delete({
     *   where: {
     *     // ... filter to delete one InvitationCoverPhoto
     *   }
     * })
     * 
     */
    delete<T extends InvitationCoverPhotoDeleteArgs>(args: SelectSubset<T, InvitationCoverPhotoDeleteArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationCoverPhoto.
     * @param {InvitationCoverPhotoUpdateArgs} args - Arguments to update one InvitationCoverPhoto.
     * @example
     * // Update one InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationCoverPhotoUpdateArgs>(args: SelectSubset<T, InvitationCoverPhotoUpdateArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationCoverPhotos.
     * @param {InvitationCoverPhotoDeleteManyArgs} args - Arguments to filter InvitationCoverPhotos to delete.
     * @example
     * // Delete a few InvitationCoverPhotos
     * const { count } = await prisma.invitationCoverPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationCoverPhotoDeleteManyArgs>(args?: SelectSubset<T, InvitationCoverPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationCoverPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationCoverPhotos
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationCoverPhotoUpdateManyArgs>(args: SelectSubset<T, InvitationCoverPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationCoverPhoto.
     * @param {InvitationCoverPhotoUpsertArgs} args - Arguments to update or create a InvitationCoverPhoto.
     * @example
     * // Update or create a InvitationCoverPhoto
     * const invitationCoverPhoto = await prisma.invitationCoverPhoto.upsert({
     *   create: {
     *     // ... data to create a InvitationCoverPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationCoverPhoto we want to update
     *   }
     * })
     */
    upsert<T extends InvitationCoverPhotoUpsertArgs>(args: SelectSubset<T, InvitationCoverPhotoUpsertArgs<ExtArgs>>): Prisma__InvitationCoverPhotoClient<$Result.GetResult<Prisma.$InvitationCoverPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationCoverPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoCountArgs} args - Arguments to filter InvitationCoverPhotos to count.
     * @example
     * // Count the number of InvitationCoverPhotos
     * const count = await prisma.invitationCoverPhoto.count({
     *   where: {
     *     // ... the filter for the InvitationCoverPhotos we want to count
     *   }
     * })
    **/
    count<T extends InvitationCoverPhotoCountArgs>(
      args?: Subset<T, InvitationCoverPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCoverPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationCoverPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationCoverPhotoAggregateArgs>(args: Subset<T, InvitationCoverPhotoAggregateArgs>): Prisma.PrismaPromise<GetInvitationCoverPhotoAggregateType<T>>

    /**
     * Group by InvitationCoverPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCoverPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationCoverPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationCoverPhotoGroupByArgs['orderBy'] }
        : { orderBy?: InvitationCoverPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationCoverPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationCoverPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationCoverPhoto model
   */
  readonly fields: InvitationCoverPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationCoverPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationCoverPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitation<T extends InvitationCoverPhoto$invitationArgs<ExtArgs> = {}>(args?: Subset<T, InvitationCoverPhoto$invitationArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationCoverPhoto model
   */
  interface InvitationCoverPhotoFieldRefs {
    readonly id: FieldRef<"InvitationCoverPhoto", 'Int'>
    readonly invitationId: FieldRef<"InvitationCoverPhoto", 'Int'>
    readonly originalKey: FieldRef<"InvitationCoverPhoto", 'String'>
    readonly croppedKey: FieldRef<"InvitationCoverPhoto", 'String'>
    readonly type: FieldRef<"InvitationCoverPhoto", 'String'>
    readonly cropX: FieldRef<"InvitationCoverPhoto", 'Float'>
    readonly cropY: FieldRef<"InvitationCoverPhoto", 'Float'>
    readonly cropZoom: FieldRef<"InvitationCoverPhoto", 'Float'>
    readonly width: FieldRef<"InvitationCoverPhoto", 'Float'>
    readonly height: FieldRef<"InvitationCoverPhoto", 'Float'>
    readonly createdAt: FieldRef<"InvitationCoverPhoto", 'DateTime'>
    readonly updatedAt: FieldRef<"InvitationCoverPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvitationCoverPhoto findUnique
   */
  export type InvitationCoverPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationCoverPhoto to fetch.
     */
    where: InvitationCoverPhotoWhereUniqueInput
  }

  /**
   * InvitationCoverPhoto findUniqueOrThrow
   */
  export type InvitationCoverPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationCoverPhoto to fetch.
     */
    where: InvitationCoverPhotoWhereUniqueInput
  }

  /**
   * InvitationCoverPhoto findFirst
   */
  export type InvitationCoverPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationCoverPhoto to fetch.
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationCoverPhotos to fetch.
     */
    orderBy?: InvitationCoverPhotoOrderByWithRelationInput | InvitationCoverPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationCoverPhotos.
     */
    cursor?: InvitationCoverPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationCoverPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationCoverPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationCoverPhotos.
     */
    distinct?: InvitationCoverPhotoScalarFieldEnum | InvitationCoverPhotoScalarFieldEnum[]
  }

  /**
   * InvitationCoverPhoto findFirstOrThrow
   */
  export type InvitationCoverPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationCoverPhoto to fetch.
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationCoverPhotos to fetch.
     */
    orderBy?: InvitationCoverPhotoOrderByWithRelationInput | InvitationCoverPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationCoverPhotos.
     */
    cursor?: InvitationCoverPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationCoverPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationCoverPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationCoverPhotos.
     */
    distinct?: InvitationCoverPhotoScalarFieldEnum | InvitationCoverPhotoScalarFieldEnum[]
  }

  /**
   * InvitationCoverPhoto findMany
   */
  export type InvitationCoverPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvitationCoverPhotos to fetch.
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationCoverPhotos to fetch.
     */
    orderBy?: InvitationCoverPhotoOrderByWithRelationInput | InvitationCoverPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationCoverPhotos.
     */
    cursor?: InvitationCoverPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationCoverPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationCoverPhotos.
     */
    skip?: number
    distinct?: InvitationCoverPhotoScalarFieldEnum | InvitationCoverPhotoScalarFieldEnum[]
  }

  /**
   * InvitationCoverPhoto create
   */
  export type InvitationCoverPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationCoverPhoto.
     */
    data?: XOR<InvitationCoverPhotoCreateInput, InvitationCoverPhotoUncheckedCreateInput>
  }

  /**
   * InvitationCoverPhoto createMany
   */
  export type InvitationCoverPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationCoverPhotos.
     */
    data: InvitationCoverPhotoCreateManyInput | InvitationCoverPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationCoverPhoto update
   */
  export type InvitationCoverPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationCoverPhoto.
     */
    data: XOR<InvitationCoverPhotoUpdateInput, InvitationCoverPhotoUncheckedUpdateInput>
    /**
     * Choose, which InvitationCoverPhoto to update.
     */
    where: InvitationCoverPhotoWhereUniqueInput
  }

  /**
   * InvitationCoverPhoto updateMany
   */
  export type InvitationCoverPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationCoverPhotos.
     */
    data: XOR<InvitationCoverPhotoUpdateManyMutationInput, InvitationCoverPhotoUncheckedUpdateManyInput>
    /**
     * Filter which InvitationCoverPhotos to update
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * Limit how many InvitationCoverPhotos to update.
     */
    limit?: number
  }

  /**
   * InvitationCoverPhoto upsert
   */
  export type InvitationCoverPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationCoverPhoto to update in case it exists.
     */
    where: InvitationCoverPhotoWhereUniqueInput
    /**
     * In case the InvitationCoverPhoto found by the `where` argument doesn't exist, create a new InvitationCoverPhoto with this data.
     */
    create: XOR<InvitationCoverPhotoCreateInput, InvitationCoverPhotoUncheckedCreateInput>
    /**
     * In case the InvitationCoverPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationCoverPhotoUpdateInput, InvitationCoverPhotoUncheckedUpdateInput>
  }

  /**
   * InvitationCoverPhoto delete
   */
  export type InvitationCoverPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
    /**
     * Filter which InvitationCoverPhoto to delete.
     */
    where: InvitationCoverPhotoWhereUniqueInput
  }

  /**
   * InvitationCoverPhoto deleteMany
   */
  export type InvitationCoverPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationCoverPhotos to delete
     */
    where?: InvitationCoverPhotoWhereInput
    /**
     * Limit how many InvitationCoverPhotos to delete.
     */
    limit?: number
  }

  /**
   * InvitationCoverPhoto.invitation
   */
  export type InvitationCoverPhoto$invitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }

  /**
   * InvitationCoverPhoto without action
   */
  export type InvitationCoverPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationCoverPhoto
     */
    select?: InvitationCoverPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationCoverPhoto
     */
    omit?: InvitationCoverPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationCoverPhotoInclude<ExtArgs> | null
  }


  /**
   * Model InvitationRSVP
   */

  export type AggregateInvitationRSVP = {
    _count: InvitationRSVPCountAggregateOutputType | null
    _avg: InvitationRSVPAvgAggregateOutputType | null
    _sum: InvitationRSVPSumAggregateOutputType | null
    _min: InvitationRSVPMinAggregateOutputType | null
    _max: InvitationRSVPMaxAggregateOutputType | null
  }

  export type InvitationRSVPAvgAggregateOutputType = {
    id: number | null
    invitationId: number | null
  }

  export type InvitationRSVPSumAggregateOutputType = {
    id: number | null
    invitationId: number | null
  }

  export type InvitationRSVPMinAggregateOutputType = {
    id: number | null
    invitationId: number | null
    side: string | null
    name: string | null
    email: string | null
    phone: string | null
    attending: boolean | null
    createdAt: Date | null
  }

  export type InvitationRSVPMaxAggregateOutputType = {
    id: number | null
    invitationId: number | null
    side: string | null
    name: string | null
    email: string | null
    phone: string | null
    attending: boolean | null
    createdAt: Date | null
  }

  export type InvitationRSVPCountAggregateOutputType = {
    id: number
    invitationId: number
    side: number
    name: number
    email: number
    phone: number
    attending: number
    createdAt: number
    _all: number
  }


  export type InvitationRSVPAvgAggregateInputType = {
    id?: true
    invitationId?: true
  }

  export type InvitationRSVPSumAggregateInputType = {
    id?: true
    invitationId?: true
  }

  export type InvitationRSVPMinAggregateInputType = {
    id?: true
    invitationId?: true
    side?: true
    name?: true
    email?: true
    phone?: true
    attending?: true
    createdAt?: true
  }

  export type InvitationRSVPMaxAggregateInputType = {
    id?: true
    invitationId?: true
    side?: true
    name?: true
    email?: true
    phone?: true
    attending?: true
    createdAt?: true
  }

  export type InvitationRSVPCountAggregateInputType = {
    id?: true
    invitationId?: true
    side?: true
    name?: true
    email?: true
    phone?: true
    attending?: true
    createdAt?: true
    _all?: true
  }

  export type InvitationRSVPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationRSVP to aggregate.
     */
    where?: InvitationRSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationRSVPS to fetch.
     */
    orderBy?: InvitationRSVPOrderByWithRelationInput | InvitationRSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationRSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationRSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationRSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationRSVPS
    **/
    _count?: true | InvitationRSVPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationRSVPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationRSVPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationRSVPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationRSVPMaxAggregateInputType
  }

  export type GetInvitationRSVPAggregateType<T extends InvitationRSVPAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationRSVP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationRSVP[P]>
      : GetScalarType<T[P], AggregateInvitationRSVP[P]>
  }




  export type InvitationRSVPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationRSVPWhereInput
    orderBy?: InvitationRSVPOrderByWithAggregationInput | InvitationRSVPOrderByWithAggregationInput[]
    by: InvitationRSVPScalarFieldEnum[] | InvitationRSVPScalarFieldEnum
    having?: InvitationRSVPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationRSVPCountAggregateInputType | true
    _avg?: InvitationRSVPAvgAggregateInputType
    _sum?: InvitationRSVPSumAggregateInputType
    _min?: InvitationRSVPMinAggregateInputType
    _max?: InvitationRSVPMaxAggregateInputType
  }

  export type InvitationRSVPGroupByOutputType = {
    id: number
    invitationId: number | null
    side: string | null
    name: string | null
    email: string | null
    phone: string | null
    attending: boolean | null
    createdAt: Date | null
    _count: InvitationRSVPCountAggregateOutputType | null
    _avg: InvitationRSVPAvgAggregateOutputType | null
    _sum: InvitationRSVPSumAggregateOutputType | null
    _min: InvitationRSVPMinAggregateOutputType | null
    _max: InvitationRSVPMaxAggregateOutputType | null
  }

  type GetInvitationRSVPGroupByPayload<T extends InvitationRSVPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationRSVPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationRSVPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationRSVPGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationRSVPGroupByOutputType[P]>
        }
      >
    >


  export type InvitationRSVPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invitationId?: boolean
    side?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    attending?: boolean
    createdAt?: boolean
    Invitation?: boolean | InvitationRSVP$InvitationArgs<ExtArgs>
  }, ExtArgs["result"]["invitationRSVP"]>



  export type InvitationRSVPSelectScalar = {
    id?: boolean
    invitationId?: boolean
    side?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    attending?: boolean
    createdAt?: boolean
  }

  export type InvitationRSVPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invitationId" | "side" | "name" | "email" | "phone" | "attending" | "createdAt", ExtArgs["result"]["invitationRSVP"]>
  export type InvitationRSVPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Invitation?: boolean | InvitationRSVP$InvitationArgs<ExtArgs>
  }

  export type $InvitationRSVPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationRSVP"
    objects: {
      Invitation: Prisma.$InvitationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invitationId: number | null
      side: string | null
      name: string | null
      email: string | null
      phone: string | null
      attending: boolean | null
      createdAt: Date | null
    }, ExtArgs["result"]["invitationRSVP"]>
    composites: {}
  }

  type InvitationRSVPGetPayload<S extends boolean | null | undefined | InvitationRSVPDefaultArgs> = $Result.GetResult<Prisma.$InvitationRSVPPayload, S>

  type InvitationRSVPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationRSVPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationRSVPCountAggregateInputType | true
    }

  export interface InvitationRSVPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationRSVP'], meta: { name: 'InvitationRSVP' } }
    /**
     * Find zero or one InvitationRSVP that matches the filter.
     * @param {InvitationRSVPFindUniqueArgs} args - Arguments to find a InvitationRSVP
     * @example
     * // Get one InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationRSVPFindUniqueArgs>(args: SelectSubset<T, InvitationRSVPFindUniqueArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationRSVP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationRSVPFindUniqueOrThrowArgs} args - Arguments to find a InvitationRSVP
     * @example
     * // Get one InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationRSVPFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationRSVPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationRSVP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPFindFirstArgs} args - Arguments to find a InvitationRSVP
     * @example
     * // Get one InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationRSVPFindFirstArgs>(args?: SelectSubset<T, InvitationRSVPFindFirstArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationRSVP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPFindFirstOrThrowArgs} args - Arguments to find a InvitationRSVP
     * @example
     * // Get one InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationRSVPFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationRSVPFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationRSVPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationRSVPS
     * const invitationRSVPS = await prisma.invitationRSVP.findMany()
     * 
     * // Get first 10 InvitationRSVPS
     * const invitationRSVPS = await prisma.invitationRSVP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationRSVPWithIdOnly = await prisma.invitationRSVP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationRSVPFindManyArgs>(args?: SelectSubset<T, InvitationRSVPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationRSVP.
     * @param {InvitationRSVPCreateArgs} args - Arguments to create a InvitationRSVP.
     * @example
     * // Create one InvitationRSVP
     * const InvitationRSVP = await prisma.invitationRSVP.create({
     *   data: {
     *     // ... data to create a InvitationRSVP
     *   }
     * })
     * 
     */
    create<T extends InvitationRSVPCreateArgs>(args: SelectSubset<T, InvitationRSVPCreateArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationRSVPS.
     * @param {InvitationRSVPCreateManyArgs} args - Arguments to create many InvitationRSVPS.
     * @example
     * // Create many InvitationRSVPS
     * const invitationRSVP = await prisma.invitationRSVP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationRSVPCreateManyArgs>(args?: SelectSubset<T, InvitationRSVPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationRSVP.
     * @param {InvitationRSVPDeleteArgs} args - Arguments to delete one InvitationRSVP.
     * @example
     * // Delete one InvitationRSVP
     * const InvitationRSVP = await prisma.invitationRSVP.delete({
     *   where: {
     *     // ... filter to delete one InvitationRSVP
     *   }
     * })
     * 
     */
    delete<T extends InvitationRSVPDeleteArgs>(args: SelectSubset<T, InvitationRSVPDeleteArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationRSVP.
     * @param {InvitationRSVPUpdateArgs} args - Arguments to update one InvitationRSVP.
     * @example
     * // Update one InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationRSVPUpdateArgs>(args: SelectSubset<T, InvitationRSVPUpdateArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationRSVPS.
     * @param {InvitationRSVPDeleteManyArgs} args - Arguments to filter InvitationRSVPS to delete.
     * @example
     * // Delete a few InvitationRSVPS
     * const { count } = await prisma.invitationRSVP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationRSVPDeleteManyArgs>(args?: SelectSubset<T, InvitationRSVPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationRSVPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationRSVPS
     * const invitationRSVP = await prisma.invitationRSVP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationRSVPUpdateManyArgs>(args: SelectSubset<T, InvitationRSVPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationRSVP.
     * @param {InvitationRSVPUpsertArgs} args - Arguments to update or create a InvitationRSVP.
     * @example
     * // Update or create a InvitationRSVP
     * const invitationRSVP = await prisma.invitationRSVP.upsert({
     *   create: {
     *     // ... data to create a InvitationRSVP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationRSVP we want to update
     *   }
     * })
     */
    upsert<T extends InvitationRSVPUpsertArgs>(args: SelectSubset<T, InvitationRSVPUpsertArgs<ExtArgs>>): Prisma__InvitationRSVPClient<$Result.GetResult<Prisma.$InvitationRSVPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationRSVPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPCountArgs} args - Arguments to filter InvitationRSVPS to count.
     * @example
     * // Count the number of InvitationRSVPS
     * const count = await prisma.invitationRSVP.count({
     *   where: {
     *     // ... the filter for the InvitationRSVPS we want to count
     *   }
     * })
    **/
    count<T extends InvitationRSVPCountArgs>(
      args?: Subset<T, InvitationRSVPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationRSVPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationRSVP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationRSVPAggregateArgs>(args: Subset<T, InvitationRSVPAggregateArgs>): Prisma.PrismaPromise<GetInvitationRSVPAggregateType<T>>

    /**
     * Group by InvitationRSVP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationRSVPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationRSVPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationRSVPGroupByArgs['orderBy'] }
        : { orderBy?: InvitationRSVPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationRSVPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationRSVPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationRSVP model
   */
  readonly fields: InvitationRSVPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationRSVP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationRSVPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Invitation<T extends InvitationRSVP$InvitationArgs<ExtArgs> = {}>(args?: Subset<T, InvitationRSVP$InvitationArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationRSVP model
   */
  interface InvitationRSVPFieldRefs {
    readonly id: FieldRef<"InvitationRSVP", 'Int'>
    readonly invitationId: FieldRef<"InvitationRSVP", 'Int'>
    readonly side: FieldRef<"InvitationRSVP", 'String'>
    readonly name: FieldRef<"InvitationRSVP", 'String'>
    readonly email: FieldRef<"InvitationRSVP", 'String'>
    readonly phone: FieldRef<"InvitationRSVP", 'String'>
    readonly attending: FieldRef<"InvitationRSVP", 'Boolean'>
    readonly createdAt: FieldRef<"InvitationRSVP", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvitationRSVP findUnique
   */
  export type InvitationRSVPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter, which InvitationRSVP to fetch.
     */
    where: InvitationRSVPWhereUniqueInput
  }

  /**
   * InvitationRSVP findUniqueOrThrow
   */
  export type InvitationRSVPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter, which InvitationRSVP to fetch.
     */
    where: InvitationRSVPWhereUniqueInput
  }

  /**
   * InvitationRSVP findFirst
   */
  export type InvitationRSVPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter, which InvitationRSVP to fetch.
     */
    where?: InvitationRSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationRSVPS to fetch.
     */
    orderBy?: InvitationRSVPOrderByWithRelationInput | InvitationRSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationRSVPS.
     */
    cursor?: InvitationRSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationRSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationRSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationRSVPS.
     */
    distinct?: InvitationRSVPScalarFieldEnum | InvitationRSVPScalarFieldEnum[]
  }

  /**
   * InvitationRSVP findFirstOrThrow
   */
  export type InvitationRSVPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter, which InvitationRSVP to fetch.
     */
    where?: InvitationRSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationRSVPS to fetch.
     */
    orderBy?: InvitationRSVPOrderByWithRelationInput | InvitationRSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationRSVPS.
     */
    cursor?: InvitationRSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationRSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationRSVPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationRSVPS.
     */
    distinct?: InvitationRSVPScalarFieldEnum | InvitationRSVPScalarFieldEnum[]
  }

  /**
   * InvitationRSVP findMany
   */
  export type InvitationRSVPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter, which InvitationRSVPS to fetch.
     */
    where?: InvitationRSVPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationRSVPS to fetch.
     */
    orderBy?: InvitationRSVPOrderByWithRelationInput | InvitationRSVPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationRSVPS.
     */
    cursor?: InvitationRSVPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationRSVPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationRSVPS.
     */
    skip?: number
    distinct?: InvitationRSVPScalarFieldEnum | InvitationRSVPScalarFieldEnum[]
  }

  /**
   * InvitationRSVP create
   */
  export type InvitationRSVPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * The data needed to create a InvitationRSVP.
     */
    data?: XOR<InvitationRSVPCreateInput, InvitationRSVPUncheckedCreateInput>
  }

  /**
   * InvitationRSVP createMany
   */
  export type InvitationRSVPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationRSVPS.
     */
    data: InvitationRSVPCreateManyInput | InvitationRSVPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationRSVP update
   */
  export type InvitationRSVPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * The data needed to update a InvitationRSVP.
     */
    data: XOR<InvitationRSVPUpdateInput, InvitationRSVPUncheckedUpdateInput>
    /**
     * Choose, which InvitationRSVP to update.
     */
    where: InvitationRSVPWhereUniqueInput
  }

  /**
   * InvitationRSVP updateMany
   */
  export type InvitationRSVPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationRSVPS.
     */
    data: XOR<InvitationRSVPUpdateManyMutationInput, InvitationRSVPUncheckedUpdateManyInput>
    /**
     * Filter which InvitationRSVPS to update
     */
    where?: InvitationRSVPWhereInput
    /**
     * Limit how many InvitationRSVPS to update.
     */
    limit?: number
  }

  /**
   * InvitationRSVP upsert
   */
  export type InvitationRSVPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * The filter to search for the InvitationRSVP to update in case it exists.
     */
    where: InvitationRSVPWhereUniqueInput
    /**
     * In case the InvitationRSVP found by the `where` argument doesn't exist, create a new InvitationRSVP with this data.
     */
    create: XOR<InvitationRSVPCreateInput, InvitationRSVPUncheckedCreateInput>
    /**
     * In case the InvitationRSVP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationRSVPUpdateInput, InvitationRSVPUncheckedUpdateInput>
  }

  /**
   * InvitationRSVP delete
   */
  export type InvitationRSVPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
    /**
     * Filter which InvitationRSVP to delete.
     */
    where: InvitationRSVPWhereUniqueInput
  }

  /**
   * InvitationRSVP deleteMany
   */
  export type InvitationRSVPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationRSVPS to delete
     */
    where?: InvitationRSVPWhereInput
    /**
     * Limit how many InvitationRSVPS to delete.
     */
    limit?: number
  }

  /**
   * InvitationRSVP.Invitation
   */
  export type InvitationRSVP$InvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }

  /**
   * InvitationRSVP without action
   */
  export type InvitationRSVPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationRSVP
     */
    select?: InvitationRSVPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationRSVP
     */
    omit?: InvitationRSVPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationRSVPInclude<ExtArgs> | null
  }


  /**
   * Model InvitationMusic
   */

  export type AggregateInvitationMusic = {
    _count: InvitationMusicCountAggregateOutputType | null
    _avg: InvitationMusicAvgAggregateOutputType | null
    _sum: InvitationMusicSumAggregateOutputType | null
    _min: InvitationMusicMinAggregateOutputType | null
    _max: InvitationMusicMaxAggregateOutputType | null
  }

  export type InvitationMusicAvgAggregateOutputType = {
    id: number | null
  }

  export type InvitationMusicSumAggregateOutputType = {
    id: number | null
  }

  export type InvitationMusicMinAggregateOutputType = {
    id: number | null
    s3Key: string | null
    name: string | null
  }

  export type InvitationMusicMaxAggregateOutputType = {
    id: number | null
    s3Key: string | null
    name: string | null
  }

  export type InvitationMusicCountAggregateOutputType = {
    id: number
    s3Key: number
    name: number
    _all: number
  }


  export type InvitationMusicAvgAggregateInputType = {
    id?: true
  }

  export type InvitationMusicSumAggregateInputType = {
    id?: true
  }

  export type InvitationMusicMinAggregateInputType = {
    id?: true
    s3Key?: true
    name?: true
  }

  export type InvitationMusicMaxAggregateInputType = {
    id?: true
    s3Key?: true
    name?: true
  }

  export type InvitationMusicCountAggregateInputType = {
    id?: true
    s3Key?: true
    name?: true
    _all?: true
  }

  export type InvitationMusicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationMusic to aggregate.
     */
    where?: InvitationMusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationMusics to fetch.
     */
    orderBy?: InvitationMusicOrderByWithRelationInput | InvitationMusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationMusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationMusics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationMusics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvitationMusics
    **/
    _count?: true | InvitationMusicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvitationMusicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvitationMusicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMusicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMusicMaxAggregateInputType
  }

  export type GetInvitationMusicAggregateType<T extends InvitationMusicAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitationMusic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitationMusic[P]>
      : GetScalarType<T[P], AggregateInvitationMusic[P]>
  }




  export type InvitationMusicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationMusicWhereInput
    orderBy?: InvitationMusicOrderByWithAggregationInput | InvitationMusicOrderByWithAggregationInput[]
    by: InvitationMusicScalarFieldEnum[] | InvitationMusicScalarFieldEnum
    having?: InvitationMusicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationMusicCountAggregateInputType | true
    _avg?: InvitationMusicAvgAggregateInputType
    _sum?: InvitationMusicSumAggregateInputType
    _min?: InvitationMusicMinAggregateInputType
    _max?: InvitationMusicMaxAggregateInputType
  }

  export type InvitationMusicGroupByOutputType = {
    id: number
    s3Key: string | null
    name: string | null
    _count: InvitationMusicCountAggregateOutputType | null
    _avg: InvitationMusicAvgAggregateOutputType | null
    _sum: InvitationMusicSumAggregateOutputType | null
    _min: InvitationMusicMinAggregateOutputType | null
    _max: InvitationMusicMaxAggregateOutputType | null
  }

  type GetInvitationMusicGroupByPayload<T extends InvitationMusicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationMusicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationMusicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationMusicGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationMusicGroupByOutputType[P]>
        }
      >
    >


  export type InvitationMusicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    name?: boolean
  }, ExtArgs["result"]["invitationMusic"]>



  export type InvitationMusicSelectScalar = {
    id?: boolean
    s3Key?: boolean
    name?: boolean
  }

  export type InvitationMusicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "s3Key" | "name", ExtArgs["result"]["invitationMusic"]>

  export type $InvitationMusicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvitationMusic"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      s3Key: string | null
      name: string | null
    }, ExtArgs["result"]["invitationMusic"]>
    composites: {}
  }

  type InvitationMusicGetPayload<S extends boolean | null | undefined | InvitationMusicDefaultArgs> = $Result.GetResult<Prisma.$InvitationMusicPayload, S>

  type InvitationMusicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationMusicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationMusicCountAggregateInputType | true
    }

  export interface InvitationMusicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvitationMusic'], meta: { name: 'InvitationMusic' } }
    /**
     * Find zero or one InvitationMusic that matches the filter.
     * @param {InvitationMusicFindUniqueArgs} args - Arguments to find a InvitationMusic
     * @example
     * // Get one InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationMusicFindUniqueArgs>(args: SelectSubset<T, InvitationMusicFindUniqueArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvitationMusic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationMusicFindUniqueOrThrowArgs} args - Arguments to find a InvitationMusic
     * @example
     * // Get one InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationMusicFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationMusicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationMusic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicFindFirstArgs} args - Arguments to find a InvitationMusic
     * @example
     * // Get one InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationMusicFindFirstArgs>(args?: SelectSubset<T, InvitationMusicFindFirstArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvitationMusic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicFindFirstOrThrowArgs} args - Arguments to find a InvitationMusic
     * @example
     * // Get one InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationMusicFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationMusicFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvitationMusics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvitationMusics
     * const invitationMusics = await prisma.invitationMusic.findMany()
     * 
     * // Get first 10 InvitationMusics
     * const invitationMusics = await prisma.invitationMusic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationMusicWithIdOnly = await prisma.invitationMusic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationMusicFindManyArgs>(args?: SelectSubset<T, InvitationMusicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvitationMusic.
     * @param {InvitationMusicCreateArgs} args - Arguments to create a InvitationMusic.
     * @example
     * // Create one InvitationMusic
     * const InvitationMusic = await prisma.invitationMusic.create({
     *   data: {
     *     // ... data to create a InvitationMusic
     *   }
     * })
     * 
     */
    create<T extends InvitationMusicCreateArgs>(args: SelectSubset<T, InvitationMusicCreateArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvitationMusics.
     * @param {InvitationMusicCreateManyArgs} args - Arguments to create many InvitationMusics.
     * @example
     * // Create many InvitationMusics
     * const invitationMusic = await prisma.invitationMusic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationMusicCreateManyArgs>(args?: SelectSubset<T, InvitationMusicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InvitationMusic.
     * @param {InvitationMusicDeleteArgs} args - Arguments to delete one InvitationMusic.
     * @example
     * // Delete one InvitationMusic
     * const InvitationMusic = await prisma.invitationMusic.delete({
     *   where: {
     *     // ... filter to delete one InvitationMusic
     *   }
     * })
     * 
     */
    delete<T extends InvitationMusicDeleteArgs>(args: SelectSubset<T, InvitationMusicDeleteArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvitationMusic.
     * @param {InvitationMusicUpdateArgs} args - Arguments to update one InvitationMusic.
     * @example
     * // Update one InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationMusicUpdateArgs>(args: SelectSubset<T, InvitationMusicUpdateArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvitationMusics.
     * @param {InvitationMusicDeleteManyArgs} args - Arguments to filter InvitationMusics to delete.
     * @example
     * // Delete a few InvitationMusics
     * const { count } = await prisma.invitationMusic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationMusicDeleteManyArgs>(args?: SelectSubset<T, InvitationMusicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvitationMusics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvitationMusics
     * const invitationMusic = await prisma.invitationMusic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationMusicUpdateManyArgs>(args: SelectSubset<T, InvitationMusicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InvitationMusic.
     * @param {InvitationMusicUpsertArgs} args - Arguments to update or create a InvitationMusic.
     * @example
     * // Update or create a InvitationMusic
     * const invitationMusic = await prisma.invitationMusic.upsert({
     *   create: {
     *     // ... data to create a InvitationMusic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvitationMusic we want to update
     *   }
     * })
     */
    upsert<T extends InvitationMusicUpsertArgs>(args: SelectSubset<T, InvitationMusicUpsertArgs<ExtArgs>>): Prisma__InvitationMusicClient<$Result.GetResult<Prisma.$InvitationMusicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvitationMusics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicCountArgs} args - Arguments to filter InvitationMusics to count.
     * @example
     * // Count the number of InvitationMusics
     * const count = await prisma.invitationMusic.count({
     *   where: {
     *     // ... the filter for the InvitationMusics we want to count
     *   }
     * })
    **/
    count<T extends InvitationMusicCountArgs>(
      args?: Subset<T, InvitationMusicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationMusicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvitationMusic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationMusicAggregateArgs>(args: Subset<T, InvitationMusicAggregateArgs>): Prisma.PrismaPromise<GetInvitationMusicAggregateType<T>>

    /**
     * Group by InvitationMusic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationMusicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationMusicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationMusicGroupByArgs['orderBy'] }
        : { orderBy?: InvitationMusicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationMusicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationMusicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvitationMusic model
   */
  readonly fields: InvitationMusicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvitationMusic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationMusicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvitationMusic model
   */
  interface InvitationMusicFieldRefs {
    readonly id: FieldRef<"InvitationMusic", 'Int'>
    readonly s3Key: FieldRef<"InvitationMusic", 'String'>
    readonly name: FieldRef<"InvitationMusic", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InvitationMusic findUnique
   */
  export type InvitationMusicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter, which InvitationMusic to fetch.
     */
    where: InvitationMusicWhereUniqueInput
  }

  /**
   * InvitationMusic findUniqueOrThrow
   */
  export type InvitationMusicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter, which InvitationMusic to fetch.
     */
    where: InvitationMusicWhereUniqueInput
  }

  /**
   * InvitationMusic findFirst
   */
  export type InvitationMusicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter, which InvitationMusic to fetch.
     */
    where?: InvitationMusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationMusics to fetch.
     */
    orderBy?: InvitationMusicOrderByWithRelationInput | InvitationMusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationMusics.
     */
    cursor?: InvitationMusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationMusics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationMusics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationMusics.
     */
    distinct?: InvitationMusicScalarFieldEnum | InvitationMusicScalarFieldEnum[]
  }

  /**
   * InvitationMusic findFirstOrThrow
   */
  export type InvitationMusicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter, which InvitationMusic to fetch.
     */
    where?: InvitationMusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationMusics to fetch.
     */
    orderBy?: InvitationMusicOrderByWithRelationInput | InvitationMusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvitationMusics.
     */
    cursor?: InvitationMusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationMusics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationMusics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvitationMusics.
     */
    distinct?: InvitationMusicScalarFieldEnum | InvitationMusicScalarFieldEnum[]
  }

  /**
   * InvitationMusic findMany
   */
  export type InvitationMusicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter, which InvitationMusics to fetch.
     */
    where?: InvitationMusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvitationMusics to fetch.
     */
    orderBy?: InvitationMusicOrderByWithRelationInput | InvitationMusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvitationMusics.
     */
    cursor?: InvitationMusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvitationMusics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvitationMusics.
     */
    skip?: number
    distinct?: InvitationMusicScalarFieldEnum | InvitationMusicScalarFieldEnum[]
  }

  /**
   * InvitationMusic create
   */
  export type InvitationMusicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * The data needed to create a InvitationMusic.
     */
    data?: XOR<InvitationMusicCreateInput, InvitationMusicUncheckedCreateInput>
  }

  /**
   * InvitationMusic createMany
   */
  export type InvitationMusicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvitationMusics.
     */
    data: InvitationMusicCreateManyInput | InvitationMusicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvitationMusic update
   */
  export type InvitationMusicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * The data needed to update a InvitationMusic.
     */
    data: XOR<InvitationMusicUpdateInput, InvitationMusicUncheckedUpdateInput>
    /**
     * Choose, which InvitationMusic to update.
     */
    where: InvitationMusicWhereUniqueInput
  }

  /**
   * InvitationMusic updateMany
   */
  export type InvitationMusicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvitationMusics.
     */
    data: XOR<InvitationMusicUpdateManyMutationInput, InvitationMusicUncheckedUpdateManyInput>
    /**
     * Filter which InvitationMusics to update
     */
    where?: InvitationMusicWhereInput
    /**
     * Limit how many InvitationMusics to update.
     */
    limit?: number
  }

  /**
   * InvitationMusic upsert
   */
  export type InvitationMusicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * The filter to search for the InvitationMusic to update in case it exists.
     */
    where: InvitationMusicWhereUniqueInput
    /**
     * In case the InvitationMusic found by the `where` argument doesn't exist, create a new InvitationMusic with this data.
     */
    create: XOR<InvitationMusicCreateInput, InvitationMusicUncheckedCreateInput>
    /**
     * In case the InvitationMusic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationMusicUpdateInput, InvitationMusicUncheckedUpdateInput>
  }

  /**
   * InvitationMusic delete
   */
  export type InvitationMusicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
    /**
     * Filter which InvitationMusic to delete.
     */
    where: InvitationMusicWhereUniqueInput
  }

  /**
   * InvitationMusic deleteMany
   */
  export type InvitationMusicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvitationMusics to delete
     */
    where?: InvitationMusicWhereInput
    /**
     * Limit how many InvitationMusics to delete.
     */
    limit?: number
  }

  /**
   * InvitationMusic without action
   */
  export type InvitationMusicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvitationMusic
     */
    select?: InvitationMusicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvitationMusic
     */
    omit?: InvitationMusicOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    templateNo: 'templateNo',
    uniqueId: 'uniqueId',
    date: 'date',
    userId: 'userId',
    title: 'title',
    pointColor: 'pointColor',
    mainTextColor: 'mainTextColor',
    dressCodeGentleman: 'dressCodeGentleman',
    dressCodeLady: 'dressCodeLady',
    bgColor: 'bgColor',
    musicKey: 'musicKey',
    musicFilename: 'musicFilename',
    musicFileKey: 'musicFileKey',
    notice: 'notice',
    brideFirstName: 'brideFirstName',
    brideMiddleName: 'brideMiddleName',
    dressCodeMainColor: 'dressCodeMainColor',
    dressCodeSubColor: 'dressCodeSubColor',
    dressCodeThirdColor: 'dressCodeThirdColor',
    brideLastName: 'brideLastName',
    brideMomName: 'brideMomName',
    greetingTitle: 'greetingTitle',
    greetingContent: 'greetingContent',
    brideDadName: 'brideDadName',
    bridePhone: 'bridePhone',
    groomFirstName: 'groomFirstName',
    groomMiddleName: 'groomMiddleName',
    groomLastName: 'groomLastName',
    groomPhone: 'groomPhone',
    primarySponsor: 'primarySponsor',
    secondarySponsor: 'secondarySponsor',
    maidOfHonor: 'maidOfHonor',
    groomsMen: 'groomsMen',
    bestMan: 'bestMan',
    bridesMaids: 'bridesMaids',
    groomMomName: 'groomMomName',
    groomDadName: 'groomDadName',
    layoutOrder: 'layoutOrder',
    endingText: 'endingText',
    ogImageKey: 'ogImageKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const InvitationPlaceScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    order: 'order',
    placeId: 'placeId',
    placeDetail: 'placeDetail'
  };

  export type InvitationPlaceScalarFieldEnum = (typeof InvitationPlaceScalarFieldEnum)[keyof typeof InvitationPlaceScalarFieldEnum]


  export const PlaceScalarFieldEnum: {
    id: 'id',
    googlePlaceId: 'googlePlaceId',
    name: 'name',
    address: 'address',
    lat: 'lat',
    lng: 'lng'
  };

  export type PlaceScalarFieldEnum = (typeof PlaceScalarFieldEnum)[keyof typeof PlaceScalarFieldEnum]


  export const InvitationPlaceTimeScalarFieldEnum: {
    id: 'id',
    invitationPlaceId: 'invitationPlaceId',
    time: 'time',
    name: 'name',
    description: 'description'
  };

  export type InvitationPlaceTimeScalarFieldEnum = (typeof InvitationPlaceTimeScalarFieldEnum)[keyof typeof InvitationPlaceTimeScalarFieldEnum]


  export const InvitationPhotoScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    width: 'width',
    height: 'height',
    order: 'order',
    originalKey: 'originalKey',
    croppedKey: 'croppedKey',
    cropX: 'cropX',
    cropY: 'cropY',
    cropZoom: 'cropZoom',
    thumbKey: 'thumbKey',
    thumbX: 'thumbX',
    thumbY: 'thumbY',
    thumbZoom: 'thumbZoom'
  };

  export type InvitationPhotoScalarFieldEnum = (typeof InvitationPhotoScalarFieldEnum)[keyof typeof InvitationPhotoScalarFieldEnum]


  export const InvitationCoverPhotoScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    originalKey: 'originalKey',
    croppedKey: 'croppedKey',
    type: 'type',
    cropX: 'cropX',
    cropY: 'cropY',
    cropZoom: 'cropZoom',
    width: 'width',
    height: 'height',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvitationCoverPhotoScalarFieldEnum = (typeof InvitationCoverPhotoScalarFieldEnum)[keyof typeof InvitationCoverPhotoScalarFieldEnum]


  export const InvitationRSVPScalarFieldEnum: {
    id: 'id',
    invitationId: 'invitationId',
    side: 'side',
    name: 'name',
    email: 'email',
    phone: 'phone',
    attending: 'attending',
    createdAt: 'createdAt'
  };

  export type InvitationRSVPScalarFieldEnum = (typeof InvitationRSVPScalarFieldEnum)[keyof typeof InvitationRSVPScalarFieldEnum]


  export const InvitationMusicScalarFieldEnum: {
    id: 'id',
    s3Key: 's3Key',
    name: 'name'
  };

  export type InvitationMusicScalarFieldEnum = (typeof InvitationMusicScalarFieldEnum)[keyof typeof InvitationMusicScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const InvitationOrderByRelevanceFieldEnum: {
    uniqueId: 'uniqueId',
    title: 'title',
    pointColor: 'pointColor',
    mainTextColor: 'mainTextColor',
    dressCodeGentleman: 'dressCodeGentleman',
    dressCodeLady: 'dressCodeLady',
    bgColor: 'bgColor',
    musicKey: 'musicKey',
    musicFilename: 'musicFilename',
    musicFileKey: 'musicFileKey',
    notice: 'notice',
    brideFirstName: 'brideFirstName',
    brideMiddleName: 'brideMiddleName',
    dressCodeMainColor: 'dressCodeMainColor',
    dressCodeSubColor: 'dressCodeSubColor',
    dressCodeThirdColor: 'dressCodeThirdColor',
    brideLastName: 'brideLastName',
    brideMomName: 'brideMomName',
    greetingTitle: 'greetingTitle',
    greetingContent: 'greetingContent',
    brideDadName: 'brideDadName',
    bridePhone: 'bridePhone',
    groomFirstName: 'groomFirstName',
    groomMiddleName: 'groomMiddleName',
    groomLastName: 'groomLastName',
    groomPhone: 'groomPhone',
    primarySponsor: 'primarySponsor',
    secondarySponsor: 'secondarySponsor',
    maidOfHonor: 'maidOfHonor',
    groomsMen: 'groomsMen',
    bestMan: 'bestMan',
    bridesMaids: 'bridesMaids',
    groomMomName: 'groomMomName',
    groomDadName: 'groomDadName',
    endingText: 'endingText',
    ogImageKey: 'ogImageKey'
  };

  export type InvitationOrderByRelevanceFieldEnum = (typeof InvitationOrderByRelevanceFieldEnum)[keyof typeof InvitationOrderByRelevanceFieldEnum]


  export const InvitationPlaceOrderByRelevanceFieldEnum: {
    placeDetail: 'placeDetail'
  };

  export type InvitationPlaceOrderByRelevanceFieldEnum = (typeof InvitationPlaceOrderByRelevanceFieldEnum)[keyof typeof InvitationPlaceOrderByRelevanceFieldEnum]


  export const PlaceOrderByRelevanceFieldEnum: {
    googlePlaceId: 'googlePlaceId',
    name: 'name',
    address: 'address'
  };

  export type PlaceOrderByRelevanceFieldEnum = (typeof PlaceOrderByRelevanceFieldEnum)[keyof typeof PlaceOrderByRelevanceFieldEnum]


  export const InvitationPlaceTimeOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type InvitationPlaceTimeOrderByRelevanceFieldEnum = (typeof InvitationPlaceTimeOrderByRelevanceFieldEnum)[keyof typeof InvitationPlaceTimeOrderByRelevanceFieldEnum]


  export const InvitationPhotoOrderByRelevanceFieldEnum: {
    invitationId: 'invitationId',
    originalKey: 'originalKey',
    croppedKey: 'croppedKey',
    thumbKey: 'thumbKey'
  };

  export type InvitationPhotoOrderByRelevanceFieldEnum = (typeof InvitationPhotoOrderByRelevanceFieldEnum)[keyof typeof InvitationPhotoOrderByRelevanceFieldEnum]


  export const InvitationCoverPhotoOrderByRelevanceFieldEnum: {
    originalKey: 'originalKey',
    croppedKey: 'croppedKey',
    type: 'type'
  };

  export type InvitationCoverPhotoOrderByRelevanceFieldEnum = (typeof InvitationCoverPhotoOrderByRelevanceFieldEnum)[keyof typeof InvitationCoverPhotoOrderByRelevanceFieldEnum]


  export const InvitationRSVPOrderByRelevanceFieldEnum: {
    side: 'side',
    name: 'name',
    email: 'email',
    phone: 'phone'
  };

  export type InvitationRSVPOrderByRelevanceFieldEnum = (typeof InvitationRSVPOrderByRelevanceFieldEnum)[keyof typeof InvitationRSVPOrderByRelevanceFieldEnum]


  export const InvitationMusicOrderByRelevanceFieldEnum: {
    s3Key: 's3Key',
    name: 'name'
  };

  export type InvitationMusicOrderByRelevanceFieldEnum = (typeof InvitationMusicOrderByRelevanceFieldEnum)[keyof typeof InvitationMusicOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    invitationList?: InvitationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    invitationList?: InvitationOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    invitationList?: InvitationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: IntFilter<"Invitation"> | number
    templateNo?: IntNullableFilter<"Invitation"> | number | null
    uniqueId?: StringNullableFilter<"Invitation"> | string | null
    date?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    userId?: IntNullableFilter<"Invitation"> | number | null
    title?: StringNullableFilter<"Invitation"> | string | null
    pointColor?: StringNullableFilter<"Invitation"> | string | null
    mainTextColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeGentleman?: StringNullableFilter<"Invitation"> | string | null
    dressCodeLady?: StringNullableFilter<"Invitation"> | string | null
    bgColor?: StringNullableFilter<"Invitation"> | string | null
    musicKey?: StringNullableFilter<"Invitation"> | string | null
    musicFilename?: StringNullableFilter<"Invitation"> | string | null
    musicFileKey?: StringNullableFilter<"Invitation"> | string | null
    notice?: StringNullableFilter<"Invitation"> | string | null
    brideFirstName?: StringNullableFilter<"Invitation"> | string | null
    brideMiddleName?: StringNullableFilter<"Invitation"> | string | null
    dressCodeMainColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeSubColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeThirdColor?: StringNullableFilter<"Invitation"> | string | null
    brideLastName?: StringNullableFilter<"Invitation"> | string | null
    brideMomName?: StringNullableFilter<"Invitation"> | string | null
    greetingTitle?: StringNullableFilter<"Invitation"> | string | null
    greetingContent?: StringNullableFilter<"Invitation"> | string | null
    brideDadName?: StringNullableFilter<"Invitation"> | string | null
    bridePhone?: StringNullableFilter<"Invitation"> | string | null
    groomFirstName?: StringNullableFilter<"Invitation"> | string | null
    groomMiddleName?: StringNullableFilter<"Invitation"> | string | null
    groomLastName?: StringNullableFilter<"Invitation"> | string | null
    groomPhone?: StringNullableFilter<"Invitation"> | string | null
    primarySponsor?: StringNullableFilter<"Invitation"> | string | null
    secondarySponsor?: StringNullableFilter<"Invitation"> | string | null
    maidOfHonor?: StringNullableFilter<"Invitation"> | string | null
    groomsMen?: StringNullableFilter<"Invitation"> | string | null
    bestMan?: StringNullableFilter<"Invitation"> | string | null
    bridesMaids?: StringNullableFilter<"Invitation"> | string | null
    groomMomName?: StringNullableFilter<"Invitation"> | string | null
    groomDadName?: StringNullableFilter<"Invitation"> | string | null
    layoutOrder?: JsonNullableFilter<"Invitation">
    endingText?: StringNullableFilter<"Invitation"> | string | null
    ogImageKey?: StringNullableFilter<"Invitation"> | string | null
    createdAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    invitationCoverPhotoList?: InvitationCoverPhotoListRelationFilter
    photoList?: InvitationPhotoListRelationFilter
    placeList?: InvitationPlaceListRelationFilter
    invitationRSVP?: InvitationRSVPListRelationFilter
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    templateNo?: SortOrderInput | SortOrder
    uniqueId?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    pointColor?: SortOrderInput | SortOrder
    mainTextColor?: SortOrderInput | SortOrder
    dressCodeGentleman?: SortOrderInput | SortOrder
    dressCodeLady?: SortOrderInput | SortOrder
    bgColor?: SortOrderInput | SortOrder
    musicKey?: SortOrderInput | SortOrder
    musicFilename?: SortOrderInput | SortOrder
    musicFileKey?: SortOrderInput | SortOrder
    notice?: SortOrderInput | SortOrder
    brideFirstName?: SortOrderInput | SortOrder
    brideMiddleName?: SortOrderInput | SortOrder
    dressCodeMainColor?: SortOrderInput | SortOrder
    dressCodeSubColor?: SortOrderInput | SortOrder
    dressCodeThirdColor?: SortOrderInput | SortOrder
    brideLastName?: SortOrderInput | SortOrder
    brideMomName?: SortOrderInput | SortOrder
    greetingTitle?: SortOrderInput | SortOrder
    greetingContent?: SortOrderInput | SortOrder
    brideDadName?: SortOrderInput | SortOrder
    bridePhone?: SortOrderInput | SortOrder
    groomFirstName?: SortOrderInput | SortOrder
    groomMiddleName?: SortOrderInput | SortOrder
    groomLastName?: SortOrderInput | SortOrder
    groomPhone?: SortOrderInput | SortOrder
    primarySponsor?: SortOrderInput | SortOrder
    secondarySponsor?: SortOrderInput | SortOrder
    maidOfHonor?: SortOrderInput | SortOrder
    groomsMen?: SortOrderInput | SortOrder
    bestMan?: SortOrderInput | SortOrder
    bridesMaids?: SortOrderInput | SortOrder
    groomMomName?: SortOrderInput | SortOrder
    groomDadName?: SortOrderInput | SortOrder
    layoutOrder?: SortOrderInput | SortOrder
    endingText?: SortOrderInput | SortOrder
    ogImageKey?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    invitationCoverPhotoList?: InvitationCoverPhotoOrderByRelationAggregateInput
    photoList?: InvitationPhotoOrderByRelationAggregateInput
    placeList?: InvitationPlaceOrderByRelationAggregateInput
    invitationRSVP?: InvitationRSVPOrderByRelationAggregateInput
    _relevance?: InvitationOrderByRelevanceInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uniqueId?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    templateNo?: IntNullableFilter<"Invitation"> | number | null
    date?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    userId?: IntNullableFilter<"Invitation"> | number | null
    title?: StringNullableFilter<"Invitation"> | string | null
    pointColor?: StringNullableFilter<"Invitation"> | string | null
    mainTextColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeGentleman?: StringNullableFilter<"Invitation"> | string | null
    dressCodeLady?: StringNullableFilter<"Invitation"> | string | null
    bgColor?: StringNullableFilter<"Invitation"> | string | null
    musicKey?: StringNullableFilter<"Invitation"> | string | null
    musicFilename?: StringNullableFilter<"Invitation"> | string | null
    musicFileKey?: StringNullableFilter<"Invitation"> | string | null
    notice?: StringNullableFilter<"Invitation"> | string | null
    brideFirstName?: StringNullableFilter<"Invitation"> | string | null
    brideMiddleName?: StringNullableFilter<"Invitation"> | string | null
    dressCodeMainColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeSubColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeThirdColor?: StringNullableFilter<"Invitation"> | string | null
    brideLastName?: StringNullableFilter<"Invitation"> | string | null
    brideMomName?: StringNullableFilter<"Invitation"> | string | null
    greetingTitle?: StringNullableFilter<"Invitation"> | string | null
    greetingContent?: StringNullableFilter<"Invitation"> | string | null
    brideDadName?: StringNullableFilter<"Invitation"> | string | null
    bridePhone?: StringNullableFilter<"Invitation"> | string | null
    groomFirstName?: StringNullableFilter<"Invitation"> | string | null
    groomMiddleName?: StringNullableFilter<"Invitation"> | string | null
    groomLastName?: StringNullableFilter<"Invitation"> | string | null
    groomPhone?: StringNullableFilter<"Invitation"> | string | null
    primarySponsor?: StringNullableFilter<"Invitation"> | string | null
    secondarySponsor?: StringNullableFilter<"Invitation"> | string | null
    maidOfHonor?: StringNullableFilter<"Invitation"> | string | null
    groomsMen?: StringNullableFilter<"Invitation"> | string | null
    bestMan?: StringNullableFilter<"Invitation"> | string | null
    bridesMaids?: StringNullableFilter<"Invitation"> | string | null
    groomMomName?: StringNullableFilter<"Invitation"> | string | null
    groomDadName?: StringNullableFilter<"Invitation"> | string | null
    layoutOrder?: JsonNullableFilter<"Invitation">
    endingText?: StringNullableFilter<"Invitation"> | string | null
    ogImageKey?: StringNullableFilter<"Invitation"> | string | null
    createdAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    invitationCoverPhotoList?: InvitationCoverPhotoListRelationFilter
    photoList?: InvitationPhotoListRelationFilter
    placeList?: InvitationPlaceListRelationFilter
    invitationRSVP?: InvitationRSVPListRelationFilter
  }, "id" | "uniqueId">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    templateNo?: SortOrderInput | SortOrder
    uniqueId?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    pointColor?: SortOrderInput | SortOrder
    mainTextColor?: SortOrderInput | SortOrder
    dressCodeGentleman?: SortOrderInput | SortOrder
    dressCodeLady?: SortOrderInput | SortOrder
    bgColor?: SortOrderInput | SortOrder
    musicKey?: SortOrderInput | SortOrder
    musicFilename?: SortOrderInput | SortOrder
    musicFileKey?: SortOrderInput | SortOrder
    notice?: SortOrderInput | SortOrder
    brideFirstName?: SortOrderInput | SortOrder
    brideMiddleName?: SortOrderInput | SortOrder
    dressCodeMainColor?: SortOrderInput | SortOrder
    dressCodeSubColor?: SortOrderInput | SortOrder
    dressCodeThirdColor?: SortOrderInput | SortOrder
    brideLastName?: SortOrderInput | SortOrder
    brideMomName?: SortOrderInput | SortOrder
    greetingTitle?: SortOrderInput | SortOrder
    greetingContent?: SortOrderInput | SortOrder
    brideDadName?: SortOrderInput | SortOrder
    bridePhone?: SortOrderInput | SortOrder
    groomFirstName?: SortOrderInput | SortOrder
    groomMiddleName?: SortOrderInput | SortOrder
    groomLastName?: SortOrderInput | SortOrder
    groomPhone?: SortOrderInput | SortOrder
    primarySponsor?: SortOrderInput | SortOrder
    secondarySponsor?: SortOrderInput | SortOrder
    maidOfHonor?: SortOrderInput | SortOrder
    groomsMen?: SortOrderInput | SortOrder
    bestMan?: SortOrderInput | SortOrder
    bridesMaids?: SortOrderInput | SortOrder
    groomMomName?: SortOrderInput | SortOrder
    groomDadName?: SortOrderInput | SortOrder
    layoutOrder?: SortOrderInput | SortOrder
    endingText?: SortOrderInput | SortOrder
    ogImageKey?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _avg?: InvitationAvgOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
    _sum?: InvitationSumOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Invitation"> | number
    templateNo?: IntNullableWithAggregatesFilter<"Invitation"> | number | null
    uniqueId?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    date?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
    userId?: IntNullableWithAggregatesFilter<"Invitation"> | number | null
    title?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    pointColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    mainTextColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    dressCodeGentleman?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    dressCodeLady?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    bgColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    musicKey?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    musicFilename?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    musicFileKey?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    notice?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    brideFirstName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    brideMiddleName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    dressCodeMainColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    dressCodeSubColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    dressCodeThirdColor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    brideLastName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    brideMomName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    greetingTitle?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    greetingContent?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    brideDadName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    bridePhone?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomFirstName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomMiddleName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomLastName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomPhone?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    primarySponsor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    secondarySponsor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    maidOfHonor?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomsMen?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    bestMan?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    bridesMaids?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomMomName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    groomDadName?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    layoutOrder?: JsonNullableWithAggregatesFilter<"Invitation">
    endingText?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    ogImageKey?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
  }

  export type InvitationPlaceWhereInput = {
    AND?: InvitationPlaceWhereInput | InvitationPlaceWhereInput[]
    OR?: InvitationPlaceWhereInput[]
    NOT?: InvitationPlaceWhereInput | InvitationPlaceWhereInput[]
    id?: IntFilter<"InvitationPlace"> | number
    invitationId?: IntNullableFilter<"InvitationPlace"> | number | null
    order?: IntNullableFilter<"InvitationPlace"> | number | null
    placeId?: IntNullableFilter<"InvitationPlace"> | number | null
    placeDetail?: StringNullableFilter<"InvitationPlace"> | string | null
    place?: XOR<PlaceNullableScalarRelationFilter, PlaceWhereInput> | null
    invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
    timeList?: InvitationPlaceTimeListRelationFilter
  }

  export type InvitationPlaceOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    placeDetail?: SortOrderInput | SortOrder
    place?: PlaceOrderByWithRelationInput
    invitation?: InvitationOrderByWithRelationInput
    timeList?: InvitationPlaceTimeOrderByRelationAggregateInput
    _relevance?: InvitationPlaceOrderByRelevanceInput
  }

  export type InvitationPlaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationPlaceWhereInput | InvitationPlaceWhereInput[]
    OR?: InvitationPlaceWhereInput[]
    NOT?: InvitationPlaceWhereInput | InvitationPlaceWhereInput[]
    invitationId?: IntNullableFilter<"InvitationPlace"> | number | null
    order?: IntNullableFilter<"InvitationPlace"> | number | null
    placeId?: IntNullableFilter<"InvitationPlace"> | number | null
    placeDetail?: StringNullableFilter<"InvitationPlace"> | string | null
    place?: XOR<PlaceNullableScalarRelationFilter, PlaceWhereInput> | null
    invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
    timeList?: InvitationPlaceTimeListRelationFilter
  }, "id">

  export type InvitationPlaceOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    placeId?: SortOrderInput | SortOrder
    placeDetail?: SortOrderInput | SortOrder
    _count?: InvitationPlaceCountOrderByAggregateInput
    _avg?: InvitationPlaceAvgOrderByAggregateInput
    _max?: InvitationPlaceMaxOrderByAggregateInput
    _min?: InvitationPlaceMinOrderByAggregateInput
    _sum?: InvitationPlaceSumOrderByAggregateInput
  }

  export type InvitationPlaceScalarWhereWithAggregatesInput = {
    AND?: InvitationPlaceScalarWhereWithAggregatesInput | InvitationPlaceScalarWhereWithAggregatesInput[]
    OR?: InvitationPlaceScalarWhereWithAggregatesInput[]
    NOT?: InvitationPlaceScalarWhereWithAggregatesInput | InvitationPlaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationPlace"> | number
    invitationId?: IntNullableWithAggregatesFilter<"InvitationPlace"> | number | null
    order?: IntNullableWithAggregatesFilter<"InvitationPlace"> | number | null
    placeId?: IntNullableWithAggregatesFilter<"InvitationPlace"> | number | null
    placeDetail?: StringNullableWithAggregatesFilter<"InvitationPlace"> | string | null
  }

  export type PlaceWhereInput = {
    AND?: PlaceWhereInput | PlaceWhereInput[]
    OR?: PlaceWhereInput[]
    NOT?: PlaceWhereInput | PlaceWhereInput[]
    id?: IntFilter<"Place"> | number
    googlePlaceId?: StringNullableFilter<"Place"> | string | null
    name?: StringNullableFilter<"Place"> | string | null
    address?: StringNullableFilter<"Place"> | string | null
    lat?: FloatNullableFilter<"Place"> | number | null
    lng?: FloatNullableFilter<"Place"> | number | null
    invitationPlaceList?: InvitationPlaceListRelationFilter
  }

  export type PlaceOrderByWithRelationInput = {
    id?: SortOrder
    googlePlaceId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    invitationPlaceList?: InvitationPlaceOrderByRelationAggregateInput
    _relevance?: PlaceOrderByRelevanceInput
  }

  export type PlaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    googlePlaceId?: string
    AND?: PlaceWhereInput | PlaceWhereInput[]
    OR?: PlaceWhereInput[]
    NOT?: PlaceWhereInput | PlaceWhereInput[]
    name?: StringNullableFilter<"Place"> | string | null
    address?: StringNullableFilter<"Place"> | string | null
    lat?: FloatNullableFilter<"Place"> | number | null
    lng?: FloatNullableFilter<"Place"> | number | null
    invitationPlaceList?: InvitationPlaceListRelationFilter
  }, "id" | "googlePlaceId">

  export type PlaceOrderByWithAggregationInput = {
    id?: SortOrder
    googlePlaceId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    _count?: PlaceCountOrderByAggregateInput
    _avg?: PlaceAvgOrderByAggregateInput
    _max?: PlaceMaxOrderByAggregateInput
    _min?: PlaceMinOrderByAggregateInput
    _sum?: PlaceSumOrderByAggregateInput
  }

  export type PlaceScalarWhereWithAggregatesInput = {
    AND?: PlaceScalarWhereWithAggregatesInput | PlaceScalarWhereWithAggregatesInput[]
    OR?: PlaceScalarWhereWithAggregatesInput[]
    NOT?: PlaceScalarWhereWithAggregatesInput | PlaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Place"> | number
    googlePlaceId?: StringNullableWithAggregatesFilter<"Place"> | string | null
    name?: StringNullableWithAggregatesFilter<"Place"> | string | null
    address?: StringNullableWithAggregatesFilter<"Place"> | string | null
    lat?: FloatNullableWithAggregatesFilter<"Place"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"Place"> | number | null
  }

  export type InvitationPlaceTimeWhereInput = {
    AND?: InvitationPlaceTimeWhereInput | InvitationPlaceTimeWhereInput[]
    OR?: InvitationPlaceTimeWhereInput[]
    NOT?: InvitationPlaceTimeWhereInput | InvitationPlaceTimeWhereInput[]
    id?: IntFilter<"InvitationPlaceTime"> | number
    invitationPlaceId?: IntNullableFilter<"InvitationPlaceTime"> | number | null
    time?: DateTimeNullableFilter<"InvitationPlaceTime"> | Date | string | null
    name?: StringNullableFilter<"InvitationPlaceTime"> | string | null
    description?: StringNullableFilter<"InvitationPlaceTime"> | string | null
    invitationPlace?: XOR<InvitationPlaceNullableScalarRelationFilter, InvitationPlaceWhereInput> | null
  }

  export type InvitationPlaceTimeOrderByWithRelationInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    invitationPlace?: InvitationPlaceOrderByWithRelationInput
    _relevance?: InvitationPlaceTimeOrderByRelevanceInput
  }

  export type InvitationPlaceTimeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationPlaceTimeWhereInput | InvitationPlaceTimeWhereInput[]
    OR?: InvitationPlaceTimeWhereInput[]
    NOT?: InvitationPlaceTimeWhereInput | InvitationPlaceTimeWhereInput[]
    invitationPlaceId?: IntNullableFilter<"InvitationPlaceTime"> | number | null
    time?: DateTimeNullableFilter<"InvitationPlaceTime"> | Date | string | null
    name?: StringNullableFilter<"InvitationPlaceTime"> | string | null
    description?: StringNullableFilter<"InvitationPlaceTime"> | string | null
    invitationPlace?: XOR<InvitationPlaceNullableScalarRelationFilter, InvitationPlaceWhereInput> | null
  }, "id">

  export type InvitationPlaceTimeOrderByWithAggregationInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: InvitationPlaceTimeCountOrderByAggregateInput
    _avg?: InvitationPlaceTimeAvgOrderByAggregateInput
    _max?: InvitationPlaceTimeMaxOrderByAggregateInput
    _min?: InvitationPlaceTimeMinOrderByAggregateInput
    _sum?: InvitationPlaceTimeSumOrderByAggregateInput
  }

  export type InvitationPlaceTimeScalarWhereWithAggregatesInput = {
    AND?: InvitationPlaceTimeScalarWhereWithAggregatesInput | InvitationPlaceTimeScalarWhereWithAggregatesInput[]
    OR?: InvitationPlaceTimeScalarWhereWithAggregatesInput[]
    NOT?: InvitationPlaceTimeScalarWhereWithAggregatesInput | InvitationPlaceTimeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationPlaceTime"> | number
    invitationPlaceId?: IntNullableWithAggregatesFilter<"InvitationPlaceTime"> | number | null
    time?: DateTimeNullableWithAggregatesFilter<"InvitationPlaceTime"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"InvitationPlaceTime"> | string | null
    description?: StringNullableWithAggregatesFilter<"InvitationPlaceTime"> | string | null
  }

  export type InvitationPhotoWhereInput = {
    AND?: InvitationPhotoWhereInput | InvitationPhotoWhereInput[]
    OR?: InvitationPhotoWhereInput[]
    NOT?: InvitationPhotoWhereInput | InvitationPhotoWhereInput[]
    id?: IntFilter<"InvitationPhoto"> | number
    invitationId?: StringNullableFilter<"InvitationPhoto"> | string | null
    width?: IntNullableFilter<"InvitationPhoto"> | number | null
    height?: IntNullableFilter<"InvitationPhoto"> | number | null
    order?: IntNullableFilter<"InvitationPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    cropX?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropY?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
    thumbKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    thumbX?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbY?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
    Invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }

  export type InvitationPhotoOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    originalKey?: SortOrderInput | SortOrder
    croppedKey?: SortOrderInput | SortOrder
    cropX?: SortOrderInput | SortOrder
    cropY?: SortOrderInput | SortOrder
    cropZoom?: SortOrderInput | SortOrder
    thumbKey?: SortOrderInput | SortOrder
    thumbX?: SortOrderInput | SortOrder
    thumbY?: SortOrderInput | SortOrder
    thumbZoom?: SortOrderInput | SortOrder
    Invitation?: InvitationOrderByWithRelationInput
    _relevance?: InvitationPhotoOrderByRelevanceInput
  }

  export type InvitationPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationPhotoWhereInput | InvitationPhotoWhereInput[]
    OR?: InvitationPhotoWhereInput[]
    NOT?: InvitationPhotoWhereInput | InvitationPhotoWhereInput[]
    invitationId?: StringNullableFilter<"InvitationPhoto"> | string | null
    width?: IntNullableFilter<"InvitationPhoto"> | number | null
    height?: IntNullableFilter<"InvitationPhoto"> | number | null
    order?: IntNullableFilter<"InvitationPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    cropX?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropY?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
    thumbKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    thumbX?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbY?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
    Invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }, "id">

  export type InvitationPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    originalKey?: SortOrderInput | SortOrder
    croppedKey?: SortOrderInput | SortOrder
    cropX?: SortOrderInput | SortOrder
    cropY?: SortOrderInput | SortOrder
    cropZoom?: SortOrderInput | SortOrder
    thumbKey?: SortOrderInput | SortOrder
    thumbX?: SortOrderInput | SortOrder
    thumbY?: SortOrderInput | SortOrder
    thumbZoom?: SortOrderInput | SortOrder
    _count?: InvitationPhotoCountOrderByAggregateInput
    _avg?: InvitationPhotoAvgOrderByAggregateInput
    _max?: InvitationPhotoMaxOrderByAggregateInput
    _min?: InvitationPhotoMinOrderByAggregateInput
    _sum?: InvitationPhotoSumOrderByAggregateInput
  }

  export type InvitationPhotoScalarWhereWithAggregatesInput = {
    AND?: InvitationPhotoScalarWhereWithAggregatesInput | InvitationPhotoScalarWhereWithAggregatesInput[]
    OR?: InvitationPhotoScalarWhereWithAggregatesInput[]
    NOT?: InvitationPhotoScalarWhereWithAggregatesInput | InvitationPhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationPhoto"> | number
    invitationId?: StringNullableWithAggregatesFilter<"InvitationPhoto"> | string | null
    width?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    height?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    order?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    originalKey?: StringNullableWithAggregatesFilter<"InvitationPhoto"> | string | null
    croppedKey?: StringNullableWithAggregatesFilter<"InvitationPhoto"> | string | null
    cropX?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    cropY?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    cropZoom?: FloatNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    thumbKey?: StringNullableWithAggregatesFilter<"InvitationPhoto"> | string | null
    thumbX?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    thumbY?: IntNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
    thumbZoom?: FloatNullableWithAggregatesFilter<"InvitationPhoto"> | number | null
  }

  export type InvitationCoverPhotoWhereInput = {
    AND?: InvitationCoverPhotoWhereInput | InvitationCoverPhotoWhereInput[]
    OR?: InvitationCoverPhotoWhereInput[]
    NOT?: InvitationCoverPhotoWhereInput | InvitationCoverPhotoWhereInput[]
    id?: IntFilter<"InvitationCoverPhoto"> | number
    invitationId?: IntNullableFilter<"InvitationCoverPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    type?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    cropX?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropY?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    width?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    height?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    createdAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
    invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }

  export type InvitationCoverPhotoOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    originalKey?: SortOrderInput | SortOrder
    croppedKey?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    cropX?: SortOrderInput | SortOrder
    cropY?: SortOrderInput | SortOrder
    cropZoom?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    invitation?: InvitationOrderByWithRelationInput
    _relevance?: InvitationCoverPhotoOrderByRelevanceInput
  }

  export type InvitationCoverPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationCoverPhotoWhereInput | InvitationCoverPhotoWhereInput[]
    OR?: InvitationCoverPhotoWhereInput[]
    NOT?: InvitationCoverPhotoWhereInput | InvitationCoverPhotoWhereInput[]
    invitationId?: IntNullableFilter<"InvitationCoverPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    type?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    cropX?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropY?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    width?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    height?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    createdAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
    invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }, "id">

  export type InvitationCoverPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    originalKey?: SortOrderInput | SortOrder
    croppedKey?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    cropX?: SortOrderInput | SortOrder
    cropY?: SortOrderInput | SortOrder
    cropZoom?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: InvitationCoverPhotoCountOrderByAggregateInput
    _avg?: InvitationCoverPhotoAvgOrderByAggregateInput
    _max?: InvitationCoverPhotoMaxOrderByAggregateInput
    _min?: InvitationCoverPhotoMinOrderByAggregateInput
    _sum?: InvitationCoverPhotoSumOrderByAggregateInput
  }

  export type InvitationCoverPhotoScalarWhereWithAggregatesInput = {
    AND?: InvitationCoverPhotoScalarWhereWithAggregatesInput | InvitationCoverPhotoScalarWhereWithAggregatesInput[]
    OR?: InvitationCoverPhotoScalarWhereWithAggregatesInput[]
    NOT?: InvitationCoverPhotoScalarWhereWithAggregatesInput | InvitationCoverPhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationCoverPhoto"> | number
    invitationId?: IntNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    originalKey?: StringNullableWithAggregatesFilter<"InvitationCoverPhoto"> | string | null
    croppedKey?: StringNullableWithAggregatesFilter<"InvitationCoverPhoto"> | string | null
    type?: StringNullableWithAggregatesFilter<"InvitationCoverPhoto"> | string | null
    cropX?: FloatNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    cropY?: FloatNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    cropZoom?: FloatNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    width?: FloatNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    height?: FloatNullableWithAggregatesFilter<"InvitationCoverPhoto"> | number | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"InvitationCoverPhoto"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"InvitationCoverPhoto"> | Date | string | null
  }

  export type InvitationRSVPWhereInput = {
    AND?: InvitationRSVPWhereInput | InvitationRSVPWhereInput[]
    OR?: InvitationRSVPWhereInput[]
    NOT?: InvitationRSVPWhereInput | InvitationRSVPWhereInput[]
    id?: IntFilter<"InvitationRSVP"> | number
    invitationId?: IntNullableFilter<"InvitationRSVP"> | number | null
    side?: StringNullableFilter<"InvitationRSVP"> | string | null
    name?: StringNullableFilter<"InvitationRSVP"> | string | null
    email?: StringNullableFilter<"InvitationRSVP"> | string | null
    phone?: StringNullableFilter<"InvitationRSVP"> | string | null
    attending?: BoolNullableFilter<"InvitationRSVP"> | boolean | null
    createdAt?: DateTimeNullableFilter<"InvitationRSVP"> | Date | string | null
    Invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }

  export type InvitationRSVPOrderByWithRelationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    side?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    attending?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    Invitation?: InvitationOrderByWithRelationInput
    _relevance?: InvitationRSVPOrderByRelevanceInput
  }

  export type InvitationRSVPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationRSVPWhereInput | InvitationRSVPWhereInput[]
    OR?: InvitationRSVPWhereInput[]
    NOT?: InvitationRSVPWhereInput | InvitationRSVPWhereInput[]
    invitationId?: IntNullableFilter<"InvitationRSVP"> | number | null
    side?: StringNullableFilter<"InvitationRSVP"> | string | null
    name?: StringNullableFilter<"InvitationRSVP"> | string | null
    email?: StringNullableFilter<"InvitationRSVP"> | string | null
    phone?: StringNullableFilter<"InvitationRSVP"> | string | null
    attending?: BoolNullableFilter<"InvitationRSVP"> | boolean | null
    createdAt?: DateTimeNullableFilter<"InvitationRSVP"> | Date | string | null
    Invitation?: XOR<InvitationNullableScalarRelationFilter, InvitationWhereInput> | null
  }, "id">

  export type InvitationRSVPOrderByWithAggregationInput = {
    id?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    side?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    attending?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: InvitationRSVPCountOrderByAggregateInput
    _avg?: InvitationRSVPAvgOrderByAggregateInput
    _max?: InvitationRSVPMaxOrderByAggregateInput
    _min?: InvitationRSVPMinOrderByAggregateInput
    _sum?: InvitationRSVPSumOrderByAggregateInput
  }

  export type InvitationRSVPScalarWhereWithAggregatesInput = {
    AND?: InvitationRSVPScalarWhereWithAggregatesInput | InvitationRSVPScalarWhereWithAggregatesInput[]
    OR?: InvitationRSVPScalarWhereWithAggregatesInput[]
    NOT?: InvitationRSVPScalarWhereWithAggregatesInput | InvitationRSVPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationRSVP"> | number
    invitationId?: IntNullableWithAggregatesFilter<"InvitationRSVP"> | number | null
    side?: StringNullableWithAggregatesFilter<"InvitationRSVP"> | string | null
    name?: StringNullableWithAggregatesFilter<"InvitationRSVP"> | string | null
    email?: StringNullableWithAggregatesFilter<"InvitationRSVP"> | string | null
    phone?: StringNullableWithAggregatesFilter<"InvitationRSVP"> | string | null
    attending?: BoolNullableWithAggregatesFilter<"InvitationRSVP"> | boolean | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"InvitationRSVP"> | Date | string | null
  }

  export type InvitationMusicWhereInput = {
    AND?: InvitationMusicWhereInput | InvitationMusicWhereInput[]
    OR?: InvitationMusicWhereInput[]
    NOT?: InvitationMusicWhereInput | InvitationMusicWhereInput[]
    id?: IntFilter<"InvitationMusic"> | number
    s3Key?: StringNullableFilter<"InvitationMusic"> | string | null
    name?: StringNullableFilter<"InvitationMusic"> | string | null
  }

  export type InvitationMusicOrderByWithRelationInput = {
    id?: SortOrder
    s3Key?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    _relevance?: InvitationMusicOrderByRelevanceInput
  }

  export type InvitationMusicWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvitationMusicWhereInput | InvitationMusicWhereInput[]
    OR?: InvitationMusicWhereInput[]
    NOT?: InvitationMusicWhereInput | InvitationMusicWhereInput[]
    s3Key?: StringNullableFilter<"InvitationMusic"> | string | null
    name?: StringNullableFilter<"InvitationMusic"> | string | null
  }, "id">

  export type InvitationMusicOrderByWithAggregationInput = {
    id?: SortOrder
    s3Key?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    _count?: InvitationMusicCountOrderByAggregateInput
    _avg?: InvitationMusicAvgOrderByAggregateInput
    _max?: InvitationMusicMaxOrderByAggregateInput
    _min?: InvitationMusicMinOrderByAggregateInput
    _sum?: InvitationMusicSumOrderByAggregateInput
  }

  export type InvitationMusicScalarWhereWithAggregatesInput = {
    AND?: InvitationMusicScalarWhereWithAggregatesInput | InvitationMusicScalarWhereWithAggregatesInput[]
    OR?: InvitationMusicScalarWhereWithAggregatesInput[]
    NOT?: InvitationMusicScalarWhereWithAggregatesInput | InvitationMusicScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvitationMusic"> | number
    s3Key?: StringNullableWithAggregatesFilter<"InvitationMusic"> | string | null
    name?: StringNullableWithAggregatesFilter<"InvitationMusic"> | string | null
  }

  export type UserCreateInput = {
    email?: string | null
    password?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationList?: InvitationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email?: string | null
    password?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationList?: InvitationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationList?: InvitationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationList?: InvitationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email?: string | null
    password?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCreateInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutInvitationListInput
    invitationCoverPhotoList?: InvitationCoverPhotoCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUpdateInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutInvitationListNestedInput
    invitationCoverPhotoList?: InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateManyInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationUpdateManyMutationInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationPlaceCreateInput = {
    order?: number | null
    placeDetail?: string | null
    place?: PlaceCreateNestedOneWithoutInvitationPlaceListInput
    invitation?: InvitationCreateNestedOneWithoutPlaceListInput
    timeList?: InvitationPlaceTimeCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceUncheckedCreateInput = {
    id?: number
    invitationId?: number | null
    order?: number | null
    placeId?: number | null
    placeDetail?: string | null
    timeList?: InvitationPlaceTimeUncheckedCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceUpdateInput = {
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    place?: PlaceUpdateOneWithoutInvitationPlaceListNestedInput
    invitation?: InvitationUpdateOneWithoutPlaceListNestedInput
    timeList?: InvitationPlaceTimeUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeId?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    timeList?: InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceCreateManyInput = {
    id?: number
    invitationId?: number | null
    order?: number | null
    placeId?: number | null
    placeDetail?: string | null
  }

  export type InvitationPlaceUpdateManyMutationInput = {
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeId?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlaceCreateInput = {
    googlePlaceId?: string | null
    name?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    invitationPlaceList?: InvitationPlaceCreateNestedManyWithoutPlaceInput
  }

  export type PlaceUncheckedCreateInput = {
    id?: number
    googlePlaceId?: string | null
    name?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
    invitationPlaceList?: InvitationPlaceUncheckedCreateNestedManyWithoutPlaceInput
  }

  export type PlaceUpdateInput = {
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    invitationPlaceList?: InvitationPlaceUpdateManyWithoutPlaceNestedInput
  }

  export type PlaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    invitationPlaceList?: InvitationPlaceUncheckedUpdateManyWithoutPlaceNestedInput
  }

  export type PlaceCreateManyInput = {
    id?: number
    googlePlaceId?: string | null
    name?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type PlaceUpdateManyMutationInput = {
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PlaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPlaceTimeCreateInput = {
    time?: Date | string | null
    name?: string | null
    description?: string | null
    invitationPlace?: InvitationPlaceCreateNestedOneWithoutTimeListInput
  }

  export type InvitationPlaceTimeUncheckedCreateInput = {
    id?: number
    invitationPlaceId?: number | null
    time?: Date | string | null
    name?: string | null
    description?: string | null
  }

  export type InvitationPlaceTimeUpdateInput = {
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    invitationPlace?: InvitationPlaceUpdateOneWithoutTimeListNestedInput
  }

  export type InvitationPlaceTimeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationPlaceId?: NullableIntFieldUpdateOperationsInput | number | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceTimeCreateManyInput = {
    id?: number
    invitationPlaceId?: number | null
    time?: Date | string | null
    name?: string | null
    description?: string | null
  }

  export type InvitationPlaceTimeUpdateManyMutationInput = {
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceTimeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationPlaceId?: NullableIntFieldUpdateOperationsInput | number | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPhotoCreateInput = {
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
    Invitation?: InvitationCreateNestedOneWithoutPhotoListInput
  }

  export type InvitationPhotoUncheckedCreateInput = {
    id?: number
    invitationId?: string | null
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
  }

  export type InvitationPhotoUpdateInput = {
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    Invitation?: InvitationUpdateOneWithoutPhotoListNestedInput
  }

  export type InvitationPhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPhotoCreateManyInput = {
    id?: number
    invitationId?: string | null
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
  }

  export type InvitationPhotoUpdateManyMutationInput = {
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationCoverPhotoCreateInput = {
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitation?: InvitationCreateNestedOneWithoutInvitationCoverPhotoListInput
  }

  export type InvitationCoverPhotoUncheckedCreateInput = {
    id?: number
    invitationId?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationCoverPhotoUpdateInput = {
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitation?: InvitationUpdateOneWithoutInvitationCoverPhotoListNestedInput
  }

  export type InvitationCoverPhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoCreateManyInput = {
    id?: number
    invitationId?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationCoverPhotoUpdateManyMutationInput = {
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationRSVPCreateInput = {
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
    Invitation?: InvitationCreateNestedOneWithoutInvitationRSVPInput
  }

  export type InvitationRSVPUncheckedCreateInput = {
    id?: number
    invitationId?: number | null
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
  }

  export type InvitationRSVPUpdateInput = {
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Invitation?: InvitationUpdateOneWithoutInvitationRSVPNestedInput
  }

  export type InvitationRSVPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationRSVPCreateManyInput = {
    id?: number
    invitationId?: number | null
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
  }

  export type InvitationRSVPUpdateManyMutationInput = {
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationRSVPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationMusicCreateInput = {
    s3Key?: string | null
    name?: string | null
  }

  export type InvitationMusicUncheckedCreateInput = {
    id?: number
    s3Key?: string | null
    name?: string | null
  }

  export type InvitationMusicUpdateInput = {
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationMusicUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationMusicCreateManyInput = {
    id?: number
    s3Key?: string | null
    name?: string | null
  }

  export type InvitationMusicUpdateManyMutationInput = {
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationMusicUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InvitationCoverPhotoListRelationFilter = {
    every?: InvitationCoverPhotoWhereInput
    some?: InvitationCoverPhotoWhereInput
    none?: InvitationCoverPhotoWhereInput
  }

  export type InvitationPhotoListRelationFilter = {
    every?: InvitationPhotoWhereInput
    some?: InvitationPhotoWhereInput
    none?: InvitationPhotoWhereInput
  }

  export type InvitationPlaceListRelationFilter = {
    every?: InvitationPlaceWhereInput
    some?: InvitationPlaceWhereInput
    none?: InvitationPlaceWhereInput
  }

  export type InvitationRSVPListRelationFilter = {
    every?: InvitationRSVPWhereInput
    some?: InvitationRSVPWhereInput
    none?: InvitationRSVPWhereInput
  }

  export type InvitationCoverPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationPlaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationRSVPOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelevanceInput = {
    fields: InvitationOrderByRelevanceFieldEnum | InvitationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    templateNo?: SortOrder
    uniqueId?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    pointColor?: SortOrder
    mainTextColor?: SortOrder
    dressCodeGentleman?: SortOrder
    dressCodeLady?: SortOrder
    bgColor?: SortOrder
    musicKey?: SortOrder
    musicFilename?: SortOrder
    musicFileKey?: SortOrder
    notice?: SortOrder
    brideFirstName?: SortOrder
    brideMiddleName?: SortOrder
    dressCodeMainColor?: SortOrder
    dressCodeSubColor?: SortOrder
    dressCodeThirdColor?: SortOrder
    brideLastName?: SortOrder
    brideMomName?: SortOrder
    greetingTitle?: SortOrder
    greetingContent?: SortOrder
    brideDadName?: SortOrder
    bridePhone?: SortOrder
    groomFirstName?: SortOrder
    groomMiddleName?: SortOrder
    groomLastName?: SortOrder
    groomPhone?: SortOrder
    primarySponsor?: SortOrder
    secondarySponsor?: SortOrder
    maidOfHonor?: SortOrder
    groomsMen?: SortOrder
    bestMan?: SortOrder
    bridesMaids?: SortOrder
    groomMomName?: SortOrder
    groomDadName?: SortOrder
    layoutOrder?: SortOrder
    endingText?: SortOrder
    ogImageKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationAvgOrderByAggregateInput = {
    id?: SortOrder
    templateNo?: SortOrder
    userId?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    templateNo?: SortOrder
    uniqueId?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    pointColor?: SortOrder
    mainTextColor?: SortOrder
    dressCodeGentleman?: SortOrder
    dressCodeLady?: SortOrder
    bgColor?: SortOrder
    musicKey?: SortOrder
    musicFilename?: SortOrder
    musicFileKey?: SortOrder
    notice?: SortOrder
    brideFirstName?: SortOrder
    brideMiddleName?: SortOrder
    dressCodeMainColor?: SortOrder
    dressCodeSubColor?: SortOrder
    dressCodeThirdColor?: SortOrder
    brideLastName?: SortOrder
    brideMomName?: SortOrder
    greetingTitle?: SortOrder
    greetingContent?: SortOrder
    brideDadName?: SortOrder
    bridePhone?: SortOrder
    groomFirstName?: SortOrder
    groomMiddleName?: SortOrder
    groomLastName?: SortOrder
    groomPhone?: SortOrder
    primarySponsor?: SortOrder
    secondarySponsor?: SortOrder
    maidOfHonor?: SortOrder
    groomsMen?: SortOrder
    bestMan?: SortOrder
    bridesMaids?: SortOrder
    groomMomName?: SortOrder
    groomDadName?: SortOrder
    endingText?: SortOrder
    ogImageKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    templateNo?: SortOrder
    uniqueId?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    pointColor?: SortOrder
    mainTextColor?: SortOrder
    dressCodeGentleman?: SortOrder
    dressCodeLady?: SortOrder
    bgColor?: SortOrder
    musicKey?: SortOrder
    musicFilename?: SortOrder
    musicFileKey?: SortOrder
    notice?: SortOrder
    brideFirstName?: SortOrder
    brideMiddleName?: SortOrder
    dressCodeMainColor?: SortOrder
    dressCodeSubColor?: SortOrder
    dressCodeThirdColor?: SortOrder
    brideLastName?: SortOrder
    brideMomName?: SortOrder
    greetingTitle?: SortOrder
    greetingContent?: SortOrder
    brideDadName?: SortOrder
    bridePhone?: SortOrder
    groomFirstName?: SortOrder
    groomMiddleName?: SortOrder
    groomLastName?: SortOrder
    groomPhone?: SortOrder
    primarySponsor?: SortOrder
    secondarySponsor?: SortOrder
    maidOfHonor?: SortOrder
    groomsMen?: SortOrder
    bestMan?: SortOrder
    bridesMaids?: SortOrder
    groomMomName?: SortOrder
    groomDadName?: SortOrder
    endingText?: SortOrder
    ogImageKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationSumOrderByAggregateInput = {
    id?: SortOrder
    templateNo?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PlaceNullableScalarRelationFilter = {
    is?: PlaceWhereInput | null
    isNot?: PlaceWhereInput | null
  }

  export type InvitationNullableScalarRelationFilter = {
    is?: InvitationWhereInput | null
    isNot?: InvitationWhereInput | null
  }

  export type InvitationPlaceTimeListRelationFilter = {
    every?: InvitationPlaceTimeWhereInput
    some?: InvitationPlaceTimeWhereInput
    none?: InvitationPlaceTimeWhereInput
  }

  export type InvitationPlaceTimeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationPlaceOrderByRelevanceInput = {
    fields: InvitationPlaceOrderByRelevanceFieldEnum | InvitationPlaceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationPlaceCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    order?: SortOrder
    placeId?: SortOrder
    placeDetail?: SortOrder
  }

  export type InvitationPlaceAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    order?: SortOrder
    placeId?: SortOrder
  }

  export type InvitationPlaceMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    order?: SortOrder
    placeId?: SortOrder
    placeDetail?: SortOrder
  }

  export type InvitationPlaceMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    order?: SortOrder
    placeId?: SortOrder
    placeDetail?: SortOrder
  }

  export type InvitationPlaceSumOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    order?: SortOrder
    placeId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PlaceOrderByRelevanceInput = {
    fields: PlaceOrderByRelevanceFieldEnum | PlaceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlaceCountOrderByAggregateInput = {
    id?: SortOrder
    googlePlaceId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PlaceAvgOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PlaceMaxOrderByAggregateInput = {
    id?: SortOrder
    googlePlaceId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PlaceMinOrderByAggregateInput = {
    id?: SortOrder
    googlePlaceId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PlaceSumOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type InvitationPlaceNullableScalarRelationFilter = {
    is?: InvitationPlaceWhereInput | null
    isNot?: InvitationPlaceWhereInput | null
  }

  export type InvitationPlaceTimeOrderByRelevanceInput = {
    fields: InvitationPlaceTimeOrderByRelevanceFieldEnum | InvitationPlaceTimeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationPlaceTimeCountOrderByAggregateInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrder
    time?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type InvitationPlaceTimeAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrder
  }

  export type InvitationPlaceTimeMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrder
    time?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type InvitationPlaceTimeMinOrderByAggregateInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrder
    time?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type InvitationPlaceTimeSumOrderByAggregateInput = {
    id?: SortOrder
    invitationPlaceId?: SortOrder
  }

  export type InvitationPhotoOrderByRelevanceInput = {
    fields: InvitationPhotoOrderByRelevanceFieldEnum | InvitationPhotoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    thumbKey?: SortOrder
    thumbX?: SortOrder
    thumbY?: SortOrder
    thumbZoom?: SortOrder
  }

  export type InvitationPhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    thumbX?: SortOrder
    thumbY?: SortOrder
    thumbZoom?: SortOrder
  }

  export type InvitationPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    thumbKey?: SortOrder
    thumbX?: SortOrder
    thumbY?: SortOrder
    thumbZoom?: SortOrder
  }

  export type InvitationPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    thumbKey?: SortOrder
    thumbX?: SortOrder
    thumbY?: SortOrder
    thumbZoom?: SortOrder
  }

  export type InvitationPhotoSumOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    thumbX?: SortOrder
    thumbY?: SortOrder
    thumbZoom?: SortOrder
  }

  export type InvitationCoverPhotoOrderByRelevanceInput = {
    fields: InvitationCoverPhotoOrderByRelevanceFieldEnum | InvitationCoverPhotoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationCoverPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    type?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    width?: SortOrder
    height?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationCoverPhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type InvitationCoverPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    type?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    width?: SortOrder
    height?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationCoverPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    originalKey?: SortOrder
    croppedKey?: SortOrder
    type?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    width?: SortOrder
    height?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvitationCoverPhotoSumOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    cropX?: SortOrder
    cropY?: SortOrder
    cropZoom?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type InvitationRSVPOrderByRelevanceInput = {
    fields: InvitationRSVPOrderByRelevanceFieldEnum | InvitationRSVPOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationRSVPCountOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    side?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    attending?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationRSVPAvgOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
  }

  export type InvitationRSVPMaxOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    side?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    attending?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationRSVPMinOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
    side?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    attending?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationRSVPSumOrderByAggregateInput = {
    id?: SortOrder
    invitationId?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type InvitationMusicOrderByRelevanceInput = {
    fields: InvitationMusicOrderByRelevanceFieldEnum | InvitationMusicOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InvitationMusicCountOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    name?: SortOrder
  }

  export type InvitationMusicAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InvitationMusicMaxOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    name?: SortOrder
  }

  export type InvitationMusicMinOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    name?: SortOrder
  }

  export type InvitationMusicSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InvitationCreateNestedManyWithoutUserInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput> | InvitationCreateWithoutUserInput[] | InvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput | InvitationCreateOrConnectWithoutUserInput[]
    createMany?: InvitationCreateManyUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput> | InvitationCreateWithoutUserInput[] | InvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput | InvitationCreateOrConnectWithoutUserInput[]
    createMany?: InvitationCreateManyUserInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InvitationUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput> | InvitationCreateWithoutUserInput[] | InvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput | InvitationCreateOrConnectWithoutUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutUserInput | InvitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvitationCreateManyUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutUserInput | InvitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutUserInput | InvitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvitationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput> | InvitationCreateWithoutUserInput[] | InvitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutUserInput | InvitationCreateOrConnectWithoutUserInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutUserInput | InvitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InvitationCreateManyUserInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutUserInput | InvitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutUserInput | InvitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInvitationListInput = {
    create?: XOR<UserCreateWithoutInvitationListInput, UserUncheckedCreateWithoutInvitationListInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationListInput
    connect?: UserWhereUniqueInput
  }

  export type InvitationCoverPhotoCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput> | InvitationCoverPhotoCreateWithoutInvitationInput[] | InvitationCoverPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationCoverPhotoCreateOrConnectWithoutInvitationInput | InvitationCoverPhotoCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationCoverPhotoCreateManyInvitationInputEnvelope
    connect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
  }

  export type InvitationPhotoCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput> | InvitationPhotoCreateWithoutInvitationInput[] | InvitationPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPhotoCreateOrConnectWithoutInvitationInput | InvitationPhotoCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationPhotoCreateManyInvitationInputEnvelope
    connect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
  }

  export type InvitationPlaceCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput> | InvitationPlaceCreateWithoutInvitationInput[] | InvitationPlaceUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutInvitationInput | InvitationPlaceCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationPlaceCreateManyInvitationInputEnvelope
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
  }

  export type InvitationRSVPCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput> | InvitationRSVPCreateWithoutInvitationInput[] | InvitationRSVPUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationRSVPCreateOrConnectWithoutInvitationInput | InvitationRSVPCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationRSVPCreateManyInvitationInputEnvelope
    connect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
  }

  export type InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput> | InvitationCoverPhotoCreateWithoutInvitationInput[] | InvitationCoverPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationCoverPhotoCreateOrConnectWithoutInvitationInput | InvitationCoverPhotoCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationCoverPhotoCreateManyInvitationInputEnvelope
    connect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
  }

  export type InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput> | InvitationPhotoCreateWithoutInvitationInput[] | InvitationPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPhotoCreateOrConnectWithoutInvitationInput | InvitationPhotoCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationPhotoCreateManyInvitationInputEnvelope
    connect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
  }

  export type InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput> | InvitationPlaceCreateWithoutInvitationInput[] | InvitationPlaceUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutInvitationInput | InvitationPlaceCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationPlaceCreateManyInvitationInputEnvelope
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
  }

  export type InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput = {
    create?: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput> | InvitationRSVPCreateWithoutInvitationInput[] | InvitationRSVPUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationRSVPCreateOrConnectWithoutInvitationInput | InvitationRSVPCreateOrConnectWithoutInvitationInput[]
    createMany?: InvitationRSVPCreateManyInvitationInputEnvelope
    connect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutInvitationListNestedInput = {
    create?: XOR<UserCreateWithoutInvitationListInput, UserUncheckedCreateWithoutInvitationListInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitationListInput
    upsert?: UserUpsertWithoutInvitationListInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitationListInput, UserUpdateWithoutInvitationListInput>, UserUncheckedUpdateWithoutInvitationListInput>
  }

  export type InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput> | InvitationCoverPhotoCreateWithoutInvitationInput[] | InvitationCoverPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationCoverPhotoCreateOrConnectWithoutInvitationInput | InvitationCoverPhotoCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationCoverPhotoUpsertWithWhereUniqueWithoutInvitationInput | InvitationCoverPhotoUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationCoverPhotoCreateManyInvitationInputEnvelope
    set?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    disconnect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    delete?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    connect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    update?: InvitationCoverPhotoUpdateWithWhereUniqueWithoutInvitationInput | InvitationCoverPhotoUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationCoverPhotoUpdateManyWithWhereWithoutInvitationInput | InvitationCoverPhotoUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationCoverPhotoScalarWhereInput | InvitationCoverPhotoScalarWhereInput[]
  }

  export type InvitationPhotoUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput> | InvitationPhotoCreateWithoutInvitationInput[] | InvitationPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPhotoCreateOrConnectWithoutInvitationInput | InvitationPhotoCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationPhotoUpsertWithWhereUniqueWithoutInvitationInput | InvitationPhotoUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationPhotoCreateManyInvitationInputEnvelope
    set?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    disconnect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    delete?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    connect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    update?: InvitationPhotoUpdateWithWhereUniqueWithoutInvitationInput | InvitationPhotoUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationPhotoUpdateManyWithWhereWithoutInvitationInput | InvitationPhotoUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationPhotoScalarWhereInput | InvitationPhotoScalarWhereInput[]
  }

  export type InvitationPlaceUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput> | InvitationPlaceCreateWithoutInvitationInput[] | InvitationPlaceUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutInvitationInput | InvitationPlaceCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationPlaceUpsertWithWhereUniqueWithoutInvitationInput | InvitationPlaceUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationPlaceCreateManyInvitationInputEnvelope
    set?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    disconnect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    delete?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    update?: InvitationPlaceUpdateWithWhereUniqueWithoutInvitationInput | InvitationPlaceUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationPlaceUpdateManyWithWhereWithoutInvitationInput | InvitationPlaceUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
  }

  export type InvitationRSVPUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput> | InvitationRSVPCreateWithoutInvitationInput[] | InvitationRSVPUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationRSVPCreateOrConnectWithoutInvitationInput | InvitationRSVPCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationRSVPUpsertWithWhereUniqueWithoutInvitationInput | InvitationRSVPUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationRSVPCreateManyInvitationInputEnvelope
    set?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    disconnect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    delete?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    connect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    update?: InvitationRSVPUpdateWithWhereUniqueWithoutInvitationInput | InvitationRSVPUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationRSVPUpdateManyWithWhereWithoutInvitationInput | InvitationRSVPUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationRSVPScalarWhereInput | InvitationRSVPScalarWhereInput[]
  }

  export type InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput> | InvitationCoverPhotoCreateWithoutInvitationInput[] | InvitationCoverPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationCoverPhotoCreateOrConnectWithoutInvitationInput | InvitationCoverPhotoCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationCoverPhotoUpsertWithWhereUniqueWithoutInvitationInput | InvitationCoverPhotoUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationCoverPhotoCreateManyInvitationInputEnvelope
    set?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    disconnect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    delete?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    connect?: InvitationCoverPhotoWhereUniqueInput | InvitationCoverPhotoWhereUniqueInput[]
    update?: InvitationCoverPhotoUpdateWithWhereUniqueWithoutInvitationInput | InvitationCoverPhotoUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationCoverPhotoUpdateManyWithWhereWithoutInvitationInput | InvitationCoverPhotoUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationCoverPhotoScalarWhereInput | InvitationCoverPhotoScalarWhereInput[]
  }

  export type InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput> | InvitationPhotoCreateWithoutInvitationInput[] | InvitationPhotoUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPhotoCreateOrConnectWithoutInvitationInput | InvitationPhotoCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationPhotoUpsertWithWhereUniqueWithoutInvitationInput | InvitationPhotoUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationPhotoCreateManyInvitationInputEnvelope
    set?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    disconnect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    delete?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    connect?: InvitationPhotoWhereUniqueInput | InvitationPhotoWhereUniqueInput[]
    update?: InvitationPhotoUpdateWithWhereUniqueWithoutInvitationInput | InvitationPhotoUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationPhotoUpdateManyWithWhereWithoutInvitationInput | InvitationPhotoUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationPhotoScalarWhereInput | InvitationPhotoScalarWhereInput[]
  }

  export type InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput> | InvitationPlaceCreateWithoutInvitationInput[] | InvitationPlaceUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutInvitationInput | InvitationPlaceCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationPlaceUpsertWithWhereUniqueWithoutInvitationInput | InvitationPlaceUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationPlaceCreateManyInvitationInputEnvelope
    set?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    disconnect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    delete?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    update?: InvitationPlaceUpdateWithWhereUniqueWithoutInvitationInput | InvitationPlaceUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationPlaceUpdateManyWithWhereWithoutInvitationInput | InvitationPlaceUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
  }

  export type InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput = {
    create?: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput> | InvitationRSVPCreateWithoutInvitationInput[] | InvitationRSVPUncheckedCreateWithoutInvitationInput[]
    connectOrCreate?: InvitationRSVPCreateOrConnectWithoutInvitationInput | InvitationRSVPCreateOrConnectWithoutInvitationInput[]
    upsert?: InvitationRSVPUpsertWithWhereUniqueWithoutInvitationInput | InvitationRSVPUpsertWithWhereUniqueWithoutInvitationInput[]
    createMany?: InvitationRSVPCreateManyInvitationInputEnvelope
    set?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    disconnect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    delete?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    connect?: InvitationRSVPWhereUniqueInput | InvitationRSVPWhereUniqueInput[]
    update?: InvitationRSVPUpdateWithWhereUniqueWithoutInvitationInput | InvitationRSVPUpdateWithWhereUniqueWithoutInvitationInput[]
    updateMany?: InvitationRSVPUpdateManyWithWhereWithoutInvitationInput | InvitationRSVPUpdateManyWithWhereWithoutInvitationInput[]
    deleteMany?: InvitationRSVPScalarWhereInput | InvitationRSVPScalarWhereInput[]
  }

  export type PlaceCreateNestedOneWithoutInvitationPlaceListInput = {
    create?: XOR<PlaceCreateWithoutInvitationPlaceListInput, PlaceUncheckedCreateWithoutInvitationPlaceListInput>
    connectOrCreate?: PlaceCreateOrConnectWithoutInvitationPlaceListInput
    connect?: PlaceWhereUniqueInput
  }

  export type InvitationCreateNestedOneWithoutPlaceListInput = {
    create?: XOR<InvitationCreateWithoutPlaceListInput, InvitationUncheckedCreateWithoutPlaceListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPlaceListInput
    connect?: InvitationWhereUniqueInput
  }

  export type InvitationPlaceTimeCreateNestedManyWithoutInvitationPlaceInput = {
    create?: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput> | InvitationPlaceTimeCreateWithoutInvitationPlaceInput[] | InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput[]
    connectOrCreate?: InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput | InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput[]
    createMany?: InvitationPlaceTimeCreateManyInvitationPlaceInputEnvelope
    connect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
  }

  export type InvitationPlaceTimeUncheckedCreateNestedManyWithoutInvitationPlaceInput = {
    create?: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput> | InvitationPlaceTimeCreateWithoutInvitationPlaceInput[] | InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput[]
    connectOrCreate?: InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput | InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput[]
    createMany?: InvitationPlaceTimeCreateManyInvitationPlaceInputEnvelope
    connect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
  }

  export type PlaceUpdateOneWithoutInvitationPlaceListNestedInput = {
    create?: XOR<PlaceCreateWithoutInvitationPlaceListInput, PlaceUncheckedCreateWithoutInvitationPlaceListInput>
    connectOrCreate?: PlaceCreateOrConnectWithoutInvitationPlaceListInput
    upsert?: PlaceUpsertWithoutInvitationPlaceListInput
    disconnect?: PlaceWhereInput | boolean
    delete?: PlaceWhereInput | boolean
    connect?: PlaceWhereUniqueInput
    update?: XOR<XOR<PlaceUpdateToOneWithWhereWithoutInvitationPlaceListInput, PlaceUpdateWithoutInvitationPlaceListInput>, PlaceUncheckedUpdateWithoutInvitationPlaceListInput>
  }

  export type InvitationUpdateOneWithoutPlaceListNestedInput = {
    create?: XOR<InvitationCreateWithoutPlaceListInput, InvitationUncheckedCreateWithoutPlaceListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPlaceListInput
    upsert?: InvitationUpsertWithoutPlaceListInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutPlaceListInput, InvitationUpdateWithoutPlaceListInput>, InvitationUncheckedUpdateWithoutPlaceListInput>
  }

  export type InvitationPlaceTimeUpdateManyWithoutInvitationPlaceNestedInput = {
    create?: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput> | InvitationPlaceTimeCreateWithoutInvitationPlaceInput[] | InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput[]
    connectOrCreate?: InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput | InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput[]
    upsert?: InvitationPlaceTimeUpsertWithWhereUniqueWithoutInvitationPlaceInput | InvitationPlaceTimeUpsertWithWhereUniqueWithoutInvitationPlaceInput[]
    createMany?: InvitationPlaceTimeCreateManyInvitationPlaceInputEnvelope
    set?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    disconnect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    delete?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    connect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    update?: InvitationPlaceTimeUpdateWithWhereUniqueWithoutInvitationPlaceInput | InvitationPlaceTimeUpdateWithWhereUniqueWithoutInvitationPlaceInput[]
    updateMany?: InvitationPlaceTimeUpdateManyWithWhereWithoutInvitationPlaceInput | InvitationPlaceTimeUpdateManyWithWhereWithoutInvitationPlaceInput[]
    deleteMany?: InvitationPlaceTimeScalarWhereInput | InvitationPlaceTimeScalarWhereInput[]
  }

  export type InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceNestedInput = {
    create?: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput> | InvitationPlaceTimeCreateWithoutInvitationPlaceInput[] | InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput[]
    connectOrCreate?: InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput | InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput[]
    upsert?: InvitationPlaceTimeUpsertWithWhereUniqueWithoutInvitationPlaceInput | InvitationPlaceTimeUpsertWithWhereUniqueWithoutInvitationPlaceInput[]
    createMany?: InvitationPlaceTimeCreateManyInvitationPlaceInputEnvelope
    set?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    disconnect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    delete?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    connect?: InvitationPlaceTimeWhereUniqueInput | InvitationPlaceTimeWhereUniqueInput[]
    update?: InvitationPlaceTimeUpdateWithWhereUniqueWithoutInvitationPlaceInput | InvitationPlaceTimeUpdateWithWhereUniqueWithoutInvitationPlaceInput[]
    updateMany?: InvitationPlaceTimeUpdateManyWithWhereWithoutInvitationPlaceInput | InvitationPlaceTimeUpdateManyWithWhereWithoutInvitationPlaceInput[]
    deleteMany?: InvitationPlaceTimeScalarWhereInput | InvitationPlaceTimeScalarWhereInput[]
  }

  export type InvitationPlaceCreateNestedManyWithoutPlaceInput = {
    create?: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput> | InvitationPlaceCreateWithoutPlaceInput[] | InvitationPlaceUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutPlaceInput | InvitationPlaceCreateOrConnectWithoutPlaceInput[]
    createMany?: InvitationPlaceCreateManyPlaceInputEnvelope
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
  }

  export type InvitationPlaceUncheckedCreateNestedManyWithoutPlaceInput = {
    create?: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput> | InvitationPlaceCreateWithoutPlaceInput[] | InvitationPlaceUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutPlaceInput | InvitationPlaceCreateOrConnectWithoutPlaceInput[]
    createMany?: InvitationPlaceCreateManyPlaceInputEnvelope
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvitationPlaceUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput> | InvitationPlaceCreateWithoutPlaceInput[] | InvitationPlaceUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutPlaceInput | InvitationPlaceCreateOrConnectWithoutPlaceInput[]
    upsert?: InvitationPlaceUpsertWithWhereUniqueWithoutPlaceInput | InvitationPlaceUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: InvitationPlaceCreateManyPlaceInputEnvelope
    set?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    disconnect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    delete?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    update?: InvitationPlaceUpdateWithWhereUniqueWithoutPlaceInput | InvitationPlaceUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: InvitationPlaceUpdateManyWithWhereWithoutPlaceInput | InvitationPlaceUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
  }

  export type InvitationPlaceUncheckedUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput> | InvitationPlaceCreateWithoutPlaceInput[] | InvitationPlaceUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutPlaceInput | InvitationPlaceCreateOrConnectWithoutPlaceInput[]
    upsert?: InvitationPlaceUpsertWithWhereUniqueWithoutPlaceInput | InvitationPlaceUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: InvitationPlaceCreateManyPlaceInputEnvelope
    set?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    disconnect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    delete?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    connect?: InvitationPlaceWhereUniqueInput | InvitationPlaceWhereUniqueInput[]
    update?: InvitationPlaceUpdateWithWhereUniqueWithoutPlaceInput | InvitationPlaceUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: InvitationPlaceUpdateManyWithWhereWithoutPlaceInput | InvitationPlaceUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
  }

  export type InvitationPlaceCreateNestedOneWithoutTimeListInput = {
    create?: XOR<InvitationPlaceCreateWithoutTimeListInput, InvitationPlaceUncheckedCreateWithoutTimeListInput>
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutTimeListInput
    connect?: InvitationPlaceWhereUniqueInput
  }

  export type InvitationPlaceUpdateOneWithoutTimeListNestedInput = {
    create?: XOR<InvitationPlaceCreateWithoutTimeListInput, InvitationPlaceUncheckedCreateWithoutTimeListInput>
    connectOrCreate?: InvitationPlaceCreateOrConnectWithoutTimeListInput
    upsert?: InvitationPlaceUpsertWithoutTimeListInput
    disconnect?: InvitationPlaceWhereInput | boolean
    delete?: InvitationPlaceWhereInput | boolean
    connect?: InvitationPlaceWhereUniqueInput
    update?: XOR<XOR<InvitationPlaceUpdateToOneWithWhereWithoutTimeListInput, InvitationPlaceUpdateWithoutTimeListInput>, InvitationPlaceUncheckedUpdateWithoutTimeListInput>
  }

  export type InvitationCreateNestedOneWithoutPhotoListInput = {
    create?: XOR<InvitationCreateWithoutPhotoListInput, InvitationUncheckedCreateWithoutPhotoListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPhotoListInput
    connect?: InvitationWhereUniqueInput
  }

  export type InvitationUpdateOneWithoutPhotoListNestedInput = {
    create?: XOR<InvitationCreateWithoutPhotoListInput, InvitationUncheckedCreateWithoutPhotoListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutPhotoListInput
    upsert?: InvitationUpsertWithoutPhotoListInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutPhotoListInput, InvitationUpdateWithoutPhotoListInput>, InvitationUncheckedUpdateWithoutPhotoListInput>
  }

  export type InvitationCreateNestedOneWithoutInvitationCoverPhotoListInput = {
    create?: XOR<InvitationCreateWithoutInvitationCoverPhotoListInput, InvitationUncheckedCreateWithoutInvitationCoverPhotoListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitationCoverPhotoListInput
    connect?: InvitationWhereUniqueInput
  }

  export type InvitationUpdateOneWithoutInvitationCoverPhotoListNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitationCoverPhotoListInput, InvitationUncheckedCreateWithoutInvitationCoverPhotoListInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitationCoverPhotoListInput
    upsert?: InvitationUpsertWithoutInvitationCoverPhotoListInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutInvitationCoverPhotoListInput, InvitationUpdateWithoutInvitationCoverPhotoListInput>, InvitationUncheckedUpdateWithoutInvitationCoverPhotoListInput>
  }

  export type InvitationCreateNestedOneWithoutInvitationRSVPInput = {
    create?: XOR<InvitationCreateWithoutInvitationRSVPInput, InvitationUncheckedCreateWithoutInvitationRSVPInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitationRSVPInput
    connect?: InvitationWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type InvitationUpdateOneWithoutInvitationRSVPNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitationRSVPInput, InvitationUncheckedCreateWithoutInvitationRSVPInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitationRSVPInput
    upsert?: InvitationUpsertWithoutInvitationRSVPInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutInvitationRSVPInput, InvitationUpdateWithoutInvitationRSVPInput>, InvitationUncheckedUpdateWithoutInvitationRSVPInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type InvitationCreateWithoutUserInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutUserInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutUserInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
  }

  export type InvitationCreateManyUserInputEnvelope = {
    data: InvitationCreateManyUserInput | InvitationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InvitationUpsertWithWhereUniqueWithoutUserInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutUserInput, InvitationUncheckedUpdateWithoutUserInput>
    create: XOR<InvitationCreateWithoutUserInput, InvitationUncheckedCreateWithoutUserInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutUserInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutUserInput, InvitationUncheckedUpdateWithoutUserInput>
  }

  export type InvitationUpdateManyWithWhereWithoutUserInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutUserInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: IntFilter<"Invitation"> | number
    templateNo?: IntNullableFilter<"Invitation"> | number | null
    uniqueId?: StringNullableFilter<"Invitation"> | string | null
    date?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    userId?: IntNullableFilter<"Invitation"> | number | null
    title?: StringNullableFilter<"Invitation"> | string | null
    pointColor?: StringNullableFilter<"Invitation"> | string | null
    mainTextColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeGentleman?: StringNullableFilter<"Invitation"> | string | null
    dressCodeLady?: StringNullableFilter<"Invitation"> | string | null
    bgColor?: StringNullableFilter<"Invitation"> | string | null
    musicKey?: StringNullableFilter<"Invitation"> | string | null
    musicFilename?: StringNullableFilter<"Invitation"> | string | null
    musicFileKey?: StringNullableFilter<"Invitation"> | string | null
    notice?: StringNullableFilter<"Invitation"> | string | null
    brideFirstName?: StringNullableFilter<"Invitation"> | string | null
    brideMiddleName?: StringNullableFilter<"Invitation"> | string | null
    dressCodeMainColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeSubColor?: StringNullableFilter<"Invitation"> | string | null
    dressCodeThirdColor?: StringNullableFilter<"Invitation"> | string | null
    brideLastName?: StringNullableFilter<"Invitation"> | string | null
    brideMomName?: StringNullableFilter<"Invitation"> | string | null
    greetingTitle?: StringNullableFilter<"Invitation"> | string | null
    greetingContent?: StringNullableFilter<"Invitation"> | string | null
    brideDadName?: StringNullableFilter<"Invitation"> | string | null
    bridePhone?: StringNullableFilter<"Invitation"> | string | null
    groomFirstName?: StringNullableFilter<"Invitation"> | string | null
    groomMiddleName?: StringNullableFilter<"Invitation"> | string | null
    groomLastName?: StringNullableFilter<"Invitation"> | string | null
    groomPhone?: StringNullableFilter<"Invitation"> | string | null
    primarySponsor?: StringNullableFilter<"Invitation"> | string | null
    secondarySponsor?: StringNullableFilter<"Invitation"> | string | null
    maidOfHonor?: StringNullableFilter<"Invitation"> | string | null
    groomsMen?: StringNullableFilter<"Invitation"> | string | null
    bestMan?: StringNullableFilter<"Invitation"> | string | null
    bridesMaids?: StringNullableFilter<"Invitation"> | string | null
    groomMomName?: StringNullableFilter<"Invitation"> | string | null
    groomDadName?: StringNullableFilter<"Invitation"> | string | null
    layoutOrder?: JsonNullableFilter<"Invitation">
    endingText?: StringNullableFilter<"Invitation"> | string | null
    ogImageKey?: StringNullableFilter<"Invitation"> | string | null
    createdAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
  }

  export type UserCreateWithoutInvitationListInput = {
    email?: string | null
    password?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type UserUncheckedCreateWithoutInvitationListInput = {
    id?: number
    email?: string | null
    password?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type UserCreateOrConnectWithoutInvitationListInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitationListInput, UserUncheckedCreateWithoutInvitationListInput>
  }

  export type InvitationCoverPhotoCreateWithoutInvitationInput = {
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationCoverPhotoUncheckedCreateWithoutInvitationInput = {
    id?: number
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationCoverPhotoCreateOrConnectWithoutInvitationInput = {
    where: InvitationCoverPhotoWhereUniqueInput
    create: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationCoverPhotoCreateManyInvitationInputEnvelope = {
    data: InvitationCoverPhotoCreateManyInvitationInput | InvitationCoverPhotoCreateManyInvitationInput[]
    skipDuplicates?: boolean
  }

  export type InvitationPhotoCreateWithoutInvitationInput = {
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
  }

  export type InvitationPhotoUncheckedCreateWithoutInvitationInput = {
    id?: number
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
  }

  export type InvitationPhotoCreateOrConnectWithoutInvitationInput = {
    where: InvitationPhotoWhereUniqueInput
    create: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationPhotoCreateManyInvitationInputEnvelope = {
    data: InvitationPhotoCreateManyInvitationInput | InvitationPhotoCreateManyInvitationInput[]
    skipDuplicates?: boolean
  }

  export type InvitationPlaceCreateWithoutInvitationInput = {
    order?: number | null
    placeDetail?: string | null
    place?: PlaceCreateNestedOneWithoutInvitationPlaceListInput
    timeList?: InvitationPlaceTimeCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceUncheckedCreateWithoutInvitationInput = {
    id?: number
    order?: number | null
    placeId?: number | null
    placeDetail?: string | null
    timeList?: InvitationPlaceTimeUncheckedCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceCreateOrConnectWithoutInvitationInput = {
    where: InvitationPlaceWhereUniqueInput
    create: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationPlaceCreateManyInvitationInputEnvelope = {
    data: InvitationPlaceCreateManyInvitationInput | InvitationPlaceCreateManyInvitationInput[]
    skipDuplicates?: boolean
  }

  export type InvitationRSVPCreateWithoutInvitationInput = {
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
  }

  export type InvitationRSVPUncheckedCreateWithoutInvitationInput = {
    id?: number
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
  }

  export type InvitationRSVPCreateOrConnectWithoutInvitationInput = {
    where: InvitationRSVPWhereUniqueInput
    create: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationRSVPCreateManyInvitationInputEnvelope = {
    data: InvitationRSVPCreateManyInvitationInput | InvitationRSVPCreateManyInvitationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInvitationListInput = {
    update: XOR<UserUpdateWithoutInvitationListInput, UserUncheckedUpdateWithoutInvitationListInput>
    create: XOR<UserCreateWithoutInvitationListInput, UserUncheckedCreateWithoutInvitationListInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitationListInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitationListInput, UserUncheckedUpdateWithoutInvitationListInput>
  }

  export type UserUpdateWithoutInvitationListInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutInvitationListInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoUpsertWithWhereUniqueWithoutInvitationInput = {
    where: InvitationCoverPhotoWhereUniqueInput
    update: XOR<InvitationCoverPhotoUpdateWithoutInvitationInput, InvitationCoverPhotoUncheckedUpdateWithoutInvitationInput>
    create: XOR<InvitationCoverPhotoCreateWithoutInvitationInput, InvitationCoverPhotoUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationCoverPhotoUpdateWithWhereUniqueWithoutInvitationInput = {
    where: InvitationCoverPhotoWhereUniqueInput
    data: XOR<InvitationCoverPhotoUpdateWithoutInvitationInput, InvitationCoverPhotoUncheckedUpdateWithoutInvitationInput>
  }

  export type InvitationCoverPhotoUpdateManyWithWhereWithoutInvitationInput = {
    where: InvitationCoverPhotoScalarWhereInput
    data: XOR<InvitationCoverPhotoUpdateManyMutationInput, InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationInput>
  }

  export type InvitationCoverPhotoScalarWhereInput = {
    AND?: InvitationCoverPhotoScalarWhereInput | InvitationCoverPhotoScalarWhereInput[]
    OR?: InvitationCoverPhotoScalarWhereInput[]
    NOT?: InvitationCoverPhotoScalarWhereInput | InvitationCoverPhotoScalarWhereInput[]
    id?: IntFilter<"InvitationCoverPhoto"> | number
    invitationId?: IntNullableFilter<"InvitationCoverPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    type?: StringNullableFilter<"InvitationCoverPhoto"> | string | null
    cropX?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropY?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    width?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    height?: FloatNullableFilter<"InvitationCoverPhoto"> | number | null
    createdAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"InvitationCoverPhoto"> | Date | string | null
  }

  export type InvitationPhotoUpsertWithWhereUniqueWithoutInvitationInput = {
    where: InvitationPhotoWhereUniqueInput
    update: XOR<InvitationPhotoUpdateWithoutInvitationInput, InvitationPhotoUncheckedUpdateWithoutInvitationInput>
    create: XOR<InvitationPhotoCreateWithoutInvitationInput, InvitationPhotoUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationPhotoUpdateWithWhereUniqueWithoutInvitationInput = {
    where: InvitationPhotoWhereUniqueInput
    data: XOR<InvitationPhotoUpdateWithoutInvitationInput, InvitationPhotoUncheckedUpdateWithoutInvitationInput>
  }

  export type InvitationPhotoUpdateManyWithWhereWithoutInvitationInput = {
    where: InvitationPhotoScalarWhereInput
    data: XOR<InvitationPhotoUpdateManyMutationInput, InvitationPhotoUncheckedUpdateManyWithoutInvitationInput>
  }

  export type InvitationPhotoScalarWhereInput = {
    AND?: InvitationPhotoScalarWhereInput | InvitationPhotoScalarWhereInput[]
    OR?: InvitationPhotoScalarWhereInput[]
    NOT?: InvitationPhotoScalarWhereInput | InvitationPhotoScalarWhereInput[]
    id?: IntFilter<"InvitationPhoto"> | number
    invitationId?: StringNullableFilter<"InvitationPhoto"> | string | null
    width?: IntNullableFilter<"InvitationPhoto"> | number | null
    height?: IntNullableFilter<"InvitationPhoto"> | number | null
    order?: IntNullableFilter<"InvitationPhoto"> | number | null
    originalKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    croppedKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    cropX?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropY?: IntNullableFilter<"InvitationPhoto"> | number | null
    cropZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
    thumbKey?: StringNullableFilter<"InvitationPhoto"> | string | null
    thumbX?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbY?: IntNullableFilter<"InvitationPhoto"> | number | null
    thumbZoom?: FloatNullableFilter<"InvitationPhoto"> | number | null
  }

  export type InvitationPlaceUpsertWithWhereUniqueWithoutInvitationInput = {
    where: InvitationPlaceWhereUniqueInput
    update: XOR<InvitationPlaceUpdateWithoutInvitationInput, InvitationPlaceUncheckedUpdateWithoutInvitationInput>
    create: XOR<InvitationPlaceCreateWithoutInvitationInput, InvitationPlaceUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationPlaceUpdateWithWhereUniqueWithoutInvitationInput = {
    where: InvitationPlaceWhereUniqueInput
    data: XOR<InvitationPlaceUpdateWithoutInvitationInput, InvitationPlaceUncheckedUpdateWithoutInvitationInput>
  }

  export type InvitationPlaceUpdateManyWithWhereWithoutInvitationInput = {
    where: InvitationPlaceScalarWhereInput
    data: XOR<InvitationPlaceUpdateManyMutationInput, InvitationPlaceUncheckedUpdateManyWithoutInvitationInput>
  }

  export type InvitationPlaceScalarWhereInput = {
    AND?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
    OR?: InvitationPlaceScalarWhereInput[]
    NOT?: InvitationPlaceScalarWhereInput | InvitationPlaceScalarWhereInput[]
    id?: IntFilter<"InvitationPlace"> | number
    invitationId?: IntNullableFilter<"InvitationPlace"> | number | null
    order?: IntNullableFilter<"InvitationPlace"> | number | null
    placeId?: IntNullableFilter<"InvitationPlace"> | number | null
    placeDetail?: StringNullableFilter<"InvitationPlace"> | string | null
  }

  export type InvitationRSVPUpsertWithWhereUniqueWithoutInvitationInput = {
    where: InvitationRSVPWhereUniqueInput
    update: XOR<InvitationRSVPUpdateWithoutInvitationInput, InvitationRSVPUncheckedUpdateWithoutInvitationInput>
    create: XOR<InvitationRSVPCreateWithoutInvitationInput, InvitationRSVPUncheckedCreateWithoutInvitationInput>
  }

  export type InvitationRSVPUpdateWithWhereUniqueWithoutInvitationInput = {
    where: InvitationRSVPWhereUniqueInput
    data: XOR<InvitationRSVPUpdateWithoutInvitationInput, InvitationRSVPUncheckedUpdateWithoutInvitationInput>
  }

  export type InvitationRSVPUpdateManyWithWhereWithoutInvitationInput = {
    where: InvitationRSVPScalarWhereInput
    data: XOR<InvitationRSVPUpdateManyMutationInput, InvitationRSVPUncheckedUpdateManyWithoutInvitationInput>
  }

  export type InvitationRSVPScalarWhereInput = {
    AND?: InvitationRSVPScalarWhereInput | InvitationRSVPScalarWhereInput[]
    OR?: InvitationRSVPScalarWhereInput[]
    NOT?: InvitationRSVPScalarWhereInput | InvitationRSVPScalarWhereInput[]
    id?: IntFilter<"InvitationRSVP"> | number
    invitationId?: IntNullableFilter<"InvitationRSVP"> | number | null
    side?: StringNullableFilter<"InvitationRSVP"> | string | null
    name?: StringNullableFilter<"InvitationRSVP"> | string | null
    email?: StringNullableFilter<"InvitationRSVP"> | string | null
    phone?: StringNullableFilter<"InvitationRSVP"> | string | null
    attending?: BoolNullableFilter<"InvitationRSVP"> | boolean | null
    createdAt?: DateTimeNullableFilter<"InvitationRSVP"> | Date | string | null
  }

  export type PlaceCreateWithoutInvitationPlaceListInput = {
    googlePlaceId?: string | null
    name?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type PlaceUncheckedCreateWithoutInvitationPlaceListInput = {
    id?: number
    googlePlaceId?: string | null
    name?: string | null
    address?: string | null
    lat?: number | null
    lng?: number | null
  }

  export type PlaceCreateOrConnectWithoutInvitationPlaceListInput = {
    where: PlaceWhereUniqueInput
    create: XOR<PlaceCreateWithoutInvitationPlaceListInput, PlaceUncheckedCreateWithoutInvitationPlaceListInput>
  }

  export type InvitationCreateWithoutPlaceListInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutInvitationListInput
    invitationCoverPhotoList?: InvitationCoverPhotoCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutPlaceListInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutPlaceListInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutPlaceListInput, InvitationUncheckedCreateWithoutPlaceListInput>
  }

  export type InvitationPlaceTimeCreateWithoutInvitationPlaceInput = {
    time?: Date | string | null
    name?: string | null
    description?: string | null
  }

  export type InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput = {
    id?: number
    time?: Date | string | null
    name?: string | null
    description?: string | null
  }

  export type InvitationPlaceTimeCreateOrConnectWithoutInvitationPlaceInput = {
    where: InvitationPlaceTimeWhereUniqueInput
    create: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput>
  }

  export type InvitationPlaceTimeCreateManyInvitationPlaceInputEnvelope = {
    data: InvitationPlaceTimeCreateManyInvitationPlaceInput | InvitationPlaceTimeCreateManyInvitationPlaceInput[]
    skipDuplicates?: boolean
  }

  export type PlaceUpsertWithoutInvitationPlaceListInput = {
    update: XOR<PlaceUpdateWithoutInvitationPlaceListInput, PlaceUncheckedUpdateWithoutInvitationPlaceListInput>
    create: XOR<PlaceCreateWithoutInvitationPlaceListInput, PlaceUncheckedCreateWithoutInvitationPlaceListInput>
    where?: PlaceWhereInput
  }

  export type PlaceUpdateToOneWithWhereWithoutInvitationPlaceListInput = {
    where?: PlaceWhereInput
    data: XOR<PlaceUpdateWithoutInvitationPlaceListInput, PlaceUncheckedUpdateWithoutInvitationPlaceListInput>
  }

  export type PlaceUpdateWithoutInvitationPlaceListInput = {
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PlaceUncheckedUpdateWithoutInvitationPlaceListInput = {
    id?: IntFieldUpdateOperationsInput | number
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationUpsertWithoutPlaceListInput = {
    update: XOR<InvitationUpdateWithoutPlaceListInput, InvitationUncheckedUpdateWithoutPlaceListInput>
    create: XOR<InvitationCreateWithoutPlaceListInput, InvitationUncheckedCreateWithoutPlaceListInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutPlaceListInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutPlaceListInput, InvitationUncheckedUpdateWithoutPlaceListInput>
  }

  export type InvitationUpdateWithoutPlaceListInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutInvitationListNestedInput
    invitationCoverPhotoList?: InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutPlaceListInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationPlaceTimeUpsertWithWhereUniqueWithoutInvitationPlaceInput = {
    where: InvitationPlaceTimeWhereUniqueInput
    update: XOR<InvitationPlaceTimeUpdateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedUpdateWithoutInvitationPlaceInput>
    create: XOR<InvitationPlaceTimeCreateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedCreateWithoutInvitationPlaceInput>
  }

  export type InvitationPlaceTimeUpdateWithWhereUniqueWithoutInvitationPlaceInput = {
    where: InvitationPlaceTimeWhereUniqueInput
    data: XOR<InvitationPlaceTimeUpdateWithoutInvitationPlaceInput, InvitationPlaceTimeUncheckedUpdateWithoutInvitationPlaceInput>
  }

  export type InvitationPlaceTimeUpdateManyWithWhereWithoutInvitationPlaceInput = {
    where: InvitationPlaceTimeScalarWhereInput
    data: XOR<InvitationPlaceTimeUpdateManyMutationInput, InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceInput>
  }

  export type InvitationPlaceTimeScalarWhereInput = {
    AND?: InvitationPlaceTimeScalarWhereInput | InvitationPlaceTimeScalarWhereInput[]
    OR?: InvitationPlaceTimeScalarWhereInput[]
    NOT?: InvitationPlaceTimeScalarWhereInput | InvitationPlaceTimeScalarWhereInput[]
    id?: IntFilter<"InvitationPlaceTime"> | number
    invitationPlaceId?: IntNullableFilter<"InvitationPlaceTime"> | number | null
    time?: DateTimeNullableFilter<"InvitationPlaceTime"> | Date | string | null
    name?: StringNullableFilter<"InvitationPlaceTime"> | string | null
    description?: StringNullableFilter<"InvitationPlaceTime"> | string | null
  }

  export type InvitationPlaceCreateWithoutPlaceInput = {
    order?: number | null
    placeDetail?: string | null
    invitation?: InvitationCreateNestedOneWithoutPlaceListInput
    timeList?: InvitationPlaceTimeCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceUncheckedCreateWithoutPlaceInput = {
    id?: number
    invitationId?: number | null
    order?: number | null
    placeDetail?: string | null
    timeList?: InvitationPlaceTimeUncheckedCreateNestedManyWithoutInvitationPlaceInput
  }

  export type InvitationPlaceCreateOrConnectWithoutPlaceInput = {
    where: InvitationPlaceWhereUniqueInput
    create: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput>
  }

  export type InvitationPlaceCreateManyPlaceInputEnvelope = {
    data: InvitationPlaceCreateManyPlaceInput | InvitationPlaceCreateManyPlaceInput[]
    skipDuplicates?: boolean
  }

  export type InvitationPlaceUpsertWithWhereUniqueWithoutPlaceInput = {
    where: InvitationPlaceWhereUniqueInput
    update: XOR<InvitationPlaceUpdateWithoutPlaceInput, InvitationPlaceUncheckedUpdateWithoutPlaceInput>
    create: XOR<InvitationPlaceCreateWithoutPlaceInput, InvitationPlaceUncheckedCreateWithoutPlaceInput>
  }

  export type InvitationPlaceUpdateWithWhereUniqueWithoutPlaceInput = {
    where: InvitationPlaceWhereUniqueInput
    data: XOR<InvitationPlaceUpdateWithoutPlaceInput, InvitationPlaceUncheckedUpdateWithoutPlaceInput>
  }

  export type InvitationPlaceUpdateManyWithWhereWithoutPlaceInput = {
    where: InvitationPlaceScalarWhereInput
    data: XOR<InvitationPlaceUpdateManyMutationInput, InvitationPlaceUncheckedUpdateManyWithoutPlaceInput>
  }

  export type InvitationPlaceCreateWithoutTimeListInput = {
    order?: number | null
    placeDetail?: string | null
    place?: PlaceCreateNestedOneWithoutInvitationPlaceListInput
    invitation?: InvitationCreateNestedOneWithoutPlaceListInput
  }

  export type InvitationPlaceUncheckedCreateWithoutTimeListInput = {
    id?: number
    invitationId?: number | null
    order?: number | null
    placeId?: number | null
    placeDetail?: string | null
  }

  export type InvitationPlaceCreateOrConnectWithoutTimeListInput = {
    where: InvitationPlaceWhereUniqueInput
    create: XOR<InvitationPlaceCreateWithoutTimeListInput, InvitationPlaceUncheckedCreateWithoutTimeListInput>
  }

  export type InvitationPlaceUpsertWithoutTimeListInput = {
    update: XOR<InvitationPlaceUpdateWithoutTimeListInput, InvitationPlaceUncheckedUpdateWithoutTimeListInput>
    create: XOR<InvitationPlaceCreateWithoutTimeListInput, InvitationPlaceUncheckedCreateWithoutTimeListInput>
    where?: InvitationPlaceWhereInput
  }

  export type InvitationPlaceUpdateToOneWithWhereWithoutTimeListInput = {
    where?: InvitationPlaceWhereInput
    data: XOR<InvitationPlaceUpdateWithoutTimeListInput, InvitationPlaceUncheckedUpdateWithoutTimeListInput>
  }

  export type InvitationPlaceUpdateWithoutTimeListInput = {
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    place?: PlaceUpdateOneWithoutInvitationPlaceListNestedInput
    invitation?: InvitationUpdateOneWithoutPlaceListNestedInput
  }

  export type InvitationPlaceUncheckedUpdateWithoutTimeListInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeId?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationCreateWithoutPhotoListInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutInvitationListInput
    invitationCoverPhotoList?: InvitationCoverPhotoCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutPhotoListInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutPhotoListInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutPhotoListInput, InvitationUncheckedCreateWithoutPhotoListInput>
  }

  export type InvitationUpsertWithoutPhotoListInput = {
    update: XOR<InvitationUpdateWithoutPhotoListInput, InvitationUncheckedUpdateWithoutPhotoListInput>
    create: XOR<InvitationCreateWithoutPhotoListInput, InvitationUncheckedCreateWithoutPhotoListInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutPhotoListInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutPhotoListInput, InvitationUncheckedUpdateWithoutPhotoListInput>
  }

  export type InvitationUpdateWithoutPhotoListInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutInvitationListNestedInput
    invitationCoverPhotoList?: InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutPhotoListInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateWithoutInvitationCoverPhotoListInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutInvitationListInput
    photoList?: InvitationPhotoCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutInvitationCoverPhotoListInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    photoList?: InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput
    invitationRSVP?: InvitationRSVPUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutInvitationCoverPhotoListInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutInvitationCoverPhotoListInput, InvitationUncheckedCreateWithoutInvitationCoverPhotoListInput>
  }

  export type InvitationUpsertWithoutInvitationCoverPhotoListInput = {
    update: XOR<InvitationUpdateWithoutInvitationCoverPhotoListInput, InvitationUncheckedUpdateWithoutInvitationCoverPhotoListInput>
    create: XOR<InvitationCreateWithoutInvitationCoverPhotoListInput, InvitationUncheckedCreateWithoutInvitationCoverPhotoListInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutInvitationCoverPhotoListInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutInvitationCoverPhotoListInput, InvitationUncheckedUpdateWithoutInvitationCoverPhotoListInput>
  }

  export type InvitationUpdateWithoutInvitationCoverPhotoListInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutInvitationListNestedInput
    photoList?: InvitationPhotoUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutInvitationCoverPhotoListInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoList?: InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateWithoutInvitationRSVPInput = {
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutInvitationListInput
    invitationCoverPhotoList?: InvitationCoverPhotoCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceCreateNestedManyWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutInvitationRSVPInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    userId?: number | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedCreateNestedManyWithoutInvitationInput
    photoList?: InvitationPhotoUncheckedCreateNestedManyWithoutInvitationInput
    placeList?: InvitationPlaceUncheckedCreateNestedManyWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutInvitationRSVPInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutInvitationRSVPInput, InvitationUncheckedCreateWithoutInvitationRSVPInput>
  }

  export type InvitationUpsertWithoutInvitationRSVPInput = {
    update: XOR<InvitationUpdateWithoutInvitationRSVPInput, InvitationUncheckedUpdateWithoutInvitationRSVPInput>
    create: XOR<InvitationCreateWithoutInvitationRSVPInput, InvitationUncheckedCreateWithoutInvitationRSVPInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutInvitationRSVPInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutInvitationRSVPInput, InvitationUncheckedUpdateWithoutInvitationRSVPInput>
  }

  export type InvitationUpdateWithoutInvitationRSVPInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutInvitationListNestedInput
    invitationCoverPhotoList?: InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutInvitationRSVPInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationCreateManyUserInput = {
    id?: number
    templateNo?: number | null
    uniqueId?: string | null
    date?: Date | string | null
    title?: string | null
    pointColor?: string | null
    mainTextColor?: string | null
    dressCodeGentleman?: string | null
    dressCodeLady?: string | null
    bgColor?: string | null
    musicKey?: string | null
    musicFilename?: string | null
    musicFileKey?: string | null
    notice?: string | null
    brideFirstName?: string | null
    brideMiddleName?: string | null
    dressCodeMainColor?: string | null
    dressCodeSubColor?: string | null
    dressCodeThirdColor?: string | null
    brideLastName?: string | null
    brideMomName?: string | null
    greetingTitle?: string | null
    greetingContent?: string | null
    brideDadName?: string | null
    bridePhone?: string | null
    groomFirstName?: string | null
    groomMiddleName?: string | null
    groomLastName?: string | null
    groomPhone?: string | null
    primarySponsor?: string | null
    secondarySponsor?: string | null
    maidOfHonor?: string | null
    groomsMen?: string | null
    bestMan?: string | null
    bridesMaids?: string | null
    groomMomName?: string | null
    groomDadName?: string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: string | null
    ogImageKey?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationUpdateWithoutUserInput = {
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitationCoverPhotoList?: InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    photoList?: InvitationPhotoUncheckedUpdateManyWithoutInvitationNestedInput
    placeList?: InvitationPlaceUncheckedUpdateManyWithoutInvitationNestedInput
    invitationRSVP?: InvitationRSVPUncheckedUpdateManyWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateNo?: NullableIntFieldUpdateOperationsInput | number | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    pointColor?: NullableStringFieldUpdateOperationsInput | string | null
    mainTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeGentleman?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeLady?: NullableStringFieldUpdateOperationsInput | string | null
    bgColor?: NullableStringFieldUpdateOperationsInput | string | null
    musicKey?: NullableStringFieldUpdateOperationsInput | string | null
    musicFilename?: NullableStringFieldUpdateOperationsInput | string | null
    musicFileKey?: NullableStringFieldUpdateOperationsInput | string | null
    notice?: NullableStringFieldUpdateOperationsInput | string | null
    brideFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeMainColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeSubColor?: NullableStringFieldUpdateOperationsInput | string | null
    dressCodeThirdColor?: NullableStringFieldUpdateOperationsInput | string | null
    brideLastName?: NullableStringFieldUpdateOperationsInput | string | null
    brideMomName?: NullableStringFieldUpdateOperationsInput | string | null
    greetingTitle?: NullableStringFieldUpdateOperationsInput | string | null
    greetingContent?: NullableStringFieldUpdateOperationsInput | string | null
    brideDadName?: NullableStringFieldUpdateOperationsInput | string | null
    bridePhone?: NullableStringFieldUpdateOperationsInput | string | null
    groomFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    groomMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    groomLastName?: NullableStringFieldUpdateOperationsInput | string | null
    groomPhone?: NullableStringFieldUpdateOperationsInput | string | null
    primarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    secondarySponsor?: NullableStringFieldUpdateOperationsInput | string | null
    maidOfHonor?: NullableStringFieldUpdateOperationsInput | string | null
    groomsMen?: NullableStringFieldUpdateOperationsInput | string | null
    bestMan?: NullableStringFieldUpdateOperationsInput | string | null
    bridesMaids?: NullableStringFieldUpdateOperationsInput | string | null
    groomMomName?: NullableStringFieldUpdateOperationsInput | string | null
    groomDadName?: NullableStringFieldUpdateOperationsInput | string | null
    layoutOrder?: NullableJsonNullValueInput | InputJsonValue
    endingText?: NullableStringFieldUpdateOperationsInput | string | null
    ogImageKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoCreateManyInvitationInput = {
    id?: number
    originalKey?: string | null
    croppedKey?: string | null
    type?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    width?: number | null
    height?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type InvitationPhotoCreateManyInvitationInput = {
    id?: number
    width?: number | null
    height?: number | null
    order?: number | null
    originalKey?: string | null
    croppedKey?: string | null
    cropX?: number | null
    cropY?: number | null
    cropZoom?: number | null
    thumbKey?: string | null
    thumbX?: number | null
    thumbY?: number | null
    thumbZoom?: number | null
  }

  export type InvitationPlaceCreateManyInvitationInput = {
    id?: number
    order?: number | null
    placeId?: number | null
    placeDetail?: string | null
  }

  export type InvitationRSVPCreateManyInvitationInput = {
    id?: number
    side?: string | null
    name?: string | null
    email?: string | null
    phone?: string | null
    attending?: boolean | null
    createdAt?: Date | string | null
  }

  export type InvitationCoverPhotoUpdateWithoutInvitationInput = {
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationCoverPhotoUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableFloatFieldUpdateOperationsInput | number | null
    cropY?: NullableFloatFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationPhotoUpdateWithoutInvitationInput = {
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPhotoUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPhotoUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    originalKey?: NullableStringFieldUpdateOperationsInput | string | null
    croppedKey?: NullableStringFieldUpdateOperationsInput | string | null
    cropX?: NullableIntFieldUpdateOperationsInput | number | null
    cropY?: NullableIntFieldUpdateOperationsInput | number | null
    cropZoom?: NullableFloatFieldUpdateOperationsInput | number | null
    thumbKey?: NullableStringFieldUpdateOperationsInput | string | null
    thumbX?: NullableIntFieldUpdateOperationsInput | number | null
    thumbY?: NullableIntFieldUpdateOperationsInput | number | null
    thumbZoom?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type InvitationPlaceUpdateWithoutInvitationInput = {
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    place?: PlaceUpdateOneWithoutInvitationPlaceListNestedInput
    timeList?: InvitationPlaceTimeUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeId?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    timeList?: InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeId?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationRSVPUpdateWithoutInvitationInput = {
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationRSVPUncheckedUpdateWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationRSVPUncheckedUpdateManyWithoutInvitationInput = {
    id?: IntFieldUpdateOperationsInput | number
    side?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    attending?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationPlaceTimeCreateManyInvitationPlaceInput = {
    id?: number
    time?: Date | string | null
    name?: string | null
    description?: string | null
  }

  export type InvitationPlaceTimeUpdateWithoutInvitationPlaceInput = {
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceTimeUncheckedUpdateWithoutInvitationPlaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InvitationPlaceCreateManyPlaceInput = {
    id?: number
    invitationId?: number | null
    order?: number | null
    placeDetail?: string | null
  }

  export type InvitationPlaceUpdateWithoutPlaceInput = {
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: InvitationUpdateOneWithoutPlaceListNestedInput
    timeList?: InvitationPlaceTimeUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceUncheckedUpdateWithoutPlaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
    timeList?: InvitationPlaceTimeUncheckedUpdateManyWithoutInvitationPlaceNestedInput
  }

  export type InvitationPlaceUncheckedUpdateManyWithoutPlaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    invitationId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    placeDetail?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}