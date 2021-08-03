const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const saveProducts = async (req, res, next) => {
  let wishlist = req.body.data;
  let addedBy = req.body.email.user.email;
  let count = 0;
  let updated = 0;
  let pdProducts = [];
  for (let i = 0; i < wishlist.length; i++) {
    let rp = wishlist[i];
    let title = rp.title;
    try {
      let old_product = await Product.findOne({
        title,
      });
      count++;
      if (old_product && (addedBy === old_product.addedBy)){
        
        let oldCost = parseFloat(old_product.price);
        let newCost = parseFloat(rp.cost);
        if (oldCost === newCost) {
          continue;
        }
        
        if(addedBy === old_product.addedBy){
            await Product.updateOne(
              { title: rp.title },
              { $set: { price: rp.cost } }
            );
            updated++;

            let price = rp.cost;
            let link = rp.link;
            let image = rp.image;
            
            if(newCost < oldCost){
              let newProduct = new Product({title, price, link, image, addedBy});
               pdProducts.push(newProduct);
            }
            continue;
        }
        continue;
      }
      let price = rp.cost;
      let link = rp.link;
      let image = rp.image;
      let newProduct = new Product({ title, price, link, image, addedBy});
      // console.log(newProduct);

      await newProduct.save();
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }

  }

  if(count === 0){
    res.send("Either you ran this extension first time or there were no products in your wishlist before");
  }else{
    try{
      await res.send(pdProducts);
    }catch(e){
      console.log(e);
    }
  }
  
  // else if(count > 0  && updated === 0){
  //   res.send("No price drop found!");
  // }
  
  await next();
};

router.post("/wishlist", saveProducts);

module.exports = router;
