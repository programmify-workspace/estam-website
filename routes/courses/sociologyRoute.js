import { Router } from 'express';
const router = Router();

//Sociology Course Details Page route
router.get('/sociology', (req, res) => {
    res.render('course-details', {
      title: "Sociology",
      name: "Sociology",
      description1: "The Bachelor of Science in Sociology program at ESTAM University offers a comprehensive curriculum that examines social structures, social interactions, and social phenomena. Our program equips students with the theoretical knowledge, research skills, and analytical tools to critically analyze social issues, advocate for change, and contribute to the betterment of society.",
      description2: "A Bachelor of Science in Sociology from ESTAM University opens up diverse career opportunities in research, social services, non-profit organizations, community development, human resources, advocacy, and policy analysis. Graduates may pursue roles such as research analysts, community organizers, social researchers, policy analysts, or pursue further education in sociology, social work, or related fields.",
      highlight1: "Core Sociological Concepts: Our program begins with core courses that introduce students to the foundational concepts, theories, and methodologies of sociology. Students explore topics such as social theory, social research methods, social psychology, social stratification, and the sociology of gender, race, and ethnicity.",
      highlight2: "Social Research and Data Analysis: We emphasize the development of research skills and data analysis techniques. Students learn qualitative and quantitative research methods, data collection, and analysis. They apply these skills to research projects, surveys, and observational studies, gaining hands-on experience in conducting social research.",
      highlight3: "Applied Sociology: We believe in the practical application of sociological knowledge. Students have the opportunity to engage in fieldwork, internships, or community-based research projects. These experiences allow them to apply sociological theories and methods to real-world settings, gain practical skills, and contribute to addressing social issues.",
      conclusion: "If you have a passion for understanding social dynamics, advocating for social justice, and making a positive impact on society, ESTAM University's Bachelor of Science in Sociology program is the ideal choice."
    })
  })

export default router;