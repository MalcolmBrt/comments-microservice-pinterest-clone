import express from "express";
import * as commentController from "./controllers.js";

const router = express.Router();

// Route POST pour ajouter un commentaire
router.post("/", commentController.addComment);

// Route GET pour récupérer les commentaires d'une image spécifique
router.get("/:imageId", commentController.getCommentsByImageId);

// Route PUT pour mettre à jour un commentaire spécifique
router.put("/:commentId", commentController.updateComment);

// Route DELETE pour supprimer un commentaire spécifique
router.delete("/:commentId", commentController.deleteComment);


export default router;