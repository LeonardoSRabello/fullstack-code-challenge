FROM node:20

WORKDIR /app/backend

COPY ./package.json /app/backend/package.json
COPY ./tsconfig.json /app/backend/tsconfig.json
COPY ./yarn.lock /app/backend/yarn.lock
COPY ./.env /app/backend/.env

RUN yarn

COPY ./controllers/ /app/backend/controllers/
COPY ./interfaces/ /app/backend/interfaces/
COPY ./models/ /app/backend/models/
COPY ./routes/ /app/backend/routes/
COPY ./utils/ /app/backend/utils/
COPY ./index.ts /app/backend/index.ts

CMD [ "yarn", "start" ]