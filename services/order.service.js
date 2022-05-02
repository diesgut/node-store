const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }

  async all(){
    const data=models.Order.findAll({
      include : [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return data;
  }

}

module.exports = new OrderService();
