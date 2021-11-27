const express = require('express')
const router=express.Router();
const moment = require('moment');
const bcrypt = require('bcrypt');
const auth=require('../middlewares/auth.mdw');
const usersModel=require('../models/users.model');
// -------------------------------------------------------------------------
router.get('/register', async function(req, res) {
   res.render('./vwAccount/register')
});
router.post('/register',auth.validate, async function(req, res) {
  const user= await usersModel.singleByUsername(req.body.username);
  if(user){
    return res.render("./vwAccount/register",{
      err:"USER IS EXISTED !!!"
  });
  }
  const dob=moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
  const password_hash = bcrypt.hashSync(req.body.password, 10);
  const entity={
    username:req.body.username,
    name:req.body.name,
    email:req.body.email,
    permission:0,
    dob,
    password:password_hash
  }
  await usersModel.add(entity);
  res.redirect('/account/login')
});
//------------------------------------------------------
router.get('/login', async function(req, res) {
  res.render('./vwAccount/login',{
    layout:false
  })
});

router.post('/login', async function(req, res) {
  const user=await usersModel.singleByUsername(req.body.username);
  req.session.isAuthenticated=false;;
  req.session.user=null;
  if(user===null)
  {
    return res.render('./vwAccount/login',{
      layout:false,
      err_message:"Invalid username or password."
    })
  };
  const result=bcrypt.compareSync(req.body.password, user.password);
  if(!result)
  {
    return res.render('./vwAccount/login',{
      layout:false,
      err_message:"Invalid username or password."
    })
  }
  req.session.isAuthenticated=true;
  req.session.user=user;
  if(user.permission===1)
    req.session.isAdmin=true;
  else{
    req.session.isAdmin=false;
  }
  res.redirect('/account/profile');
});
//-------------------------------------------------------
router.get('/profile',auth.restrict, async function(req, res) {
  const user=req.session.user;
  const dob=moment(user.dob,'YYYY-MM-DD').format('DD-MM-YYYY');
  user.dob=dob;
  res.render('./vwAccount/profile',{
    user,
    isAdmin: user.permission===1
  })
});
//-------------------------------------------------------
router.post('/logout', async function(req, res) {
  req.session.isAuthenticated=false;
  req.session.user=null;
  req.session.isAdmin=false;
  const url=req.headers.referer;
  const check=url.indexOf("admin");
  if(check!=-1)
      return res.redirect('/');
  res.redirect(req.headers.referer);
});

module.exports=router;