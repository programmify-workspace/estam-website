import { Router } from 'express';

// Create an instance of Router
const router = Router();

// Import main page route modules
import aboutRoute from './routes/aboutRoute.js';
import galleryRoute from './routes/galleryRoute.js';
import contactRoute from './routes/contactRoute.js';
import campusLifeRoute from './routes/campusLifeRoute.js';
import applyRoute from './routes/applyRoute.js';
import alumniRoute from './routes/alumniRoute.js';
import excursionRoute from './routes/excursionRoute.js';
import craftWeekRoute from './routes/craftWeekRoute.js';
import christmasCarolsRoute from './routes/christmasCarolsRoute.js';
import studentsWeekRoute from './routes/studentsWeekRoute.js';
import footballMatchesRoute from './routes/footballMatchesRoute.js';
import studentsFellowshipRoute from './routes/studentsFellowshipRoute.js';
import faqRoute from './routes/faqRoute.js';
import careerServicesRoute from './routes/careerServicesRoute.js';
import scholarshipsRoute from './routes/scholarshipsRoute.js';
import researchRoute from './routes/researchRoute.js';
import accomodationRoute from './routes/accomodationRoute.js';
import admissionsRoute from './routes/admissionsRoute.js';
import login from './routes/auth/login.js';
import signup from './routes/auth/signup.js';

// Import course route modules
import economicsRoute from './routes/courses/economicsRoute.js';
import massCommRoute from './routes/courses/massCommRoute.js';
import politicalScienceRoute from './routes/courses/politicalScienceRoute.js';
import publicAdminRoute from './routes/courses/publicAdminRoute.js';
import internalRelationsRoute from './routes/courses/internalRelationsRoute.js';
import sociologyRoute from './routes/courses/sociologyRoute.js';
import businessAdminRoute from './routes/courses/businessAdminRoute.js';
import accountingRoute from './routes/courses/accountingRoute.js';
import marketingRoute from './routes/courses/marketingRoute.js';
import bankingFinanceRoute from './routes/courses/bankingFinanceRoute.js';
import transportLogisticsRoute from './routes/courses/transportLogisticsRoute.js';
import humanResourcesRoute from './routes/courses/humanResourcesRoute.js';
import computerScienceRoute from './routes/courses/computerScienceRoute.js';
import environmentalScienceRoute from './routes/courses/environmentalScienceRoute.js';
import mitRoute from './routes/courses/mitRoute.js';
import computerEngineeringRoute from './routes/courses/computerEngineeringRoute.js';
import mComputerNetworksRoute from './routes/msc-courses/mComputerNetworksRoute.js';
import mHumanResourcesRoute from './routes/msc-courses/mHumanResourcesRoute.js';
import mEconomicsRoute from './routes/msc-courses/mEconomicsRoute.js';
import mCommStudiesRoute from './routes/msc-courses/mCommStudiesRoute.js';
import mDiplomacyRoute from './routes/msc-courses/mDiplomacyRoute.js';
import mAccountingRoute from './routes/msc-courses/mAccountingRoute.js';
import mPublicAdminRoute from './routes/msc-courses/mPublicAdminRoute.js';
import mbaRoute from './routes/msc-courses/mbaRoute.js';

// Import faculty route modules
import socialManagementScienceRoute from './routes/faculties/socialManagementScienceRoute.js';
import appliedScienceRoute from './routes/faculties/appliedScienceRoute.js';
import engineeringRoute from './routes/faculties/engineeringRoute.js';
import pgProgramsRoute from './routes/faculties/pgProgramsRoute.js';

// Dashboards
import adminDashboard from './routes/admin/dashboardRoute.js'
import studentDashboard from './routes/student/dashboardRoute.js'


// Mount the routes
function mountRoutes(path, routesArray) {
  routesArray.forEach((route) => {
    router.use(path, route);
  });
}


// Main page routes
const mainRoutes = [
  aboutRoute,
  galleryRoute,
  contactRoute,
  campusLifeRoute,
  applyRoute,
  alumniRoute,
  excursionRoute,
  craftWeekRoute,
  christmasCarolsRoute,
  studentsWeekRoute,
  footballMatchesRoute,
  studentsFellowshipRoute,
  faqRoute,
  careerServicesRoute,
  scholarshipsRoute,
  researchRoute,
  accomodationRoute,
  admissionsRoute,
  login,
  signup,
];
mountRoutes('/', mainRoutes);

// Course routes
const courseRoutes = [
  economicsRoute,
  massCommRoute,
  politicalScienceRoute,
  publicAdminRoute,
  internalRelationsRoute,
  sociologyRoute,
  businessAdminRoute,
  accountingRoute,
  marketingRoute,
  bankingFinanceRoute,
  transportLogisticsRoute,
  humanResourcesRoute,
  computerScienceRoute,
  environmentalScienceRoute,
  mitRoute,
  computerEngineeringRoute,
  mComputerNetworksRoute,
  mHumanResourcesRoute,
  mEconomicsRoute,
  mCommStudiesRoute,
  mDiplomacyRoute,
  mAccountingRoute,
  mPublicAdminRoute,
  mbaRoute,
];
mountRoutes('/', courseRoutes);

// Faculty routes
const facultyRoutes = [
  socialManagementScienceRoute,
  appliedScienceRoute,
  engineeringRoute,
  pgProgramsRoute,
];
mountRoutes('/', facultyRoutes);

// Faculty routes
const dashboardRoutes = [
  studentDashboard,
  adminDashboard,
];
mountRoutes('/', dashboardRoutes);

export default router;
