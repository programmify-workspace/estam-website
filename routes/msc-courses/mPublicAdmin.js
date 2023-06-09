const express = require('express')
router = express.Router()

// Msc. Public and Local Government Administration Course Details Page route
router.get('/msc-public-and-local-government-administration', (req, res) => {
    res.render('course-details', {
      title: "MSc. Public and Local Government Administration",
      name: "MSc. Public and Local Government Administration",
      description1: "The Master's in Public and Local Government Administration program at ESTAM University provides students with a comprehensive understanding of public administration, policy analysis, and local government management. The program is designed to develop students' analytical, managerial, and leadership skills, preparing them for careers in public administration, government agencies, nonprofit organizations, and other public sector settings.",
      description2: "A Master's in Public and Local Government Administration from ESTAM University opens up diverse career opportunities in various sectors, including government agencies, local municipalities, nonprofit organizations, international organizations, and consulting firms. Graduates may pursue roles such as public administrators, policy analysts, program managers, city managers, or pursue further research or doctoral studies in public administration.",
      highlight1: "Public Administration and Policy Analysis: Our program explores the theories and practices of public administration, public policy development, and implementation. Students gain insights into the functions of public organizations, policy formulation processes, and the role of public administrators in promoting effective governance. They develop skills in policy analysis, program evaluation, and evidence-based decision-making.",
      highlight2: "Local Government Management: We focus on the unique challenges and dynamics of local government administration. Students learn about local governance structures, municipal finance, urban planning, community development, and intergovernmental relations. They gain practical skills in managing local government operations, addressing community needs, and engaging with diverse stakeholders. They also explore innovative approaches to local governance, such as participatory decision-making and sustainable development.",
      highlight3: "Leadership and Organizational Change: We delve into the concepts of leadership, organizational behavior, and change management in the public sector. Students learn about effective leadership styles, team dynamics, and strategies for managing organizational change. They develop skills in motivating employees, fostering innovation, and leading organizational transformations. They also examine ethical leadership practices and the importance of integrity and transparency in public administration.",
      conclusion: "If you have a passion for public service, community development, and making a positive impact in society, ESTAM University's Master's in Public and Local Government Administration program is the ideal choice."
    })
  })

  module.exports = router