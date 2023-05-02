// Bring your dependencies to your app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Initialize your handlebar engine
const engine = exphbs.engine;

// Initialize your express app
const app = express();

// Set your port to listen to enviroment port or 3000
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define pages routes

// Home Page route
app.get('/', (req, res) => {
    res.render('home', {
      title: "Home",
      name: "Home"
    });
});

// About Page route
app.get('/about', (req, res) => {
  res.render('about', {
    title:"About", 
    name: "About Us"
  })
})

// Contact Page route
app.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: "Gallery", 
    name: "Our Gallery"
  })
})

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Server listening on http://${address}:${port}`);
});