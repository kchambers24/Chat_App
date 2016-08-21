{
  "name": "npm_demo",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Brian Gates",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.1.0"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.13.2",
    "babelify": "^7.3.0",
    "browserify": "^13.1.0",
    "watchify": "^3.7.0"
  },
  "browserify": {
    "transform": [
      [
        "babelify",
        {
          "presets": [
            "es2015"
          ]
        }
      ]
    ]
  }
}
