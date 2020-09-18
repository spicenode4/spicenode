module.exports = function (sequelize, dataTypes) {

   let alias = "ProductsIngredients";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      product_id: {
         type: dataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      },
      ingredient_id: {
         type: dataTypes.INTEGER.UNSIGNED,
         allowNull: false,
      }
   }

   let config = {
      tableName: 'products_ingredients',
      timestamps: false
   }

   let ProductsIngredients = sequelize.define(alias, cols, config);



   return ProductsIngredients;
}