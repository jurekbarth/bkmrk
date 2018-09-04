FROM node:9.4.0

LABEL maintainer="post@jurekbarth.de"

COPY ./ ./app
WORKDIR /app

RUN npm install bcrypt

RUN npm install

EXPOSE 3000

CMD npm run production
