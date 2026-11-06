import express from "express";
import path from "path";
import { configureNunjucks } from "./config/nunjucks";
import logger from "./config/logger";

import { requestLogger } from "./middlewares/requestLogger";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

//1. Parse incoming JSON requests
app.use(express.json());

//2. Parse form submissions
app.use(express.urlencoded({ extended: true }));

// 3.Configure static resources,search from dist folder to outside starts from root folder.
//that is return the current working directory the node.js processnormally your project root  when we start the application from there.
app.use(
    express.static(path.join(process.cwd(), "src", "public"))
);
// 4. Register request logger
app.use(requestLogger);


// 5.Configure Nunjucks
configureNunjucks(app);
console.log('1. App.ts loaded');
logger.info("Nunjucks template engine configured");

// 6.Home page route
app.get("/", (req, res) => {
    console.log('3. Home route callback executed');
    const pageData = {
        title: 'RBAC POC',
        message: 'Welcome to RBAC Application'
    };

    res.render('home', pageData);

});
// 7. Handle invalid URLs
app.use(notFoundHandler);

// 8. Centralized exception handler.Handle application error
app.use(errorHandler);
console.log('2. Home route registered');

export default app;