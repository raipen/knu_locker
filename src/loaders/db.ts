import { Express } from "express";
import db from "../models";

async function db_loader(app?: Express) {
    await db.sync({force: false, alter: false});
}

export default db_loader;
