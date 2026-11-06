"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const nunjucks_1 = require("./config/nunjucks");
const app = (0, express_1.default)();
// Parse incoming JSON requests
app.use(express_1.default.json());
// Parse form submissions
app.use(express_1.default.urlencoded({ extended: true }));
// Configure static resources,search from dist folder to outside starts from root folder.
app.use(express_1.default.static(path_1.default.join(process.cwd(), "src", "public")));
// Configure Nunjucks
(0, nunjucks_1.configureNunjucks)(app);
console.log('1. App.ts loaded');
// Home page route
app.get("/", (req, res) => {
    console.log('3. Home route callback executed');
    const pageData = {
        title: 'RBAC POC',
        message: 'Welcome to RBAC Application'
    };
    res.render('home', pageData);
});
console.log('2. Home route registered');
exports.default = app;
