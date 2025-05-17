FROM node:22 AS front

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=front /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]