// Bring your dependencies to your app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// Initialize your handlebar engine
const engine = exphbs.engine;

// Initialize your express app
const app = express();

// Call env config method
dotenv.config()

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a transporter using SMTP configuration for Zoho
let transporter;

if (process.env.NODE_ENV === 'production') {
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_PROD_PORT,
    secure: true,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  });
} else {
  // Development environment configuration
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_DEV_PORT,
    secure: false,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  });
}


const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png'

// Configure Form Submission endpoints
app.post('/submit-research', (req, res) => {
  const { name, email, title, abstract, discipline } = req.body

  // Send email to admin
  const mailOptions = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: process.env.ZOHO_ADMIN_EMAIL,
    subject: 'New Research Proposal from ' + name,
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>Research Proposal by ${name}</h2>
          <h3>Details of Research Proposal</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Title of Research Proposal:</strong> <br> ${title}</p>
          <p><strong>Abstract:</strong> <br> ${abstract}</p>
          <p><strong>Relevant Discipline or Department:</strong> <br> ${discipline}</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).render('500', { title: 'Server Error' });
      console.error('Error sending email:', error);

    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Form submitted successfully' });
    }
  });

  // Send email to user 

  // Define the email content
  const emailContent = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: email,
    subject: 'Thank You for Your Submission',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>Thank You for Your Submission</h2>
          <p>Dear ${name},</p>
          <p>This is to acknowledge that we have received your research proposal. 
          We greatly appreciate your interest in our research publications.</p>
          <p>We will respond to you as soon as possible.</p>

          <p>Best Regards,
  
          <br><br>ESTAM University
          <br> 148, Von Adjavon, En face d'Eglise Gbiba Wiwe, Segbeya, Akpakpa
          <br>Cotonou, Benin Republic</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send the email
  transporter.sendMail(emailContent, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
});


app.post('/submit-career', (req, res) => {
  const { name, email, phone, message } = req.body

  // send email to career services' email
  const mailOptions = {
    from: `Career Services ${process.env.ZOHO_CAREER_SERVICES_EMAIL}`,
    to: process.env.ZOHO_CAREER_SERVICES_EMAIL,
    subject: 'New Career Services Request from ' + name,
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>Career Service Request from ${name}</h2>
          <h3>Sender's Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Message:</strong> <br> ${message}</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).render('500', { title: 'Server Error' });
      console.error('Error sending email:', error);

    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Form submitted successfully' });
    }
  });

  // Send email to user 

  // Define the email content
  const emailContent = {
    from: `ESTAM University ${process.env.ZOHO_CAREER_SERVICES_EMAIL}`,
    to: email,
    subject: 'Thank You for Your Message',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>Thank You for Your Message</h2>
          <p>Dear ${name},</p>
          <p>This is to acknowledge that we have received your message. 
          We greatly appreciate your interest in our career services.</p>
          <p>Our dedicated career services team is reviewing your message, and one of our career counselors will contact you shortly to provide assistance and guidance.</p>
          <p>We understand the importance of your career goals, and we assure you that we will make every effort to respond to your inquiry promptly.</p>
          <p>Thank you for reaching out to us. Your trust in our services is valued.</p>

          <p>Best Regards,
  
          <br><br>ESTAM University
          <br> 148, Von Adjavon, En face d'Eglise Gbiba Wiwe, Segbeya, Akpakpa
          <br>Cotonou, Benin Republic</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send the email
  transporter.sendMail(emailContent, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });


});

app.post('/submit-contact', (req, res) => {
  const { name, email, phone, message } = req.body

  // Send email to admin
  const mailOptions = {
    from:`Contact Us ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: process.env.ZOHO_CONTACT_US_EMAIL,
    subject: 'New Message From Contact Page',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>You have been contacted by ${name}</h2>
          <h3>Sender's Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Message:</strong> <br> ${message}</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).render('500', { title: 'Server Error' });
      console.error('Error sending email:', error);

    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Form submitted successfully' });
    }
  });

  // Send email to user 

  // Define the email content
  const emailContent = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: email,
    subject: 'Thank You for Your Submission',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Template</title>
      <style>
        /* Add your styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          max-width: 200px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${imgURL}" alt="Logo">
        </div>
        <div class="content">
          <h2>Thank You for Your Submission</h2>
          <p>Dear ${name},</p>
          <p>This is to acknowledge that we have recieved your message</p>
          <p>We will respond to you as soon as possible.</p>
          <p>Regards,
  
          <br><br>ESTAM University
          <br> 148, Von Adjavon, En face d'Eglise Gbiba Wiwe, Segbeya, Akpakpa
          <br>Cotonou, Benin Republic</p>
        </div>
        <div class="footer">
          &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  };

  // Send the email
  transporter.sendMail(emailContent, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });


});




// Define pages routes

// Home Page route
app.get('/', (req, res) => {
  res.render('home', {
    title: "Home",
    name: "Home"
  });
});

// About Page route
app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "About Us"
  })
})

// Gallery Page route
app.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: "Gallery",
    name: "Our Gallery"
  })
})

// Contact Page route
app.get('/contact-us', (req, res) => {
  res.render('contact-us', {
    title: "Contact Us",
    name: "Contact Us"
  })
})

// Admissions Page route
app.get('/admissions', (req, res) => {
  res.render('admissions', {
    title: "Admissions",
    name: "Admissions"
  })
})

// accomodation Page route
app.get('/accomodation', (req, res) => {
  res.render('accomodation', {
    title: "Accomodation",
    name: "Accomodation"
  })
})

//Mass Communication Course Details Page route
app.get('/mass-communication', (req, res) => {
  res.render('course-details', {
    title: "Mass Communication",
    name: "Mass Communication",
    description1: "The Bachelor of Science in Mass Communication program at ESTAM University offers a comprehensive and interdisciplinary curriculum that combines theoretical foundations with hands-on practical experiences. Our program is designed to equip students with the necessary skills and knowledge to excel in various fields within mass communication, such as journalism, public relations, advertising, broadcasting, digital media, and media management.",
    description2: "A Bachelor of Science in Mass Communication from ESTAM University opens up a range of exciting career opportunities. Graduates may pursue roles such as journalists, news anchors, public relations specialists, advertising executives, social media managers, content creators, media researchers, or media consultants. The versatile skills acquired during the program prepare students for success in both traditional and digital media environments.",
    highlight1: "Foundational Knowledge: Our program provides a solid understanding of the theories, concepts, and principles that underpin the field of mass communication. Students gain insight into the historical, cultural, and social dimensions of media and its impact on society.",
    highlight2: "Practical Skills Development: We believe in learning by doing. Through practical coursework, workshops, and internships, students develop essential skills in media production, journalism, digital media, public relations, and advertising. They learn to navigate various media platforms, create engaging content, conduct interviews, analyze data, and develop effective communication strategies.",
    highlight3: "Faculty of Experts: Our faculty consists of experienced academics and industry professionals who bring a wealth of knowledge and real-world insights to the classroom. They mentor students, facilitate collaborative projects, and guide them in developing their professional portfolios.",
    conclusion: "If you are passionate about communication, media, and making an impact through storytelling, ESTAM University's Bachelor of Science in Mass Communication program is the perfect choice."
  })
})


//Economics Course Details Page route
app.get('/economics', (req, res) => {
  res.render('course-details', {
    title: "Economics",
    name: "Economics",
    description1: "The Bachelor of Science in Economics program at ESTAM University offers a comprehensive curriculum that provides students with a strong foundation in economic theory, quantitative analysis, and applied research methods. Our program is designed to develop analytical thinking, problem-solving skills, and a deep understanding of economic principles that drive decision-making at various levels.",
    description2: "A Bachelor of Science in Economics from ESTAM University opens up a wide range of career opportunities in both the public and private sectors. Graduates may pursue roles such as economic analysts, policy researchers, data analysts, financial analysts, consultants, or pursue further education in economics or related fields.",
    highlight1: "Core Economic Principles: Our program begins with core courses that introduce students to the fundamental concepts, theories, and models of economics. Students gain a solid understanding of microeconomics, macroeconomics, econometrics, and economic policy.",
    highlight2: "Quantitative Skills: We emphasize the development of strong quantitative and analytical skills. Through courses in mathematics, statistics, and econometrics, students learn to analyze economic data, build economic models, and conduct empirical research.",
    highlight3: "Faculty of Experts: Our faculty consists of experienced economists, researchers, and industry professionals who bring a wealth of knowledge and practical insights to the classroom. They guide students in exploring economic concepts, conducting research, and applying economic principles to contemporary issues.",
    conclusion: "If you have a passion for understanding how economic forces shape the world and want to make a positive impact through informed decision-making, ESTAM University's Bachelor of Science in Economics program is the ideal choice."
  })
})


//Political Science Course Details Page route
app.get('/political-science', (req, res) => {
  res.render('course-details', {
    title: "Political Science",
    name: "Political Science",
    description1: "The Bachelor of Science in Political Science program at ESTAM University offers a comprehensive curriculum that provides students with a deep understanding of political systems, institutions, ideologies, and public policies. Our program equips students with the analytical tools, research skills, and theoretical knowledge necessary to critically analyze political dynamics at local, national, and global levels.",
    description2: "A Bachelor of Science in Political Science from ESTAM University prepares graduates for diverse career paths. Graduates may pursue careers in government, policy analysis, international organizations, non-profit organizations, advocacy groups, journalism, research institutions, or pursue further education in political science, law, public administration, or related fields.",
    highlight1: "Core Political Science Courses: Our program begins with core courses that introduce students to the foundational concepts, theories, and methodologies of political science. Students explore topics such as comparative politics, international relations, political theory, public administration, and research methods.",
    highlight2: "Specialization Opportunities: In the latter stages of the program, students have the opportunity to choose specialization tracks aligned with their interests and career goals. Specializations may include areas such as political theory, international relations, comparative politics, public policy analysis, or political economy.",
    highlight3: "Faculty of Experts: Our faculty consists of accomplished political scientists, scholars, and practitioners who bring a wealth of knowledge and real-world insights to the classroom. They mentor students, facilitate engaging discussions, and guide them in conducting independent research projects.",
    conclusion: "If you have a passion for understanding political dynamics, governance, and policy-making, and aspire to make a positive impact on society, ESTAM University's Bachelor of Science in Political Science program is the perfect choice."
  })
})


//Public Administration Course Details Page route
app.get('/public-administration', (req, res) => {
  res.render('course-details', {
    title: "Public Administration",
    name: "Public Administration",
    description1: "The Bachelor of Science in Public Administration program at ESTAM University offers a comprehensive curriculum that explores the theories, practices, and challenges of public administration. Our program equips students with the knowledge, skills, and leadership qualities needed to navigate the complexities of public governance, policy-making, and organizational management.",
    description2: "A Bachelor of Science in Public Administration from ESTAM University opens up a range of career opportunities in public service, government agencies, nonprofit organizations, and international development. Graduates may pursue roles such as policy analysts, program managers, public administrators, city planners, public affairs officers, or pursue further education in public administration, public policy, or related fields.",
    highlight1: "Foundations of Public Administration: Our program begins with core courses that introduce students to the principles, theories, and practices of public administration. Students gain a solid understanding of public policy, organizational behavior, public finance, ethics in public administration, and administrative law.",
    highlight2: "Policy Analysis and Implementation: We emphasize the development of analytical and problem-solving skills in public policy. Students learn to analyze policy issues, conduct research, evaluate policy options, and understand the practical aspects of policy implementation and evaluation.",
    highlight3: "Faculty of Experts: Our faculty consists of experienced public administrators, policy experts, and scholars who bring a wealth of knowledge and practical insights to the classroom. They mentor students, facilitate discussions on contemporary issues, and guide them in applying theoretical concepts to real-world challenges.",
    conclusion: "If you have a passion for public service, governance, and making a positive impact on society, ESTAM University's Bachelor of Science in Public Administration program is the ideal choice."
  })
})


//International Relations Course Details Page route
app.get('/international-relations', (req, res) => {
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

//Sociology Course Details Page route
app.get('/sociology', (req, res) => {
  res.render('course-details', {
    title: "Sociology",
    name: "Sociology",
    description1: "The Bachelor of Science in Sociology program at ESTAM University offers a comprehensive curriculum that examines social structures, social interactions, and social phenomena. Our program equips students with the theoretical knowledge, research skills, and analytical tools to critically analyze social issues, advocate for change, and contribute to the betterment of society.",
    description2: "A Bachelor of Science in Sociology from ESTAM University opens up diverse career opportunities in research, social services, non-profit organizations, community development, human resources, advocacy, and policy analysis. Graduates may pursue roles such as research analysts, community organizers, social researchers, policy analysts, or pursue further education in sociology, social work, or related fields.",
    highlight1: "Core Sociological Concepts: Our program begins with core courses that introduce students to the foundational concepts, theories, and methodologies of sociology. Students explore topics such as social theory, social research methods, social psychology, social stratification, and the sociology of gender, race, and ethnicity.",
    highlight2: "Social Research and Data Analysis: We emphasize the development of research skills and data analysis techniques. Students learn qualitative and quantitative research methods, data collection, and analysis. They apply these skills to research projects, surveys, and observational studies, gaining hands-on experience in conducting social research.",
    highlight3: "Applied Sociology: We believe in the practical application of sociological knowledge. Students have the opportunity to engage in fieldwork, internships, or community-based research projects. These experiences allow them to apply sociological theories and methods to real-world settings, gain practical skills, and contribute to addressing social issues.",
    conclusion: "If you have a passion for understanding social dynamics, advocating for social justice, and making a positive impact on society, ESTAM University's Bachelor of Science in Sociology program is the ideal choice."
  })
})


//Business Administration Course Details Page route
app.get('/business-administration', (req, res) => {
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


//Accounting Course Details Page route
app.get('/accounting', (req, res) => {
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


//Marketing Course Details Page route
app.get('/marketing', (req, res) => {
  res.render('course-details', {
    title: "Marketing",
    name: "Marketing",
    description1: "The Bachelor of Science in Marketing program at ESTAM University offers a comprehensive curriculum that covers various aspects of marketing strategy, consumer behavior, branding, digital marketing, and market research. Our program equips students with the knowledge, skills, and practical experience to thrive in the dynamic and competitive field of marketing",
    description2: "A Bachelor of Science in Marketing from ESTAM University opens up diverse career opportunities in advertising, brand management, market research, digital marketing, sales, and public relations. Graduates may pursue roles such as marketing managers, brand strategists, market researchers, digital marketing specialists, or pursue further education in marketing, business administration, or related fields.",
    highlight1: "Core Marketing Courses: Our program begins with core courses that provide students with a solid foundation in marketing principles and practices. Students explore topics such as marketing management, consumer behavior, market research, marketing communications, and strategic marketing planning. These courses lay the groundwork for understanding the fundamental concepts and strategies of marketing.",
    highlight2: "Branding and Product Management: We focus on the strategic aspects of building and managing strong brands. Students learn about brand development, brand positioning, brand equity, and brand management strategies. They explore product lifecycle management, new product development, and strategies for effectively launching and managing products in the marketplace.",
    highlight3: "Marketing Communications: We explore various aspects of marketing communications, including advertising, public relations, sales promotion, and integrated marketing communications. Students learn to develop effective marketing campaigns, create compelling messages, and utilize different marketing channels to engage with target audiences.",
    conclusion: "If you have a passion for creativity, strategic thinking, and understanding consumer behavior, ESTAM University's Bachelor of Science in Marketing program is the perfect choice."
  })
})

//Banking and Finance Course Details Page route
app.get('/banking-and-finance', (req, res) => {
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


//Transport and Logistics Management Course Details Page route
app.get('/transport-and-logistics-management', (req, res) => {
  res.render('course-details', {
    title: "Transport and Logistics Management",
    name: "Transport and Logistics Management",
    description1: "The Bachelor of Science in Transport and Logistics Management program at ESTAM University offers a comprehensive curriculum that covers various aspects of transportation systems, supply chain management, logistics operations, and strategic planning. Our program equips students with the knowledge, skills, and practical experience to excel in the dynamic field of transport and logistics management.",
    description2: "A Bachelor of Science in Transport and Logistics Management from ESTAM University opens up diverse career opportunities in logistics companies, transportation firms, supply chain management departments, e-commerce companies, and consulting firms. Graduates may pursue roles such as logistics managers, supply chain analysts, transportation planners, warehouse managers, or pursue further education in logistics, operations management, or related fields.",
    highlight1: "Core Transport and Logistics Courses: Our program begins with core courses that provide students with a solid foundation in transport and logistics management principles. Students explore topics such as transportation systems, logistics operations, supply chain management, inventory management, and strategic logistics planning. These courses lay the groundwork for understanding the key concepts and strategies in the field.",
    highlight2: "Supply Chain Management: Our program emphasizes the importance of effective supply chain management in today's global marketplace. Students learn about supply chain strategy, procurement, demand forecasting, warehouse management, and order fulfillment. They gain knowledge of supply chain optimization techniques and develop skills in managing complex supply chain networks.",
    highlight3: "Logistics Technology and Analytics: We recognize the transformative impact of technology in the transport and logistics industry. Students learn about logistics software systems, data analytics, and emerging technologies such as Internet of Things (IoT) and blockchain. They gain hands-on experience with industry-relevant software tools and develop skills to leverage technology for improving logistics operations and decision-making.",
    conclusion: "If you have a passion for efficient transportation, supply chain optimization, and problem-solving in logistics, ESTAM University's Bachelor of Science in Transport and Logistics Management program is the perfect choice."
  })
})


//Human Resources Management Course Details Page route
app.get('/human-resources-management', (req, res) => {
  res.render('course-details', {
    title: "Human Resources Management",
    name: "Human Resources Management",
    description1: "The Bachelor of Science in Human Resources Management program at ESTAM University offers a comprehensive curriculum that covers various aspects of HR management, including recruitment and selection, employee training and development, performance management, compensation and benefits, labor relations, and strategic HR planning. Our program equips students with the knowledge, skills, and competencies necessary to excel in the dynamic field of human resources.",
    description2: "A Bachelor of Science in Human Resources Management from ESTAM University opens up diverse career opportunities in HR departments of corporations, consulting firms, government agencies, non-profit organizations, and more. Graduates may pursue roles such as HR specialists, recruitment managers, training and development coordinators, compensation and benefits analysts, or pursue further education in HR management, organizational psychology, or related fields.",
    highlight1: "Core HR Management Courses: Our program begins with core courses that provide students with a solid foundation in HR management principles. Students explore topics such as HR planning, recruitment and selection, employee relations, training and development, performance management, and labor laws. These courses lay the groundwork for understanding the key concepts and strategies in HR management.",
    highlight2: "Organizational Behavior and Leadership: We recognize the importance of understanding human behavior and effective leadership in managing human resources. Students learn about organizational behavior, motivation, team dynamics, leadership styles, and change management. They develop skills in fostering a positive work culture, managing diversity, and leading teams to achieve organizational goals.",
    highlight3: "Labor Relations and Employment Law: Our program covers labor relations, collective bargaining, and employment laws and regulations. Students gain an understanding of labor relations strategies, dispute resolution, and legal compliance in the workplace. They develop skills in effectively managing employee relations and maintaining positive labor-management relationships.",
    conclusion: "If you are passionate about HR management, performance management, labor relations, and strategic HR planning, ESTAM University's Bachelor of Science in Human Resources Management program is the perfect choice."
  })
})



/////////////////////////////////////////////////////////////////////////////


//Computer Science Course Details Page route
app.get('/computer-science', (req, res) => {
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


// Environmental Science Course Details Page route
app.get('/environmental-science', (req, res) => {
  res.render('course-details', {
    title: " Environmental Science",
    name: " Environmental Science",
    description1: "The Bachelor of Science in Environmental Science program at ESTAM University offers a comprehensive curriculum that covers various aspects of environmental science, including ecology, environmental policy, conservation, natural resource management, environmental impact assessment, and sustainability. Our program equips students with the knowledge, skills, and practical experience to address complex environmental challenges.",
    description2: "A Bachelor of Science in Environmental Science from ESTAM University opens up diverse career opportunities in environmental consulting firms, government agencies, research institutions, non-profit organizations, and more. Graduates may pursue roles such as environmental scientists, environmental consultants, sustainability coordinators, conservation officers, or pursue further education in environmental science, environmental policy, or related fields.",
    highlight1: "Core Environmental Science Courses: Our program begins with core courses that provide students with a solid foundation in environmental science principles. Students learn about ecosystem dynamics, environmental chemistry, environmental monitoring, biodiversity, and environmental data analysis. These courses lay the groundwork for understanding the fundamental concepts and methodologies in environmental science.",
    highlight2: "Environmental Policy and Governance: We focus on the legal and policy frameworks that shape environmental management. Students learn about environmental regulations, international environmental agreements, environmental economics, and sustainable development. They gain insights into the complexities of environmental policy-making and develop skills in environmental governance.",
    highlight3: "Fieldwork and Research: ESTAM University values hands-on experience and research engagement. Students have opportunities to participate in fieldwork activities, data collection, and research projects. They gain practical skills in conducting environmental assessments, analyzing data, and communicating scientific findings. These experiences foster critical thinking, problem-solving, and enhance students' understanding of real-world environmental challenges.",
    conclusion: "If you have a passion for the environment, sustainability, and making a positive impact, ESTAM University's Bachelor of Science in Environmental Science program is the ideal choice."
  })
})


//Mangement Information Technology Course Details Page route
app.get('/mangement-information-technology', (req, res) => {
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


///////////////////////////////////////////////////////////////////////////////

//Computer Engineering Course Details Page route
app.get('/computer-engineering', (req, res) => {
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



///////// Postgraduate courses /////////



// Master's in Computer Networks and Security Course Details Page route
app.get('/msc-computer-networks-and-security', (req, res) => {
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

// Msc. Human Resource Management Course Details Page route
app.get('/msc-human-resource-management', (req, res) => {
  res.render('course-details', {
    title: "MSc. Human Resource Management",
    name: "MSc. Human Resource Management",
    description1: "The Master's in Human Resource Management program at ESTAM University provides students with comprehensive knowledge and practical skills in various areas of human resource management, including talent acquisition, employee development, performance management, compensation and benefits, and organizational effectiveness. The program is designed to prepare students to become strategic HR leaders who can effectively contribute to the success of organizations.",
    description2: "A Master's in Human Resource Management from ESTAM University opens up diverse career opportunities in various sectors, including corporate organizations, consulting firms, nonprofit organizations, government agencies, and more. Graduates may pursue roles such as HR manager, talent acquisition specialist, training and development manager, compensation and benefits analyst, or pursue leadership positions in HR departments.",
    highlight1: "Strategic Human Resource Management: Our program focuses on the strategic aspects of human resource management. Students learn how to align HR practices with organizational goals, develop workforce planning strategies, design effective talent management programs, and implement change management initiatives. They gain the skills to create a high-performance work culture and enhance organizational effectiveness.",
    highlight2: "Talent Acquisition and Employee Development: We emphasize the importance of attracting and developing top talent. Students learn about effective recruitment and selection processes, talent assessment methods, employee onboarding strategies, and performance appraisal systems. They gain practical skills in designing and implementing employee development programs, fostering employee engagement, and promoting career growth.",
    highlight3: "Compensation and Benefits Management: We cover the principles and practices of compensation and benefits management. Students learn about job analysis, salary structures, incentive systems, and employee benefits programs. They gain knowledge of legal and ethical considerations in compensation management and develop skills in designing competitive compensation packages that attract, retain, and motivate employees.",
    conclusion: "If you have a passion for people management, organizational development, and strategic HR practices, ESTAM University's Master's in Human Resource Management program is the ideal choice."
  })
})


// Msc Economics Course Details Page route
app.get('/msc-economics', (req, res) => {
  res.render('course-details', {
    title: "MSc Economics",
    name: "MSc Economics",
    description1: "The Master's in Economics program at ESTAM University provides students with a strong foundation in economic theory, quantitative methods, and applied economics. The program is designed to develop students' analytical and critical thinking abilities, equipping them with the tools and knowledge needed to tackle complex economic issues and contribute to the development of sound economic policies.",
    description2: "A Master's in Economics from ESTAM University opens up diverse career opportunities in various sectors, including government agencies, research institutions, international organizations, financial institutions, consulting firms, and more. Graduates may pursue roles such as economists, policy analysts, research analysts, data analysts, or pursue further research or doctoral studies in economics.",
    highlight1: "Economic Theory and Analysis: Our program focuses on economic theory and analysis, providing students with a deep understanding of microeconomics, macroeconomics, and econometrics. Students learn advanced economic models, theories of market behavior, and tools for economic analysis. They gain the ability to analyze economic phenomena, evaluate policy implications, and make informed decisions based on economic principles.",
    highlight2: "Quantitative Methods: We emphasize the importance of quantitative methods in economic analysis. Students learn statistical techniques, econometric modeling, and data analysis methods. They gain skills in using statistical software and working with economic data to conduct empirical research and analyze economic trends. These skills enable students to evaluate economic policies, forecast economic outcomes, and contribute to evidence-based decision-making.",
    highlight3: "Applied Economics and Policy Analysis: We explore the application of economic principles to real-world issues and policy analysis. Students learn about topics such as public finance, labor economics, international trade, development economics, and environmental economics. They gain the ability to analyze policy alternatives, assess their economic impact, and provide evidence-based recommendations to address societal challenges.",
    conclusion: "If you have a passion for economic analysis, policy evaluation, and understanding the forces that shape economies, ESTAM University's Master's in Economics program is the ideal choice."
  })
})

// Msc. Communication and Media Studies Course Details Page route
app.get('/msc-communication-and-media-studies', (req, res) => {
  res.render('course-details', {
    title: "MSc. Communication and Media Studies",
    name: "MSc. Communication and Media Studies",
    description1: "The Master's in Communication and Media Studies program at ESTAM University provides students with a comprehensive understanding of communication theories, media technologies, media industries, and the societal impact of media. The program is designed to develop students' critical thinking, research, and practical skills, equipping them to navigate the complex and ever-changing media landscape.",
    description2: "A Master's in Communication and Media Studies from ESTAM University opens up diverse career opportunities in various sectors, including media organizations, advertising agencies, public relations firms, digital media companies, nonprofit organizations, and more. Graduates may pursue roles such as communication specialists, media analysts, public relations managers, content strategists, or pursue further research or doctoral studies in communication and media studies.",
    highlight1: "Communication Theories and Analysis: Our program explores the foundations of communication theories and their application to various media contexts. Students learn about theories of mass communication, interpersonal communication, persuasion, media effects, and cultural studies. They gain the ability to analyze media messages, interpret communication phenomena, and critically evaluate media content.",
    highlight2: "Media Technologies and Digital Media: We delve into the study of media technologies and their impact on communication practices. Students learn about digital media platforms, social media, online journalism, multimedia production, and media convergence. They gain practical skills in utilizing digital tools, producing digital content, and understanding the ethical and legal considerations of digital media.",
    highlight3: "Media Industries and Audience Analysis: We examine the structure and dynamics of media industries, including broadcasting, print media, advertising, and online media. Students explore media economics, media policy, media ownership, and media regulation. They learn audience analysis techniques, market research methodologies, and media planning strategies. They gain insights into the challenges and opportunities faced by media organizations and develop the skills to effectively engage and understand diverse audiences.",
    conclusion: "If you have a passion for understanding the role of communication and media in society, analyzing media messages, and exploring the power of digital media technologies, ESTAM University's Master's in Communication and Media Studies program is the ideal choice."
  })
})


// Msc. Diplomacy and International Affairs Course Details Page route
app.get('/msc-diplomacy-and-international-affairs', (req, res) => {
  res.render('course-details', {
    title: "MSc. Diplomacy and International Affairs",
    name: "MSc. Diplomacy and International Affairs",
    description1: "The Master's in Diplomacy and International Affairs program at ESTAM University provides students with a comprehensive understanding of the theories, practices, and challenges of international relations. The program is designed to develop students' analytical, diplomatic, and negotiation skills, preparing them for careers in diplomacy, international organizations, government agencies, and non-governmental organizations.",
    description2: "A Master's in Diplomacy and International Affairs from ESTAM University opens up diverse career opportunities in various sectors, including diplomatic services, international organizations, government agencies, non-profit organizations, think tanks, and consulting firms. Graduates may pursue roles such as diplomats, policy analysts, international consultants, foreign affairs officers, or pursue further research or doctoral studies in international relations.",
    highlight1: "International Relations Theory: Our program explores the major theories and frameworks in international relations, including realism, liberalism, constructivism, and critical theories. Students gain a deep understanding of the dynamics of the international system, global governance, and the role of diplomacy in shaping international outcomes.",
    highlight2: "Diplomatic Practice and Negotiation: We focus on the practical aspects of diplomacy and negotiation. Students learn about diplomatic protocols, international law, negotiation strategies, conflict resolution, and crisis management. They gain practical skills in diplomatic communication, negotiation techniques, and multilateral diplomacy.",
    highlight3: "Global Issues and Policy Analysis: We delve into the analysis of global issues and the formulation of effective policy responses. Students examine key global challenges such as international security, human rights, economic development, environmental sustainability, and humanitarian interventions. They gain the ability to critically analyze complex global issues, evaluate policy options, and develop diplomatic strategies to address them.",
    conclusion: "If you have a passion for global affairs, diplomacy, and working towards peaceful resolutions in international conflicts, ESTAM University's Master's in Diplomacy and International Affairs program is the ideal choice."
  })
})


// Msc. Accounting and Auditing Course Details Page route
app.get('/msc-accounting-and-auditing', (req, res) => {
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


// Msc. Public and Local Government Administration Course Details Page route
app.get('/msc-public-and-local-government-administration', (req, res) => {
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


// Master of Business Administration (MBA) Course Details Page route
app.get('/mba', (req, res) => {
  res.render('course-details', {
    title: "Master of Business Administration (MBA)",
    name: "Master of Business Administration (MBA)",
    description1: "The Master of Business Administration (MBA) program at ESTAM University provides students with a comprehensive understanding of business management principles, strategic thinking, and leadership skills. The program is designed to develop students' analytical, critical thinking, and decision-making abilities, preparing them for leadership roles in diverse industries and organizational settings.",
    description2: "An MBA from ESTAM University opens up diverse career opportunities in various sectors, including corporate management, consulting firms, entrepreneurship, finance, marketing, operations, and more. Graduates may pursue roles such as business managers, consultants, project leaders, marketing directors, or pursue entrepreneurial ventures. The versatile skill set gained through the program equips graduates to adapt to changing business landscapes and excel in leadership positions.",
    highlight1: "Strategic Management: Our program focuses on strategic management concepts and frameworks. Students learn to analyze industry dynamics, assess competitive landscapes, and develop effective strategies for organizational growth and sustainability. They gain insights into strategic decision-making, innovation management, and strategic leadership.",
    highlight2: "Leadership and Entrepreneurship: We emphasize the importance of effective leadership in driving organizational success and fostering innovation. Students develop leadership skills, explore different leadership styles, and learn how to inspire and motivate teams. They also gain an entrepreneurial mindset, understanding the process of opportunity recognition, venture creation, and managing business growth.",
    highlight3: "Business Analytics and Decision-Making: We delve into the realm of business analytics, equipping students with the skills to analyze and interpret data for informed decision-making. Students learn about statistical analysis, data visualization, and predictive modeling. They develop the ability to apply data-driven insights to solve complex business problems and enhance organizational performance.",
    conclusion: "If you have a passion for business, leadership, and innovation, ESTAM University's MBA program is the ideal choice."
  })
})


//Marketing Course Details Page route

// Faculties Page route
// app.get('/faculties', (req, res) => {
//   res.render('faculties', {
//     title: "Faculties", 
//     name: "Faculties"
//   })
// })

// Faculty of social and management science
app.get('/faculty-of-social-and-management-science', (req, res) => {
  res.render('faculty-of-social-and-management-science', {
    title: "Faculty of Social and Management Science",
    name: "Faculty of Social and Management Science"
  })
})

// Faculty of applied science
app.get('/faculty-of-applied-science', (req, res) => {
  res.render('faculty-of-applied-science', {
    title: "Faculty of Applied Science",
    name: "Faculty of Applied Science"
  })
})

// Faculty of engineering
app.get('/faculty-of-engineering', (req, res) => {
  res.render('faculty-of-engineering', {
    title: "Faculty of Engineering",
    name: "Faculty of Engineering"
  })
})

// postgraduate-programs
app.get('/postgraduate-programs', (req, res) => {
  res.render('postgraduate-programs', {
    title: "Postgraduate Programs",
    name: "Postgraduate Programs"
  })
})


// Blog Page route
app.get('/blog', (req, res) => {
  res.render('blog', {
    title: "Blog",
    name: "Blog"
  })
})

// Campus Life Page route
app.get('/campus-life', (req, res) => {
  res.render('campus-life', {
    title: "Campus Life",
    name: "Campus Life"
  })
})

// Apply Page route
app.get('/apply', (req, res) => {
  res.render('apply', {
    title: "Apply",
    name: "Apply"
  })
})

// Alumni Page route
app.get('/alumni', (req, res) => {
  res.render('alumni', {
    title: "Alumni",
    name: "Alumni"
  })
});

// Excursion page route
app.get('/excursion', (req, res) => {
  res.render('excursion', {
    title: "Excursion",
    name: "Excursion"
  })
});

// Craft week page route
app.get('/craft-week', (req, res) => {
  res.render('craft-week', {
    title: "Craft Week",
    name: "Craft Week"
  })
});

// Christmas Carols page route
app.get('/christmas-carols', (req, res) => {
  res.render('christmas-carols', {
    title: "Christmas Carols",
    name: "Christmas Carols"
  })
});

// Students week page route
app.get('/students-week', (req, res) => {
  res.render('students-week', {
    title: "Students' Week",
    name: "Students' Week"
  })
});

// Football Matches page route
app.get('/football-matches', (req, res) => {
  res.render('football-matches', {
    title: "Football Matches",
    name: "Football Matches"
  })
});

// Students Fellowship page route
app.get('/students-fellowship', (req, res) => {
  res.render('students-fellowship', {
    title: "Students Fellowship",
    name: "Students Fellowship"
  })
});

// Faq Page route
app.get('/faq', (req, res) => {
  res.render('faq', {
    title: "FAQ",
    name: "FAQ"
  })
})

// Career Services page route
app.get('/career-services', (req, res) => {
  res.render('career-services', {
    title: "Career Services",
    name: "Career Services"
  })
});

// Scholarships page route
app.get('/scholarships', (req, res) => {
  res.render('scholarships', {
    title: "Scholarships",
    name: "Scholarships"
  })
});

// Research page route
app.get('/research', (req, res) => {
  res.render('research', {
    title: "Research",
    name: "Research"
  })
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

// Set your port to listen to enviroment port or 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});