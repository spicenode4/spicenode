module.exports = function (sequelize, dataTypes) {

   let alias = "users";

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
      lastname: {
         type: dataTypes.STRING(45)
      },
      category: {
         type: dataTypes.STRING(45)
      },
      email: {
         type: dataTypes.STRING(255)
      },
      password: {
         type: dataTypes.STRING(255)
      },
      avatar: {
         type: dataTypes.STRING(255)
      }
   }

   let config = {
      tableName: "users",
      timestamps: false
   }

   let users = sequelize.define(alias, cols, config);

   return users;
}