import express from "express"
import User from "../models/User.js"
const router = express.Router()

router.post("/subscribe", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Number is required" });
  }

  const existing = await User.findOne({phone})
  if (existing) {
    return res.status(400).json({message: "Number already exists"})
  }

  try {
    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const newSub = new User({ phone });
    await newSub.save();

    res.json({ message: "Subscribed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router