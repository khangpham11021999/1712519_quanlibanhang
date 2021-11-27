const express = require('express')
const router=express.Router();
const productsModel=require('../models/products.model')
const TBL_PRODUCTS="Products"
router.get('/list', async function(req, res) {
    const list= await productsModel.all();

    for (const c of res.locals.lcListTable) {
      if(c.name_table===TBL_PRODUCTS)
          c.isActiveEntity=true;
    }
    res.render('./vwProducts/list',{
      products: list,
      empty: list.length===0,
      isActiveEntity: req.query.name_table==="Products"
    });
  })
    

module.exports=router;