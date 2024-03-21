import { Express } from "express";
import cookieParser from "cookie-parser";

async function cookie_loader(app: Express) {
    app.use(cookieParser());
}

export default cookie_loader;
