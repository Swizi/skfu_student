<?php

//includes
require_once('../content/vacancies.php');
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'searching') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

$title = methodGet('title', 'post');

//verifying
checkAuth();

//success
$vacancies = getVacanciesList("search", $title);

makeResponse(ERR_OK, $vacancies);
