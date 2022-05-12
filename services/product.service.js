const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductService {

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
      const product = await models.Product.create(data);
      return product;
    }

    async addItem(data){
      const orderProduct = await models.OrderProduct.create(data);
      return orderProduct;
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

    async all(query){
      /*
      const query="SELECT * FROM products";
      const [data]=sequelize.query(query);
      return data;*/
      const options = {
        include: 'category', //can be (Model models.Category, Model Name 'Category' without alias in association and need foreignKey in association) or alias in association
        where: {}
      };
      const { limit, offset } = query;
      if (limit && offset){
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }

      const { price } = query;
      if(price){
        options.where.price = price;
      }

      const { price_min, price_max } = query;
      if(price_min && price_max){
        options.where.price = {
          [Op.gte]: price_min,
          [Op.lte]: price_max
        };
      }

      const products = models.Product.findAll(options);
      return products;
    }

    async update(id, updateProduct){
        const product = await this.findById(id);
        this.products[id] = {
            ...product,
            ...updateProduct
        };
        return this.products[id];
    }

    async delete(id){
        await this.findById(id);
        this.products.splice(id,1);
        return { id };
    }

}

module.exports = new ProductService();
