<?php

$host = 'localhost';
$db   = 'walkthroughsql1';
$user = 'walkthroughsql1';
$pass = 'uixAfbkjPp.2';
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    return new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, $options);
} catch (PDOException $e) {
    error_log($e->getMessage());
    die("Datenbankfehler: Verbindung fehlgeschlagen.");
}
