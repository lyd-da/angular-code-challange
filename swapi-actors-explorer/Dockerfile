FROM node:16 AS prod
WORKDIR /app

COPY . .
# RUN npm test - if you want to test before to build
# RUN yarn install && yarn build

FROM nginx:alpine
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=prod /app/build .
EXPOSE 8080
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]