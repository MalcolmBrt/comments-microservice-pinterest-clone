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
  POST /
  ```

- **Paramètres du corps de la requête**
  - `imageId` : Identifiant de l'image à laquelle le commentaire est associé (nombre)
  - `userId` : Identifiant de l'utilisateur qui a ajouté le commentaire (nombre)
  - `content` : Contenu du commentaire (chaîne de caractères)

- **Réponses**
  - Code 201 : Commentaire ajouté avec succès
  - Code 400 : Arguments invalides
  - Code 500 : Erreur serveur

### Récupérer les commentaires d'une image

Récupère tous les commentaires associés à une image spécifique.

- **URL**
  ```
  GET /:imageId
  ```

- **Paramètres d'URL**
  - `imageId` : Identifiant de l'image dont on veut récupérer les commentaires (nombre)

- **Réponses**
  - Code 200 : Commentaires récupérés avec succès
  - Code 404 : Aucun commentaire trouvé pour cette image
  - Code 500 : Erreur serveur

### Mettre à jour un commentaire

Met à jour le contenu d'un commentaire spécifique.

- **URL**
  ```
  PUT /:commentId
  ```

- **Paramètres d'URL**
  - `commentId` : Identifiant du commentaire à mettre à jour (chaîne de caractères)

- **Paramètres du corps de la requête**
  - `newContent` : Nouveau contenu du commentaire (chaîne de caractères)

- **Réponses**
  - Code 200 : Commentaire mis à jour avec succès
  - Code 400 : Arguments invalides
  - Code 404 : Commentaire non trouvé
  - Code 500 : Erreur serveur

### Supprimer un commentaire

Supprime un commentaire spécifique.

- **URL**
  ```
  DELETE /:commentId
  ```

- **Paramètres d'URL**
  - `commentId` : Identifiant du commentaire à supprimer (chaîne de caractères)

- **Réponses**
  - Code 200 : Commentaire supprimé avec succès
  - Code 404 : Commentaire non trouvé
  - Code 500 : Erreur serveur

## Exemple d'utilisation

1. Pour ajouter un commentaire, envoyez une requête POST à l'URL `http://localhost:3000/` avec les paramètres du corps de la requête appropriés.
2. Pour récupérer les commentaires d'une image spécifique, envoyez une requête GET à l'URL `http://localhost:3000/:imageId`, où `:imageId` est l'identifiant de l'image.
3. Pour mettre à jour un commentaire, envoyez une requête PUT à l'URL `http://localhost:3000/:commentId` avec le nouveau contenu du commentaire dans le corps de la requête.
4. Pour supprimer un commentaire, envoyez une requête DELETE à l'URL `http://localhost:3000/:commentId`, où `:commentId` est l'identifiant du commentaire à supprimer.

Assurez-vous d'inclure les en-têtes appropriés dans vos requêtes (par exemple, `Content-Type: application/json`).