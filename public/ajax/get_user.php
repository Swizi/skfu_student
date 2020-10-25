<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

function getStudent($userId)
{
  $response['role'] = 'student';

	$query = "SELECT * FROM resumes WHERE user_id = {$userId};";
	$data = mqagd($query);

	if ($data['telephone_number'] == -1) {
		$response['resume'] = '';
	} else {
		$response['resume'] = [
		  'ability_to_request_privileges' => $data['ability_to_request_privileges'],
      'telephone_number' => $data['telephone_number'],
      'birthday' => $data['birthday'],
      'country' => $data['country'],
      'address' => $data['address'],
      'education' => $data['education'],
      'work_experience' => $data['work_experience'],
      'additional_skills' => $data['additional_skills'],
      'personal_qualities' => $data['personal_qualities'],
      'achievements' => $data['achievements']
	  ];
	}

	makeResponse(ERR_OK, $response);
}

function getEmployer($userId)
{
  $response['role'] = 'employer';

	$query = "SELECT * FROM employers WHERE user_id = {$userId};";
	$data = mqagd($query);

	if ($data['company'] == '') {
		$response['information'] = '';
	} else {
		$vacancies = [];
		$vacanciesIds = getIds($data['vacancies_ids']);
		for ($i = 0; $i <= count($vacanciesIds)-1; $i++) {
      $query = "SELECT title FROM vacancies WHERE id = {$vacanciesIds[$i]};";
			$vacancies[] = [
				'id' => $vacanciesIds[$i],
				'title' => mqagd($query)['title']
			];
		}
		$response['information'] = [
		  'company' => $data['company'],
      'vacancies' => $vacancies
	  ];
	}

	makeResponse(ERR_OK, $response);
}

//input data
$target = methodGet('target', 'post');
if ($target != 'get-user') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
$userId = sessionGet('user_id');
$query = "SELECT role FROM users WHERE id = {$userId};";
$role = mqagd($query)['role'];
if ($role == 'student') {
	getStudent($userId);
} elseif ($role == 'employer') {
	getEmployer($userId);
}
