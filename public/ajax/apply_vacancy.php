<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'apply-vacancy') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

$vacancyId = methodGet('vacancy_id', 'post');

//verifying
checkAuth();

//success
$query = "SELECT responded_users_ids FROM vacancies WHERE id = {$vacancyId};";
$respondedUsersIds = addId(mqagd($query)['responded_users_ids'], $userId);
$query = "UPDATE vacancies SET responded_users_ids = '{$respondedUsersIds}' WHERE vacancy_id = {$vacancyId};";
makeQuery($query);

$query = "SELECT user_id FROM vacancies WHERE id = {$vacancyId};";
$employerId = mqagd($query)['user_id'];

$query = "INSERT INTO notifications (sender_id, addressee_id) VALUES ({$userId}, {$employerId});";
makeQuery($query);

makeResponse(ERR_OK);
