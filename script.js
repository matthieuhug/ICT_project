window.addEventListener('DOMContentLoaded', (event) => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du header:', error);
        });
});
document.addEventListener("DOMContentLoaded", function () {     
    const ueSelect = document.querySelector('select'); // Sélectionner le premier dropdown (UE)     
    const ueImageContainer = document.querySelector('.ue-image'); // Le conteneur de l'image du smartphone     
    //const ueImage = document.getElementById("phone-image"); // L'image elle-même 
    
    ueSelect.addEventListener("change", function () {   
        console.log("Valeur sélectionnée :", this.value);       
        if (this.value === "smartphone-sim") { // Vérifie si "Smartphone + SIM" est sélectionné             
            ueImage.src = "smartphone.png"; // Affiche l'image du smartphone             
            ueImageContainer.style.display = "block"; // Affiche le conteneur de l'image         
        } else {             
            ueImageContainer.style.display = "none"; // Cache l'image si une autre option est sélectionnée         
        }     
    }); 
});