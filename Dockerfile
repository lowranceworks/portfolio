FROM node:lts-alpine as build-stage
LABEL author="lowranceworks"
WORKDIR /app/
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build
USER node

FROM nginx:stable-alpine
RUN apk update \
  apk upgrade
COPY --from=build-stage /app/dist/client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]