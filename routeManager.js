const express = require('express');
const router = express.Router();

// Require main pages files
const routes = [
  require('./routes/aboutRoute'),
  require('./routes/galleryRoute'),
  require('./routes/contactRoute'),
  require('./routes/campusLifeRoute'),
  require('./routes/applyRoute'),
  require('./routes/alumniRoute'),
  require('./routes/excursionRoute'),
  require('./routes/craftWeekRoute'),
  require('./routes/christmasCarolsRoute'),
  require('./routes/studentsWeekRoute'),
  require('./routes/footballMatchesRoute'),
  require('./routes/studentsFellowshipRoute'),
  require('./routes/faqRoute'),
  require('./routes/careerServicesRoute'),
  require('./routes/scholarshipsRoute'),
  require('./routes/researchRoute'),
  require('./routes/accomodationRoute'),
  require('./routes/admissionsRoute')
];

// Require course's route files
const courseRoutes = [
  require('./routes/courses/economicsRoute'),
  require('./routes/courses/massCommRoute'),
  require('./routes/courses/politicalScienceRoute'),
  require('./routes/courses/publicAdminRoute'),
  require('./routes/courses/internalRelationsRoute'),
  require('./routes/courses/sociologyRoute'),
  require('./routes/courses/businessAdminRoute'),
  require('./routes/courses/accountingRoute'),
  require('./routes/courses/marketingRoute'),
  require('./routes/courses/bankingFinanceRoute'),
  require('./routes/courses/transportLogisticsRoute'),
  require('./routes/courses/humanResourcesRoute'),
  require('./routes/courses/computerScienceRoute'),
  require('./routes/courses/environmentalScienceRoute'),
  require('./routes/courses/mitRoute'),
  require('./routes/courses/computerEngineeringRoute'),
  require('./routes/msc-courses/mComputerNetworksRoute'),
  require('./routes/msc-courses/mHumanResourcesRoute'),
  require('./routes/msc-courses/mEconomicsRoute'),
  require('./routes/msc-courses/mCommStudiesRoute'),
  require('./routes/msc-courses/mDiplomacyRoute'),
  require('./routes/msc-courses/mAccountingRoute'),
  require('./routes/msc-courses/mPublicAdminRoute'),
  require('./routes/msc-courses/mbaRoute')
];

// Require faculty's route files
const facultyRoutes = [
  require('./routes/faculties/socialManagementScienceRoute'),
  require('./routes/faculties/appliedScienceRoute'),
  require('./routes/faculties/engineeringRoute'),
  require('./routes/faculties/pgProgramsRoute')
];


// Mount the routes
function mountRoutes(path, routesArray) {
  routesArray.forEach((routes) => {
    router.use(path, routes);
  });
}

mountRoutes('/', routes);
mountRoutes('/', courseRoutes);
mountRoutes('/', facultyRoutes);

// Export the router
module.exports = router;
