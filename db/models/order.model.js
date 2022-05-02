const {Model, DataTypes, Sequelize} = require ('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');
const { ORDER_PRODUCT_TABLE } = require('./order-product.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	customerId: {
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		References: {
			model: CUSTOMER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.quantity);
        }, 0);
      }
    }
  }
};

class Order extends Model {

  static assocciate(models) {
    this.belongsTo( models.Customer, { as: 'customer', foreignKey: 'customerId' } ); //, foreignKey: 'customerId'
    this.belongsToMany(models.Product, {as: 'items', through: models.OrderProduct, foreignKey: 'orderId', otherKey: 'productId' });
  }

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
