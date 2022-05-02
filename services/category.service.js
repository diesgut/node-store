const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }

  async all(){
    const data=models.Category.findAll();
    return data;
  }

}

module.exports = new CategoryService();
