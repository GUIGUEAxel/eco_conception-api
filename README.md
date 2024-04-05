# Projet MongoDB

## Description
Ce projet consiste en une API de défis d'éco-conception aléatoires avec une administration simple, développée en utilisant Node.js avec Express.js comme framework et MongoDB comme base de données.

## Fonctionnalités
- Récupération d'un défi aléatoire
- Récupération de plusieurs défis aléatoires
- Ajout, modification et suppression de défis (pour les utilisateurs authentifiés)
- Authentification avec JWT

## Prérequis
- Node.js
- MongoDB

## Installation
1. Clonez ce repository.
2. Installez les dépendances avec la commande : `npm install`.
3. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement comme indiqué dans le fichier `.env.example`.

## Lancement
- Démarrez le serveur avec la commande : `npm start`.

## Utilisation

Pour toutes les requêtes, il vous faudra utiliser un token, sauf pour demander un seul défi aléatoire.

- Pour récupérer un défi aléatoire : `GET /challenges/random`.
- Pour récupérer plusieurs défis aléatoires : `GET /challenges/random/:count`.
- Pour ajouter un défi : `POST /challenges` (authentification requise).
- Pour modifier un défi : `PUT /challenges/:id` (authentification requise).
- Pour supprimer un défi : `DELETE /challenges/:id` (authentification requise).

## Auteur
Kylian VINEL & Dorian ROCHETTE

## Licence
Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
