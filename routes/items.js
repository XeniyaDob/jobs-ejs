const express = require("express");
const router = express.Router();

const {
  getItems,
  addItem,
  getNewItemForm,
  editItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

//GET /items (display all the item listings belonging to this user)
//POST /items (Add a new item listing)
router.route("/items").get(getItems).post(addItem);

//GET /items/new (Put up the form to create a new entry)
router.route("/items/new").get(getNewItemForm);

//GET /items/edit/:id (Get a particular entry and show it in the edit box)
router.route("/items/edit/:id").get(editItem);

//POST /items/update/:id (Update a particular entry)
router.route("/items/update/:id").post(updateItem);

//POST /items/delete/:id (Delete an entry)
router.route("/items/delete/:id").post(deleteItem);

module.exports = router;
