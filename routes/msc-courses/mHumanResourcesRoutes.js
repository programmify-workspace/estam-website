const express = require('express')
router = express.Router()

// Msc. Human Resource Management Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "MSc. Human Resource Management",
      name: "MSc. Human Resource Management",
      description1: "The Master's in Human Resource Management program at ESTAM University provides students with comprehensive knowledge and practical skills in various areas of human resource management, including talent acquisition, employee development, performance management, compensation and benefits, and organizational effectiveness. The program is designed to prepare students to become strategic HR leaders who can effectively contribute to the success of organizations.",
      description2: "A Master's in Human Resource Management from ESTAM University opens up diverse career opportunities in various sectors, including corporate organizations, consulting firms, nonprofit organizations, government agencies, and more. Graduates may pursue roles such as HR manager, talent acquisition specialist, training and development manager, compensation and benefits analyst, or pursue leadership positions in HR departments.",
      highlight1: "Strategic Human Resource Management: Our program focuses on the strategic aspects of human resource management. Students learn how to align HR practices with organizational goals, develop workforce planning strategies, design effective talent management programs, and implement change management initiatives. They gain the skills to create a high-performance work culture and enhance organizational effectiveness.",
      highlight2: "Talent Acquisition and Employee Development: We emphasize the importance of attracting and developing top talent. Students learn about effective recruitment and selection processes, talent assessment methods, employee onboarding strategies, and performance appraisal systems. They gain practical skills in designing and implementing employee development programs, fostering employee engagement, and promoting career growth.",
      highlight3: "Compensation and Benefits Management: We cover the principles and practices of compensation and benefits management. Students learn about job analysis, salary structures, incentive systems, and employee benefits programs. They gain knowledge of legal and ethical considerations in compensation management and develop skills in designing competitive compensation packages that attract, retain, and motivate employees.",
      conclusion: "If you have a passion for people management, organizational development, and strategic HR practices, ESTAM University's Master's in Human Resource Management program is the ideal choice."
    })
  })

  module.exports = router