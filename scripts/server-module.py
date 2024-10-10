# This module generates the minimum necessary Nest components

import subprocess
import sys
import os


def generate_module():

    try:
        module_name = (sys.argv[1] + "").lower()
        cmd = f"npx nest g mo {module_name} && npx nest g co {module_name} && npx nest g s {module_name}"

        print("Generating Nest components")

        os.chdir("backend")

        result = subprocess.run(
            cmd, shell=True, check=True, capture_output=True, text=True
        )

        print("Generation result:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error on generation:")
        print(e.stderr)


if __name__ == "__main__":
    generate_module()
