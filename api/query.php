<?php
$pdo = require __DIR__ . '/db.php';

$stmt = $pdo->query("SELECT * FROM videos ORDER BY id DESC");
$videos = $stmt->fetchAll();

echo '<pre>';
print_r($videos);
echo '</pre>';