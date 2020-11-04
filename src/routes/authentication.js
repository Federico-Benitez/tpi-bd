const express = require('express')
const router = express.Router();
const helpers = require("../lib/helpers");
const passport = require("passport");



router.get('/login', (req,res)=>{
    res.render('auth/login')
})


router.post("/login", (req, res, next) => {
    
    passport.authenticate("local.signin", {
      successRedirect: "/perfil",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  
});


router.get('/perfil', (req,res) => {    
    const user = req.user;      
    
    res.render('auth/perfil', {user});    
})

router.get("/logout", (req, res) => {  
    req.logOut();
    res.redirect("/login");
});
  

module.exports = router;