<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'get-student') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
$userId = methodGet('student_id', 'post');
$query = "SELECT first_name, last_name, additional_name, email FROM users WHERE id = {$userId};";
$response = mqagd($query);
$query = "SELECT * FROM resumes WHERE user_id = {$userId};";
$response += mqagd($query);

makeResponse(ERR_OK, $response);
