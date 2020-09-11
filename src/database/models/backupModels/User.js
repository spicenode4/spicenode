module.exports = function (sequelize, dataTypes) {

   let alias = "User";

   let cols = {
      userId: {
         type: dataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      userFirstName: {
         type: dataTypes.STRING(45)
      },
      userLastName: {
         type: dataTypes.STRING(45)
      },
      userCategory: {
         type: dataTypes.STRING(45)
      },
      userEmail: {
         type: dataTypes.STRING(100)
      },
      userPassword: {
         type: dataTypes.STRING
      },
      userAvatar: {
         type: dataTypes.STRING
      }
   }

   let config = {
      tableName: "users",
      timestamps: false
   }

   let User = sequelize.define(alias, cols, config);

   return User;
}