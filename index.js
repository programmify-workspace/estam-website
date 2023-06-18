import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';

import upload from './utils/fileUploadUtils.js'

import homeRoute from './routes/homeRoute.js';
import routeManager from './routeManager.js';

import handleSubmitContact from './handlers/contactFormHandler.js';
import handleSubmitCareer from './handlers/careerFormHandler.js';
import handleSubmitResearch from './handlers/researchFormHandler.js';
import handleSubmitApply from './handlers/applyFormHandler.js';

const engine = exphbs.engine;
const app = express();

dotenv.config();

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', path.join(new URL(import.meta.url).pathname, '../views'));

app.use(express.static(path.join(new URL(import.meta.url).pathname, '../public')));


app.use('/', homeRoute);
app.use('/', routeManager);

// Set form submission handler routes
app.post('/submit-contact', handleSubmitContact);
app.post('/submit-career', handleSubmitCareer);
app.post('/submit-research', handleSubmitResearch);
app.post('/submit-apply', upload.fields([
  {name:'photo_passport'}, 
  {name: 'passport'}, 
  {name: 'ssce_certificate'},
  {name: 'birth_certificate'}
]), handleSubmitApply);

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { 
    title: 'Server Error', 
    message: 'Oops! Something went wrong!.' 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
