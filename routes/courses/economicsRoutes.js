const express = require('express')
router = express.Router()

//Economics Course Details Page route
router.get('/economics', (req, res) => {
    res.render('course-details', {
      title: "Economics",
      name: "Economics",
      description1: "The Bachelor of Science in Economics program at ESTAM University offers a comprehensive curriculum that provides students with a strong foundation in economic theory, quantitative analysis, and applied research methods. Our program is designed to develop analytical thinking, problem-solving skills, and a deep understanding of economic principles that drive decision-making at various levels.",
      description2: "A Bachelor of Science in Economics from ESTAM University opens up a wide range of career opportunities in both the public and private sectors. Graduates may pursue roles such as economic analysts, policy researchers, data analysts, financial analysts, consultants, or pursue further education in economics or related fields.",
      highlight1: "Core Economic Principles: Our program begins with core courses that introduce students to the fundamental concepts, theories, and models of economics. Students gain a solid understanding of microeconomics, macroeconomics, econometrics, and economic policy.",
      highlight2: "Quantitative Skills: We emphasize the development of strong quantitative and analytical skills. Through courses in mathematics, statistics, and econometrics, students learn to analyze economic data, build economic models, and conduct empirical research.",
      highlight3: "Faculty of Experts: Our faculty consists of experienced economists, researchers, and industry professionals who bring a wealth of knowledge and practical insights to the classroom. They guide students in exploring economic concepts, conducting research, and applying economic principles to contemporary issues.",
      conclusion: "If you have a passion for understanding how economic forces shape the world and want to make a positive impact through informed decision-making, ESTAM University's Bachelor of Science in Economics program is the ideal choice."
    })
  })

module.exports = router