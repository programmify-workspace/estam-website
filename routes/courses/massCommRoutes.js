const express = require('express')
router = express.Router()

//Mass Communication Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "Mass Communication",
      name: "Mass Communication",
      description1: "The Bachelor of Science in Mass Communication program at ESTAM University offers a comprehensive and interdisciplinary curriculum that combines theoretical foundations with hands-on practical experiences. Our program is designed to equip students with the necessary skills and knowledge to excel in various fields within mass communication, such as journalism, public relations, advertising, broadcasting, digital media, and media management.",
      description2: "A Bachelor of Science in Mass Communication from ESTAM University opens up a range of exciting career opportunities. Graduates may pursue roles such as journalists, news anchors, public relations specialists, advertising executives, social media managers, content creators, media researchers, or media consultants. The versatile skills acquired during the program prepare students for success in both traditional and digital media environments.",
      highlight1: "Foundational Knowledge: Our program provides a solid understanding of the theories, concepts, and principles that underpin the field of mass communication. Students gain insight into the historical, cultural, and social dimensions of media and its impact on society.",
      highlight2: "Practical Skills Development: We believe in learning by doing. Through practical coursework, workshops, and internships, students develop essential skills in media production, journalism, digital media, public relations, and advertising. They learn to navigate various media platforms, create engaging content, conduct interviews, analyze data, and develop effective communication strategies.",
      highlight3: "Faculty of Experts: Our faculty consists of experienced academics and industry professionals who bring a wealth of knowledge and real-world insights to the classroom. They mentor students, facilitate collaborative projects, and guide them in developing their professional portfolios.",
      conclusion: "If you are passionate about communication, media, and making an impact through storytelling, ESTAM University's Bachelor of Science in Mass Communication program is the perfect choice."
    })
  })

module.exports = router