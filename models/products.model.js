const db=require('../utils/db');
const TBL_PRODUCTS='products';
module.exports ={
    all:function(){
        return db.load(`select * from ${TBL_PRODUCTS}`)
    },
    allByCatID: function(id){
        return db.load(`select * from ${TBL_PRODUCTS} where CatID=${id}`)
    },
    allByCatWithLimit: function(id,limit,offset)
    {
        return db.load(`select * from ${TBL_PRODUCTS} where CatID=${id} limit ${limit} offset ${offset}`);
    },
    countByCat: async function(id){
        const rows= await db.load(`select count(*) as total from ${TBL_PRODUCTS} where CatID=${id}`);
        return rows[0].total;
    }
}