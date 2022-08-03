const express = require('express');
const club = require('../models/club') 


const bcrypt = require("bcrypt");

const router = express.Router();



router.post( '/', async (req,res) => {
   const { toDo,user_id,user_grade,user_name, nowDate,daily } = req.body
   
   try {
      await club.create({
         cluber : user_id,
         date : nowDate,
         name : user_name,
         grade : user_grade,
         todo : toDo
      })

      const user = await club.findOne({
         id : user_id
      })
      console.log("success! ")
      console.log("현재 시각은 : ",req.body.nowDate)
      console.log("========================= ")
      console.log(user)
      res.status(201).send(user)
   } catch (error) {
      console.log("현재 시각은 : ",req.body.nowDate)
      console.log("failed")
      console.log("*****************************************")
      console.log(error)
      res.send(error.message)
   }
   
})

router.post('/request', async (req,res) =>{
   const { user_grade } = req.body
   
   try {
      const user_club = await club.findAll({
         where : {
            grade : user_grade
         }
      })
      
      let user_data = []
      user_club.map((a , i) => {
         user_data[i] = user_club[i].dataValues.date.substr(0,11)
         user_club[i].dataValues.date = user_data[i] 
      })
      
      return res.send(user_club)
   } catch (error) {
      console.log("error : ",error)
      return res.send(false)
   }
})

module.exports = router;