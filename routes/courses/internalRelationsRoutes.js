const express = require('express')
router = express.Router()

//International Relations Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "International Relations",
      name: "International Relations",
      description1: "The Bachelor of Science in International Relations program at ESTAM University offers a comprehensive curriculum that explores the complexities of global politics, diplomacy, international law, and global security. Our program equips students with the analytical tools, cultural awareness, and diplomatic skills necessary to navigate the complex and interconnected world of international relations.",
      description2: "A Bachelor of Science in International Relations from ESTAM University opens up a range of career opportunities in diplomacy, government, international organizations, non-profit organizations, think tanks, journalism, and research institutions. Graduates may pursue roles such as diplomats, policy analysts, international development specialists, foreign service officers, or pursue further education in international relations, law, or related fields.",
      highlight1: "Core International Relations Courses: Our program begins with core courses that provide students with a solid foundation in international relations theory, global governance, diplomatic history, and international political economy. Students gain an understanding of the historical, economic, and political factors shaping global affairs.",
      highlight2: "Regional and Global Studies: We emphasize the study of regional dynamics and global issues. Students explore various regions of the world, examining their political systems, conflicts, cooperation, and cultural contexts. They also analyze global challenges such as human rights, environmental sustainability, migration, and global health.",
      highlight3: "International Law and Organizations: We explore the role of international law and organizations in shaping global governance. Students study international law principles, human rights, international humanitarian law, and the functioning of international organizations such as the United Nations, regional organizations, and non-governmental organizations.",
      conclusion: "If you have a passion for global affairs, diplomacy, and understanding the complexities of international relations, ESTAM University's Bachelor of Science in International Relations program is the ideal choice."
    })
  })

module.exports = router