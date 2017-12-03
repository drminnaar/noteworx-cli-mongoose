# JS Note README

A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, and [Mongoose](http://mongoosejs.com/) to assist with storing/retrieving notes to/from a [MongoDB](https://www.mongodb.com/) database.

## Features

* Add a note
* Remove a note
* Find notes by:
  * id
  * title
  * tag
* List all notes
* Tag a note
* Update note

## High Level Design

![noteworx-cli-mongoose](https://user-images.githubusercontent.com/33935506/33524793-f3b2ebda-d82b-11e7-8531-375f7a27356e.PNG)

---

## Developed With

* [Node.js](https://nodejs.org/en/) - Javascript runtime
* [yargs](https://www.npmjs.com/package/yargs) - Helps build CLI tools
* [MongoDB](https://www.mongodb.com/) - NoSQL database
* [Docker](https://www.docker.com/) - Used to host MongoDB instance (Not manadatory. See other options below)
* [Mongoose](http://mongoosejs.com) - An Object Data Model (ODM) for working with MongoDB. Also see [NPM repo](https://www.npmjs.com/package/mongoose)

---

## Related Projects

* [noteworx-cli-fs]
* [noteworx-cli-mongodb]

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* NodeJS

  The following version of Node and Npm are required:

  * Node 8.x
  * Npm 3.x

  Type the following commands in the terminal to verify your node and npm versions

  ```bash
  node -v
  npm -v
  ```

* MongoDB

  MongoDB 3.x is required

  Type the following command to verify that MongoDB is running on your local machine

  ```bash
  mongo -version
  ```

  See alternative MongoDB options below

### MongoDB Setup

A running instance of MongoDB is required. Alternatively use a hosted MongoDB from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [MLab](https://mlab.com/)

One of the 3 options below is recommended to get up and running with MongoDB:

* Install and host locally
* Install and host in Docker
* Register for third party MongoDB hosting
  * Register for and use MongoDB Atlas (Database As A Service)
  * Register for and use MLab (Database As A Service)

#### Install and Host MongoDB Locally

Installing MongoDB is relatively straight forward. There are currently 3 platform (Windows, Linux, OSX) releases available and can be found here

For more specific installation instructions, please see the following links:

* [Install MongoDB On Linux](https://docs.mongodb.com/v3.0/administration/install-on-linux/)

* [Install MongoDB On Windows](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-windows/)

* [Install MongoDB On OSX](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)

#### Install And Host Using Docker

##### Run MongoDB Using Named Volume

To run a new MongoDB container, execute the following command from the CLI:

```docker
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v mongo-dev-db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v mongo-dev-db/data/db | map the container volume 'data/db' to a custom name 'mongo-dev-db'
-d mongo | run mongo container as a daemon in the background

##### Run MongoDB Using Bind Mount

```bash
cd
mkdir -p mongodb/data/db
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v ~/mongodb/data/db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v ~/mongodb/data/db/data/db | map the container volume 'data/db' to a bind mount '~/mongodb/data/db'
-d mongo | run mongo container as a daemon in the background

#### Third Party Hosting

##### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is basically a database as a service and is hosted in the cloud. That means that you don't need to install or setup anything to start using MongoDB.

You can get started for free by registering [here](https://www.mongodb.com/cloud/atlas). The free tier entitles you to 512MB storage.

Please review the documentation [here](https://docs.atlas.mongodb.com/)

##### MLab

[MLab](https://mlab.com/) also provides MongoDB cloud hosting in the form of database as a service. Once again there is no installation or setup required.

To get started, signup for free account [here](https://mlab.com/signup/). The free tier entitles you to 500MB storage.

Please review the documentation [here](https://docs.mlab.com/)

### Install

Follow the following steps to get development environment running.

1. Clone 'noteworx-cli-mongodb' repository from GitHub

   ```bash
   git clone https://github.com/drminnaar/noteworx-cli-mongodb.git
   ```

   _or using ssh_

   ```bash
   git clone git@github.com:drminnaar/noteworx-cli-mongodb.git
   ```

1. Install node modules

   ```bash
   cd noteworx-cli-mongodb
   npm install
   ```

### Run ESlint

* Lint project using ESLint

  ```bash
  npm run lint
  ```

* Lint project using ESLint, and autofix

  ```bash
  npm run lint:fix
  ```

### Run

* Run start

  This will run `node app --help` and show a list of CLI commands that can be used to manage notes

  ```javascript
  npm start
  ```

* Get help

  ```javascript
  node app --help
  node app add --help
  node app remove --help
  node app find --help
  node app list --help
  node app tag --help
  node app update --help
  ```

* Add a note

  ```javascript
  node app add -t "Programming homework for weekend" -c "Read 'The Art of Computer Programming, Volume 1" --tags "programming, homework"
  node app add -t "Programming homework for today" -c "Read 'Computer Science Illuminated" --tags 'homework'
  ```

* Remove a note

  ```javascript
  node app remove --id "{NOTE_ID_GOES_HERE}"
  ```

* Find notes

  * Find notes by title

    ```javascript
    node app find -t "homework"
    ```

  * Find notes by id

    ```javascript
    node app find --id "{NOTE_ID_GOES_HERE}"
    ```

  * Find notes by tag

    ```javascript
    node app find --tag "programming"
    ```

* List all notes

  ```javascript
  node app list
  ```

* Tag a note

  ```javascript
  node app tag --id "{NOTE_ID_GOES_HERE}" --tag "{TAG_NAME_GOES_HERE}"
  ```

* Update a note

  ```javascript
  node app update --id "{NOTE_ID_GOES_HERE}" -t "Programming homework for weekend" -c "Read 'Computer Science Illuminated Pages 200-500" --tags "homework, compsci"
  ```

---

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/drminnaar/noteworx-cli-mongoose/tags).

## Authors

* **Douglas Minnaar** - *Initial work* - [drminnaar](https://github.com/drminnaar)

[noteworx-cli-fs]: https://github.com/drminnaar/noteworx-cli-fs
[noteworx-cli-mongodb]: https://github.com/drminnaar/noteworx-cli-mongodb