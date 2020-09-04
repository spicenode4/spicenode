module.exports = function (sequelize, dataTypes) {

   let alias = "Product";

   let cols = {
      productId: {
         type: dataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      productName: {
         type: dataTypes.STRING
      },
      productDescription: {
         type: dataTypes.STRING(500)
      },
      productCategoryId: {
         type: dataTypes.INTEGER
      },
      productIngredients: {
         type: dataTypes.STRING
      },
      productPrice: {
         type: dataTypes.INTEGER
      },
      productIngredients: {
         type: dataTypes.STRING
      },

   }

   let config = {
      tableName: "products",
      timestamps: false
   }

   let Product = sequelize.define(alias, cols, config);

   Product.associates = function (models) {
      Product.belongsTo(models.Category, {
         as: "Category",
         foreignKey: "productCategoryId"

      });

   }
   return Product;

}
