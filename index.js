/** @format */
const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));
var contactList = [
  {
    name: "Ataur",
    phone: "73008340**",
  },
  {
    name: "Rehman Stark",
    phone: "95282326**",
  },
  {
    name: "Coding Ninjas",
    phone: "12131321321",
  },
];

app.get("/", async function (req, res) {
  try {
    const contacts = await Contact.find({});
    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  } catch (error) {
    console.log("error in fetching contacts from database", error);
    return;
  }
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  })
    .then((newContact) => {
      console.log("******", newContact);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating a contact!", err);
      return;
    });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Server is running on Port", port);
});

app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;
  Contact.findByIdAndDelete(id)
    .then((contact) => {
      console.log("contact deleted:", contact);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("error while deleting contact:", err);
      return;
    });
});
