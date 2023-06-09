// Bring your dependencies to your app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

// Require home route
const homeRoute = require('./routes/homeRoute');

// Require route manager
const routeManager = require('./routeManager');

// Import the post request handler function
const handleSubmitContact = require('./handlers/submitContactHandler');
const handleSubmitCareer =  require('./handlers/submitCareerHandler')
const handleSubmitResearch = require('./handlers/submitResearchHandler')

// Initialize your handlebar engine
const engine = exphbs.engine;

// Initialize your express app
const app = express();

// Call env config method
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount Home
app.use('/', homeRoute)

// Mount RouteManager
app.use('/', routeManager)

// Define the route and use the post request handler function
app.post('/submit-contact', handleSubmitContact);
app.post('/submit-career', handleSubmitCareer);
app.post('/submit-research', handleSubmitResearch);


// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

// Set your port to listen to enviroment port or 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});