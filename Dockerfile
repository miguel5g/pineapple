# Stage 1
FROM node:20 AS builder

WORKDIR /opt/app

COPY ./package* ./

RUN npm ci

COPY ./src ./src

COPY .swcrc ./

RUN npm run build

# Stage 2
FROM node:20 AS release

WORKDIR /opt/app

COPY ./package* ./

RUN npm ci --omit=dev

COPY --from=builder /opt/app/dist ./dist

CMD ["npm", "run", "start"]