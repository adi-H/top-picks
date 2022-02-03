# FROM node:16-alpine 
# # Sets Working directory:
# WORKDIR /app
# # Add `/app/node_modules/.bin` to $PATH:
# ENV PATH /app/node_modules/.bin:$PATH
# # Install app dependencies:
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install — silent
# RUN npm install react-scripts@3.41 -g — silent
# # Bundle app source inside Docker image:
# COPY . ./
# # Start app (npm start script from package.json):
# CMD [“npm”, “start”]

# lol https://dzone.com/articles/how-to-dockerize-reactjs-app
# Step 1



FROM node:16-alpine as base-app

RUN mkdir /app

WORKDIR /app

# BUGFIX / BANDAID sigh 
# the npm install would fail because of a timezone issue 
# error: request to https://registry.npmjs.org/@testing-library%2freact failed, reason: certificate is not yet valid
# the standard fixes online didnt work 
RUN npm config set strict-ssl=false && \
    npm config set registry=http://registry.npmjs.org/

COPY package.json /app

RUN npm install

COPY . /app

# RUN npm start 
CMD [ "npm", "start" ]
# RUN npm run build


# # Stage 2

# FROM nginx:1.17.1-alpine

# COPY --from=base-app /app/build /usr/share/nginx/html