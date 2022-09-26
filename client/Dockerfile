# lol https://dzone.com/articles/how-to-dockerize-reactjs-app
# Step 1

FROM node:16-alpine as base-app
RUN mkdir /app
WORKDIR /app
# BUGFIX / BANDAID sigh 
# the npm install would fail because of a timezone issue 
# error: request to https://registry.npmjs.org/@testing-library%2freact failed, reason: certificate is not yet valid
# the standard fixes online didnt work 
# RUN npm config set strict-ssl=false && \
#     npm config set registry=http://registry.npmjs.org/

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "deploy"]


# FROM nginx:1.17.1-alpine
# COPY --from=base-app /app/build/ /usr/share/nginx/html