module.exports = function (sequelize, dataTypes) {

   let alias = "Category";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      name: {
         type: dataTypes.STRING,
         allowNull: false,
      }
   }

   let config = {
      tableName: 'categories',
      timestamps: false
   }

   let Category = sequelize.define(alias, cols, config);

   Category.associate = function (models) {
      Category.hasMany(models.Product, {
         as: "products",
         foreignKey: "category_id"
      });
   }

   return Category;
}