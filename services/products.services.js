const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor(){
        //load products
        this.products= [];
        for (let index = 0; index < 100; index++) {
            this.products.push(
                {
                    id:index,
                    name: faker.commerce.productName(),
                    price: parseInt( faker.commerce.price() ),
                    image: faker.image.imageUrl(),
                    isBlock: faker.datatype.boolean(),
                }
            );
        }
    }

    async create(data){
        const newProduct={
            id:faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async findById(id){
        const product = this.products.find(x => x.id===parseInt(id));
        if(!product){
            throw boom.notFound('Product not found');
        }
        if(product.isBlock){
            throw boom.conflict('Product is blocked');
        }
        return product;
    }

    async all(){
        return this.products;
    }

    async update(id, updateProduct){
        const product = await this.findById(id);
        this.products[id] = {
            ...product,
            ...updateProduct
        };
        return this.products[id];
    }

    async sdelete(id){
        await this.findById(id);
        this.products.splice(id,1);
        return { id };
    }
    
}

module.exports= new ProductsService();