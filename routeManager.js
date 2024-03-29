const Router = require('express');
const router = Router();

// Require route files
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactRoutes = require('./routes/contactRoutes')
const campusLifeRoutes = require('./routes/campusLifeRoutes')
const applyRoutes = require('./routes/applyRoutes')
const alumniRoutes = require('./routes/alumniRoutes')
const excursionRoutes = require('./routes/excursionRoutes')
const craftWeekRoutes = require('./routes/craftWeekRoutes')
const christmasCarolsRoutes = require('./routes/christmasCarolsRoutes')
const studentsWeekRoutes = require('./routes/studentsWeekRoutes')
const footballMatchesRoutes = require('./routes/footballMatchesRoutes')
const studentsFellowshipRoutes = require('./routes/studentsFellowshipRoutes')
const faqRoutes = require('./routes/faqRoutes')
const careerServicesRoutes = require('./routes/careerServicesRoutes')
const scholarshipsRoutes = require('./routes/scholarshipsRoutes')
const researchRoutes = require('./routes/researchRoutes')
const accomodationRoutes = require('./routes/accomodationRoutes')
const admissionsRoutes = require('./routes/admissionsRoutes')

// Require course's route files
const economicsRoutes = require('./routes/courses/economicsRoutes')
const massCommRoutes = require('./routes/courses/massCommRoutes')
const politicalScienceRoutes = require('./routes/courses/politicalScienceRoutes')
const publicAdminRoutes = require('./routes/courses/publicAdminRoutes');
const internalRelationsRoutes = require('./routes/courses/internalRelationsRoutes');
const sociologyRoutes = require('./routes/courses/sociologyRoutes');
const businessAdminRoutes = require('./routes/courses/businessAdminRoutes');
const accountingRoutes = require('./routes/courses/accountingRoutes');
const marketingRoutes = require('./routes/courses/marketingRoutes');
const bankingFinanceRoutes = require('./routes/courses/bankingFinanceRoutes');
const transportLogisticsRoutes = require('./routes/courses/transportLogisticsRoutes');
const humanResourcesRoutes = require('./routes/courses/humanResourcesRoutes');
const estateManagementRoutes = require('./routes/courses/estateManagementRoutes');
const computerScienceRoutes = require('./routes/courses/computerScienceRoutes');
const microBiologyRoutes = require('./routes/courses/microBiologyRoutes');
const bioChemistryRoutes = require('./routes/courses/bioChemistryRoutes');
const environmentalScienceRoutes = require('./routes/courses/environmentalScienceRoutes');
const mitRoutes = require('./routes/courses/mitRoutes');
const computerEngineeringRoutes = require('./routes/courses/computerEngineeringRoutes');
const mComputerNetworksRoutes = require('./routes/msc-courses/mComputerNetworksRoutes');
const mHumanResourcesRoutes = require('./routes/msc-courses/mHumanResourcesRoutes');
const mEconomicsRoutes = require('./routes/msc-courses/mEconomicsRoutes');
const mCommStudiesRoutes = require('./routes/msc-courses/mCommStudiesRoutes');
const mDiplomacyRoutes = require('./routes/msc-courses/mDiplomacyRoutes');
const mAccounting = require('./routes/msc-courses/mAccounting');
const mPublicAdmin = require('./routes/msc-courses/mPublicAdmin');
const mbaRoutes = require('./routes/msc-courses/mbaRoutes');

// Require faculty's route files
const socialManagementScienceRoutes = require('./routes/faculties/socialManagementScienceRoutes');
const appliedScienceRoutes = require('./routes/faculties/appliedScienceRoutes');
const engineeringRoutes = require('./routes/faculties/engineeringRoutes');
const pgProgramsRoutes = require('./routes/faculties/pgProgramsRoutes');

// Require admin login and dashboard route files
const adminLoginRoutes = require('./routes/adminLoginRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes')

// Require student login and dashboard route files
const studentLoginRoutes = require('./routes/studentLoginRoutes');
const studentDashboardRoutes = require('./routes/studentDashboardRoutes');

// Mount the routes
function mountRoutes(path, routesArray) {
  routesArray.forEach((route) => {
    router.use(path, route);
  });
}

const mainRoutes = [
  homeRoutes,
  aboutRoutes,
  galleryRoutes,
  contactRoutes,
  campusLifeRoutes,
  applyRoutes,
  alumniRoutes,
  excursionRoutes,
  craftWeekRoutes,
  christmasCarolsRoutes,
  studentsWeekRoutes,
  footballMatchesRoutes,
  studentsFellowshipRoutes,
  faqRoutes,
  careerServicesRoutes,
  scholarshipsRoutes,
  researchRoutes,
  economicsRoutes,
  massCommRoutes,
  politicalScienceRoutes,
  publicAdminRoutes,
  internalRelationsRoutes,
  sociologyRoutes,
  businessAdminRoutes,
  accountingRoutes,
  marketingRoutes,
  bankingFinanceRoutes,
  transportLogisticsRoutes,
  humanResourcesRoutes,
  estateManagementRoutes,
  computerScienceRoutes,
  microBiologyRoutes,
  bioChemistryRoutes,
  environmentalScienceRoutes,
  mitRoutes,
  computerEngineeringRoutes,
  mComputerNetworksRoutes,
  mComputerNetworksRoutes,
  mHumanResourcesRoutes,
  mEconomicsRoutes,
  mCommStudiesRoutes,
  mDiplomacyRoutes,
  mAccounting,
  mPublicAdmin,
  mbaRoutes,
  socialManagementScienceRoutes,
  appliedScienceRoutes,
  engineeringRoutes,
  pgProgramsRoutes,
  accomodationRoutes,
  admissionsRoutes,
  adminLoginRoutes,
  adminDashboardRoutes,
  studentLoginRoutes,
  studentDashboardRoutes
];

mountRoutes('/', mainRoutes);

module.exports = router