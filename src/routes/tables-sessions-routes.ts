import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tableSessionsRoutes = Router()

const tableSessionsController = new TablesSessionsController()

tableSessionsRoutes.post("/", tableSessionsController.create)
tableSessionsRoutes.get("/", tableSessionsController.index)
tableSessionsRoutes.patch("/:id", tableSessionsController.update)

export{ tableSessionsRoutes}