const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
const uri =
  "mongodb+srv://mirasavsaniitsolution:admin@cluster0.fcbx8bk.mongodb.net/quizedemo?retryWrites=true&w=majority&appName=Cluster0";
// this uri connection string get from driver
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  que: String,
  ans: String,
});


const User = mongoose.model("quizes", userSchema);



app.get("/data", async (req, res) => {
  const users = await User.find();
  res.json(users);
  console.log(users);
});

app.post("/add", async (req, res) => {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  });
  

  app.put("/update/:id", async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (result) {
        res.status(200).send({ message: "User updated successfully", result });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Failed to update user", error });
    }
  });
  

  app.delete("/delete/:id", async (req, res) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      if (result) {
        res.status(200).send({ message: "User deleted successfully", result });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Failed to delete user", error });
    }
  });
  

app.listen(port);