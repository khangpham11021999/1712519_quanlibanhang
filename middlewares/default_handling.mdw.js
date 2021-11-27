
module.exports=function(app)
{
    //-------------------------------------------------------------------------------------------------
    //default handling:
    //default root:
    app.use(function(req, res) {
        res.render('404',{
        layout:false
        })
    });
    
    //default error handling:
    app.use(function(err, req, res, next) {
        console.log(err.stack);
        res.render('500',{layout:false});
    });
}