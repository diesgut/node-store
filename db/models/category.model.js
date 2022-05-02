const {Model, DataTypes, Sequelize} = require ('sequelize');
//const { PRODUCT_TABLE } = require('./product.model');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Category extends Model {

  static assocciate(models) {
  //  this.hasMany( models.Product, { as: 'products', foreignKey: 'categoryId' } );
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false, //configuracion para la creacion automatica de campos de creacion y actualizacion
    }
  }

}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
