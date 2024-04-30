const Item = require("../models/item");

// GET display all the items listings belonging to this user
const getItems = async (req, res, next) => {
  res.send("get all plants");
};
// POST a new item
const addItem = async (req, res, next) => {
  res.send("add a new plant");
};
// GET Put up the form to create a new entry
const getNewItemForm = async (req, res) => {
  res.send("get new plant form ");
};
// GET a particular entry and show it in the edit box
const editItem = async (req, res, next) => {
  res.send("edit plant info");
};
// POST Update a particular entry
const updateItem = async (req, res, next) => {
  res.send("update item");
};
// POST to Delete an entry
const deleteItem = async (req, res, next) => {
  res.send("delete plant");
};

module.exports = {
  getItems,
  addItem,
  getNewItemForm,
  editItem,
  updateItem,
  deleteItem,
};
