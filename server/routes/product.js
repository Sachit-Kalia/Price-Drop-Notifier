const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const saveProducts = async (req, res, next) => {
  let wishlist = req.body.data;
  let addedBy = req.body.email;
  for (let i = 0; i < wishlist.length; i++) {
    let rp = wishlist[i];
    let title = rp.title;
    try {
      let old_product = await Product.findOne({
        title,
      });
      if (old_product) {
        if (old_product.price === rp.cost) {
          return res.status(400).json({
            msg: "Product with these credentials already exists",
          });
        }
        await Product.updateOne(
          { title: rp.title },
          { $set: { price: rp.cost } }
        );
        continue;
      }
      let price = rp.cost;
      let link = rp.link;
      let image = rp.image;
      let newProduct = new Product({ title, price, link, addedBy, image });
      // console.log(newProduct);

      await newProduct.save();
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }

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

  await next();
};

router.post("/wishlist", saveProducts);

module.exports = router;
