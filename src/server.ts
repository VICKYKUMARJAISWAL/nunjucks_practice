import { Environment } from "nunjucks";
import app from "./app";
import logger from "./config/logger";
import { error } from "console";

const PORT = 3000;
console.log('4. Starting server');


const server = app.listen(PORT, () => {
    logger.info("Application started successfuly",{
        port:PORT,
        environment: process.env.NODE_ENV || "development"
    });
    console.log(`Server running at http://localhost:${PORT}`);
});
server.on("error",(error: NodeJS.ErrnoException)=> {
    logger.log("HTTP server startup failed",{
        message: error.message,
        code : error.code
    });
    process.exitCode =1;
})