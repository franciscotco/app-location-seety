# server-django-famoco
Rest server POST/GET in Nodejs & Express with React view

#### Clone the project on your computer with the git command:

`git clone git@github.com:franciscotco/app-location-seety.git`

Run the app with docker-compose file to deploy the server on docker.

### Install

Make sur you have install docker on your computer, if not [install here](https://docs.docker.com/install/linux/docker-ce/ubuntu/) do not forget to select the install for your own system.

#### Go at the root of the repository to build and run your app with :

`docker-compose up --build`

### API and View 

```
The docker-compose run a server on localhost port 5000 and deploy a React view on localhost port 3000
```

You have :
* GET and POST method available at 'http://localhost:5000/report'
* Home view available at 'http://localhost:3000/'


> @method['POST']: - 'Content-Type': 'application/json'
* Take 3 parameters body : { lat : 'number', long : 'number', title: 'string' }
* Save a new pin in the database
* Available on post request at __http://localhost:5000/report__

> @method['GET']:
* Take 3 parameters lat : 'number' / long : 'number' / sort : ["time" || "position" || "title"]
* Return an array of the location close to 10 kilometre around the given position
* Available on get request at __http://localhost:5000/report/:lat/:long/:sort__
