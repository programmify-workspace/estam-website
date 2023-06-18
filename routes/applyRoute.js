import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Get list of countries from db
const getCountries = async () => {
  const [countryArray] = await pool.query('SELECT id, name FROM countries')
  return countryArray
}

// Get list of states by country_id from db
const getStatesByCountryId = async (countryId) => {
  const [states] = await pool.query('SELECT id, country_id, name FROM states WHERE country_id = ? ORDER BY name', [countryId]);
  return states;
};

// Get list of states by country_id for Next of kin from db
const getNokStatesByCountryId = async (countryId) => {
  const [nokStates] = await pool.query('SELECT id, country_id, name FROM states WHERE country_id = ? ORDER BY name', [countryId]);
  return nokStates;
};

// Get list of the names of courses from db
const getCourses = async () => {
  const [coursesArray] = await pool.query('SELECT course_name FROM courses')
  return coursesArray;
}

router.get('/apply', async (req, res) => {
  const countries = await getCountries();
  const courses = await getCourses();

  const selectedCountryId = req.query.selectedCountryId;
  const selectedNokCountryId = req.query.selectedNokCountryId;

  if (selectedCountryId || selectedNokCountryId) {
    const states = await getStatesByCountryId(selectedCountryId);
    const nok_states = await getNokStatesByCountryId(selectedNokCountryId);
    res.json({ states, nok_states }); // Return states and nok_states as JSON
  } else {
    res.render('apply', {
      title: 'Apply',
      name: 'Apply',
      countries: countries,
      nationality: countries,
      courses: courses,
      nok_country: countries,
      states: [],
      nok_states: []
    });
  }
});

export default router;
