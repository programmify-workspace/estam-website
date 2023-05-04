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

// Gallery Page route
app.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: "Gallery", 
    name: "Our Gallery"
  })
})

// Career Services route
app.get('/career-services', (req, res) => {
  res.render('career-services', {
    title: "Career", 
    name: "Career Service"
  }) 
})

// Contact Us route
app.get('/contact-us', (req, res) => {
  res.render('contact-us', {
    title: "Contact", 
    name: "Contact Us"
  }) 
})

// Faq route
app.get('/faq', (req, res) => {
  res.render('faq', {
    title: "Faq", 
    name: "Faq"
  }) 
})

// News and Events Us route
app.get('/news-and-events', (req, res) => {
  res.render('news-and-events', {
    title: "News And Events", 
    name: "News And Event"
  }) 
})

// post-graduate route
app.get('/post-graduate', (req, res) => {
  res.render('post-graduate', {
    title: "Post Graduate", 
    name: "Post Graduate"
  }) 
})

// Research route
app.get('/research', (req, res) => {
  res.render('research', {
    title: "Research", 
    name: "Research"
  }) 
})

// Scholarships route
app.get('/scholarships', (req, res) => {
  res.render('scholarships', {
    title: "Scholarships", 
    name: "Scholarships"
  }) 
})

// Student Resources route
app.get('/student-resources', (req, res) => {
  res.render('student-resources', {
    title: "Student Resourcess", 
    name: "Student Resources"
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