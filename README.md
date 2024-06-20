# Dockerización frontend

La parte del frontend está en la carpeta ./client y está realizada con el framework de Next.js.
El archivo Dockerfile es el siguiente, y se levanta en el puerto 3000.

```
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

```

# Dockerización backend

La parte del backend está dentro de la carpeta ./server y está realizada con la librería de Express.js.
El archivo Dockerfile es el siguiente y se levanta en el puerto 3005.

```
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]

```
