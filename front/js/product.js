//------- PRODUCT -------//

//------ URL ------//

//-- Je crée une nouvelle URL en utilisant l'URL de la fenêtre actuelle --//

let url = new URL(window.location.href);

//-- Je récupère la valeur du paramètre de requête 'id' dans cette url puis je la stocke dans la variable productId --//

let productId = url.searchParams.get("id");

//------ API ------//

//-- Je crée les constantes qui vont me servir pour modifier le HTML de la page produit --//

const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

//-- Je crée deux variables vide qui vont stocker l'URL de l'image et le texte alternatif du canapé choisis --//

let imageUrl = "";
let altTxt = "";

//-- Je fais appel à un produit spécifique dans l'API grace à l'URL --//
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())

  //-- Je nomme 'data' l'objet JSON de la fonction .then précédente, qui contiendra les données récupéré par fetch et transformé en JSON --//
  .then((data) => {
    //-- Je met à jour les différents éléments de la page web avec les données récupérées via l'API --//
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = data.price;
    description.innerText = data.description;

    //-- Je stocke dans mes variables 'imageUrl' et 'alTxt' la valeur du canapé choisis --//

    imageUrl = data.imageUrl;
    altTxt = data.altTxt;

    //-- J'utilise une boucle forEach pour parcourir le tableau de couleurs contenues dans 'data.colors' --//
    data.colors.forEach((color) =>
      //-- J'utilise la méthode 'add' pour ajouter une option à l'élément 'select' du HTML pour chaque couleur contenue dans le tableau --//
      colors.options.add(new Option(color, color))
    );
  })
  .catch(() => alert("Le serveur ne répond pas."));

//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------

const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
addToCart.addEventListener("click", (e) => {
  e.preventDefault();
  let choice = {
    id: productId,
    image: imageUrl,
    alt: altTxt,
    title: title.textContent,
    color: colors.value,
    price: price.textContent,
    quantity: quantity.value,
  };

  // je déclare une variable productInLocalStorage
  // dans laquelle je mets les clés+valeurs dans le local storage
  // JSON.parse permet de convertir les données au format JSON en objet JavaScript
  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

  // j'ajoute les produits sélectionnés dans le localStorage
  const addProductLocalStorage = () => {
    // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
    // on peut voir dans la console qu'il y a les données,
    // mais pas encore stockées dans le storage à ce stade
    productInLocalStorage.push(choice);
    // je stocke les données récupérées dans le localStorage :
    // JSON.stringify permet de convertir les données au format JavaScript en JSON
    // vérifier que key et value dans l'inspecteur contiennent bien des données
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  };

  let addConfirm = () => {
    alert("Le produit a bien été ajouté au panier");
  };

  let update = false;

  // s'il y a des produits enregistrés dans le localStorage
  if (productInLocalStorage) {
    // verifier que le produit ne soit pas deja dans le localstorage/panier
    // avec la couleur
    productInLocalStorage.forEach(function (productOk, key) {
      if (productOk.id == productId && productOk.color == colors.value) {
        productInLocalStorage[key].quantity =
          parseInt(productOk.quantity) + parseInt(quantity.value);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        update = true;
        addConfirm();
      }
    });

    if (!update) {
      addProductLocalStorage();
      addConfirm();
    }
  }
  // s'il n'y a aucun produit enregistré dans le localStorage
  else {
    // je crée alors un tableau avec les éléments choisi par l'utilisateur
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});
