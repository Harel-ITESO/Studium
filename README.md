# Studium Application

Studium is an online courses platform which allows you to buy courses.
<br />
The project is done using the `Vue` for the frontend, `Express` for the backend and `PostgreSQL` for the database.

## Development

To develop inside the application some things are required.

### Setup

1. First, clone the repository.

```bash
git clone https://github.com/Harel-ITESO/Studium.git
```

2. Ensure the enviroment variables are correctly set, [like this.](/.env.example). Create a `.env` file in the root of the project.

```
ENV=VALUE
```

3. Install the dependencies on both `backend` and `frontend` directories.

```bash
npm install
```

### Running the project

The project uses `Docker` and `docker compose` to handle the orchestration of the project services. To run the project you require `Docker`, so ensure you have it. Once you have it run the following command.

```bash
docker compose up -d
```

This command will run all services of the application in a single Docker network.

### Database migrations

If you make changes on the Database model in `./backend/prisma/schema.prisma`, you need to run migrations inside the container since the container is the one connected to the database. You have two options here:

1. Run with docker

You can run the following command

```bash
docker exec -it backend npx prisma migrate dev --name <migration-name>
```

2. Python script

There's a _python_ script in `./scripts/migrate_db.py` which is run as follows:

```bash
# windows

python ./scripts/migrate_db.py <migration-name>

# unix

python3 ./scripts/migrate_db.py <migration-name>
```

### Access live services

To access the services running, in development mode each service exposes a port in your local machine. These are as follows

1. Database - [http://localhost:5432](http://localhost:5432)
2. Backend - [http://localhost:4000](http://localhost:4000)
3. Frontend - [http://localhost:8080](http://localhost:8080)
