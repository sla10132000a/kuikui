# FROM node:16.4.2

# WORKDIR /app
# COPY package.json .
# COPY . .
# RUN yarn install
# RUN yarn build

# CMD ["yarn", "start"]

FROM node:alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN yarn install  && yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["yarn", "start"]