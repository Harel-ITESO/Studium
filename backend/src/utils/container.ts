/**
 * Handle container creation and registry of modules for dependency injection
 * Do not touch this file unless it's necessary
 */

import { createContainer } from "awilix";

const container = createContainer({
    injectionMode: "CLASSIC"
});

// register modules

export { container };
