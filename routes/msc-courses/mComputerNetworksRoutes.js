const express = require('express')
router = express.Router()

// Master's in Computer Networks and Security Course Details Page route
router.get('/msc-computer-networks-and-security', (req, res) => {
    res.render('course-details', {
      title: "MSc. Computer Networks and Security Program",
      name: "MSc. Computer Networks and Security Program",
      description1: "The Master's in Computer Networks and Security program at ESTAM University provides students with in-depth knowledge and practical skills in the areas of computer networks, network security, and data protection. The program is designed to meet the growing demand for professionals who can address the complex challenges of network security and ensure the smooth operation of computer networks.",
      description2: "A Master's in Computer Networks and Security from ESTAM University opens up diverse career opportunities in technology companies, cybersecurity firms, government agencies, research institutions, and more. Graduates may pursue roles such as network security engineer, network administrator, cybersecurity analyst, network consultant, or pursue further research or doctoral studies in computer networks and security.",
      highlight1: "Advanced Networking Concepts: Our program covers advanced networking concepts, including network architectures, protocols, performance analysis, and network management. Students gain a deep understanding of network design principles and the ability to optimize network performance.",
      highlight2: "Network Security: We focus on the principles and techniques of network security. Students learn about cryptographic algorithms, secure network protocols, access control mechanisms, and intrusion detection systems. They gain practical skills in securing network infrastructures and protecting against cyber threats.",
      highlight3: "Wireless and Mobile Networks: We explore the design and management of wireless and mobile networks. Students learn about wireless communication principles, mobile network protocols, and network security in wireless environments. They gain knowledge of wireless network architectures and practical experience in deploying and securing wireless networks.",
      conclusion: "If you have a passion for network security, data protection, and ensuring the reliability of computer networks, ESTAM University's Master's in Computer Networks and Security program is the ideal choice."
    })
  })

  module.exports = router