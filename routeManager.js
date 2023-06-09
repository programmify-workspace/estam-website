const express = require('express');
const router = express.Router();

// Require main pages files
const routes = [
  require('./routes/aboutRoutes'),
  require('./routes/galleryRoutes'),
  require('./routes/contactRoutes'),
  require('./routes/campusLifeRoutes'),
  require('./routes/applyRoutes'),
  require('./routes/alumniRoutes'),
  require('./routes/excursionRoutes'),
  require('./routes/craftWeekRoutes'),
  require('./routes/christmasCarolsRoutes'),
  require('./routes/studentsWeekRoutes'),
  require('./routes/footballMatchesRoutes'),
  require('./routes/studentsFellowshipRoutes'),
  require('./routes/faqRoutes'),
  require('./routes/careerServicesRoutes'),
  require('./routes/scholarshipsRoutes'),
  require('./routes/researchRoutes'),
  require('./routes/accomodationRoutes'),
  require('./routes/admissionsRoutes')
];

// Require course's route files
const courseRoutes = [
  require('./routes/courses/economicsRoutes'),
  require('./routes/courses/massCommRoutes'),
  require('./routes/courses/politicalScienceRoutes'),
  require('./routes/courses/publicAdminRoutes'),
  require('./routes/courses/internalRelationsRoutes'),
  require('./routes/courses/sociologyRoutes'),
  require('./routes/courses/businessAdminRoutes'),
  require('./routes/courses/accountingRoutes'),
  require('./routes/courses/marketingRoutes'),
  require('./routes/courses/bankingFinanceRoutes'),
  require('./routes/courses/transportLogisticsRoutes'),
  require('./routes/courses/humanResourcesRoutes'),
  require('./routes/courses/computerScienceRoutes'),
  require('./routes/courses/environmentalScienceRoutes'),
  require('./routes/courses/mitRoutes'),
  require('./routes/courses/computerEngineeringRoutes'),
  require('./routes/msc-courses/mComputerNetworksRoutes'),
  require('./routes/msc-courses/mHumanResourcesRoutes'),
  require('./routes/msc-courses/mEconomicsRoutes'),
  require('./routes/msc-courses/mCommStudiesRoutes'),
  require('./routes/msc-courses/mDiplomacyRoutes'),
  require('./routes/msc-courses/mAccounting'),
  require('./routes/msc-courses/mPublicAdmin'),
  require('./routes/msc-courses/mbaRoutes')
];

// Require faculty's route files
const facultyRoutes = [
  require('./routes/faculties/socialManagementScienceRoutes'),
  require('./routes/faculties/appliedScienceRoutes'),
  require('./routes/faculties/engineeringRoutes'),
  require('./routes/faculties/pgProgramsRoutes')
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
