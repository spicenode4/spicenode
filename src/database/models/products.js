module.exports = function (sequelize, dataTypes) {

   let alias = "products";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      name: {
         type: dataTypes.STRING
      },
      category_id: {
         type: dataTypes.INTEGER
      },
      ingredient_id: {
         type: dataTypes.INTEGER
      },
      price: {
         type: dataTypes.INTEGER
      },
      description: {
         type: dataTypes.STRING(500)
      },
      image: {
         type: dataTypes.STRING(255)
      },

   }

   let config = {
      tableName: "products",
      timestamps: false
   }

   let products = sequelize.define(alias, cols, config);


   products.associate = function (models) {
      products.belongsTo(models.categories, {
         as: "Category",
         foreignKey: "category_id"
      });

   }

   return products;

}
