//------- CONFIRMATION -------//

//------ ORDER ------//

//-- Je déclare la fonction de la page de commande --//

let order = () => {
  //-- Je cible l'élément 'orderId' de la page --//

  const orderId = document.getElementById("orderId");

  //-- Je génère du HTML dans l'élément 'orderId' avec le contenu de la clé 'orderId' du local storage --//

  orderId.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
};
order();

//------- Fin CONFIRMATION -------//
