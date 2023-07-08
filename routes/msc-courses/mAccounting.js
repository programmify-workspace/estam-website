const express = require('express')
router = express.Router()

// Msc. Accounting and Auditing Course Details Page route
router.get('/course-details', (req, res) => {
    res.render('course-details', {
      title: "MSc. Accounting and Auditing",
      name: "MSc. Accounting and Auditing",
      description1: "The Master's in Accounting and Auditing program at ESTAM University provides students with a comprehensive understanding of financial accounting, managerial accounting, auditing, and related areas. The program is designed to develop students' technical proficiency, critical thinking abilities, and ethical awareness, preparing them for careers in accounting firms, corporations, government agencies, and other professional settings.",
      description2: "A Master's in Accounting and Auditing from ESTAM University opens up diverse career opportunities in various sectors, including accounting firms, corporations, government agencies, financial institutions, and regulatory bodies. Graduates may pursue roles such as auditors, financial analysts, management accountants or tax consultants.",
      highlight1: "Financial Reporting and Analysis: Our program focuses on financial reporting standards, financial statement analysis, and the interpretation of financial information. Students learn about Generally Accepted Accounting Principles and International Financial Reporting Standards. They gain the skills to analyze financial statements, evaluate the financial performance of organizations, and communicate financial information effectively.",
      highlight2: "Auditing and Assurance Services: We emphasize the importance of auditing in ensuring the reliability of financial information. Students learn about auditing principles, techniques, and procedures. They gain practical skills in conducting audit engagements, assessing internal controls, detecting fraud, and providing assurance on the accuracy and integrity of financial reports. They also explore emerging areas of auditing, such as IT auditing and sustainability reporting.",
      highlight3: "Professional Ethics and Corporate Governance: We delve into the ethical dimensions of accounting and auditing practices. Students learn about professional ethics, codes of conduct, and ethical decision-making in accounting and auditing. They explore the role of corporate governance in promoting transparency, accountability, and ethical behavior in organizations. They gain an understanding of the ethical challenges faced by accountants and auditors and develop the skills to navigate complex ethical dilemmas.",
      conclusion: "If you have a passion for numbers, financial analysis, and ensuring the accuracy and integrity of financial information, ESTAM University's Master's in Accounting and Auditing program is the ideal choice."
    })
  })

  module.exports = router