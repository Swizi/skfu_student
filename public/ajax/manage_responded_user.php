<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

function deleteVacancy($vacancyId)
{
  $userId = sessionGet('user_id');

  $query = "DELETE FROM vacancies WHERE id = {$vacancyId};";
  makeQuery($query);

  $query = "SELECT vacancies_ids FROM employers WHERE user_id = {$userId};";
  $vacanciesIds = str_replace("{$vacancyId},", '', mqagd($query)['vacancies_ids']);

  $query = "UPDATE employers SET vacancies_ids = '{$vacanciesIds}' WHERE user_id = {$userId};";
  makeQuery($query);

	makeResponse(ERR_OK);
}

function createVacancy($title, $salary, $description, $publicationDate)
{
  $userId = sessionGet('user_id');

	$query = "INSERT INTO vacancies (user_id, title, salary, description, publication_date) VALUES ({$userId}, '{$title}', {$salary}, '{$description}', '{$publicationDate}');";
	makeQuery($query);

  $query = "SELECT max(id) FROM vacancies WHERE user_id = {$userId};";
  $vacancyId = mqagd($query)['max'];

  $query = "SELECT vacancies_ids FROM employers WHERE user_id = {$userId};";
  $vacanciesIds = addId(mqagd($query)['vacancies_ids'], $vacancyId);

  $query = "UPDATE employers SET vacancies_ids = '{$vacanciesIds}' WHERE user_id = {$userId};";
  makeQuery($query);

	makeResponse(ERR_OK);
}

//define
$targets = ['accept-user', 'remove-user'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

$vacancyId = methodGet('vacancy_id', 'post');
$userId = methodGet('user_id', 'post');

//verifying
checkAuth();

//success
$query = "SELECT responded_users_ids FROM vacancies WHERE id = {$vacancyId};";
$respondedUsersIds = str_replace("{$userId},", '', mqagd($query)['responded_users_ids']);

$query = "UPDATE vacancies SET responded_users_ids = '{$respondedUsersIds}' WHERE id = {$vacancyId};";
makeQuery($query);

if ($target == 'accept-user') {
  $employerId = sessionGet('user_id');
  $query = "INSERT INTO notifications (sender_id, addressee_id) VALUES ({$employerId}, {$userId});";
  makeQuery($query);
}

makeResponse(ERR_OK);
