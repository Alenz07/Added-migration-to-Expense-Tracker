
const sequelize = require("../utils/database")

const{DataTypes} = require("sequelize")

const trackForm = sequelize.define("trackform", {
    id:{
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
allowNull: true
    },
amountSpend:{
    type:DataTypes.STRING,
    
},
where:{
    type: DataTypes.STRING
},
description:{
    type: DataTypes.STRING
}

})

module.exports = trackForm
