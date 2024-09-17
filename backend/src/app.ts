/** App entry point */
import express from "express";
import { scopePerRequest } from "awilix-express";
import "reflect-metadata";
import { container } from "./utils/container";
import env from "./utils/enviroment";
import appRoute from "./modules/app.route";

// bootstrap application
const app = express();

// middleware
app.use(express.json());
app.use(scopePerRequest(container));
app.use("/studium/v1/api", appRoute);

// app setup
app.listen(env.getAppPort() || 3000, () => {
    const nodeEnv = env.getNodeEnv();
    if (nodeEnv === "development")
        console.info(`Server is running on http://localhost:${env.getAppPort()}`);
    else if (nodeEnv === "production") console.info("App is mounted and running");
});
