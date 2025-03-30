import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
    
        { name: "Pizza Margherita", price: 45.90 },
        { name: "Hambúrguer Artesanal", price: 32.50 },
        { name: "Salada Caesar", price: 28.00 },
        { name: "Sushi Sashimi (10 unidades)", price: 59.90 },
        { name: "Filé Mignon com Batatas", price: 68.00 },
        { name: "Água Mineral 500ml", price: 5.50 },
        { name: "Refrigerante Lata", price: 8.00 },
        { name: "Cerveja Artesanal 500ml", price: 18.90 },
        { name: "Tiramisu (Sobremesa)", price: 22.50 },
        { name: "Café Expresso", price: 6.90 }
        
    ]);
};
