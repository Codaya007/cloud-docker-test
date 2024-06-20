# Usamos la imagen de Node.js
FROM node:18

# Seteamos el directorio de trabajo
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]
