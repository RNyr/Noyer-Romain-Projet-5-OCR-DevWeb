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

//------ LOCAL STORAGE ------//

//-- Je crée les constantes pour cibler la quantité et le bouton 'addToCart' ( ajouter au panier ) dans le HTML--//
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

//-- Je crée un évènement au click sur le bouton 'addToCart'--//

addToCart.addEventListener("click", (e) => {
  e.preventDefault();

  //-- Je crée une condition pour l'ajout de produit au local storage, la couleur et la quantité doivent être sélectionné --//
  if (colors.value !== "" && quantity.value !== "" && quantity.value !== "0") {
    //-- Je récupère les données stockées dans le local storage sous forme de tableau, s'il n'y a pas de donnés, elle assignera un tableau vide --//
    let productInLocalStorage =
      JSON.parse(localStorage.getItem("product")) || [];

    //-- Je crée un objet qui contient les informations du produit sélectionné par l'utilisateur --//
    let choice = {
      id: productId,
      image: imageUrl,
      alt: altTxt,
      title: title.textContent,
      color: colors.value,
      price: price.textContent,
      quantity: parseInt(quantity.value),
    };

    //-- J'utilise la méthode 'findIndex()' pour rechercher dans le tableau du local storage si un produit avec la même id et la même couleur que le produit actuellement sélectionné par l'utilisateur --//
    let existingProductIndex = productInLocalStorage.findIndex(
      (p) => p.id === productId && p.color === colors.value
    );

    //-- S'il y a un produit identique dans le panier alors la quantité seulement sera mise à jour --//
    if (existingProductIndex !== -1) {
      productInLocalStorage[existingProductIndex].quantity += choice.quantity;
    }
    //-- Si aucun produit identique n'est présent dans le panier alors le produit actuellement sélectionné sera ajouté via la méthode 'push --//
    else {
      productInLocalStorage.push(choice);
    }
    //-- Les données du panier sont sauvegardé dans le local storage en format JSON --//
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));

    //-- Message d'alerte pour indiqué à l'utilisateur que le produit à bien été ajouter au local storage --//
    alert("Le produit a bien été ajouté au panier");
  }
  //-- Au cas ou la couleur et la quantité n'ont pas été définis, un message d'alerte sera envoyé à l'utilisateur au lieu de stocker les données dans le local storage--//
  else {
    alert(
      "Veuillez sélectionner une couleur et une quantité avant d'ajouter au panier."
    );
  }
});

//------- Fin PRODUCT -------//
