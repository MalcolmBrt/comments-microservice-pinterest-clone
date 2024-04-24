const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Schéma Mongoose pour les commentaires
const commentSchema = new mongoose.Schema({
	imageId: Number,
	userId: Number,
	content: String,
	edited: Boolean
}, { timestamps: { createdAt: true, updatedAt: false } });

// Modèle Mongoose basé sur commentSchema
const Comment = mongoose.model("Comment", commentSchema);

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Route POST pour ajouter un commentaire
app.post("/", async (req, res) => {
	const { imageId, userId, content } = req.body;
	// Vérifie si userId ou content est manquant ou vide
	if ( !imageId || !userId || !content) {
		return res.status(400).send("Invalid arguments.");
	}
	try {
		// Crée une nouvelle instance de Comment avec les données reçues
		const newComment = new Comment({ imageId, userId, content, edited: false });
		// Enregistre le commentaire dans la base de données
		await newComment.save();
		// Retourne une réponse de succès
		return res.status(201).send("Comment added successfully.");
	} catch (err) {
		// En cas d'erreur, retourner une réponse d'erreur avec le message
		return res.status(500).send(err.message);
	}
});

// Route GET pour récupérer les commentaires d'une image spécifique
app.get("/:imageId", async (req, res) => {
	const imageId = req.params.imageId;
	try {
		// Recherche les commentaires associés à l'image spécifiée s'il y en a
		const comments = await Comment.find({ imageId: imageId });
		if (comments.length === 0) {
			return res.status(404).send("No comments found for this image.");
		}
		return res.status(200).send(comments);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

// Route PUT pour mettre à jour un commentaire spécifique
app.put("/:commentId", async (req, res) => {
	const commentId = req.params.commentId;
	const newContent = req.body.newContent;
	if (!newContent) {
		return res.status(400).send("Invalid arguments.");
	}
	try {
		// Recherche le commentaire à mettre à jour par son ID et vérifie s'il existe
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send("Comment not found.");
		}
		// Mettre à jour le contenu du commentaire
		comment.content = newContent;
		comment.edited = true;
		// Sauvegarde les modifications dans la base de données
		await comment.save();
		return res.status(200).send("Comment updated successfully.");
	} catch (err) {
		// En cas d'erreur, retourner une réponse d'erreur avec le message
		return res.status(500).send(err.message);
	}
});

// Route DELETE pour supprimer un commentaire spécifique
app.delete("/:commentId", async (req, res) => {
	const commentId = req.params.commentId;
	try {
		// Recherche le commentaire à supprimer par son ID et vérifie s'il existe
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send("Comment not found.");
		}
		// Supprime le commentaire de la base de données
		await comment.deleteOne();
		return res.status(200).send("Comment deleted successfully.");
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


async function start() {
	try {
		await mongoose.connect("mongodb://localhost:27017/comments");
		app.listen(port, () => console.log(`Comments API listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
}

start();


