import { Request, Response, NextFunction } from "express";
import {knex} from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                table_id : z.number(),
            })
            const {table_id} = bodySchema.parse(request.body)

            // Validção para evitar duplicidade
            const session = await knex<TableSessionsRepository>("tables_sessions")
            .select()
            .where({table_id})
            .orderBy("opened_at", "desc")
            .first()
            
            // Verifica se a mesa está aberta
            if(session && !session.closed_at){
                throw new AppError("This table is already open!")
            }

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