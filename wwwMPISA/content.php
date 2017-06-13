<?php

$requestPath = $_GET['path'] . '/';
$response = [];

$directoryItems = scandir($requestPath);
foreach($directoryItems as $dirItem){
    if($dirItem == '.'
        || $dirItem == '..'){
        continue;
    }

    $isDir = is_dir($requestPath . $dirItem);
    $path = $requestPath . $dirItem;

    $dirItemData = array(
        'path' => $path,
        'tempLink' => 'http://mpisa.hardcore.lt/' . $path,
        'isDir' => $isDir
    );

    array_push($response, $dirItemData);
}

echo json_encode($response, JSON_FORCE_OBJECT);

?>

