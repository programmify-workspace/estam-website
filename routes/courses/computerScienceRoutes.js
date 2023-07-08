const express = require('express')
router = express.Router()

//Computer Science Course Details Page route
router.get('/course-details', (req, res) => {
    res.render('course-details', {
      title: "Computer Science",
      name: "Computer Science",
      description1: "The Bachelor of Science in Computer Science program at ESTAM University offers a comprehensive curriculum that covers various aspects of computer science, including programming, algorithms, data structures, software development, computer networks, databases, artificial intelligence, and cybersecurity. Our program equips students with the knowledge, skills, and practical experience to thrive in the rapidly evolving field of computer science.",
      description2: "A Bachelor of Science in Computer Science from ESTAM University opens up diverse career opportunities in technology companies, software development firms, IT consulting, research organizations, and more. Graduates may pursue roles such as software engineers, web developers, data analysts, network administrators, cybersecurity specialists, or pursue further education in computer science, artificial intelligence, or related fields.",
      highlight1: "Core Computer Science Courses: Our program begins with core courses that provide students with a solid foundation in computer science principles and practices. Students learn programming languages, algorithms, data structures, and software development methodologies. These courses lay the groundwork for understanding the fundamental concepts and problem-solving techniques in computer science.",
      highlight2: "Software Development: We focus on developing students' programming skills and software development expertise. Students learn about software engineering principles, software testing, version control, and agile development methodologies. They gain practical experience in designing, implementing, and testing software applications.",
      highlight3: "Web and Mobile Development: We address the growing importance of web and mobile technologies. Students learn about web development frameworks, front-end and back-end technologies, mobile app development, and responsive design. They gain practical skills in building web and mobile applications that meet user needs and leverage the latest industry trends.",
      conclusion: "If you have a passion for technology, problem-solving, and innovation, ESTAM University's Bachelor of Science in Computer Science program is the perfect choice"
    })
  })

  module.exports = router