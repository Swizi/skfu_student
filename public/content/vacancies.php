<?php

function getVacanciesList($target = "all", $additional = '')
{
  switch ($target) {
    case "all":
      $query = "SELECT title, salary FROM vacancies;";
      break;
    case "search":
      $query = "SELECT * FROM vacancies WHERE title = {$additional};";
      break;
  }

  $vacancies = mqagd($query, 'array');

  return $vacancies;
}

function getVacancy($vacancyId)
{
  $query = "SELECT * FROM vacancies WHERE id = {$vacancyId};";
  $vacancy = mqagd($query);
  $respondedUsersIds = getIds($vacancy['responded_users_ids']);

  $userId = sessionGet('user_id');
  $query = "SELECT role FROM users WHERE id = {$userId};";
  $role = mqagd($query)['role'];
  if ($role == 'student') {
    $vacancy['already_responded'] = in_array($userId, $respondedUsersIds);

    $query = "SELECT telephone_number FROM resumes WHERE user_id = {$userId};";
    $vacancy['user_finished_registration'] = mqagd($query)['telephone_number'] != -1;
  } elseif ($role == 'employer') {
    $query = "SELECT vacancies_ids FROM employers WHERE user_id = {$userId};";
    $ownVacanciesIds = getIds(mqagd($query)['vacancies_ids']);
    $vacancy['own'] = in_array($vacancyId, $ownVacanciesIds);

    if ($vacancy['own']) {
      for ($i = 0; $i <= count($respondedUsersIds)-1; $i++) {
        $query = "SELECT id, first_name, last_name, additional_name FROM users WHERE id = {$respondedUsersIds[$i]};";
        $respondedUsers[$i] = mqagd($query);
      }
      $vacancy['responded_users'] = $respondedUsers;
    }
  }

  return $vacancy;
}
