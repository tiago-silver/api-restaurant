import { Request, Response, NextFunction } from "express";
import {knex} from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
    async create(request:Request, response:Response, next:NextFunction){
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

    async index(request: Request, response:Response, next: NextFunction){
        try {
            const sessions = await knex<TableSessionsRepository>("tables_sessions").orderBy("closed_at")

            return response.json(sessions)
            
        } catch (error) {
            next(error)
            
        }

    }

    async update(request: Request, response:Response, next: NextFunction){
        try {
            const id = z.string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "Id must be a number! "})
            .parse(request.params.id)

            //Verifica se existe sessão para esta tabela
            const session = await knex<TableSessionsRepository>("tables_sessions")
            .select()
            .where({id}).first()

            if(!session){
                throw new AppError("Table sessions not found!")
            }

            //Verifica se a tabela não está fechada

            if(session.closed_at){
                throw new AppError("This session is already closed!")
            }
            //Atualiza o campo closed_at na tabela
            await knex<TableSessionsRepository>("tables_sessions")
            .update({closed_at: knex.fn.now()})
            .where({id})

            return response.json()
            
        } catch (error) {
            next(error)
        }
    }
}

export {TablesSessionsController}