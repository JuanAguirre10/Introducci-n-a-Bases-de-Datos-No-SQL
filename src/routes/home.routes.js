import express from "express";
import userRepository from "../repositories/userRepository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userRepository.findAll();
    const userId = users.length > 0 ? users[0]._id.toString() : "";
    console.log("userId:", userId);
    res.render("home", { userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;