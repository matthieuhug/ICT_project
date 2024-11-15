// Function to create a new topic
document.getElementById('create-topic-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('topic-title').value;
    const content = document.getElementById('topic-content').value;

    // Send a POST request to create a new topic
    const response = await fetch('/api/topics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
    });

    if (response.ok) {
        const newTopic = await response.json();
        displayTopic(newTopic);  // Display the newly created topic
        document.getElementById('create-topic-form').reset();  // Reset the form
    }
});

// Function to display a topic on the page
function displayTopic(topic) {
    const topicElement = document.createElement('div');
    topicElement.classList.add('forum-topic');
    topicElement.innerHTML = `
        <a>Topic: ${topic.title}</a>
        <div class="forum-info">Posted by You</div>
        <div class="topic-content">${topic.content}</div>
    `;
    
    document.getElementById('forum-list').appendChild(topicElement);
}

// Function to load and display all topics from the server
async function loadTopics() {
    const response = await fetch('/api/topics');
    const topics = await response.json();

    topics.forEach(topic => {
        displayTopic(topic);  // Display each topic
    });
}

// Load topics when the page loads
loadTopics();


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
    const ueImage = document.getElementById("phone-image"); // L'image elle-même 
    
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



