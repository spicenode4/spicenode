module.exports = function (sequelize, dataTypes) {

   let alias = "ingredients";

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

   let ingredients = sequelize.define(alias, cols, config);


   return ingredients;
}