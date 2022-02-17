FROM node:16.14.0-alpine

WORKDIR /usr/app

COPY package.json  tsconfig.json ./

RUN yarn
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .
RUN yarn build

EXPOSE 3333
CMD [ "yarn", "start:prod" ]




