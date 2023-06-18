import { Router } from 'express';
const router = Router();

//Business Administration Course Details Page route
router.get('/business-administration', (req, res) => {
    res.render('course-details', {
      title: "Business Administration",
      name: "Business Administration",
      description1: "The Bachelor of Science in Business Administration program at ESTAM University offers a comprehensive curriculum that covers various aspects of business management, entrepreneurship, marketing, finance, and organizational behavior. Our program equips students with a solid understanding of business fundamentals, strategic thinking, and effective leadership skills.",
      description2: "A Bachelor of Science in Business Administration from ESTAM University opens up a wide range of career opportunities in various industries, including finance, marketing, consulting, entrepreneurship, human resources, and operations management. Graduates may pursue roles such as business analysts, marketing managers, financial analysts, project managers, or pursue further education in business, management, or related fields.",
      highlight1: "Core Business Courses: Our program begins with core courses that provide students with a strong foundation in business principles. Students explore topics such as accounting, economics, marketing, finance, operations management, business law, and organizational behavior. These courses provide a comprehensive understanding of the functional areas of business.",
      highlight2: "Business Ethics and Corporate Social Responsibility: At ESTAM, we emphasize the importance of ethical business practices and social responsibility. Students explore ethical dilemmas in business, analyze corporate social responsibility initiatives, and learn how businesses can contribute to sustainable development and societal well-being.",
      highlight3: "Leadership and Professional Development: We focus on developing leadership qualities and professional skills. Students participate in leadership development activities, workshops, and seminars that enhance their communication, teamwork, and managerial abilities. They learn to adapt to changing business environments, think strategically, and make informed decisions.",
      conclusion: "If you have a passion for business, entrepreneurship, and leadership, ESTAM University's Bachelor of Science in Business Administration program is the perfect choice."
    })
  })

export default router;