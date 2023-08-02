const express = require('express');
const router = express.Router();

// Estate Management Course Details Page route
router.get('/estate-management', (req, res) => {
  res.render('course-details', {
    title: "Estate Management",
    name: "Estate Management",
    description1: "The Bachelor of Science in Estate Management program at ESTAM University provides students with the knowledge and skills to manage, develop, and evaluate real estate properties. Our program combines principles from finance, law, business, and urban planning to equip students with a comprehensive understanding of the real estate industry.",
    description2: "A Bachelor of Science in Estate Management from ESTAM University opens up diverse career opportunities in real estate development, property management, valuation, investment analysis, and real estate consulting. Graduates may pursue roles such as real estate managers, property appraisers, real estate analysts, facility managers, or continue their education in specialized areas of real estate.",
    highlight1: "Real Estate Principles: Our program begins with core courses that introduce students to the fundamental principles of real estate. They study topics such as real estate law, property valuation, market analysis, real estate finance, and property development. These courses build a strong foundation in real estate management.",
    highlight2: "Property Management: Students learn about property management techniques, including lease agreements, maintenance, tenant relations, and property marketing. They gain practical skills to effectively manage residential, commercial, and industrial properties.",
    highlight3: "Real Estate Investment: This aspect of the program focuses on real estate investment and financial analysis. Students explore topics such as investment strategies, risk assessment, real estate portfolio management, and real estate investment trusts (REITs).",
    conclusion: "If you are interested in the dynamic field of real estate, have a passion for property development and management, and enjoy working with financial and legal aspects of the industry, ESTAM University's Bachelor of Science in Estate Management program offers the ideal path to a successful career in real estate management and investment."
  });
});

module.exports = router;