
import {NextFunction, Request, Response} from "express"
import { z } from "zod"
import { knex } from "@/database/knex"
import { AppError } from "@/utils/AppError"

class ProductController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
            const {name} = request.query
            const products = await knex("products")
            .select()
            .whereLike("name", `%${name ?? ""}%`).
            orderBy("name")
        
            
            return response.json(products)
        } catch (error) {
            next(error)
        }

    }

    async create(request:Request, response:Response, next:NextFunction){
        try {
            //Validação com zod
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })

            const {name, price} = bodySchema.parse(request.body)

            //Criar as tipagens necessárias
            await knex<ProductRepository>("products").insert({name, price})
            
            return response.json()
        } catch (error) {
            next(error)
        }

    }

    async update(request:Request, response:Response, next:NextFunction){
        try {
            //Valdar o id com o zod
            const id = z.string()
            //Converter para número
            .transform((value) => Number(value))
            //Verifica se a conversão foi bem sucedida
            .refine((value) => !isNaN(value), {message: "id must be a number"})
            .parse(request.params.id)

            //Validar o corpo da reqisição
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0)
            })
            //Verifica se existe produtos com esse id
            const { name, price} = bodySchema.parse(request.body)
            const products = await knex<ProductRepository>("products").select().where({id}).first()

            if(!products){
                throw new AppError("Product not found!")
            }

            await knex<ProductRepository>("products").update({name, price, updated_at: knex.fn.now()}).where({id})
            
            return response.json({message: "update"})
        } catch (error) {
            next(error)
        }
    }

    async remove(request:Request, response: Response, next:NextFunction ){
        try {
            const id = z.string()
            //Converter para número
            .transform((value) => Number(value))
            //Verifica se a conversão foi bem sucedida
            .refine((value) => !isNaN(value), {message: "id must be a number"})
            .parse(request.params.id)

            const products = await knex<ProductRepository>("products").select().where({id}).first()

            if(!products){
                throw new AppError("Product not found!")
            }
            

            await knex<ProductRepository>("products").delete().where({id})


            return response.json()
        } catch (error) {
            next(error)
            
        }

    }
}

export {ProductController}