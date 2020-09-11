module.exports = function (sequelize, dataTypes) {

   let alias = "combos";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      name: {
         type: dataTypes.STRING(45)
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
         type: dataTypes.STRING(255)
      },
      image: {
         type: dataTypes.STRING(255)
      },

   }

   let config = {
      tableName: "combos",
      timestamps: false
   }

   let combos = sequelize.define(alias, cols, config);

   /*
   Product.associates = function (models) {
      Product.belongsTo(models.Category, {
         as: "Category",
         foreignKey: "productCategoryId"

      });

   }
   
   */
   return combos;

}
