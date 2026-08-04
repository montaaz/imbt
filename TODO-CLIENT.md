# Rapport des modifications — IMBT Consulting

## Fait

- [x] Lenteur au chargement du site web
- [x] Authentification perdue au retour sur la page d'accueil
- [x] Suppression des logins / mots de passe de démo sur la page de connexion
- [x] Couleur du logo en thème light
- [x] Erreur « Google sign-in non configuré » à la création de compte
- [x] Page mot de passe oublié (404)
- [x] Réseaux sociaux : TikTok + YouTube
- [x] Intégration Google Analytics (GA4)
- [x] Bouton dark / light
- [x] Indicatif téléphonique dans les formulaires
- [x] Ne plus afficher les horaires déjà réservés

## Reste à faire

- [ ] Envoi réel des emails de réinitialisation (fournisseur SMTP à configurer)
- [ ] Ajouter les photos dans les articles de blog
- [ ] Corriger la version arabe
- [ ] Ajouter les photos des employés
- [ ] Corriger l'adresse et le lien vers Google Maps dans le footer
- [ ] Texte « Vous avez déjà un compte ? Se connecter »

## Configuration requise (console Google)

Pour que le bouton « Continuer avec Google » fonctionne, ajouter ces origines
dans **Authorized JavaScript origins** du client OAuth
(https://console.cloud.google.com/apis/credentials) :

- `http://localhost:3000`
- `https://imbt-consulting.com`
- `https://www.imbt-consulting.com`
