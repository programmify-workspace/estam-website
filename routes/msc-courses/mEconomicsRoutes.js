const express = require('express')
router = express.Router()

// Msc Economics Course Details Page route
router.get('/msc-economics', (req, res) => {
    res.render('course-details', {
      title: "MSc Economics",
      name: "MSc Economics",
      description1: "The Master's in Economics program at ESTAM University provides students with a strong foundation in economic theory, quantitative methods, and applied economics. The program is designed to develop students' analytical and critical thinking abilities, equipping them with the tools and knowledge needed to tackle complex economic issues and contribute to the development of sound economic policies.",
      description2: "A Master's in Economics from ESTAM University opens up diverse career opportunities in various sectors, including government agencies, research institutions, international organizations, financial institutions, consulting firms, and more. Graduates may pursue roles such as economists, policy analysts, research analysts, data analysts, or pursue further research or doctoral studies in economics.",
      highlight1: "Economic Theory and Analysis: Our program focuses on economic theory and analysis, providing students with a deep understanding of microeconomics, macroeconomics, and econometrics. Students learn advanced economic models, theories of market behavior, and tools for economic analysis. They gain the ability to analyze economic phenomena, evaluate policy implications, and make informed decisions based on economic principles.",
      highlight2: "Quantitative Methods: We emphasize the importance of quantitative methods in economic analysis. Students learn statistical techniques, econometric modeling, and data analysis methods. They gain skills in using statistical software and working with economic data to conduct empirical research and analyze economic trends. These skills enable students to evaluate economic policies, forecast economic outcomes, and contribute to evidence-based decision-making.",
      highlight3: "Applied Economics and Policy Analysis: We explore the application of economic principles to real-world issues and policy analysis. Students learn about topics such as public finance, labor economics, international trade, development economics, and environmental economics. They gain the ability to analyze policy alternatives, assess their economic impact, and provide evidence-based recommendations to address societal challenges.",
      conclusion: "If you have a passion for economic analysis, policy evaluation, and understanding the forces that shape economies, ESTAM University's Master's in Economics program is the ideal choice."
    })
  })

  module.exports = router