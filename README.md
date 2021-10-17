# ChatBot Service

## Getting started
In the project directory, you can run:
```
npm install
npm start
```
This starts the API server in debug mode at localhost:3434


To run client side content, you can run:
```
cd client
npm start
```

This starts the React app server at localhost:3000 and proxies the remote calls to localhost:3434


## Production

In production environment we will be running only Node Js Server. We have to compile the client Js files and copy the generated files in build folder to resources folder in chatbotService. Node default route will load the index.hmtl from the compiled files which will bootstrap react.

React:
First, run the following command by changing into the client directory to build the React project.
npm run build
It compiles the project and puts all the build assets under the folder called build.

Copy the files in build folder to resources folder under ChatbotService

commit the change

Run the following command to deploy changes to App Service

git push azure master




