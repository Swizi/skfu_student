<?php

//includes
require_once('../content/notifications.php');
require_once('../content/vacancies.php');
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

function getMainContent()
{
  $userId = sessionGet('user_id');
  $query = "SELECT role FROM users WHERE id = {$userId};";
  $response['role'] = mqagd($query)['role'];

  if ($response['role'] != 'admin') {
    $response['notifications_count'] = getNotificationsCount();
    $response['vacancies'] = getVacanciesList();
  } else {
    $query = "SELECT * FROM statistics;";
    $response['statistics'] = mqagd($query);
  }

  return $response;
}

//define
$targets = ['get-main-content', 'get-vacancy', 'get-notifications'];

//input data
$target = methodGet('target', 'post');
if (!in_array($target, $targets)) {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
switch ($target) {
  case 'get-main-content':
    $response = getMainContent();
    break;
  case 'get-vacancy':
    $response = getVacancy();
    break;
  case 'get-main-content':
    $response = getNotificationsList();
    break;
}

makeResponse(ERR_OK, $response);
