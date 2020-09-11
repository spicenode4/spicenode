module.exports = function (sequelize, dataTypes) {

   let alias = "categories";

   let cols = {
      id: {
         type: dataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      name: {
         type: dataTypes.STRING
      }
   }

   let config = {
      tableName: 'categories',
      timestamps: false
   }

   let categories = sequelize.define(alias, cols, config);

   /* categories.associates = function (models) {
       categories.hasMany(models.Product, {
          as: "categories",
          foreignKey: "categories"
 
       })
    }
 */
   return categories;
}