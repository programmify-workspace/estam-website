const express = require('express')
router = express.Router()

//Banking and Finance Course Details Page route
router.get('/banking-and-finance', (req, res) => {
    res.render('course-details', {
      title: "Banking and Finance",
      name: "Banking and Finance",
      description1: "The Bachelor of Science in Banking and Finance program at ESTAM University offers a comprehensive curriculum that covers various aspects of banking operations, financial management, investment analysis, risk management, and regulatory frameworks. Our program equips students with a solid understanding of financial concepts, analytical skills, and prepares them for diverse roles in the banking and finance sector.",
      description2: "A Bachelor of Science in Banking and Finance from ESTAM University opens up diverse career opportunities in commercial banks, investment firms, financial planning firms, insurance companies, and regulatory agencies. Graduates may pursue roles such as financial analysts, investment bankers, credit analysts, risk managers, or pursue further education in finance, economics, or related fields.",
      highlight1: "Core Banking and Finance Courses: Our program begins with core courses that provide students with a strong foundation in banking and finance principles. Students explore topics such as financial markets, financial institutions, corporate finance, investment analysis, risk management, and financial regulations. These courses develop a comprehensive understanding of the banking and finance landscape.",
      highlight2: "Banking Operations and Services: Our program covers the operational aspects of banking, including commercial banking, retail banking, and banking services. Students learn about banking products and services, credit analysis, loan management, and customer relationship management. They gain insights into the regulatory environment and develop skills to navigate the challenges of the banking industry.",
      highlight3: "Financial Technology and Innovation: We recognize the transformative impact of technology on the banking and finance industry. Students learn about financial technology (FinTech), digital banking, blockchain, and emerging trends in the field. They gain insights into how technology is reshaping financial services and develop skills to leverage digital tools in banking and finance operations.",
      conclusion: "If you have a passion for finance, analytical thinking, and a keen interest in the banking industry, ESTAM University's Bachelor of Science in Banking and Finance program is the ideal choice."
    })
  })

  module.exports = router