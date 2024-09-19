# This module runs a migration of the database inside of the db docker container

import subprocess
import sys
import os


def migrate():
    migration_name = ""
    for i in range(1, len(sys.argv)):
        migration_name = migration_name + " " + sys.argv[i]
    print(migration_name)
    container_name = "backend"
    cmd = f"docker exec -it {container_name} npx prisma migrate dev --name {migration_name}"

    try:
        print("Running migration inside docker container...")

        result = subprocess.run(
            cmd, shell=True, check=True, capture_output=True, text=True
        )

        print("Migration result:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error on migration:")
        print(e.stderr)


if __name__ == "__main__":
    migrate()
