//------- INDEX (Script) -------//

//------ API ------//

//-- Je récupère les données contenues dans l'API grâce à Fetch --//

fetch("http://localhost:3000/api/products")
  //-- Je transforme le résultat de la promesse de Fetch en format json --//

  .then((res) => res.json())

  //-- Je nomme 'api' l'objet json de la fonction .then précédente. La fonction fléchée 'allProducts' traite et utilise donc les données de 'api'.

  .then((api) => allProducts(api))

  //-- J'utilise la méthode catch pour traiter les erreurs qui peuvent survenir lors de la résolution de la promesse --//

  .catch((_error) => {
    alert("Le serveur ne répond pas.");
  });

//------ Products ------//

//-- Je crée la fonction 'allProducts' qui utilise les données de l'api pour pouvoir générer dynamiquement du contenu sur la page d'accueil --//

let allProducts = (api) => {
  //-- Je créer une constante pour cibler l'id 'items' dans le DOM --//

  const items = document.getElementById("items");

  //-- Je vérifie si l'élément 'items' existe dans le DOM pour éviter les erreurs de JavaScript. --//

  if (!items) {
    console.error("L'élément items n'existe pas dans le DOM.");

    //-- J'ai ajouté une instruction return; pour sortir de la fonction après l'affichage d'un message d'erreur --//

    return;
  }

  //-- J'utilise une boucle for of, pour parcourir chaque élément de mon API --//

  for (let product of api) {
    //-- J'ajoute donc le code HTML suivant pour chaque produit contenu dans mon API --//

    items.innerHTML += `
          <a href="./product.html?id=${product._id}">
            <article>
             <img src="${product.imageUrl}" alt="${product.altTxt}">
             <h3 class="productName">${product.name}</h3>
             <p class="productDescription">${product.description}</p>
             </article>
          </a>
        `;
  }
};

//------- Fin INDEX (Script) -------//
