const express = require('express')
const router=express.Router();
const productsModel=require('../models/products.model')
const config=require('../config/default.json');

router.get('/byCat/:CatID', async function(req, res) {
    const limit=config.pagination.limit;
    const pageCurrent=+req.query.page||1;
    if(pageCurrent<1){pageCurrent=1;}
    const offset=(pageCurrent-1)*limit;

    const [list,totalRecords]=  await Promise.all([
      await productsModel.allByCatWithLimit(+req.params.CatID,limit,offset),
      await productsModel.countByCat(+req.params.CatID)
    ])
    const totalPages=Math.ceil(totalRecords/limit);

    const pages=[];
    for(let i=1;i<=totalPages;i++)
    {
      let page={
        value:i,
        isActive:i===pageCurrent,
      }
      pages.push(page);
    }
  
    for (const c of res.locals.lcCategories) {
      if(+req.params.CatID===c.CatID)
        c.isActive=true;
    }

    res.render('./vwProducts/byCat',{
      products:list,
      empty: list.length===0,
      pages,
      prev: pageCurrent-1,
      next: pageCurrent+1,
      pageStart: pageCurrent===1,
      pageEnd: pageCurrent===totalPages
      
    })
});
    
module.exports=router;