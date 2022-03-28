const express = require('express');
const router = express.Router();
const mongodb = require('../src/mongodb');

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/signup', (req, res) => {
    res.render("signup");
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    mongodb.signup(userid, userpw, function(result){
        switch(result){
            case 'SUCCESS':
                res.redirect("/#contact");
                break;
            case 'ERR_DUPLICATE':
                res.write("<script>alert('duplicate id')</script>");
                res.write("<script>window.location=\"signup\"</script>");
                break;
            default:
                res.write("<script>alert('fail')</script>");
                res.write("<script>window.location=\"signup\"</script>");
                break;
        }
    });
});

module.exports = router;