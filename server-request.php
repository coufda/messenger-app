<?php
$messages = [];

$file = fopen("messages.txt", "r");
if ($file) {
    while (($line = fgets($file)) !== false) {
        $messages[] = ['text' => trim($line)];
    }
    fclose($file);
}

echo json_encode(['messages' => $messages]);
?>