import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);                       
router.get("/new/:userId", postController.renderCreate);      
router.post("/new/:userId", postController.create);         
router.get("/edit/:id", postController.renderEdit);          
router.post("/edit/:id", postController.update);        
router.post("/delete/:id", postController.delete);      
router.get("/delete/:id", postController.renderDelete);

export default router;