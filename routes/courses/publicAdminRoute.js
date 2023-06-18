import { Router } from 'express';
const router = Router();

//Political Science Course Details Page route
router.get('/public-administration', (req, res) => {
  res.render('course-details', {
    title: "Public Administration",
    name: "Public Administration",
    description1: "The Bachelor of Science in Public Administration program at ESTAM University offers a comprehensive curriculum that explores the theories, practices, and challenges of public administration. Our program equips students with the knowledge, skills, and leadership qualities needed to navigate the complexities of public governance, policy-making, and organizational management.",
    description2: "A Bachelor of Science in Public Administration from ESTAM University opens up a range of career opportunities in public service, government agencies, nonprofit organizations, and international development. Graduates may pursue roles such as policy analysts, program managers, public administrators, city planners, public affairs officers, or pursue further education in public administration, public policy, or related fields.",
    highlight1: "Foundations of Public Administration: Our program begins with core courses that introduce students to the principles, theories, and practices of public administration. Students gain a solid understanding of public policy, organizational behavior, public finance, ethics in public administration, and administrative law.",
    highlight2: "Policy Analysis and Implementation: We emphasize the development of analytical and problem-solving skills in public policy. Students learn to analyze policy issues, conduct research, evaluate policy options, and understand the practical aspects of policy implementation and evaluation.",
    highlight3: "Faculty of Experts: Our faculty consists of experienced public administrators, policy experts, and scholars who bring a wealth of knowledge and practical insights to the classroom. They mentor students, facilitate discussions on contemporary issues, and guide them in applying theoretical concepts to real-world challenges.",
    conclusion: "If you have a passion for public service, governance, and making a positive impact on society, ESTAM University's Bachelor of Science in Public Administration program is the ideal choice."
  })
})

export default router;