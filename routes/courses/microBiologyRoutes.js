const express = require('express');
const router = express.Router();

// Microbiology Course Details Page route
router.get('/microbiology', (req, res) => {
  res.render('course-details', {
    title: "Microbiology",
    name: "Microbiology",
    description1: "The Bachelor of Science in Microbiology program at ESTAM University offers a comprehensive curriculum that covers various aspects of microbiology, immunology, genetics, molecular biology, and microbial ecology. Our program equips students with a solid understanding of microorganisms, their role in health and disease, and their impact on the environment.",
    description2: "A Bachelor of Science in Microbiology from ESTAM University opens up diverse career opportunities in healthcare, biotechnology, pharmaceuticals, environmental agencies, research institutions, and academia. Graduates may pursue roles such as medical laboratory technologists, microbiologists, research scientists, quality control analysts, or continue their education in specialized areas of microbiology.",
    highlight1: "Core Microbiology Courses: Our program begins with core courses that provide students with a strong foundation in microbiology principles. Students explore topics such as microbial diversity, cell biology, genetics, immunology, and infectious diseases. These courses develop a comprehensive understanding of the microbial world.",
    highlight2: "Laboratory Techniques: Students gain hands-on experience in modern laboratory techniques used in microbiology research and diagnostics. They learn about culturing and identifying microorganisms, molecular biology techniques, and how to analyze experimental data. Practical skills acquired in the laboratory are essential for a successful career in microbiology.",
    highlight3: "Microbial Ecology and Environmental Microbiology: This aspect of the program focuses on the interactions between microorganisms and their environment. Students study microbial communities, biogeochemical cycles, and their impact on ecosystems. They gain insights into how microorganisms contribute to environmental health and biotechnology applications.",
    conclusion: "If you are fascinated by the unseen world of microorganisms, their role in health and disease, and their significance in various industries, ESTAM University's Bachelor of Science in Microbiology program offers a pathway to a rewarding career in the field of microbiology."
  });
});

module.exports = router;





