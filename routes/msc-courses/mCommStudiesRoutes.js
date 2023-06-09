const express = require('express')
router = express.Router()

// Msc. Communication and Media Studies Course Details Page route
router.get('/msc-communication-and-media-studies', (req, res) => {
    res.render('course-details', {
      title: "MSc. Communication and Media Studies",
      name: "MSc. Communication and Media Studies",
      description1: "The Master's in Communication and Media Studies program at ESTAM University provides students with a comprehensive understanding of communication theories, media technologies, media industries, and the societal impact of media. The program is designed to develop students' critical thinking, research, and practical skills, equipping them to navigate the complex and ever-changing media landscape.",
      description2: "A Master's in Communication and Media Studies from ESTAM University opens up diverse career opportunities in various sectors, including media organizations, advertising agencies, public relations firms, digital media companies, nonprofit organizations, and more. Graduates may pursue roles such as communication specialists, media analysts, public relations managers, content strategists, or pursue further research or doctoral studies in communication and media studies.",
      highlight1: "Communication Theories and Analysis: Our program explores the foundations of communication theories and their application to various media contexts. Students learn about theories of mass communication, interpersonal communication, persuasion, media effects, and cultural studies. They gain the ability to analyze media messages, interpret communication phenomena, and critically evaluate media content.",
      highlight2: "Media Technologies and Digital Media: We delve into the study of media technologies and their impact on communication practices. Students learn about digital media platforms, social media, online journalism, multimedia production, and media convergence. They gain practical skills in utilizing digital tools, producing digital content, and understanding the ethical and legal considerations of digital media.",
      highlight3: "Media Industries and Audience Analysis: We examine the structure and dynamics of media industries, including broadcasting, print media, advertising, and online media. Students explore media economics, media policy, media ownership, and media regulation. They learn audience analysis techniques, market research methodologies, and media planning strategies. They gain insights into the challenges and opportunities faced by media organizations and develop the skills to effectively engage and understand diverse audiences.",
      conclusion: "If you have a passion for understanding the role of communication and media in society, analyzing media messages, and exploring the power of digital media technologies, ESTAM University's Master's in Communication and Media Studies program is the ideal choice."
    })
  })

  module.exports = router