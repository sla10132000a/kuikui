# FROM node:15.0.1
# WORKDIR /usr/src/app
# ENV CHOKIDAR_USEPOLLING=true


# CMD ["npm", "run", "dev"]

FROM node:15.0.1

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# CMD ["npm", "run", "dev"]
# CMD ["sh", "-c", "yarn",  "dev"]
CMD ["yarn",  "start"]