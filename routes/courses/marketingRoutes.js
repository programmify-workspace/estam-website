const express = require('express')
router = express.Router()

//Marketing Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "Marketing",
      name: "Marketing",
      description1: "The Bachelor of Science in Marketing program at ESTAM University offers a comprehensive curriculum that covers various aspects of marketing strategy, consumer behavior, branding, digital marketing, and market research. Our program equips students with the knowledge, skills, and practical experience to thrive in the dynamic and competitive field of marketing",
      description2: "A Bachelor of Science in Marketing from ESTAM University opens up diverse career opportunities in advertising, brand management, market research, digital marketing, sales, and public relations. Graduates may pursue roles such as marketing managers, brand strategists, market researchers, digital marketing specialists, or pursue further education in marketing, business administration, or related fields.",
      highlight1: "Core Marketing Courses: Our program begins with core courses that provide students with a solid foundation in marketing principles and practices. Students explore topics such as marketing management, consumer behavior, market research, marketing communications, and strategic marketing planning. These courses lay the groundwork for understanding the fundamental concepts and strategies of marketing.",
      highlight2: "Branding and Product Management: We focus on the strategic aspects of building and managing strong brands. Students learn about brand development, brand positioning, brand equity, and brand management strategies. They explore product lifecycle management, new product development, and strategies for effectively launching and managing products in the marketplace.",
      highlight3: "Marketing Communications: We explore various aspects of marketing communications, including advertising, public relations, sales promotion, and integrated marketing communications. Students learn to develop effective marketing campaigns, create compelling messages, and utilize different marketing channels to engage with target audiences.",
      conclusion: "If you have a passion for creativity, strategic thinking, and understanding consumer behavior, ESTAM University's Bachelor of Science in Marketing program is the perfect choice."
    })
  })

  module.exports = router