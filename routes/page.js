const pool = require("../util/pool")
const express = require("express");
const router = express.Router();

router.get('/details',(req,res,next) => {
  res.render('./pages/details', {
    pageTitle: 'details',
    path:'/details',
  });
});

router.get('/omen',(req,res,next) => {
  res.render('./pages/omen', {
    path:'/omen',
  });
});

router.get('/charts',(req,res,next) => {
  res.render('./pages/charts', {
    path:'/charts',
    pageTitle: 'Market Shares',
  });
});

router.get('/products', (req, res, next) =>
 {
  let sql = `select imageUrL,modelname,price from smartphones`;
  pool.query(sql,function(err,result)
  {
    if(err) throw err
    else
    res.render('./pages/products', {
    pageTitle: "smartphones",
    path: "/products",
    prods: result,
  });
});
});

router.get('/laptop', (req, res, next) => {
  let sql = `select imageUrL,modelname,price from laptops`;
  pool.query(sql,function(err,result)
  {
    if(err) throw err
    else
    res.render('./pages/laptop', {
    pageTitle: "laptops",
    path: "/laptop",
    prods: result,
  });
});
});

router.get('/audio', (req, res, next) => {
  let sql = `select imageUrL,modelname,price from audio`;
  pool.query(sql,function(err,result)
  {
    if(err) throw err
    else
    res.render('./pages/audio', {
    pageTitle: "audio",
    path: "/audio",
    prods: result,
  });
});
});

router.get('/custom', (req, res, next) => {
    res.render('./pages/custom', {
        pageTitle: "Customize",
        path: '/custom'
    });
});


router.post('/products',(req,res,next) => {
  let a = req.body.minimum;
  console.log(a);
  let b = req.body.maximum;
  console.log(b);
  let c = `select imageUrL,modelname,price from smartphones where price>=? and price<?`;
  pool.query(c,[a,b],function(err,result){
    if(err) throw err
    else
    res.render('./pages/products', {
    pageTitle: "smartphone",
    path: "/products",
    prods: result,
  });
});
});

router.post('/laptop',(req,res,next) => {
  let a = req.body.minimum;
  console.log(a);
  let b = req.body.maximum;
  console.log(b);
  let c = `select imageUrL,modelname,price from laptops where price>=? and price<?`;
  pool.query(c,[a,b],function(err,result){
    if(err) throw err
    else
    res.render('./pages/laptop', {
    pageTitle: "laptop",
    path: "/laptop",
    prods: result,
  });
});
});



router.post('/audio',(req,res,next) => {
    let a = req.body.minimum;
    console.log(a);
    let b = req.body.maximum;
    console.log(b);
    let c = `select imageUrL,modelname,price from audio where price>=? and price<?`;
    pool.query(c,[a,b],function(err,result){
      if(err) throw err
      else
      res.render('./pages/audio', {
      pageTitle: "audio",
      path: "/audio",
      prods: result,
    });
  });
  });


module.exports = router;
