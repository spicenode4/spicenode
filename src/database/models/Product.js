module.exports = function (sequelize, dataTypes) {

   let alias = "Product";

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

   let Product = sequelize.define(alias, cols, config);


   Product.associate = function (models) {
      Product.belongsTo(models.Category, {
         as: "Category",
         foreignKey: "category_id"
      });

      Product.belongsToMany(models.Ingredient, {
         as: "Ingredientes",
         through: "products_ingredients",
         foreignKey: "product_id",
         otherKey: "ingredient_id",
         timestamps: false
      });


   }





   return Product;

}
