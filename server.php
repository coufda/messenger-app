<?php
// Simulated server-side message handling
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $messageText = $_POST['message'];
    $message = ['text' => $messageText];
    if (!isset($_SESSION['messages'])) {
        $_SESSION['messages'] = [];
    }
    $_SESSION['messages'][] = $message;
    echo json_encode(['status' => 'success']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['messages'])) {
        echo json_encode(['messages' => $_SESSION['messages']]);
    } else {
        echo json_encode(['messages' => []]);
    }
}
