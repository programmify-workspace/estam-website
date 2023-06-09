
const express = require('express')
router = express.Router()

//Accounting Course Details Page route
router.get('', (req, res) => {
  res.render('course-details', {
    title: "Accounting",
    name: "Accounting",
    description1: "The Bachelor of Science in Accounting program at ESTAM University offers a comprehensive curriculum that covers various aspects of financial accounting, managerial accounting, auditing, taxation, and business law. Our program equips students with a strong foundation in accounting principles, analytical skills, and professional competencies.",
    description2: "A Bachelor of Science in Accounting from ESTAM University opens up diverse career opportunities in accounting firms, corporations, government agencies, non-profit organizations, and consulting firms. Graduates may pursue roles such as accountants, auditors, tax specialists, financial analysts, or pursue further professional certifications",
    highlight1: "Core Accounting Courses: Our program begins with core courses that provide students with a solid foundation in accounting principles and practices. Students explore topics such as financial accounting, cost accounting, taxation, auditing, and accounting information systems. These courses develop a strong technical understanding of accounting processes and regulations.",
    highlight2: "Financial Analysis and Reporting: We focus on developing students' ability to analyze financial data, prepare financial statements, and communicate financial information effectively. Students learn to interpret financial statements, perform financial analysis, and apply accounting standards and regulations.",
    highlight3: "Accounting Information Systems: We recognize the significance of technology in modern accounting. Students learn about accounting information systems, software applications, and data analytics. They gain hands-on experience with accounting software and develop skills to leverage technology in accounting processes.",
    conclusion: "If you have a passion for numbers, financial analysis, and a keen eye for detail, ESTAM University's Bachelor of Science in Accounting program is the ideal choice."
  })
})

module.exports = router