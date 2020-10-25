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
$targets = ['create-vacancy', 'delete-vacancy'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
switch ($target) {
  case 'create-vacancy':
    $title = methodGet('title', 'post');
    $salary = methodGet('salary', 'post');
    $description = methodGet('description', 'post');
    createVacancy($title, $salary, $description, "25.10.20");
    break;
  case 'delete-vacancy':
    $vacancyId = methodGet('vacancy_id', 'post');
    deleteVacancy($vacancyId);
    break;
}
