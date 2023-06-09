const express = require('express')
router = express.Router()

//Computer Engineering Course Details Page route
router.get('/', (req, res) => {
    res.render('course-details', {
      title: "Computer Engineering",
      name: "Computer Engineering",
      description1: "The Bachelor of Science in Computer Engineering program at ESTAM University offers a comprehensive curriculum that covers various aspects of computer engineering, including digital systems, computer architecture, programming, electronics, embedded systems, network engineering, and software engineering. Our program equips students with the knowledge, skills, and practical experience to excel in the dynamic field of computer engineering.",
      description2: "A Bachelor of Science in Computer Engineering from ESTAM University opens up diverse career opportunities in technology companies, semiconductor firms, telecommunications companies, research institutions, and more. Graduates may pursue roles such as computer engineers, software developers, embedded systems engineers, network engineers, or pursue further education in computer engineering, electronics, or related fields.",
      highlight1: "Core Computer Engineering Courses: Our program begins with core courses that provide students with a solid foundation in computer engineering principles and practices. Students learn about digital logic design, computer organization, microprocessors, data structures, and algorithms. These courses lay the groundwork for understanding the fundamental concepts and methodologies in computer engineering.",
      highlight2: "Programming and Software Engineering: Our program covers programming languages, software development methodologies, and software engineering principles. Students learn about object-oriented programming, software testing, version control, and software project management. They gain practical skills in developing software applications and understanding the software development life cycle.",
      highlight3: "Computer Architecture and Organization: We address the design and organization of computer systems. Students learn about processor architecture, memory systems, input/output devices, and system-level optimization. They gain knowledge of computer system components and develop skills in designing efficient computer architectures.",
      conclusion: "If you have a passion for technology, problem-solving, and innovation, ESTAM University's Bachelor of Science in Computer Engineering program is the ideal choice."
    })
  })

  module.exports = router