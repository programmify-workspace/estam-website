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

// Contact Page route
app.get('/contact-us', (req, res) => {
  res.render('contact-us', {
    title: "Contact Us", 
    name: "Contact Us"
  })
})

// Admissions Page route
app.get('/admissions', (req, res) => {
  res.render('admissions', {
    title: "Admissions", 
    name: "Admissions"
  })
})

// Course details Page route
app.get('/course-details', (req, res) => {
  res.render('course-details', {
    title: "Course Details", 
    name: "Course Details"
  })
})

// Faculties Page route
app.get('/faculties', (req, res) => {
  res.render('faculties', {
    title: "Faculties", 
    name: "Faculties"
  })
})

// Blog Page route
app.get('/blog', (req, res) => {
  res.render('blog', {
    title: "Blog", 
    name: "Blog"
  })
})

// Campus Life Page route
app.get('/campus-life', (req, res) => {
  res.render('campus-life', {
    title: "Campus Life", 
    name: "Campus Life"
  })
})

// Apply Page route
app.get('/apply', (req, res) => {
  res.render('apply', {
    title: "Apply", 
    name: "Apply"
  })
})

// Alumni Page route
app.get('/alumni', (req, res) => {
  res.render('alumni', {
    title: "Alumni", 
    name: "Alumni"
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