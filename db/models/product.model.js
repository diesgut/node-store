const {Model, DataTypes, Sequelize} = require ('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { //to generate foreign constraint with migrations
      model: CATEGORY_TABLE, // 'user or users' would also work
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {

  static assocciate(models) {
     this.belongsTo( models.Category, { as: 'category', foreignKey: 'categoryId' } );
   }

   static config(sequelize){
     return {
       sequelize,
       tableName: PRODUCT_TABLE,
       modelName: 'Product',
       timestamps: false, //configuracion para la creacion automatica de campos de creacion y actualizacion
     }
   }

}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
