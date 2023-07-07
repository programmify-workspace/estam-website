const express = require('express')
router = express.Router()

//Transport and logistics Management Course Details Page route
router.get('/course-details', (req, res) => {
    res.render('course-details', {
        title: "Transport and Logistics Management",
        name: "Transport and Logistics Management",
        description1: "The Bachelor of Science in Transport and Logistics Management program at ESTAM University offers a comprehensive curriculum that covers various aspects of transportation systems, supply chain management, logistics operations, and strategic planning. Our program equips students with the knowledge, skills, and practical experience to excel in the dynamic field of transport and logistics management.",
        description2: "A Bachelor of Science in Transport and Logistics Management from ESTAM University opens up diverse career opportunities in logistics companies, transportation firms, supply chain management departments, e-commerce companies, and consulting firms. Graduates may pursue roles such as logistics managers, supply chain analysts, transportation planners, warehouse managers, or pursue further education in logistics, operations management, or related fields.",
        highlight1: "Core Transport and Logistics Courses: Our program begins with core courses that provide students with a solid foundation in transport and logistics management principles. Students explore topics such as transportation systems, logistics operations, supply chain management, inventory management, and strategic logistics planning. These courses lay the groundwork for understanding the key concepts and strategies in the field.",
        highlight2: "Supply Chain Management: Our program emphasizes the importance of effective supply chain management in today's global marketplace. Students learn about supply chain strategy, procurement, demand forecasting, warehouse management, and order fulfillment. They gain knowledge of supply chain optimization techniques and develop skills in managing complex supply chain networks.",
        highlight3: "Logistics Technology and Analytics: We recognize the transformative impact of technology in the transport and logistics industry. Students learn about logistics software systems, data analytics, and emerging technologies such as Internet of Things (IoT) and blockchain. They gain hands-on experience with industry-relevant software tools and develop skills to leverage technology for improving logistics operations and decision-making.",
        conclusion: "If you have a passion for efficient transportation, supply chain optimization, and problem-solving in logistics, ESTAM University's Bachelor of Science in Transport and Logistics Management program is the perfect choice."
      })
  })

  module.exports = router