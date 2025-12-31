# 베이스 이미지 설정
FROM node:22-alpine

# 공통 설정
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN yarn build
EXPOSE 3005
CMD ["node", "dist/main"]


