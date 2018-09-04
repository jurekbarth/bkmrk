FROM debian:stable-slim
MAINTAINER Jurek Barth <post@jurekbarth.de>


RUN apt-get update -qqy \
  && apt-get -qqy install \
  wget ca-certificates apt-transport-https gnupg \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install google-chrome-unstable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN apt-get update && apt-get install -qqy curl

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
RUN apt-get update
RUN apt-get -y install nodejs yarn

COPY ./ ./app
WORKDIR /app

RUN mkdir /images

RUN npm install

CMD bash run_app.sh
