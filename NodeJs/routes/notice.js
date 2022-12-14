const express = require('express');
const User = require('../models/user');
const Notice = require('../models/notice');
const moment = require('moment')
const sf = require('sf');

// const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/', async (req, res) => {
   // Id찾기 
   try {
      let notice = await Notice.findAll(
         {
            order: [["idx", "DESC"]],
            offset: 0
         }
      );
      notice.map((a,i) => {
         let userTime = notice[i].dataValues.created_at.split(' ')[0]
         
         userTime = userTime.split('-')
         
         userTime = sf("{0}년 {1}월 {2}일",`${userTime[0]}`,`${userTime[1]}`,`${userTime[2]}`)
         
         
         notice[i].dataValues.created_at = userTime
      })
      res.send(notice);
   } catch (error) {
      res.send(error)
   }
}
)

router.post('/writepost', async (req, res) => {
   try {
      let { NoticerId, user_name , title, main_text } = req.body;
      let us = await Notice.create({
         title,
         main_text,
         NoticerId,
      })
      console.log(us)
      res.send(true)
   } catch (error) {
      console.log(error);
      res.send(false )
   }
})

router.post('/:idx',async (req, res) => {
   try {
      const { idx } = req.params;
      let post = await Notice.findOne({
         where : { idx }
      })
      
         let userTime = post.dataValues.created_at.split(' ')[0]
         userTime = userTime.split('-')
         userTime = sf("{0}년 {1}월 {2}일",`${userTime[0]}`,`${userTime[1]}`,`${userTime[2]}`)
         post.dataValues.created_at = userTime
      
      console.log("Post 는 ",post);
      
      res.send(post)
   } catch (error) {
      console.log(error);
      res.send(error)
   }
})
router.post('/modifypost/:idx' , async (req,res) => {
   try {
      const idx = req.params.idx
      console.log(idx);
      let finded = await Notice.findAll({
         where : { idx } 
      })
      console.log("Notice : ",finded);
      res.send(finded)
   } catch (error) {
      console.log(error);
      res.send(error.message)
   }
})
router.put('/modifypost/:idx' , (req,res) => {
   try {
      const { idx } = req.params;
      let { NoticerId,  title, main_text } = req.body;
      Notice.update(
         { NoticerId , title , main_text} ,
         { where : { idx } }
       )
       res.send(true)
   } catch (error) {
      res.send(false)
   }
})


router.post('/delete/:idx',async (req, res) => {
   try {
      const { idx } = req.params;
      await Notice.destroy({
         where : { idx }
      })
      
      res.send(true)
   } catch (error) {
      console.log(error);
      res.send(false)
   }
})
module.exports = router;