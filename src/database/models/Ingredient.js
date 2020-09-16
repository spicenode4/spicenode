module.exports = function (sequelize, dataTypes) {

   let alias = "Ingredient";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      name: {
         type: dataTypes.STRING(45)
      }
   }

   let config = {
      tableName: 'ingredients',
      timestamps: false
   }

   let Ingredient = sequelize.define(alias, cols, config);

   Ingredient.associate = function (models) {
      Ingredient.belongsToMany(models.Product, {
         as: "productos",
         through: "products_ingredients",
         foreignKey: "ingredient_id",
         otherKey: "product_id",
         timestamps: false
      });
   }

   return Ingredient;
}