const express = require("express");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/exercise-tracker", (err) => {
  if (err) {
    console.error("ERROR while connecting to db");
    console.error(err);
  } else {
  }
});
const UserSchema = require("./schemas/userSchema");
const Exercise = require("./schemas/exercise");

app.post("/add-exercise", async function (req, res) {
  try {
    let { username, duration, description, date } = req.body;

    if (
      username !== undefined &&
      username !== null &&
      username !== "" &&
      duration !== null &&
      duration !== undefined &&
      duration !== "" &&
      description !== undefined &&
      description !== "" &&
      description !== null &&
      date !== "" &&
      date !== null &&
      date !== undefined
    ) {
      let ex = {
        username,
        duration,
        description,
        date,
      };
      let thisex = await Exercise.create(ex);
      if (thisex) {
        res.json({
          status: true,
          msg: "New exercise added successfully",
        });
      } else {
        res.json({
          status: false,
          msg: "Some problem occured while creating exercise",
        });
      }
    } else {
      res.json({
        status: false,
        msg: "All the parameters are required for creating a new exercise",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
});
app.post("/create-user", async function (req, res) {
  try {
    let { name } = req.body;

    if (name !== undefined && name !== null && name !== "") {
      let user = {
        name,
      };
      let thisuser = await UserSchema.create(user);
      if (thisuser) {
        res.json({
          status: true,
          msg: "New user created successfully",
        });
      } else {
        res.json({
          status: false,
          msg: "Some problem occured while creating user",
        });
      }
    } else {
      res.json({
        status: false,
        msg: "Name is required for creating  a new record",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
});

app.post(`/edit-exercise/:exercise_id`, async function (req, res) {
  const filter = { _id: req.params.exercise_id };
  let { username, duration, description, date } = req.body;
  const update = { username, duration, description, date };
  
  const ex = await Exercise.findOneAndUpdate(filter, update);
  if (ex) {
    res.json({
      status: true, //

      msg: "Exercise updated successfully",
    });
  }
});
app.delete(`/delete-exercise/:delete_id`, async function (req, res) {
  const ex = await Exercise.findByIdAndDelete(req.params.delete_id);
  if (ex) {
    res.json({
      status: true, //

      msg: "Exercise deleted successfully",
    });
  }
});
app.get("/all-exercises", async function (req, res) {
  try {
    let ex = await Exercise.find({});
    if (ex !== undefined && ex !== null) {
      res.json({
        status: true,
        ex,
      });
    } else {
      res.json({ status: false, msg: "Apparaently , no exercise were found" });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
});
app.get("/all-users", async function (req, res) {
  try {
    let users = await UserSchema.find({});
    if (users !== undefined && users !== null) {
      res.json({
        status: true,
        users,
      });
    } else {
      res.json({ status: false, msg: "Apparaently , no users were found" });
    }
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
});

app.listen(8000, () => {
  console.log("listening 8000");
});
