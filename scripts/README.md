# Scripts

The scripts in this directory allow you to run long and tedious tasks in a single command. The scripts are made in python to allow for every OS and enviroment to be able to run them. All you need is `python 3` or latest installed.

## Generate Server Module

The first script is `server-module.py`, this script allows you to generate a backend module inside the _backend_ application. This will allow you to generate a moudle with:

1. Controller
2. Route
3. Service
4. Dependency Injection Container

### Usage

To use the script, run the following command on the root of the project

```bash
# if you are using windows, use python instead of python3
python3 ./scripts/server-module.py <module-name>
```

## Migrate database

One important aspect of developing with a Relational Database, is that, tracking the changes in the DB is important, and migrations allows us to do that. However, since the project runs on a Docker container, this managing needs to be done inside the container. This can be a little bit tedious, so the script `migrate-db.py` allows you to run the command directly with a migration title.

To use the script, run the following command on the root of the project

```bash
# if you are using windows, use python instead of python3
python3 ./scripts/migrate-db.py <migration-message>
```
