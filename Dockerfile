# syntax=docker/dockerfile:1

FROM node:22.9-slim
WORKDIR /webapp-client
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]
