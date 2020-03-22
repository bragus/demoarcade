# Demoarcade
Demoday project from Mastertech.
A [asteroid game](https://demoarcade.herokuapp.com/) created using JavaScript and Django.



## Getting Started
Clone the project and setup project environment with [virtualenv](https://virtualenv.pypa.io/en/stable/) and [pip](https://pypi.org/project/pip/).


### Installing
```
$ git clone https://github.com/bragus/demoarcade.git
$ cd demoarcade
$ virtualenv project-env

$ source project-env/bin/activate - Linux/Mac
$ source project-env/Scripts/activate - Windows

# You may want to change the name 'project name'.

$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver
```


### Running
You can test the local project on
```
localhost:8000
```
Or using the Heroku App
```
demoarcade.herokuapp.com
```

## Authors
* **Gus** - *Designer and Frond-end developer* - [BraGus](https://github.com/bragus)
* **Tony** - *Game developer* - [Everlen](https://github.com/everlen)

See also the list of [contributors](https://github.com/bragus/demoarcade/graphs/contributors) who participated in this project.


