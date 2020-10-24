<?php

//includes
require_once('../inc/common.inc.php');

//headers
header("Access-Control-Allow-Origin: *");

//input data
$target = methodGet('target', 'post');
if ($target != 'set-user') {
	makeResponse(ERR_REQUEST_GOAL_IS_NOT_CORRECT);
}

//verifying
checkAuth();

//success
$userId = sessionGet('user_id');
$query = "SELECT role FROM users WHERE id = {$userId};";
$role = mqagd($query)['role'];
if ($role == 'student') {
  $tel = methodGet('telephone_number', 'post');
  $birthday = methodGet('birthday', 'post');
  $country = methodGet('country', 'post');
  $address = methodGet('address', 'post');
  $education = methodGet('education', 'post');
  $workExperience = methodGet('work_experience', 'post');
  $additionalSkills = methodGet('additional_skills', 'post');
  $personalQualities = methodGet('personal_qualities', 'post');
  $achievements = methodGet('achievements', 'post');
  $query = "UPDATE resumes SET telephone_number = {$telephone_number}, birthday = '{$birthday}', country = '{$country}', address = '{$address}', education = '{$education}', work_experience = '{$work_experience}', additional_skills = '{$additional_skills}', personal_qualities = '{$personal_qualities}', achievements = '{$achievements}' WHERE user_id = {$userId};";
  makeQuery($query);
} elseif ($role == 'employer') {
	$company = methodGet('company', 'post');
  $query = "UPDATE employers SET company = '{$company}';";
  makeQuery($query);
}

makeResponse(ERR_OK);
