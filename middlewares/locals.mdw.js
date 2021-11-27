const categoriesModel=require('../models/categories.model')
module.exports=function(app)
{
    app.use( async function(req, res,next) {
        const rows= await categoriesModel.allWithDetails();
        res.locals.lcCategories=rows;
        res.locals.lcIsAuthenticated=req.session.isAuthenticated;
        res.locals.lcUser=req.session.user;
        res.locals.lcIsAdmin=req.session.isAdmin;
        const listTable=[
            {   
                name_table:"Categories",
            },
            {
                name_table:"Products",
            }
        ];
        res.locals.lcListTable=listTable;
        next();
    });
    
}