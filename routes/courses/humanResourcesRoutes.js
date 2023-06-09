const express = require('express')
router = express.Router()

//Human Resources Management Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "Human Resources Management",
      name: "Human Resources Management",
      description1: "The Bachelor of Science in Human Resources Management program at ESTAM University offers a comprehensive curriculum that covers various aspects of HR management, including recruitment and selection, employee training and development, performance management, compensation and benefits, labor relations, and strategic HR planning. Our program equips students with the knowledge, skills, and competencies necessary to excel in the dynamic field of human resources.",
      description2: "A Bachelor of Science in Human Resources Management from ESTAM University opens up diverse career opportunities in HR departments of corporations, consulting firms, government agencies, non-profit organizations, and more. Graduates may pursue roles such as HR specialists, recruitment managers, training and development coordinators, compensation and benefits analysts, or pursue further education in HR management, organizational psychology, or related fields.",
      highlight1: "Core HR Management Courses: Our program begins with core courses that provide students with a solid foundation in HR management principles. Students explore topics such as HR planning, recruitment and selection, employee relations, training and development, performance management, and labor laws. These courses lay the groundwork for understanding the key concepts and strategies in HR management.",
      highlight2: "Organizational Behavior and Leadership: We recognize the importance of understanding human behavior and effective leadership in managing human resources. Students learn about organizational behavior, motivation, team dynamics, leadership styles, and change management. They develop skills in fostering a positive work culture, managing diversity, and leading teams to achieve organizational goals.",
      highlight3: "Labor Relations and Employment Law: Our program covers labor relations, collective bargaining, and employment laws and regulations. Students gain an understanding of labor relations strategies, dispute resolution, and legal compliance in the workplace. They develop skills in effectively managing employee relations and maintaining positive labor-management relationships.",
      conclusion: "If you are passionate about HR management, performance management, labor relations, and strategic HR planning, ESTAM University's Bachelor of Science in Human Resources Management program is the perfect choice."
    })
  })

  module.exports = router