const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  async create(data) {
    /*
    const newUser = await models.User.create(data.user);
    const customer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    */
    const customer = await models.Customer.create(data, {
      include: 'user.'
    });
    return customer;
  }

  async all(){
    const data=models.Customer.findAll({
      include : 'user' //can be (Model models.User, Model Name 'User' without alias in association and need foreignKey in association) or alias in association
    });
    return data;
  }

}

module.exports = new CustomerService();
