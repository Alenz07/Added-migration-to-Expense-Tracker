
const sequelize = require("../utils/database")

const{DataTypes} = require("sequelize")

const user = sequelize.define("user",{
    name:{
        type: DataTypes.STRING
    }, 
    email:{
        primaryKey: true,
        type: DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        
    },
    isPremium:{
     type:DataTypes.BOOLEAN,
     defaultValue: false

    }
})
module.exports = user