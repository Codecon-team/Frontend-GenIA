# Etapa 1: Construção do frontend Vue
FROM node:22 AS front

WORKDIR /app

# Copia o package.json e instala as dependências
COPY package.json .
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Faz o build do Vue
RUN npm run build

# Etapa 2: Servir o conteúdo com Nginx
FROM nginx:alpine

# Remove arquivos antigos, caso existam, no diretório do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos de build do Vue para o Nginx
COPY --from=front /app/dist /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Roda o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
