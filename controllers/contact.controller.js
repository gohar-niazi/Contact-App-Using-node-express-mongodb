import contacts from "../models/contact.js";

export const getcontacts = async (req, res) => {
  const contact = await contacts.find();
  res.render("home", { contact });
};
export const getcontact = async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  res.render("show-contact", { contact });
};
export const addcontactpage = (req, res) => {
  res.render("add-contact", { error: null });
};
export const addcontact = async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;
  // Check if any field is empty
  if (!first_name || !last_name || !email || !phone || !address) {
    // Send back the same form page with an error message
    return res.render("add-contact", { error: "All fields are required!" });
  }
  const contact = await contacts.create(req.body);
  res.redirect("/");
};
export const updatecontactpage = async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  res.render("update-contact", { contact });
};
export const updatecontact = async (req, res) => {
  await contacts.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
};
export const deletecontact = async (req, res) => {
  await contacts.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
