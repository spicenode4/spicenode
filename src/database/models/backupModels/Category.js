module.exports = function(sequelize, dataTypes){

    let alias = "Category";

    let cols = {
        idCategories:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nameCategories:{
            type: dataTypes.STRING
        },
        descriptionCategories:{
            type: dataTypes.STRING
        }

    }

    let config = {
        tableName : 'categories',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associates = function(models){
        Category.hasMany(models.Product,{
            as: "Categories",
            foreignKey: "productCategoryId"
            
        })
    }

    return Category;
}