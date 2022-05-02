const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {

  async create(data) {
    const user = await models.User.create(data);
    return user;
  }

  async findById(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async all(){
    const data=models.User.findAll({
      include : 'customer' //can be (Model models.User, Model Name 'User') or alias in association
    });
    return data;
  }


  async update(id, changes){
    const user = await this.findById(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id){
    const user = await this.findById(id);
    await user.destroy();
    return { id };
  }

}

module.exports = new UserService();
