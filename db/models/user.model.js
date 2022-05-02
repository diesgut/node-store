const {Model, DataTypes, Sequelize} = require ('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING(50),
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

}

class User extends Model {

  static assocciate(models) {
    this.hasOne( models.Customer, { as: 'customer', foreignKey: 'userId' } );
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false, //configuracion para la creacion automatica de campos de creacion y actualizacion
    }
  }

}

module.exports = { USER_TABLE, UserSchema, User };
