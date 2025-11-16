const { expenses } = require("../models")
const trackform  = require("../models/expenses")
const sequelize = require("../utils/database")
const genAi = require("@google/genai")
const ai = new genAi.GoogleGenAI({
    apiKey:"AIzaSyDBp4qcmEtEDRcaClreqa89_trRi87Lua4"
  });
post_data = async(req,res)=>{
    const userEmail = req.userEmail
    try {
        const{amountSpend,where,description} = req.body
        const adding  = await trackform.create({
            amountSpend:amountSpend,where:where,description:description,userEmail: userEmail        
        }  
      )   
       res.send("info is send")
    } catch (error) {
        console.log(error)
    }
}
get_data = async(req,res)=>{
    const userEmail = req.userEmail
    const rows = Number(req.query.rows)||5
    const page = Number(req.query.currPage)||1
    const offset = (page-1)*rows
    console.log(userEmail)
    try {
        const data  = await trackform.findAll({
            where:{
                userEmail:userEmail
            },
            limit:rows,
            offset:offset,
            order:[["createdAt","DESC"]]
        })
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
delete_data = async(req,res)=>{
try {
    const id = req.params.id
    console.log(id)
    const deleeee = await trackform.destroy({
        where:{id:id}
    })
    res.send("deleted yess")
    console.log("yes deleted")
} catch (error) {
    console.log(error)
}
}

creating_leaderboard = async(req,res)=>{
    try {
        const data = await trackform.findAll({
           attributes:["userEmail",
           [sequelize.fn("SUM",sequelize.col("amountSpend")),"totalexpenses"]],
           group:["userEmail"],
           order:[[sequelize.fn('SUM', sequelize.col('amountSpend')), 'DESC']]
        })
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
ask_Ai = async(req,res)=>{
    try {
       
        const{query} = req.body
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query,
            generationConfig: {
                maxOutputTokens: 100,  // Limit to ~75-100 words
                temperature: 0.7,       // Optional: creativity level (0-1)
            }
          });

          res.json(response.text)
    } catch (error) {
        console.log(error)
    }
}

module.exports  = {post_data,get_data,delete_data,creating_leaderboard,ask_Ai}