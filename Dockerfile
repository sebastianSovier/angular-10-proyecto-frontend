FROM node:15.2.1-alpine AS builder
COPY . ./pensiones.web
WORKDIR /pensiones.web
RUN npm i
EXPOSE 4200
RUN $(npm bin)/ng build --prod

FROM nginx:1.19.4-alpine
COPY --from=builder /pensiones.web/dist /usr/share/nginx/html
