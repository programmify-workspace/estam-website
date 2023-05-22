<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $name = $_POST['Name'];
    $dob = $_POST['Date Of Birth'];
    $gender = $_POST['Gender'];
    $email = $_POST['E-mail'];
    $phone = $_POST['Phone'];
    $address = $_POST['address'];
    $nokName = $_POST['Next of Kin\'s name'];
    $nokAddress = $_POST['Next of Kin\'s Address'];
    $nokEmail = $_POST['Next of Kin\'s E-mail'];
    $nokRelationship = $_POST['Relationship with Next Of Kin'];
    $ssName = $_POST['Secondary School name'];
    $course = $_POST['Course of Study'];
    $startDate = $_POST['Intended start date'];
    $campusLocation = $_POST['Campus Location'];
    $degreeType = $_POST['Degree Type'];
    $degreeLevel = $_POST['If Bachaelor\'s Degree, what level?'];
    $activities = $_POST['Extracurricular Activities, Hobbies or Interests'];
    $introducedBy = $_POST['Who introduced you to ESTAM University, Segbeya Campus?'];

    // Check if required fields are not empty
    if (
        !empty($name) && !empty($dob) && !empty($gender) && !empty($email) && !empty($phone) && !empty($address)
        && !empty($nokName) && !empty($nokAddress) && !empty($nokEmail) && !empty($nokRelationship)
        && !empty($ssName) && !empty($course) && !empty($startDate) && !empty($campusLocation) && !empty($degreeType)
    ) {
        // Set recipient email address
        $to = 'rachaelfavour2005@gmail.com';

        // Set email subject
        $subject = 'Form Submission - ESTAM University';

        // Set email message
        $message = "Personal Information\n";
        $message .= "Name: $name\n";
        $message .= "Date of Birth: $dob\n";
        $message .= "Gender: $gender\n";
        $message .= "Email: $email\n";
        $message .= "Phone: $phone\n";
        $message .= "Address: $address\n\n";
        $message .= "Next of Kin Details\n";
        $message .= "Name: $nokName\n";
        $message .= "Address: $nokAddress\n";
        $message .= "Email: $nokEmail\n";
        $message .= "Relationship: $nokRelationship\n\n";
        $message .= "Educational Background\n";
        $message .= "Secondary School Name: $ssName\n\n";
        $message .= "Program Information\n";
        $message .= "Course of Study: $course\n";
        $message .= "Intended Start Date: $startDate\n";
        $message .= "Campus Location: $campusLocation\n";
        $message .= "Degree Type: $degreeType\n";
        $message .= "Degree Level: $degreeLevel\n\n";
        $message .= "Additional Information\n";
        $message .= "Extracurricular Activities, Hobbies or Interests: $activities\n";
        $message .= "Introduced by: $introducedBy\n";

        // Prepare headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Cc: additional-email@example.com\r\n"; // Optional: CC email
        $headers .= "Bcc: hidden-email@example.com\r\n"; // Optional: BCC email

        // Generate a boundary for the email message
        $boundary = md5(time());

        // Set headers for file attachments
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Construct the message body
        $message = "--$boundary\r\n";
        $message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
        $message .= "Content-Transfer-Encoding: 7bit\r\n";
        $message .= "\r\n" . $message . "\r\n";

        // Attach file #1
        if (isset($_FILES['doc1']) && $_FILES['doc1']['error'] === UPLOAD_ERR_OK) {
            $file1 = $_FILES['doc1']['tmp_name'];
            $filename1 = $_FILES['doc1']['name'];
            $fileContent1 = file_get_contents($file1);
            $fileContent1 = chunk_split(base64_encode($fileContent1));

            $message .= "--$boundary\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"$filename1\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$filename1\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "\r\n" . $fileContent1 . "\r\n";
        }

        // Attach file #2
        if (isset($_FILES['doc2']) && $_FILES['doc2']['error'] === UPLOAD_ERR_OK) {
            $file2 = $_FILES['doc2']['tmp_name'];
            $filename2 = $_FILES['doc2']['name'];
            $fileContent2 = file_get_contents($file2);
            $fileContent2 = chunk_split(base64_encode($fileContent2));

            $message .= "--$boundary\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"$filename2\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$filename2\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "\r\n" . $fileContent2 . "\r\n";
        }

        $message .= "--$boundary--";

        // Send the email
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(array('success' => 'Form submitted successfully.'));
        } else {
            echo json_encode(array('error' => 'Failed to submit the form. Please try again later.'));
        }
    } else {
        echo json_encode(array('error' => 'Please fill in all the required fields.'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request.'));
}
?>
