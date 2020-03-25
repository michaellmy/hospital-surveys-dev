# Hospital Surveys

An online survey tool to design questionnaires, and collect feedback from child patients in hospitals.

The example deployed application can be found **[here](https://hospital-surveys-dev.herokuapp.com/)**. The app **sleeps after inactivity** (due to free Heroku Dynos), and may take awhile (15 - 30 seconds) to startup the first time after inactivity.

## Installation Pre-Requisites
1) Heroku [Command Line Interface (CLI)](https://devcenter.heroku.com/articles/heroku-cli)
2) Free [Heroku](https://www.heroku.com) Account
3) [Git](https://git-scm.com/)

## Deployment Guide
1) Download the code [here](https://github.com/michaellmy/hospital-surveys-dev), by downloading the zip file, or running the command:
```bash
$ git clone https://github.com/michaellmy/hospital-surveys-dev.git
```

2) Create a new Heroku project (free), then navigate into the directory containing `manage.py`. 
```bash
$ cd hospital-surveys-dev
```

3) Log into the Heroku CLI, then initialize a git repository in a new or existing directory. These few instructions can also be found in Heroku's project [dashboard](https://dashboard.heroku.com/).
```bash
$ heroku login
$ git init
$ heroku git:remote -a [heroku-project-name]
```

4) Deploy your application.
```bash
$ git add .
$ git commit -m "Initial commit message"
$ git push heroku master
```

5) Create a new superuser. These credentials will be used to log into the admin panel.
```bash
$ heroku run python manage.py createsuperuser
```

The web app can now be found at `https://[heroku-project-name].herokuapp.com`. The database is already attached to the web-app during deployment, and the credentials for the database can be found at the **Heroku Project -> Resources -> Heroku Postgres**. 