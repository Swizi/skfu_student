<?php

function getNotificationsCount()
{
  $userId = sessionGet('user_id');

  $query = "SELECT count(id) FROM notifications WHERE addressee_id = {$userId} AND viewed = false;";
  $count = mqagd($query)['count'];

  return $count;
}

function getNotificationsList()
{
  $userId = sessionGet('user_id');

  $query = "SELECT sender_id, viewed FROM notifications WHERE addressee_id = {$userId};";
  $notifications = mqagd($query, 'array');
  for ($i = 0; $i <= count($notifications)-1; $i++) {
    $query = "SELECT first_name FROM users WHERE id = {$notifications[$i]['sender_id']};";
    $notifications[$id]['sender_name'] = mqagd($query)['first_name'];
  }

  $query = "SELECT role FROM users WHERE id = {$userId};";
  $response['role'] = mqagd($query)['role'];
  $response['notifications'] = $notifications;

  return $response;
}
