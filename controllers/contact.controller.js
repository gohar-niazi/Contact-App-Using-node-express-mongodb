import contacts from "../models/contact.js";
import mongoose from "mongoose";

// Home PAge Route
export const getcontacts = async (req, res) => {
  const contact = await contacts.find();
  res.render("home", { contact });
};

// Single Contact with id show route
export const getcontact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await contacts.findById(req.params.id);
    if (!contact) return res.render("404", { message: "Contact Not Found" });
    return res.render("show-contact", { contact });
  } catch (error) {
    return res.render("500", { message: error });
  }
};

// Add contactpage Route
export const addcontactpage = (req, res) => {
  res.render("add-contact", { error: null });
};
// Add contact dataroute
export const addcontact = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  // Check if any field is empty
  if (!first_name || !last_name || !email || !phone || !address) {
    // Send back the same form page with an error message
    return res.render("add-contact", { error: "All fields are required!" });
  }

  try {
    const contact = await contacts.create(req.body);
    return res.redirect("/");
  } catch (error) {
    return res.render("500", { message: error });
  }
};

// Update Contact with ID Route Page
export const updatecontactpage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await contacts.findById(req.params.id);
    if (!contact) return res.render("404", { message: "Contact Not Found" });
    return res.render("update-contact", { contact });
  } catch (error) {
    return res.render("500", { message: error });
  }
};

// Update Contact with ID Route
export const updatecontact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await contacts.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) return res.render("404", { message: "Contact Not Found" });
    res.redirect("/");
  } catch (error) {
    return res.render("500", { message: error });
  }
};

// Delte Contact Route
export const deletecontact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await contacts.findByIdAndDelete(req.params.id);
    if (!contact) return res.render("404", { message: "Contact Not Found" });
    res.redirect("/");
  } catch (error) {
    return res.render("500", { message: error });
  }
};
