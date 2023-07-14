# ESTAM University Official Website

Welcome to the ESTAM University Official Website project. Here are some guidelines to follow while working on this project:

## Project Environment Setup

To configure the project environment variables, follow these steps:

1. Duplicate the `.env.example` file:

   - Make a copy of the `.env.example` file in the project root directory.
   - Rename the duplicated file to `.env`.

2. Open the `.env` file in a text editor.

3. Replace the placeholder values with the actual environment variable values:

   - `ZOHO_ADMIN_EMAIL`: Replace `your_zoho_admin_email` with the Zoho admin email address.
   - `ZOHO_CAREER_SERVICES_EMAIL`: Replace `your_zoho_career_services_email` with the Zoho career services email address.
   - `ZOHO_CONTACT_US_EMAIL`: Replace `your_zoho_contact_us_email` with the Zoho contact us email address.
   - `ZOHO_ADMIN_PASS`: Replace `your_zoho_admin_password` with the Zoho admin password.
   - `ZOHO_DEV_PORT`: Replace `your_dev_port` with the development port number.
   - `ZOHO_PROD_PORT`: Replace `your_prod_port` with the production port number.
   - `ZOHO_ADMIN_HOST`: Replace `your_zoho_admin_host` with the Zoho admin host.
   - `ZOHO_ADMISSIONS_EMAIL`: Replace `your_zoho_admissions_email` with the zoho admissions email address

   - `DB_HOST`: Replace `your_database_host` with the database hostname
   - `DB_NAME`: Replace `your_database_name` with the database name
   - `DB_USER`: Replace `your_database_username` with the database username
   - `DB_PASS`: Replace `your_database_password` with the database password

   **Note:** To generate a secure password for the Zoho admin account, follow these steps:

   - Log in to your Zoho account.
   - Go to the account settings or profile section.
   - Look for the password change option and generate a strong password.
   - Copy and use this generated password as the value for `ZOHO_ADMIN_PASS` in the `.env` file.

    4. Save the changes to the `.env` file.

    **Important Security Considerations:**

    - The `.env` file contains sensitive information such as passwords, API keys, and credentials.
    - Never commit the `.env` file to version control (e.g., GitHub). It should be listed in the `.gitignore` file to prevent accidental exposure of sensitive data.
    - Pushing the `.env` file to GitHub or any public repository could lead to security breaches, unauthorized access to resources, and potential data leaks.
    - Each team member should create their own `.env` file with their own unique values for the environment variables.

    **Zoho Account Password Generation:**

    - To generate a secure password for your Zoho account, ask your project lead for one

## Collaboration

Remember that you are not the only one working on this project. Therefore, it is important to be cautious when editing certain files. Specifically, index.js in the root directory, and all CSS and JS files. Avoid changing the names of existing variables and functions in the JavaScript files and the names of selectors in the CSS files. However, you are allowed to create new variables and functions in the JavaScript files and new selectors in the CSS files.

## Branches

Do not push buggy code to the staging3 branch. Treat the staging3 branch as if it were the main branch. If you need more freedom to work on the project without fear of breaking anything, create your own branch to work on, and only pull request to staging3 branch once you've confirmed that your changes are stable.

## Critical Changes

Critical changes such as deleting a file, folder or project must be authorized by the CEO.

## Updates

Always keep your local main branch updated with the changes on the main branch in the remote repository. Use git fetch and git pull to handle this task.

## Folder Structure

Follow the existing folder structure. For example, add images to the public/assets/images directory and add JavaScript files to the public/assets/js directory. Do not create a separate folder for any file unless that file folder hasn't been created yet.

## Design Guidelines

Follow the color code, layout, and responsive design style of the website. Here are the specific colors to use:

Primary color: #47499A
Secondary color: #EE4A62
Accent color: #f8941A
Contributing

## Rest

Do not code when you are tired. Take a break, get some rest or sleep, and come back when you are refreshed.

Please feel free to contribute to this project. You can fork the project, make changes, and submit a pull request. Please make sure that your changes are in line with the above guidelines.

## Contact

If you have any questions or concerns, don't hesitate to reach out to your team lead or project manager. Let's work together to build a great website for ESTAM University.

<code>For any registration on behalf of programmify? kindly use <b>team@programmify.org</b></code>
