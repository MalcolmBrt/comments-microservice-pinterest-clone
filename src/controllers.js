import Comment from "./model.js";

export const addComment = async (req, res) => {
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
		return res.status(201).json(newComment);
	} catch (err) {
		// En cas d'erreur, retourner une réponse d'erreur avec le message
		return res.status(500).send(err.message);
	}
};

export const getCommentsByImageId = async (req, res) => {
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
};

export const updateComment = async (req, res) => {
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
		return res.status(200).send(comment);
	} catch (err) {
		// En cas d'erreur, retourner une réponse d'erreur avec le message
		return res.status(500).send(err.message);
	}
};

export const deleteComment = async (req, res) => {
	const commentId = req.params.commentId;
	try {
		// Recherche le commentaire à supprimer par son ID et vérifie s'il existe
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send("Comment not found.");
		}
		// Supprime le commentaire de la base de données
		await comment.deleteOne();
		return res.status(200).send(comment);
	} catch (err) {
		return res.status(500).send(err.message);
	}
};
