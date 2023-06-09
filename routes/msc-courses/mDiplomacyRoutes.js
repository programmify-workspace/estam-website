const express = require('express')
router = express.Router()

// Msc. Diplomacy and International Affairs Course Details Page route
router.get('/msc-diplomacy-and-international-affairs', (req, res) => {
    res.render('course-details', {
      title: "MSc. Diplomacy and International Affairs",
      name: "MSc. Diplomacy and International Affairs",
      description1: "The Master's in Diplomacy and International Affairs program at ESTAM University provides students with a comprehensive understanding of the theories, practices, and challenges of international relations. The program is designed to develop students' analytical, diplomatic, and negotiation skills, preparing them for careers in diplomacy, international organizations, government agencies, and non-governmental organizations.",
      description2: "A Master's in Diplomacy and International Affairs from ESTAM University opens up diverse career opportunities in various sectors, including diplomatic services, international organizations, government agencies, non-profit organizations, think tanks, and consulting firms. Graduates may pursue roles such as diplomats, policy analysts, international consultants, foreign affairs officers, or pursue further research or doctoral studies in international relations.",
      highlight1: "International Relations Theory: Our program explores the major theories and frameworks in international relations, including realism, liberalism, constructivism, and critical theories. Students gain a deep understanding of the dynamics of the international system, global governance, and the role of diplomacy in shaping international outcomes.",
      highlight2: "Diplomatic Practice and Negotiation: We focus on the practical aspects of diplomacy and negotiation. Students learn about diplomatic protocols, international law, negotiation strategies, conflict resolution, and crisis management. They gain practical skills in diplomatic communication, negotiation techniques, and multilateral diplomacy.",
      highlight3: "Global Issues and Policy Analysis: We delve into the analysis of global issues and the formulation of effective policy responses. Students examine key global challenges such as international security, human rights, economic development, environmental sustainability, and humanitarian interventions. They gain the ability to critically analyze complex global issues, evaluate policy options, and develop diplomatic strategies to address them.",
      conclusion: "If you have a passion for global affairs, diplomacy, and working towards peaceful resolutions in international conflicts, ESTAM University's Master's in Diplomacy and International Affairs program is the ideal choice."
    })
  })

  module.exports = router