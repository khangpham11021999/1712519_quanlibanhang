const express = require('express')
const router=express.Router();
const categoriesModel=require('../models/categories.model')
const TBL_CATEGORIES=`Categories`;
router.get('/list', async function(req, res) {
    const list= await categoriesModel.all();

    for (const c of res.locals.lcListTable) {
      if(c.name_table===TBL_CATEGORIES)
          c.isActiveEntity=true;
    }
    
    res.render('./vwCategories/list',{
      categories: list,
      empty: list.length===0,
      
    });
});
    
router.get('/add', async function(req, res) {
  res.render('./vwCategories/add');
});

router.get('/edit', async function(req, res) {
  const id= +req.query.id||-1;
  const rows = await categoriesModel.single(id);
  if(rows.length===0){
    return res.send('invalid parameter');
  }
  const category=rows[0];
  res.render('./vwCategories/edit',{category});
});

router.post('/add', async function(req, res) {
  await categoriesModel.add(req.body);
  res.redirect('/admin/categories/list');
});

router.post('/update', async function(req, res) {
  await categoriesModel.patch(req.body);
  res.redirect('/admin/categories/list');
});

router.post('/del', async function(req, res) {
  await categoriesModel.del(req.body.CatID);
  res.redirect('/admin/categories/list');
});



module.exports=router;