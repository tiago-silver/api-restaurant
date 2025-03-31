import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sesseions-controller";

const tableSessionsRoutes = Router()

const tableSessionsController = new TablesSessionsController()

tableSessionsRoutes.post("/", tableSessionsController.index)

export{ tableSessionsRoutes}