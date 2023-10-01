<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $messageText = $_POST['message'];
    $file = fopen("messages.txt", "a");
    if ($file) {
        fwrite($file, $messageText . PHP_EOL);
        fclose($file);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}
?>

