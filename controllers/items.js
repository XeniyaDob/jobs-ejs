const Item = require("../models/Item");
const parseValidationErrors = require("../utils/parseValidationErrs");

// GET display all the items listings belonging to this user
const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ createdBy: req.user._id });
    res.render("items", { items });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = parseValidationErrors(error);
      req.flash("error", errors);
    } else {
      res.status(500);
      req.flash("error", "An internal server error occurred.");
    }
  }
};
// POST a new item
const addItem = async (req, res, next) => {
  // req.body.isFavorite = req.body.isFavorite === 'on';
  try {
    const newItem = await Item.create({ ...req.body, createdBy: req.user._id });
    res.redirect("/items");
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = parseValidationErrors(error);
      req.flash("error", errors);
    } else {
      res.status(500);
      req.flash("error", "An internal server error occurred.");
      res.redirect("/items");
    }
  }
};
// GET Put up the form to create a new entry
const getNewItemForm = async (req, res) => {
  try {
    res.render("newItemForm", {});
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = parseValidationErrors(error);
      req.flash("error", errors);
      res.redirect("/items");
    } else {
      res.status(500);
      req.flash("error", "An internal server error occurred.");
      res.redirect("/items");
    }
  }
};
// GET a particular entry and show it in the edit box
const editItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!item) {
      res.status(404);
      req.flash("error", "This plant was not found");
      return;
    }
    res.render("item", { item });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = parseValidationErrors(error);
      req.flash("error", errors);
      res.redirect("/items");
    } else {
      res.status(500);
      req.flash("error", "An internal server error occurred.");
      res.redirect("/items");
    }
  }
};
// POST Update a particular entry
const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      res.status(404);
      req.flash("error", "This plant was not found!!!");
      return;
    }
    res.redirect("/items");
  } catch (error) {
    handleErrors(error, req, res, "/items/edit/" + req.params.id);
  }
};
// POST to Delete an entry
const deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await Item.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!deletedItem) {
      res.status(404);
      req.flash("error", "This plant not found");
      return res.redirect("/items");
    }
    req.flash("success", "The plant was deleted");
    res.redirect("/items");
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = parseValidationErrors(error);
      req.flash("error", errors);
      res.redirect("/items/edit/" + req.params.id);
    } else {
      res.status(500);
      req.flash("error", "An internal server error occurred.");
      return res.redirect("/items");
    }
  }
};

module.exports = {
  getItems,
  addItem,
  getNewItemForm,
  editItem,
  updateItem,
  deleteItem,
};
