# #!/usr/bin/env python3

import os
import sys


# Appends content to a file before the last occurrence of a specific keyword
def append_before_export(file_path: str, content: str, keyword: str):
    try:
        with open(file_path, "r+") as file:
            lines = file.readlines()
            keyword_index = None

            # Find the last occurrence of the keyword
            for i in reversed(range(len(lines))):
                if lines[i].strip().startswith(keyword):
                    keyword_index = i
                    break

            if keyword_index is not None:
                # Insert the content before the keyword statement
                lines.insert(keyword_index, content + "\n\n")

                # Write the modified content back to the file
                file.seek(0)
                file.writelines(lines)

    except Exception as e:
        print(f"Error appending to {file_path}: {e}")


# Inserts content after the last occurrence of a specific keyword
def append_after_last_import(file_path: str, content: str):
    try:
        with open(file_path, "r+") as file:
            lines = file.readlines()
            last_import_index = None

            # Find the last occurrence of 'import'
            for i in reversed(range(len(lines))):
                if lines[i].strip().startswith("import"):
                    last_import_index = i
                    break

            if last_import_index is not None:
                # Insert the content after the last import statement
                lines.insert(last_import_index + 1, content + "\n")

                # Write the modified content back to the file
                file.seek(0)
                file.writelines(lines)

    except Exception as e:
        print(f"Error appending import to {file_path}: {e}")


# Creates a module on the server which contains Model, View & Controller
def create_module(module_name: str, base_path: str = "backend/src/modules"):
    # Define the module directory path
    module_name = str.lower(module_name)
    lower_module_name = module_name
    cap_module_name = module_name.capitalize()
    module_dir = os.path.join(base_path, module_name)

    # Create the module directory if it doesn't exist
    os.makedirs(module_dir, exist_ok=True)

    # Define names
    lower_controller_name = f"{lower_module_name}Controller"
    lower_service_name = f"{lower_module_name}Service"
    cap_controller_name = f"{cap_module_name}Controller"
    cap_service_name = f"{cap_module_name}Service"

    # Define file content templates
    service_file_content = f"""
/** Define the buisness logic for {cap_module_name} here  */

export class {cap_service_name} {{
    public async get{cap_module_name}Works() {{
        return new Promise((resolve) => resolve('{cap_module_name} works!'))
    }}
}}
    """

    controller_file_content = f"""

/** Write all the request handlers and request validations for {cap_module_name} here  */

import {{ Request, Response }} from 'express';
import {{ {cap_service_name} }} from './{lower_module_name}.service';

export class {cap_controller_name} {{
    constructor(private readonly {lower_service_name}: {cap_service_name}) {{}}
    
    public async getWorksMessage(_req: Request, res: Response) {{
        const mssg = await this.{lower_service_name}.get{cap_module_name}Works();
        return res.json({{ mssg }})
    }}    
}}
    """

    route_file_content = f"""
/** Connect the controller logic to an specific route of the module {cap_module_name} here  */

import {{ Router }} from "express";
import {{ container }} from "../../utils/container";
import {{ {cap_controller_name} }} from "./{module_name}.controller";

const route = Router();
const controller = container.resolve<{cap_controller_name}>('{lower_controller_name}');

route.get('/', (req, res) => controller.getWorksMessage(req, res));

export {{ route }};
    """

    module_file_content = f"""
/** 
* Module to handle dependency registry on the container
* DO NOT TOUCH OR MODIFY THIS FILE. This file already works for the overall dependency injection container
*/

import {{ asClass, AwilixContainer }} from 'awilix';
import {{ {cap_service_name} }} from './{module_name}.service';
import {{ {cap_controller_name} }} from './{module_name}.controller';

export function register{cap_module_name}Module(container: AwilixContainer) {{
    container.register({{
        {lower_service_name}: asClass({cap_service_name}).singleton(),
        {lower_controller_name}: asClass({cap_controller_name}).singleton()
    }});
}}
    """

    # Create the controller, model, and routes files
    try:
        with open(os.path.join(module_dir, f"{module_name}.service.ts"), "w") as f:
            f.write(service_file_content)

        with open(os.path.join(module_dir, f"{module_name}.controller.ts"), "w") as f:
            f.write(controller_file_content)

        with open(os.path.join(module_dir, f"{module_name}.route.ts"), "w") as f:
            f.write(route_file_content)

        with open(os.path.join(module_dir, f"{module_name}.module.ts"), "w") as f:
            f.write(module_file_content)

        print(f"Module '{module_name}' created successfully in {module_dir}.")

        # Append to container.ts
        container_file = "backend/src/utils/container.ts"
        module_import = f"import {{ register{cap_module_name}Module }} from '../modules/{module_name}/{module_name}.module';"
        register_function = f"register{cap_module_name}Module(container);"
        append_after_last_import(container_file, module_import)
        append_before_export(container_file, register_function, keyword="export")
        print(f"Appended registerModule and import to {container_file}.")

        # Append route to app.route.ts
        app_route_file = "backend/src/modules/app.route.ts"
        route_import = f"import {{ route as {lower_module_name}Route }} from './{module_name}/{module_name}.route';"
        route_append = f"router.use('/{lower_module_name}', {lower_module_name}Route);"
        append_after_last_import(app_route_file, route_import)
        append_before_export(app_route_file, route_append, keyword="export")
        print(f"Appended route and import to {app_route_file}.")

    except Exception as e:
        print(f"Error creating module '{module_name}': {e}")


def main():
    if len(sys.argv) != 2:
        print("Error: No module name provided.")
        print("Usage: python generate_module.py <module-name>")
        sys.exit(1)

    module_name = sys.argv[1]
    create_module(module_name)


if __name__ == "__main__":
    main()
