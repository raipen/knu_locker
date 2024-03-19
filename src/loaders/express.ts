import express,{ Express } from "express";
import cors from "cors";
import api from "../api";

async function express_loader(app: Express) {
    // Middle-ware settings
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API Route
    app.use(api);
}

export default express_loader;
