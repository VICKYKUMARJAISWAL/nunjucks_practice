import express from "express";
import nunjucks from "nunjucks";
import path from "path";

export function configureNunjucks(app: express.Express): void {

    nunjucks.configure(path.join(process.cwd(), "src", "views"), {
        autoescape: true,
        express: app,
        noCache: process.env.NODE_ENV !== "production"
    });

    app.set("view engine", "njk");
}