"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureNunjucks = configureNunjucks;
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
function configureNunjucks(app) {
    nunjucks_1.default.configure(path_1.default.join(process.cwd(), "src", "views"), {
        autoescape: true,
        express: app,
        noCache: process.env.NODE_ENV !== "production"
    });
    app.set("view engine", "njk");
}
