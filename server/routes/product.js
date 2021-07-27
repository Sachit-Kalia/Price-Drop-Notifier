const express = require('express');
const router = express.Router();
const Product = require('../models/Product');



const saveProducts = (req, res, next) =>{
        
            let wishlist = req.body.data;
            let _id = req.body.user.email;
    
            for(let i = 0; i<wishlist.length; i++){
                let rp = wishlist[i];
                let title = rp.title;
                let price = rp.cost;
                let link = rp.link;
                let addedBy = _id;
                let image = "";
                let newProduct = new Product({title, price, link, addedBy, image});
                // console.log(newProduct);

                newProduct.save();
            
            //     await newProduct.save((err, result)=>{
            //         if (err) {
            //             console.log('Product couldnt be saved to database:', err);
            //             return res.status(400).json({
            //                 error: `Something went wrong trying to save ${newProduct.title}`
            //             });
            //         } else {
            //             console.log('Product saved successfully');
            //         }
            //    });
            } 

       next();

};

router.post('/wishlist', saveProducts);

module.exports = router;