<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'registration') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}
$fname = methodGet('first_name', 'post');
$lname = methodGet('last_name', 'post');
$aname = methodGet('additional_name', 'post');
$login = strtolower(methodGet('login', 'post'));
$email = methodGet('email', 'post');
$role = methodGet('role', 'post');
$password = getHash(methodGet('password', 'post'));

//checking login uniqueness
$query = "SELECT id FROM users WHERE login = '{$login}';";
$data = mqagd($query);
if (!empty($data)) {
  makeResponse(ERR_LOGIN_IS_NOT_UNIQUE);
}

//success
$hash = getHash(stringGenerate(10));
$query = "INSERT INTO users (first_name, last_name, additional_name, login, email, role, password, session_hash) VALUES ('{$fname}', '{$lname}', '{$aname}', '{$login}', '{$email}', '{$role}', '{$password}', '{$hash}');";
makeQuery($query);
$query = "SELECT id FROM users WHERE login = '{$login}';";
$userId = mqagd($query)['id'];

if ($role == 'student') {
	$query = "INSERT INTO resumes (user_id) VALUES ({$userId});";
} elseif ($role == 'employer') {
	$query = "INSERT INTO employers (user_id) VALUES ({$userId});";
}
makeQuery($query);

sessionPut('user_id', $userId);
sessionPut('user_session_hash', $hash);

makeResponse(ERR_OK);
