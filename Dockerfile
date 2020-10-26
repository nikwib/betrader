FROM node:12-stretch

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start

# docker build -t client .