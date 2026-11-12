# Site « Les Mains Magiques Dax »

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | La page principale (toutes les sections) : **textes et tarifs se modifient ici** |
| `mentions-legales.html` | Page des mentions légales |
| `css/style.css` | Couleurs, polices, mise en page (couleurs regroupées tout en haut) |
| `js/main.js` | Menu mobile et animations en fondu |
| `images/logo.svg` | Logo (aussi utilisé comme icône d'onglet) |
| `robots.txt` | Indique aux moteurs de recherche ce qu'ils peuvent visiter |
| `sitemap.xml` | Plan du site pour Google (à mettre à jour si vous ajoutez une page) |
| `images/hero-provisoire.svg` | Image d'accueil provisoire |

## Voir le site
Double-cliquer sur `index.html` : il s'ouvre dans le navigateur.

## Les photos
Les photos actuelles viennent d'**Unsplash** (licence gratuite, usage commercial
autorisé, sans obligation de citer l'auteur — les crédits sont tout de même
dans les mentions légales).

| Fichier | Emplacement |
|---|---|
| `images/hero.jpg` | Accueil (provisoire — à remplacer par votre photo) |
| `images/michael-manzano.jpg` | Portrait, section « Qui suis-je » |
| `images/energie-mains.jpg` | Section « Découvrir votre propre énergie » (Pexels — énergie et esprits animés ajoutés en CSS) |
| `images/magnetisme.jpg` | Ancienne photo « Qui suis-je » (Pexels), plus utilisée |
| `images/qui-suis-je.jpg` | Ancienne photo « Qui suis-je », plus utilisée |
| `images/lotus.jpg` | Section « Un soin de l'âme » |
| `images/holistique.jpg` | Bandeau « Pourquoi holistique ? » |
| `images/soin-energetique.jpg` | Carte « Soin énergétique » |
| `images/massage.jpg` | Carte « Massage énergétique » |
| `images/lavande.jpg` | Bandeau lavande avant le contact |

Pour changer une photo : remplacer le fichier en gardant **exactement le même nom**.
Largeur idéale : 1 920 px pour l'accueil et les bandeaux, 1 000 px pour les autres,
poids inférieur à 500 Ko.

## Compléter les informations
Rechercher **`[à compléter]`** dans `index.html` et `mentions-legales.html`
(Ctrl+F dans l'éditeur). Ces passages sont surlignés en jaune sur le site :
une fois remplis, retirer `class="a-completer"` pour enlever le surlignage.

À compléter :
- l'email (deux fois dans le lien `mailto:` de `index.html`)
- si un tarif change, le modifier aussi dans ces données (`"price"`)
  et dans la réponse « Combien coûte une séance ? » de la FAQ (texte visible + données)
- les liens Facebook / Instagram (ou supprimer la ligne)
- les mentions légales : nom, statut, SIRET, hébergeur

Les commentaires `✏️` dans le code indiquent les endroits à modifier.

## Mettre en ligne gratuitement
- **Netlify** : créer un compte sur netlify.com, puis glisser-déposer le dossier
  complet sur la page « Sites ». Le site est en ligne en quelques secondes.
- **GitHub Pages** : créer un dépôt, y envoyer les fichiers, puis activer
  *Settings → Pages* sur la branche principale.

Le site est prévu pour l'adresse **https://lesmainsmagiquesdax.com** (inscrite
dans `index.html`, `robots.txt` et `sitemap.xml`). Si l'adresse change, la
remplacer partout (Ctrl+Maj+H dans VS Code).

Une fois en ligne :
1. Créer une **fiche Google Business Profile** (gratuite) avec le lien du site :
   c'est ce qui compte le plus pour apparaître dans les recherches « magnétiseur Dax ».
   Demander aux clients satisfaits de laisser un avis sur cette fiche.
2. Inscrire le site dans **Google Search Console** et y envoyer `sitemap.xml`.
3. Vérifier les données structurées avec le « Test des résultats enrichis » de Google.
