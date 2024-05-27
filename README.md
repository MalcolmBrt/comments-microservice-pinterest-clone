# Microservice de gestion de commentaires

Les commentaires sont composés d'un identifiant unique, de l'identifiant de l'utilisateur, de leur contenu, de leur date et s'ils ont été modifiés.

## Installation et utilisation

Pour installer les dépendances, exécutez la commande suivante :

```bash
npm install
```

Pour lancer l'application en mode développement, utilisez la commande suivante :

```bash
npm run dev
```

Pour lancer l'application en mode production, utilisez la commande suivante :

```bash
npm run prod
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## API Endpoints

### Ajouter un commentaire

Ajoute un nouveau commentaire à une image spécifique.

- **URL**

	```
	POST /comments
	```

- **Paramètres du corps de la requête**

	- `imageId` : Identifiant de l'image à laquelle le commentaire est associé (nombre)
	- `userId` : Identifiant de l'utilisateur qui a ajouté le commentaire (nombre)
	- `content` : Contenu du commentaire (chaîne de caractères)

- **Réponses**
	- Code 201 : Commentaire ajouté avec succès, renvoie le commentaire ajouté
	- Code 400 : Arguments invalides
	- Code 500 : Erreur serveur

### Récupérer les commentaires d'une image

Récupère tous les commentaires associés à une image spécifique.

- **URL**

	```
	GET /comments/:imageId
	```

- **Paramètres d'URL**

	- `imageId` : Identifiant de l'image dont on veut récupérer les commentaires (nombre)

- **Réponses**
	- Code 200 : Commentaires récupérés avec succès, renvoie les commentaires trouvés
	- Code 404 : Aucun commentaire trouvé pour cette image
	- Code 500 : Erreur serveur

### Mettre à jour un commentaire

Met à jour le contenu d'un commentaire spécifique.

- **URL**

	```
	PUT /comments/:commentId
	```

- **Paramètres d'URL**

	- `commentId` : Identifiant du commentaire à mettre à jour (chaîne de caractères)

- **Paramètres du corps de la requête**

	- `newContent` : Nouveau contenu du commentaire (chaîne de caractères)

- **Réponses**
	- Code 200 : Commentaire mis à jour avec succès, renvoie le commentaire mis à jour
	- Code 400 : Arguments invalides
	- Code 404 : Commentaire non trouvé
	- Code 500 : Erreur serveur

### Supprimer un commentaire

Supprime un commentaire spécifique.

- **URL**

	```
	DELETE /comments/:commentId
	```

- **Paramètres d'URL**

	- `commentId` : Identifiant du commentaire à supprimer (chaîne de caractères)

- **Réponses**
	- Code 200 : Commentaire supprimé avec succès, renvoie le commentaire supprimé
	- Code 404 : Commentaire non trouvé
	- Code 500 : Erreur serveur

## Exemple d'utilisation

1. **Ajouter un commentaire :**
	 Pour ajouter un nouveau commentaire, envoyez une requête POST à l'URL `http://localhost:3000/comments` avec les paramètres du corps de la requête suivants :

	 ```http
	 POST http://localhost:3000/comments
	 Content-Type: application/json

	 {
		 "imageId": 1234,
		 "userId": 5678,
		 "content": "Ceci est un nouveau commentaire."
	 }
	 ```

2. **Récupérer les commentaires d'une image spécifique :**

	 Pour récupérer tous les commentaires associés à une image spécifique, envoyez une requête GET à l'URL `http://localhost:3000/:imageId`, où `:imageId` est l'identifiant de l'image désirée.

	 ```http
	 GET http://localhost:3000/comments/123
	 ```

3. **Mettre à jour un commentaire :**

	 Pour mettre à jour le contenu d'un commentaire spécifique, envoyez une requête PUT à l'URL `http://localhost:3000/:commentId` avec le nouveau contenu du commentaire dans le corps de la requête.

	 ```http
	 PUT http://localhost:3000/789
	 Content-Type: application/json

	 {
		 "newContent": "Ceci est le nouveau contenu du commentaire."
	 }
	 ```

4. **Supprimer un commentaire :**

	 Pour supprimer un commentaire spécifique, envoyez une requête DELETE à l'URL `http://localhost:3000/:commentId`, où `:commentId` est l'identifiant du commentaire à supprimer.

	 ```http
	 DELETE http://localhost:3000/789
	 ```
