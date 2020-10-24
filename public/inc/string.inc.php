<?php

function stringGenerate($length)
{
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890";
  $string = '';

	for ($i = 1; $i <= $length; $i++) {
		$string .= $chars[rand(0, strlen($chars)-1)];
	}

	return $string;
}

function getCode($segCount = 3)
{
  $code = '?';

  for ($i = 1; $i <= $segCount; $i++) {
    $code .= stringGenerate(5);
    if ($i < $segCount) {
      $code .= '-';
    }
  }

  return $code;
}

function getIds($string)
{
	$id = '';
	$ids = [];

	for ($i = 0; $i <= strlen($string)-1; $i++) {
		if ($string[$i] != ',') {
			$id .= $string[$i];
		} else {
			$ids[] = intval($id);
			$id = '';
		}
	}

	return $ids;
}

function addId($string, $id)
{
	$string .= $id . ',';
	// $string .= ',';

	return $string;
}
