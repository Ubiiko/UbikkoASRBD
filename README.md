# 🎬 Movies API – Next.js & MongoDB Atlas

## 📋 Présentation

Movies API est une application web construite avec **Next.js**, **TypeScript**, et **MongoDB Atlas**, qui expose une **API RESTful** permettant de gérer des films, leurs commentaires, et des théâtres. Elle intègre **Swagger UI** pour la documentation, et est déployable facilement via **Vercel**.

---

## 🔗 Liens utiles

- 🔌 API en production : https://votre-api.vercel.app
- 📘 Documentation Swagger : https://votre-api.vercel.app/api-doc
- 💻 Dépôt GitHub : https://github.com/votre-username/votre-repo

---

## 🧰 Technologies utilisées

- **Next.js** – Framework React moderne avec App Router
- **TypeScript** – Langage typé pour JavaScript
- **MongoDB Atlas** – Base de données NoSQL cloud
- **Swagger UI React** – Documentation interactive de l’API
- **Vercel** – Déploiement simple et rapide

---

## 🚀 Installation et démarrage

### Prérequis

- Node.js v18+
- Compte MongoDB Atlas avec base `sample_mflix`
- Git + Vercel (facultatif pour déploiement)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/votre-repo.git
cd votre-repo

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d’environnement
cp .env.local.example .env.local
```

📌 **Important :** Le fichier `.env.local` **n’est pas inclus dans le dépôt GitHub** pour des raisons de sécurité. Ce fichier contient des données sensibles comme la chaîne de connexion MongoDB. Il est à créer et à configurer manuellement.

**Exemple de contenu** :

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

```bash
# 4. Lancer le serveur de développement
npm run dev
```

🟢 Accès local : [http://localhost:3000](http://localhost:3000)  
📚 Documentation : [http://localhost:3000/api-doc](http://localhost:3000/api-doc)

---

## 📚 Documentation des endpoints

La documentation complète est disponible via Swagger à `/api-doc`.

### 🎥 Endpoints - Films (Movies)

| Méthode | Endpoint             | Description                  |
| ------- | -------------------- | ---------------------------- |
| GET     | /api/movies          | Récupérer tous les films     |
| GET     | /api/movies/:idMovie | Récupérer un film spécifique |
| POST    | /api/movies/:idMovie | Créer un nouveau film        |
| PUT     | /api/movies/:idMovie | Mettre à jour un film        |
| DELETE  | /api/movies/:idMovie | Supprimer un film            |

➡️ Chaque film est identifié par un `idMovie`. Les opérations permettent d’effectuer des actions CRUD sur les films.

---

### 💬 Endpoints - Commentaires (Comments)

| Méthode | Endpoint                                 | Description                          |
| ------- | ---------------------------------------- | ------------------------------------ |
| GET     | /api/movies/:idMovie/comments            | Récupérer les commentaires d’un film |
| GET     | /api/movies/:idMovie/comments/:idComment | Récupérer un commentaire spécifique  |
| POST    | /api/movies/:idMovie/comments/:idComment | Ajouter un commentaire               |
| PUT     | /api/movies/:idMovie/comments/:idComment | Modifier un commentaire              |
| DELETE  | /api/movies/:idMovie/comments/:idComment | Supprimer un commentaire             |

➡️ Les commentaires sont liés à un `idMovie` et identifiés par un `idComment`. Cela permet d’attacher dynamiquement des avis à un film spécifique.

---

### 🎭 Endpoints - Théâtres (Theaters)

| Méthode | Endpoint                 | Description                 |
| ------- | ------------------------ | --------------------------- |
| GET     | /api/theaters            | Récupérer tous les théâtres |
| GET     | /api/theaters/:idTheater | Récupérer un théâtre        |
| POST    | /api/theaters/:idTheater | Créer un théâtre            |
| PUT     | /api/theaters/:idTheater | Modifier un théâtre         |
| DELETE  | /api/theaters/:idTheater | Supprimer un théâtre        |

➡️ Cette section permet de gérer des emplacements de projection, comme des cinémas ou lieux fictifs.

---

## 🧪 Exemples d’utilisation

```bash
# Récupérer un film
curl -X GET https://votre-api.vercel.app/api/movies/573a1390f29313caabcd42e8

# Ajouter un commentaire
curl -X POST https://votre-api.vercel.app/api/movies/573a1390f29313caabcd42e8/comments/5a9427648b0beebeb69579e7
```

---

## 📁 Structure du projet

```
├── .next/                         # Fichiers de build générés par Next.js
├── app/                           # Dossier principal avec App Router
│   ├── api/                       # API REST
│   │   ├── movies/               # Ressource principale : films
│   │   │   ├── [idMovie]/        # Film spécifique
│   │   │   │   └── comments/
│   │   │   │       └── [idComment]/
│   │   │   │           └── route.ts
│   │   │   └── route.ts          # Tous les films
│   │   ├── theaters/
│   │   │   ├── [idTheater]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   ├── api-doc/                  # Swagger UI intégré
│   │   ├── page.tsx
│   │   └── react-swagger.tsx
│   ├── app-demo/                 # Démo de l'application
│   │   ├── page.tsx
│   │   ├── actions.ts
│   │   ├── favicon.ico
│   │   └── layout.tsx
├── lib/                          # Fonctions utilitaires (ex: MongoDB, Swagger)
├── node_modules/
├── pages/                        # (optionnel - pages classiques si utilisées)
├── public/                       # Fichiers statiques
├── styles/                       # Fichiers CSS
├── .env.local                    # Variables d’environnement (non commit)
├── .gitignore
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── README.md
```

---

## ☁️ Déploiement avec Vercel

1. Poussez le repo sur GitHub.
2. Connectez-le à [https://vercel.com](https://vercel.com).
3. Définissez `MONGODB_URI` dans les variables d’environnement.
4. Cliquez sur **Deploy**.

---

## 👥 Contributeurs

Julien **ENFEDAQUE-MORER**  
Rémi **TRAN SAMMARCELLI**
