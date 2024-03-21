import cookie_loader from "./cookie";
import express_loader from "./express";
import db_loader from "./db";
import { Express } from "express";

async function loaders(app: Express) {
    await cookie_loader(app);
    await express_loader(app);
    await db_loader(app);
}

export default loaders;
