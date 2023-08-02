const express = require('express');
const router = express.Router();

// Biochemistry Course Details Page route
router.get('/biochemistry', (req, res) => {
  res.render('course-details', {
    title: "Biochemistry",
    name: "Biochemistry",
    description1: "The Bachelor of Science in Biochemistry program at ESTAM University offers a comprehensive curriculum that explores the chemical processes within and related to living organisms. Our program integrates principles from both biology and chemistry to understand the molecular basis of life, the structure and function of biomolecules, and the biochemical pathways that govern cellular processes.",
    description2: "A Bachelor of Science in Biochemistry from ESTAM University opens up diverse career opportunities in research, pharmaceuticals, biotechnology, healthcare, and academia. Graduates may pursue roles such as biochemists, research scientists, laboratory technicians, pharmaceutical analysts, or continue their education in specialized areas of biochemistry or related fields.",
    highlight1: "Core Biochemistry Courses: Our program begins with core courses that provide students with a strong foundation in biochemistry principles. Students study topics such as protein structure and function, enzymology, metabolism, molecular genetics, and cell biology. These courses build a comprehensive understanding of the biochemical basis of life.",
    highlight2: "Laboratory Techniques: Students gain practical experience in modern laboratory techniques used in biochemistry research and analysis. They learn how to perform experiments related to protein purification, DNA sequencing, and spectroscopic methods. Laboratory skills are crucial for a successful career in biochemistry.",
    highlight3: "Biomedical Applications: This aspect of the program focuses on the application of biochemistry in medicine and healthcare. Students explore topics such as clinical biochemistry, pharmacology, and drug development. They gain insights into how biochemistry contributes to disease diagnosis and treatment.",
    conclusion: "If you are fascinated by the chemical processes that underpin life, the study of biomolecules, and their applications in various industries, ESTAM University's Bachelor of Science in Biochemistry program provides a strong foundation for a rewarding career in the field of biochemistry."
  });
});

module.exports = router;