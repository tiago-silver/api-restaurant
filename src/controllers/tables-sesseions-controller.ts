import { Request, Response, NextFunction } from "express";
import {knex} from "@/database/knex";
import { z } from "zod"

class TablesSessionsController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                table_id : z.number(),
            })
            const {table_id} = bodySchema.parse(request.body)

            await knex<TableSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now()
            })

            return response.json(table_id)
        } catch (error) {
            next(error)
            
        }
    }
}

export {TablesSessionsController}