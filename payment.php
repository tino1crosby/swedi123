<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $adName = $_POST['adName'];
    $paymentStatus = processPayment($adName);

    if ($paymentStatus) {
        echo json_encode(['status' => 'success', 'message' => 'Payment successful!']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Payment failed.']);
    }
}

function processPayment($adName) {
    // Simulate payment processing logic
    return rand(0, 1) === 1; // Randomly return success or failure
}
?>
