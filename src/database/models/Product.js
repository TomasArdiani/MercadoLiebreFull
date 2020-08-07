module.exports = (sequelize, DataTypes) => {

    let alias = "Products";

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };

    let config= {
        tableName: "products"
    }

    const Product = sequelize.define(alias, cols, config);

    return Product;
}