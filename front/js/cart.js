//------- CART -------//

//------ BASKET ------//

//-- Je déclare une variable qui va récupérer les valeurs de la clé 'product' dans le local storage et les parse en objet javascript dans un tableau --//
let products = JSON.parse(localStorage.getItem("product")) || [];

//-- Je vérifie la longueur du tableau 'products' si elle est égale à 0 ou false --//

if (!products.length) {
  //-- Alors on ajoute le code HTML suivant sur l'élément 'cart__items' de la page--//

  document.querySelector("#cart__items").innerHTML = `
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
}

//-- Sinon on exécute le code suivant --//
else {
  //-- J'initialise une variable 'itemCards' vide qui va contenir la totalité des cartes d'articles des produits contenu dans le tableau 'products' --//

  let itemCards = "";
  //-- J'utilise une boucle forEach pour parcourir tout les produits contenu dans le tableau 'products' --//

  products.forEach((product) => {
    //-- Je concatène toutes les cartes d'article de la boucle à la variable 'itemCards' --//

    itemCards +=
      //-- Je crée un modèle HTML pour une carte d'article, qui affichera les données de chaque produit contenu dans le panier --//

      `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.image}" alt="${product.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.title}</h2>
        <p>${product.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  });

  //-- Je sélectionne l'élément 'cart__items' pour afficher tout le contenu HTML de ma variable 'itemCards' --//

  document.getElementById("cart__items").innerHTML = itemCards;

  //--- Modifier la quantité ---//

  //-- Je sélectionne tout les éléments de la page qui contienne la classe '.itemQuantity' --//

  let itemQtt = document.querySelectorAll(".itemQuantity");

  //-- J'utilise ensuite la méthode forEach pour parcourir chacun de ces éléments (ici ce sont des inputs) --//

  itemQtt.forEach((input, i) => {
    // -- Pour chaque input, j'ajoute un écouteur d'évènement en cas de changement de sa valeur --//

    input.addEventListener("change", () => {
      //-- Je met à jour la quantité du produit dans le tableau 'products' --//

      products[i].quantity = input.value;

      //-- J'enregistre le tableau 'products' dans la clé 'product' du local storage --//

      localStorage.setItem("product", JSON.stringify(products));

      //-- J'alerte l'utilisateur sur la modification de la quantité --//

      alert("La quantité a bien été modifié.");

      //-- Je recharge la page pour que les modifications apportées soit visible --//

      location.reload();
    });
  });

  //--- Supprimer un produit ---//

  //-- Je sélectionne tous les éléments de la page qui contienne la classe '.deleteItem' --//

  const deleteItem = document.querySelectorAll(".deleteItem");

  //-- J'utilise ensuite la méthode forEach pour parcourir chacun de ces éléments (ici ce sont des button) --//

  deleteItem.forEach((btn, i) => {
    // -- Pour chaque button, j'ajoute un écouteur d'évènement en cas de click sur celui ci --//

    btn.addEventListener("click", () => {
      //-- J'utilise la méthode 'splice' pour supprimer l'élément ciblé de la boucle de mon tableau 'products' --//

      products.splice(i, 1);

      //-- J'enregistre le tableau 'products' dans la clé 'product' du local storage --//

      localStorage.setItem("product", JSON.stringify(products));

      //-- J'alerte l'utilisateur sur la suppression du produit --//

      alert("Votre article a bien été supprimé.");

      //-- J'utilise la méthode 'closest' pour sélectionner le premier élément parent du bouton (ici ".cart__items") puis la méthode 'remove' pour le supprimer du DOM --//

      btn.closest(".cart__item").remove();

      //-- Je recharge la page pour que les modifications apportées soit visible --//

      location.reload();
    });
  });
}

//--- Nombre total d'articles ---//

//-- Je déclare une fonction qui permet de calculer le nombre total d'articles dans le panier --//
let totalArticles = () => {
  //-- Grace à la méthode 'reduce' je parcours le tableau 'products' en accumulant une valeur. --//

  let totalQuantity = products.reduce(
    //-- Je prend en paramètre deux variables : 'total' qui est la valeur cumulé initialisé à 0, et 'product' qui est l'élément courant du tableau --//

    (total, product) =>
      //-- Je retourne la somme de 'total' et de la 'quantity' de 'product' convertie en entier avec 'parseInt()' --//

      total + parseInt(product.quantity),
    0
  );

  //-- Cette fonction est appelée pour chaque élément du tableau 'products' et elle additionne la quantité de chaque 'product' à 'total' --//
  //-- Je sélectionne l'élément 'totalQuantity' de la page pour afficher le contenu de ma variable 'totalQuantity' --//

  document.getElementById("totalQuantity").textContent = totalQuantity;
};

//-- J'appelle la fonction totalArticles --//

totalArticles();

//--- Prix total du panier ---//

let priceAmount = () => {
  let totalPrice = products.reduce(
    //-- Je retourne la somme de 'total' et le résultat du 'price' du 'product' multiplié par sa 'quantity' --//

    (total, product) => total + product.price * product.quantity,
    0
  );

  //-- Cette fonction est appelée pour chaque élément du tableau 'products' et elle additionne le prix de chaque 'product' à 'total' --//
  //-- Je sélectionne l'élément 'totalPrice' de la page pour afficher tout le contenu de ma variable 'totalPrice' --//

  document.getElementById("totalPrice").textContent = totalPrice;
};

//-- J'appelle la fonction priceAmount --//

priceAmount();
