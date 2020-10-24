<?php

function makeQuery($query)
{
  $connect = pg_connect("host=ec2-52-72-34-184.compute-1.amazonaws.com dbname=dd117cslsqr04c user=oktekwsgtjrbxf port=5432 password=d76b035892889dcb3680b040f323a236625a2698e0859c3118c73ffd319f09c9");

  $result = pg_query($connect, $query);
  pg_close($connect);
  return $result;
}

function getData($queryRes, $resType)
{
  if ($resType == 'array') {
    $result = [];
    while ($row = pg_fetch_assoc($queryRes)) {
      array_push($result, $row);
    }
    return $result;
  } elseif ($resType == 'row') {
	  return pg_fetch_assoc($queryRes);
  }
}

function mqagd($query, $resType = 'row')
{
  return getData(makeQuery($query), $resType);
}
