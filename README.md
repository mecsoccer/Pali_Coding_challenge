# Pali_Coding_challenge
## Build Status
[![Build Status](https://travis-ci.org/mecsoccer/Pali_Coding_challenge.svg?branch=master)](https://travis-ci.org/mecsoccer/Pali_Coding_challenge)
[![Coverage Status](https://coveralls.io/repos/github/mecsoccer/Pali_Coding_challenge/badge.svg?branch=master)](https://coveralls.io/github/mecsoccer/Pali_Coding_challenge?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/539787a85c16df803d3f/maintainability)](https://codeclimate.com/github/mecsoccer/Pali_Coding_challenge/maintainability)

## Introduction
A NodeJS web service that accepts a list of meal IDs (from TheMealDb.com API) and returns the ID of the meal that requires the least number of ingredients to prepare.

## Table of Contents
* [How to Run](#how-to-run)
* [How to deploy](#how-to-deploy)
* [Technologies Used](#technologies-used)
* [Testing Tools](#testing-tools)
* [How to Test](#how-to-test)
* [Author](#author)
* [License](#license)

## How to Run
```
# Clone this repository
$ git clone https://github.com/mecsoccer/Pali_Coding_challenge.git

# Go into the repository
$ cd Pali_Code_challenge

# Install dependencies
$ npm install

# Create .env file for environment variables in your root directory and paste the following
PORT=3000

note: you are free to use any port

# Run the app
$ npm start
```

## How to Deploy
```
install docker version 1.13 or higher

# Clone this repository
$ git clone https://github.com/mecsoccer/Pali_Coding_challenge.git

# Go into the repository
$ cd Pali_Code_challenge

# Build the app
$ docker build --tag=myimage .

# Run to confirm build succeeded
$ docker image ls

# Run container
$ docker run -d -p 4000:3000 myimage

app should be running at: http://localhost:4000

OR

   # get machine ip
   $ docker-machine ip

   app can also be running at: http://<docker machine ip>:4000 eg http://192.168.99.100:4000
```
###### Read the following guides to deploy container to production:
* Deploy to [heroku](https://devcenter.heroku.com/categories/deploying-with-docker)
* Deploy to [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app) cluster


## Technologies Used
* Nodejs
* Es6
* Docker
* Express
* Babel
* Eslint (Airbnb--style guide)

## Testing Tools
* Mocha - A javascript test framework
* Chai - Assertion library
* nyc - A reporting tool

## How to Test
```
# Clone this repository
$ git clone https://github.com/mecsoccer/Pali_Coding_challenge.git

# Go into the repository
$ cd Pali_Code_challenge

# Install dependencies
$ npm install

# run test
$ npm run test
```

## Author
Jaachimma Onyenze

## License
MIT
