FROM node:18-alpine AS base
RUN npm install pnpm@latest -g --silent

FROM base AS dev

ENV PATH /opt/app/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY ./app/package.json /opt/app/
RUN pnpm install
COPY . .
RUN chown -R node:node /opt/app
USER node
EXPOSE 3000
