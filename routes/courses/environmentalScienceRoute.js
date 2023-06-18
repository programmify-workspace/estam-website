import { Router } from 'express';
const router = Router();

// Environmental Science Course Details Page route
router.get('/environmental-science', (req, res) => {
    res.render('course-details', {
      title: " Environmental Science",
      name: " Environmental Science",
      description1: "The Bachelor of Science in Environmental Science program at ESTAM University offers a comprehensive curriculum that covers various aspects of environmental science, including ecology, environmental policy, conservation, natural resource management, environmental impact assessment, and sustainability. Our program equips students with the knowledge, skills, and practical experience to address complex environmental challenges.",
      description2: "A Bachelor of Science in Environmental Science from ESTAM University opens up diverse career opportunities in environmental consulting firms, government agencies, research institutions, non-profit organizations, and more. Graduates may pursue roles such as environmental scientists, environmental consultants, sustainability coordinators, conservation officers, or pursue further education in environmental science, environmental policy, or related fields.",
      highlight1: "Core Environmental Science Courses: Our program begins with core courses that provide students with a solid foundation in environmental science principles. Students learn about ecosystem dynamics, environmental chemistry, environmental monitoring, biodiversity, and environmental data analysis. These courses lay the groundwork for understanding the fundamental concepts and methodologies in environmental science.",
      highlight2: "Environmental Policy and Governance: We focus on the legal and policy frameworks that shape environmental management. Students learn about environmental regulations, international environmental agreements, environmental economics, and sustainable development. They gain insights into the complexities of environmental policy-making and develop skills in environmental governance.",
      highlight3: "Fieldwork and Research: ESTAM University values hands-on experience and research engagement. Students have opportunities to participate in fieldwork activities, data collection, and research projects. They gain practical skills in conducting environmental assessments, analyzing data, and communicating scientific findings. These experiences foster critical thinking, problem-solving, and enhance students' understanding of real-world environmental challenges.",
      conclusion: "If you have a passion for the environment, sustainability, and making a positive impact, ESTAM University's Bachelor of Science in Environmental Science program is the ideal choice."
    })
  })

  export default router;