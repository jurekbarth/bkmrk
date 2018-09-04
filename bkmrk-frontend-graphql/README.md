## Build docker image

`docker build -t jurekbarth/bkmrk-frontend .`

## RUN image

`docker run -d -p 3000:8080 jurekbarth/bkmrk-frontend`

Update Docker Compose with newer Image

`docker-compose up -d --no-deps --build frontend`
