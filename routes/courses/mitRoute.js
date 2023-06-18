import { Router } from 'express';
const router = Router();
//Mangement Information Technology Course Details Page route
router.get('/mangement-information-technology', (req, res) => {
    res.render('course-details', {
      title: "Mangement Information Technology",
      name: "Mangement Information Technology",
      description1: "The Bachelor of Science in Management Information Technology program at ESTAM University offers a comprehensive curriculum that covers various aspects of management and information technology, including systems analysis and design, database management, programming, project management, cybersecurity, and business intelligence. Our program equips students with the knowledge, skills, and practical experience to excel in the rapidly evolving field of IT management.",
      description2: "",
      highlight1: "Core Management and IT Courses: Our program begins with core courses that provide students with a solid foundation in management and IT principles. Students learn about organizational behavior, business fundamentals, systems analysis and design, programming concepts, and IT project management. These courses lay the groundwork for understanding the essential concepts and strategies in management information technology.",
      highlight2: "Programming and Software Development: We address the fundamentals of programming and software development. Students learn programming languages, software engineering principles, software testing, and debugging techniques. They gain practical skills in developing software applications and understanding the software development life cycle.",
      highlight3: "IT Project Management: We emphasize the importance of effective project management in IT initiatives. Students learn about project planning, scheduling, budgeting, risk management, and team coordination. They gain knowledge of project management methodologies and develop skills in managing IT projects to meet deadlines, budgets, and quality standards.",
      conclusion: "A Bachelor of Science in Management Information Technology from ESTAM University opens up diverse career opportunities in technology companies, consulting firms, IT departments, e-commerce companies, and more. Graduates may pursue roles such as IT project managers, systems analysts, database administrators, cybersecurity analysts, or pursue further education in management information technology."
    })
  })

  export default router;