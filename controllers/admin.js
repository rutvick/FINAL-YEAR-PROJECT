const path = require('path');
const pool = require('../util/pool')

exports.getAdminLogin = (req,res,next) => {
    res.render('./auth/admin-login', {
        pageTitle: 'Admin Login',
        path: '/admin-login',
    });
}

exports.postLogin =  (req, res ,next) => {
    let userInput = {
        username: req.body.adminID,
        password: req.body.password
    };
    //console.log(typeof(userInput));

    let admin_id = userInput.username;
    //console.log(admin_id);

    // prepare the sql query
    let sql = `SELECT password FROM admin WHERE admin_id = ?`;
    pool.query(sql, admin_id, function(err, result) {
        if(err) throw err

        if(result.length) {
            //console.log(result[0].password);
            //console.log(userInput.password);
            if(result[0].password === userInput.password){
                res.redirect('/admin-products');
            }
            else{
                res.send('Incorrect AdminId/Password');
            }
        }
    });

}


exports.getProducts = (req , res, next) => {
    let sql = `select imageUrL,modelname,price from laptops`;
    let sql1 = `select * from smartphones`;
    let sql2 = `select imageUrL,modelname,price from audio`;
    pool.query(sql,function(err,result){
        pool.query(sql1,function(err,result1){
            pool.query(sql2,function(err,result2){
                if(err) throw err
                else
                res.render('./admin/admin-products', {
                    pageTitle: "All Products",
                    path: "/admin-products",
                    prods: result,
                    smartphones: result1,
                    audio: result2
                });                
            });
        });
    });
}

exports.getAddSmartphone = (req, res, next) => {
	res.render("admin/smartphones", {
		pageTitle: "Smartphones",
		path: "/admin/smartphones",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const productid = req.body.productid;
	const brandname = req.body.brandname;
	const modelname = req.body.modelname;
	const price = req.body.price;
	const processor = req.body.processor;
	const ram = req.body.ram;
	const storage = req.body.storage;
	const battery = req.body.battery;
	const rearcamera = req.body.rearcamera;
	const frontcamera = req.body.frontcamera;
	const os = req.body.os;
	const ratings = req.body.ratings;
	const imageUrl = req.body.imageUrl;

	
    let sql = `INSERT into smartphones(productid,brandname,modelname,price,processor,ram,storage,battery,rearcamera,frontcamera,os,ratings,imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    pool.query(sql,[productid,brandname,modelname,price,processor,ram,storage,battery,rearcamera,frontcamera,os,ratings,imageUrl],function(err,result){
        if (err) throw err
        else
            console.log("Created Product.");
            res.redirect('/admin-products');
    });
}

exports.getEditSmartphone = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/admin-products");
	}
	const prodId = req.params.productId;

    sql = `SELECT * FROM smartphones WHERE productid ='${prodId}' `;
	pool.query(sql,function(err,result){
		if (err) throw err
        if (!result) {
	    	res.redirect("/admin-products");
		}
        //console.log(result[0]);
		res.render("./admin/smartphones", {
			pageTitle: "Edit Product",
			path: "/smartphones",
			editing: editMode,
			product: result[0],
	    });
	});
}