FROM node:20 as build

WORKDIR /app/frontend

COPY ./.env /app/frontend/.env
COPY ./tsconfig.json /app/frontend/tsconfig.json
COPY ./package.json /app/frontend/package.json
COPY ./yarn.lock /app/frontend/yarn.lock

RUN yarn

COPY ./public/ /app/frontend/public/
COPY ./src/ /app/frontend/src/

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/frontend/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]