# full-stack-app-Dogs-react-koa
#### Copyright &#169; 2022 PeachPay, Inc.
#### https://peachpay.app/woocommerce
#### Author: Yaokai Dong
#### Email：ykdong1991@gmail.com
#### LinkedIn: https://www.linkedin.com/in/yaokai-dong/
#### GitHub: https://github.com/ykdong

This is a full stack web application using React, Node.js, Koa and Webpack. It is also configured with babel.

- [dogs-react-koa-full-stack](#full-stack-app-Dogs-react-koa)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Babel](#babel)
    - [Webpack](#webpack)
    - [Nodemon](#nodemon)
    - [Koa](#koa)
    - [Concurrently](#concurrently)


## Introduction

This is a full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Koa](https://koajs.com/) backend. Client side code is written in React and the backend API is written using Koa.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Koa code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Koa application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ykdong/dogs.git

# Go inside the directory
cd dogs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Documentation

### Folder Structure

```
App Directory
 |----- __test__
 |      └------ server.test.js
 |----- public
 |      └------ index.html
 |      └------ style.css
 |----- server
 |      └------ app.js
 |      └------ server.js
 |----- src
 |      |------ components
 |      |      └------ app.jsx
 |      |      └------ FunctionalComponents.jsx
 |      |      └------ StyledComponents.jsx
 |      └------ index.js
 |----- .babelrc
 |----- package.json
 |----- webpack.config.js
```

### Babel

[Babel](https://babeljs.io/) helps us to write code in the latest version of JavaScript. If an environment does not support certain features natively, Babel will help us to compile those features down to a supported version. It also helps us to convert JSX to Javascript.

[.babelrc file](https://babeljs.io/docs/usage/babelrc/) is used describe the configurations required for Babel. Below is the .babelrc file which I am using.

```javascript
{  
  "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

[presets] allow us to define the additional packages we would like to include. This will give us access to jsx and several other newer js features. 

### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

[webpack.config.js](https://webpack.js.org/configuration/) file is used to describe the configurations required for webpack. Below is the webpack.config.js file which I am using.

```javascript
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  // [module] will allow us to set any external modules we have added to webpack
  module: {
    // [rules] will determine the rules around those external modules
    rules: [
      // First rule is to identify js and jsx files and turn on babel
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // Second rule is to check for css files and load them with the following loaders
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
}
```

1.  **entry:** entry: ./src/index.js is where the application starts executing and webpack starts bundling.
2.  **output path and filename:** the target directory and the filename for the bundled output
3.  **module loaders:** Module loaders are transformations that are applied on the source code of a module. We pass all the js file through [babel-loader](https://github.com/babel/babel-loader) to transform JSX to Javascript. CSS files are passed through [css-loaders](https://github.com/webpack-contrib/css-loader) and [style-loaders](https://github.com/webpack-contrib/style-loader) to load and bundle CSS files. 

### Nodemon

Nodemon is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

nodemon.json file is used to describe the configurations for Nodemon. Below is the nodemon.json file which I am using.

```javascript
{
  "watch": ["server/server.js"]
}
```

Here, we tell nodemon to watch the files in the directory /server where out server side code resides. Nodemon will restart the node server whenever the server.js file under /server directory is modified.

### Koa

Koa is a web application framework for Node.js. It is used to build our backend API's.

server/server.js is the entry point to the server application. Below is the server/server.js file

```javascript
const app = require('./app.js');
const port = 3011;

app.on('error', err => {
  console.error('server error', err)
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
```
Below is the server/app.js file
```javascript
const Koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('@koa/router');
const fetch = require('isomorphic-fetch');
const serve = require('koa-static');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors({origin: '*'}));
app.use(serve('public'));

router.get('/list', KoaBody(), async (ctx) => {
	const res = await fetch(`https://dog.ceo/api/breeds/list`);
  const data = await res.json();
	ctx.set('Content-Type', 'application/json');
	ctx.body = data;
});

router.get('/:breed', KoaBody(), async (ctx) => {
	const userBreed = ctx.request.url.slice(1);
	const res = await fetch(`https://dog.ceo/api/breed/${userBreed}/images/random`);
  const data = await res.json();
	ctx.set('Content-Type', 'application/json');
	ctx.body = data;
});

app.use(router.routes());

module.exports = app;
```

This starts a server and listens on port **3011** for connections as required. The app responds for requests to the URL (/list) and URL(/:breedName). It is also configured to serve the static files from **public** directory.

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. I am using it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm script commands used.

```javascript
"scripts": {
    "start": "npm run build && node server/server.js",
    "build": "webpack --mode=production",
    "client": "webpack --mode=development",
    "server": "nodemon server/server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "test": "jest --watch"
  }
```