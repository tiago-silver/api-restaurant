import { knex } from "@/database/knex";
import { seed } from "@/database/seeds/insert-products";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z} from "zod"

class OrdersController  {
    async create(request:Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantify: z.number()

            })

            const {table_session_id, product_id, quantify} = bodySchema.parse(request.body)

            const session = await knex<TableSessionsRepository>("tables_sessions").where({id: table_session_id})

            if(!session){
                throw new AppError("")
            }

            const product = await knex<ProductRepository>("products").where({id: product_id})

            return response.json({session,product})
            
        } catch (error) {
            next(error)
            
        }
    }

}

export {OrdersController}