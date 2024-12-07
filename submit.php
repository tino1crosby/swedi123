<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (empty($_POST['authorName']) || empty($_POST['authorEmail']) || empty($_FILES['submissionFile'])) {
            throw new Exception('All fields are required.');
        }

        $authorName = htmlspecialchars(trim($_POST['authorName']));
        $authorEmail = filter_var(trim($_POST['authorEmail']), FILTER_SANITIZE_EMAIL);
        $file = $_FILES['submissionFile'];

        if (!filter_var($authorEmail, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }

        $allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception('Invalid file type. Only .pdf and .docx are allowed.');
        }

        $uploadDir = 'uploads/';
        $uploadFile = $uploadDir . basename($file['name']);

        if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
            throw new Exception('File upload failed.');
        }

        echo "Submission successful! Thank you, $authorName.";
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo 'Invalid request method.';
}
?>
