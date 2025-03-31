import { Router } from "express";

import { TablesController } from "@/controllers/tables-controller";
const tablesController = new TablesController()

const tablesRoutes = Router()

tablesRoutes.get("/", tablesController.index)

export {tablesRoutes}