import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Path to the db.json file
const dbFilePath = path.join(process.cwd(), 'db.json');

// Helper function to read the database file and parse the JSON
const readDB = () => {
  try {
    console.log('Reading from db.json');
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { posts: [] }; // Default data structure if file doesn't exist or is corrupted
  }
};

// Helper function to write data to the database file
const writeDB = (data) => {
  try {
    console.log('Writing to db.json:', JSON.stringify(data, null, 2)); // Log the data being written
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
};

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory (including images, CSS, JS, etc.)
app.use(express.static(path.join(process.cwd(), 'public')));

// Ensure db.json exists, if not, create it with default data
if (!fs.existsSync(dbFilePath)) {
  console.log('db.json not found. Creating it with default data...');
  writeDB({ posts: [] });
} else {
  console.log('db.json exists.');
}

// Default route to serve the forum HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'forum.html')); // Ensure 'forum.html' exists
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.get('/5g.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), '5g.html'));
});

app.get('/sdr.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'sdr.html'));
});

app.get('/project_examples.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'project_examples.html'));
});

app.get('/guided_implementation.html', (req, res) => {
  res.sendFile(path.join(process.cwd(),'guided_implementation.html'));
});

app.get('/qa_troubleshooting.html', (req, res) => {
  res.sendFile(path.join(process.cwd(),'qa_troubleshooting.html'));
});

// Route to get all posts from the database
app.get('/posts', (req, res) => {
  const db = readDB();
  console.log('Fetching posts:', db.posts); // Log the posts being fetched
  res.json(db.posts);
});

// Route to get a specific post along with its answers
app.get('/posts/:id', (req, res) => {
  const db = readDB();
  const post = db.posts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post); // Send the post data as JSON
  } else {
    res.status(404).send('Post not found');
  }
});

// Route to add a new post to the database
app.post('/posts', (req, res) => {
  const db = readDB();
  const newPost = req.body;

  console.log('Received new post:', newPost); // Log the received post

  if (newPost && newPost.title && newPost.content) {
    newPost.id = (db.posts.length + 1).toString(); // Assign a new ID to the post
    newPost.answers = []; // Initialize the answers array for the new post
    db.posts.push(newPost);
    writeDB(db); // Save the updated posts
    res.status(201).json(newPost); // Return the newly added post
  } else {
    console.log('Invalid post data:', newPost); // Log invalid data
    res.status(400).json({ message: 'Invalid post data' });
  }
});

// Route to add an answer to a specific post
app.post('/posts/:id/answers', (req, res) => {
  const db = readDB();
  const postId = req.params.id;
  const post = db.posts.find(p => p.id === postId);

  if (post) {
    const newAnswer = req.body;

    if (newAnswer && newAnswer.content) {
      post.answers.push(newAnswer);
      writeDB(db);  // Save the updated posts
      res.status(201).json(newAnswer);  // Return the newly added answer
    } else {
      res.status(400).json({ message: 'Invalid answer data' });
    }
  } else {
    res.status(404).send('Post not found');
  }
});

// Start the Express server
app.listen(port, 'localhost', () => {
  console.log(`Server is running at http://localhost:${port}`);
});

