const express = require("express");
const Router = express.Router();
const Product = require("../models/Product");
const verifyAuth = require("../Middlewares/verifyJwt");

// Route1: get all product list :Login required in all product routes
Router.get("/", verifyAuth, async (req, res) => {
  const products = await Product.find();
  products
    ? res.json({ success: true, products })
    : res.json({ success: false, msg: "No products found" });
});

// Route2: Add a product in the list 
Router.post("/add-product",verifyAuth, async (req, res) => {
try {
  const { name, brand, category, price } = req.body;
  if (!name || !brand || !category || !price) {
    return res.json({
      success: false,
      msg: `All product details are required..!`,
    });
  }

  const duplicate = await Product.findOne({ name: req.body.name });
  if (duplicate) {
    return res.json({ success: false, msg: `${req.body.name} already exists` });
  } else {
    const product = await Product.create(req.body);
    res.json({ success: true, msg: `${req.body.name} added sucessfully` });
  }
} catch (error) {
  res.status(500);
}
});

// Route3: Delete and update product via params 
Router.route("/product/:id")
  .delete(verifyAuth, async (req, res) => {
   try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      const result = await Product.deleteOne({ _id: req.params.id });
      res.json({ result, product });
    } else {
      res.json({ success: false, msg: `No such product exists` });
    }
   } catch (error) {
    res.status(500);
   }
  })
  .put(verifyAuth, async (req, res) => {
   try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json({ success: true, result });
   } catch (error) {
    res.status(500);
   }
  })
  .get(verifyAuth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.json({ success: true, product });
    } else {
      res.json({ success: false, msg: `No such product exists` });
    }
  } catch (error) {
    res.status(500);
  }
  });

  // Route4: Searching products via params 
Router.get("/search/:key", verifyAuth, async (req, res) => {
 try {
  const product = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { brand: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
    ],
  });
  if (product) {
    res.json({ success: true, product });
  } else {
    res.json({ success: false, msg: `No such product exists` });
  }
 } catch (error) {
  res.status(500);
 }
});

module.exports = Router;
