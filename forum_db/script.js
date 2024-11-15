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
