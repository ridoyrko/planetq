# Development image
# FROM node:latest AS dev

# WORKDIR /code
# COPY package.json /code/package.json
# RUN npm install --force

# COPY . /code

# ENV CI=true
# ENV PORT=3000

# CMD ["npm", "start"]

# # Builder
# FROM dev AS build
# RUN npm run build

# Minimalistic image
FROM nginx:1.21-alpine
#COPY --from=build /code/build /usr/share/nginx/html
RUN mkdir /usr/share/nginx/htmlAdmin
COPY  ../deploy/web /usr/share/nginx/html 
COPY  ../deploy/admin /usr/share/nginx/htmlAdmin