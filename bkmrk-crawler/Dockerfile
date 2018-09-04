FROM node:9.4.0

LABEL maintainer="post@jurekbarth.de"

COPY ./ ./app
WORKDIR /app

RUN npm install

EXPOSE 3001

CMD npm run production
