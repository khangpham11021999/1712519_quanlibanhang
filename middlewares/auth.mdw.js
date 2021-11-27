
module.exports={
    restrict: function(req,res,next){
        if(!req.session.isAuthenticated)
          res.redirect(`/account/login?retUrl=${req.originalUrl}`);
        else
          next();
    },
    validate: function(req,res,next)
    {
        const username=req.body.username;
        if(username.trim().length===0)
          return res.render("./vwAccount/register",{
            err:"INFORMATION IS INVALID !!!"
        });

        const password=req.body.password;
        if(password.trim().length<6)
          return res.render("./vwAccount/register",{
            err:"INFORMATION IS INVALID !!!"
        });
        
        const confirm=req.body.confirm;
        if(confirm!==password)
          return res.render("./vwAccount/register",{
            err:"INFORMATION IS INVALID !!!"
        })

        const name=req.body.name;
        if(name.trim().length===0)
          return res.render("./vwAccount/register",{
            err:"INFORMATION IS INVALID !!!"
        });

        const email=req.body.email;
        const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailRegex.test(email))
        {
          return res.render("./vwAccount/register",{
            err:"INFORMATION IS INVALID !!!"
          });
        }
        next();
    }
}