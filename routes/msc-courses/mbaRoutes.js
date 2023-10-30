const express = require('express')
router = express.Router()

// Master of Business Administration (MBA) Course Details Page route
router.get('/mba', (req, res) => {
    res.render('course-details-msc', {
      title: "Master of Business Administration (MBA)",
      name: "Master of Business Administration (MBA)",
      description1: "The Master of Business Administration (MBA) program at ESTAM University provides students with a comprehensive understanding of business management principles, strategic thinking, and leadership skills. The program is designed to develop students' analytical, critical thinking, and decision-making abilities, preparing them for leadership roles in diverse industries and organizational settings.",
      description2: "An MBA from ESTAM University opens up diverse career opportunities in various sectors, including corporate management, consulting firms, entrepreneurship, finance, marketing, operations, and more. Graduates may pursue roles such as business managers, consultants, project leaders, marketing directors, or pursue entrepreneurial ventures. The versatile skill set gained through the program equips graduates to adapt to changing business landscapes and excel in leadership positions.",
      highlight1: "Strategic Management: Our program focuses on strategic management concepts and frameworks. Students learn to analyze industry dynamics, assess competitive landscapes, and develop effective strategies for organizational growth and sustainability. They gain insights into strategic decision-making, innovation management, and strategic leadership.",
      highlight2: "Leadership and Entrepreneurship: We emphasize the importance of effective leadership in driving organizational success and fostering innovation. Students develop leadership skills, explore different leadership styles, and learn how to inspire and motivate teams. They also gain an entrepreneurial mindset, understanding the process of opportunity recognition, venture creation, and managing business growth.",
      highlight3: "Business Analytics and Decision-Making: We delve into the realm of business analytics, equipping students with the skills to analyze and interpret data for informed decision-making. Students learn about statistical analysis, data visualization, and predictive modeling. They develop the ability to apply data-driven insights to solve complex business problems and enhance organizational performance.",
      conclusion: "If you have a passion for business, leadership, and innovation, ESTAM University's MBA program is the ideal choice."
    })
  })

  module.exports = router