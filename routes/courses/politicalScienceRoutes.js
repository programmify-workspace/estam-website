const express = require('express')
router = express.Router()

//Political Science Course Details Page route
router.get('/course-details', (req, res) => {
    res.render('course-details', {
      title: "Political Science",
      name: "Political Science",
      description1: "The Bachelor of Science in Political Science program at ESTAM University offers a comprehensive curriculum that provides students with a deep understanding of political systems, institutions, ideologies, and public policies. Our program equips students with the analytical tools, research skills, and theoretical knowledge necessary to critically analyze political dynamics at local, national, and global levels.",
      description2: "A Bachelor of Science in Political Science from ESTAM University prepares graduates for diverse career paths. Graduates may pursue careers in government, policy analysis, international organizations, non-profit organizations, advocacy groups, journalism, research institutions, or pursue further education in political science, law, public administration, or related fields.",
      highlight1: "Core Political Science Courses: Our program begins with core courses that introduce students to the foundational concepts, theories, and methodologies of political science. Students explore topics such as comparative politics, international relations, political theory, public administration, and research methods.",
      highlight2: "Specialization Opportunities: In the latter stages of the program, students have the opportunity to choose specialization tracks aligned with their interests and career goals. Specializations may include areas such as political theory, international relations, comparative politics, public policy analysis, or political economy.",
      highlight3: "Faculty of Experts: Our faculty consists of accomplished political scientists, scholars, and practitioners who bring a wealth of knowledge and real-world insights to the classroom. They mentor students, facilitate engaging discussions, and guide them in conducting independent research projects.",
      conclusion: "If you have a passion for understanding political dynamics, governance, and policy-making, and aspire to make a positive impact on society, ESTAM University's Bachelor of Science in Political Science program is the perfect choice."
    })
  })

module.exports = router