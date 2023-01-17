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

//------ REGEXP ------//

//-- Je déclare les constantes qui stockent les RegExp que je vais utiliser --//

const nameRegExp = /^[a-zA-Z]{3,20}$/;
const addressRegExp = /^[a-zA-Z0-9\s,'-]*$/;
const emailRegExp = /^[\w.-]+@[\w-]+\.[\w.]{2,}$/;

//-- Je déclare la fonction principale qui va permettre de contrôler et de stocker les données saisies dans le formulaire puis de les envoyer au serveur --//

let postForm = () => {
  //-- Je cible l'élément 'order' de la page et créer un évènement au 'click' sur celui ci --//
  const order = document.getElementById("order");
  order.addEventListener("click", (e) => {
    e.preventDefault();

    //-- Je crée un objet 'contact' qui va récupérer et stocker les valeurs saisies dans chaque champs du formulaire --//

    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    //-- Je déclare une fonction pour contrôler le prénom saisi dans le formulaire --//

    let controlFirstName = () => {
      //-- Je déclare une constante qui prend la valeur de 'firstName' de l'objet 'contact' --//

      const validFirstName = contact.firstName;

      //-- Je teste la valeur saisie avec la regexp 'nameRegExp', et la fonction retourne 'true' si la chaîne de caractère correspond à la regexp.

      if (nameRegExp.test(validFirstName)) {
        return true;
      }

      //-- Sinon je génère le message d'erreur en HTML en ciblant l'élément 'firstNameErrorMsg' --//
      else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText =
          "Merci de vérifier le prénom, 3 caractères minimum, avec des lettres uniquement";

        //-- La fonction retourne 'false' pour indiquer que les données saisies ne sont pas valides --//
        return false;
      }
    };

    //-- Je déclare une fonction pour contrôler le nom saisi dans le formulaire --//

    function controlName() {
      //-- Je déclare une constante qui prend la valeur de 'lastName' de l'objet 'contact' --//

      const validName = contact.lastName;

      //-- Je teste la valeur saisie avec la regexp 'nameRegExp', et la fonction retourne 'true' si la chaîne de caractère correspond à la regexp.

      if (nameRegExp.test(validName)) {
        return true;
      } else {
        //-- Sinon je génère le message d'erreur en HTML en ciblant l'élément 'lastNameErrorMsg' --//
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText =
          "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";

        //-- La fonction retourne 'false' pour indiquer que les données saisies ne sont pas valides --//

        return false;
      }
    }

    //-- Je déclare une fonction pour contrôler l'adresse saisie dans le formulaire --//

    function controlAddress() {
      //-- Je déclare une constante qui prend la valeur de 'address' de l'objet 'contact' --//

      const validAddress = contact.address;

      //-- Je teste la valeur saisie avec la regexp 'addressRegExp', et la fonction retourne 'true' si la chaîne de caractère correspond à la regexp.

      if (addressRegExp.test(validAddress)) {
        return true;
      } else {
        //-- Sinon je génère le message d'erreur en HTML en ciblant l'élément 'addressErrorMsg' --//

        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText =
          "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";

        //-- La fonction retourne 'false' pour indiquer que les données saisies ne sont pas valides --//

        return false;
      }
    }

    //-- Je déclare une fonction pour contrôler le nom de la ville saisi dans le formulaire --//

    function controlCity() {
      //-- Je déclare une constante qui prend la valeur de 'city' de l'objet 'contact' --//

      const validCity = contact.city;

      //-- Je teste la valeur saisie avec la regexp 'cityRegExp', et la fonction retourne 'true' si la chaîne de caractère correspond à la regexp.

      if (addressRegExp.test(validCity)) {
        return true;
      } else {
        //-- Sinon je génère le message d'erreur en HTML en ciblant l'élément 'cityErrorMsg' --//

        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText =
          "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";

        //-- La fonction retourne 'false' pour indiquer que les données saisies ne sont pas valides --//

        return false;
      }
    }

    //-- Je déclare une fonction pour contrôler l'adresse mail de la ville saisie dans le formulaire --//

    function controlEmail() {
      //-- Je déclare une constante qui prend la valeur de 'email' de l'objet 'contact' --//

      const validEmail = contact.email;

      //-- Je teste la valeur saisie avec la regexp 'emailRegExp', et la fonction retourne 'true' si la chaîne de caractère correspond à la regexp.

      if (emailRegExp.test(validEmail)) {
        return true;
      } else {
        //-- Sinon je génère le message d'erreur en HTML en ciblant l'élément 'emailErrorMsg' --//

        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "Erreur ! Email non valide";

        //-- La fonction retourne 'false' pour indiquer que les données saisies ne sont pas valides --//

        return false;
      }
    }

    //-- Je vérifie si toute les données saisies dans le formulaire sont valides en appellant les différentes fonctions de contrôle--//

    function validControl() {
      if (
        controlFirstName() &&
        controlName() &&
        controlAddress() &&
        controlCity() &&
        controlEmail()
      ) {
        //-- Si les données sont valides alors je stocke les valeurs de l'objet 'contact' dans le local storage dans la clé 'contact' --//

        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      }

      //-- Sinon j'alerte l'utilisateur pour qu'il vérifie et corrige les données du formulaire --//
      else {
        alert("Merci de revérifier les données du formulaire");
      }
    }

    //-- J'appelle la fonction du contrôle des données saisies --//
    validControl();

    //-- Je crée un objet 'sendFromData' qui contient l'objet 'contact' et le tableau 'products' --//

    const sendFormData = {
      contact,
      products,
    };

    //-- Je définie les options de la requête fetch dans un objet 'options' --//

    const options = {
      //-- J'utilise la méthode 'POST' pour définir la méthode http à utiliser avec 'method' --//

      method: "POST",

      //-- Je définie les données à envoyer sous format JSON avec 'body'--//

      body: JSON.stringify(sendFormData),

      //-- Je définie l'en-tête de la requête avec 'header' --//

      headers: {
        "Content-Type": "application/json",
      },
    };

    //-- J'envoi les données au server grace à l'objet 'options' qui contient les options définies précédemment --//

    fetch("http://localhost:3000/api/products/order", options)
      //-- Je récupère la réponse de fetch et parse celle-ci en JSON --//

      .then((res) => res.json())

      //-- Je nomme 'data' l'objet JSON de la réponse --//

      .then((data) => {
        //-- Je stocke l'ID de commande dans le local storage en utilisant la clé 'orderID' --//

        localStorage.setItem("orderId", data.orderId);

        //-- J'appelle la fonction de contrôle du formulaire --//

        if (validControl()) {
          //-- Si les données sont valides, j'utilise la propriété 'location.href' pour rediriger l'utilisateur sur une page de confirmation en suivant l'URL suivis de l'ID de commande --//

          document.location.href = "confirmation.html?id=" + data.orderId;
        }
      });
  });
};

//-- J'appelle enfin ma fonction postForm --//

postForm();

//------- Fin CART -------//
