const express = require('express');
const User = require('../models/user')
const bcrypt = require("bcrypt");

const router = express.Router();



router.post('/id', async (req, res) => {
   // Id찾기 
   try {
      console.log('반응옴')
      const { name, grade } = req.body
      const user = await User.findOne({ where: { name, grade } })

      console.log(user.dataValues)
      res.send(user.dataValues.id)
   } catch (error) {
      res.send('error')
   }
}
)
router.post('/pw', async (req, res) => {
   // Id찾기 
   try {
      console.log('반응옴pw')
      const { name, grade, pw } = req.body
      const user = await User.findOne({ where: { name, grade } })

      console.log(user.dataValues)
      console.log(pw)
      const hashPwd = await bcrypt.hash( pw , 12);
      
      const updateUser = await User.update( {passwd : hashPwd}, { where: { name } })
      console.log(updateUser)

      res.send(true)
   } catch (error) {
      res.send('error')
   }
}
)

module.exports = router;