<?php

require_once "./Dropbox/autoload.php";
use \Dropbox as dbx;

$appInfo = dbx\AppInfo::loadFromJsonFile("./appInfo.json");
$webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");
$dbxClient = new dbx\Client("AAn74uYygQAAAAAAAAAACiwRnRYlqLconI1wXvELeI0_r2rlpLc28Zk81ZJexMHB", "PHP-Example/1.0");

$path = $_GET['path'];
$entry = $dbxClient->getMetadataWithChildren($path);
$contents = $entry['contents'];

$contentsArray = [];

foreach($contents as $content){
    $contentPath = $content['path'];
    $contentMetadata = $dbxClient->getMetadata($contentPath);

    $uploadedAt = null;
    if(array_key_exists('client_mtime', $contentMetadata)){
        $uploadedAt = $contentMetadata['client_mtime'];
    }

    $mimeType = null;
    if(array_key_exists('mime_type', $contentMetadata)){
        $mimeType = $contentMetadata['mime_type'];
    }

    $isDir = true;
    $tempLink = null;
    if($contentMetadata['is_dir'] == false){
        $link = $dbxClient->createTemporaryDirectLink($contentPath);
        $tempLink = $link[0];
        $isDir = false;
    }

    $metadataArray = array(
    'path' => $contentMetadata['path'],
    'uploadedAt' => $uploadedAt,
    'mimeType' => $mimeType,
    'tempLink' => $tempLink,
    'isDir' => $isDir
    );

    array_push($contentsArray, $metadataArray);
}

echo json_encode($contentsArray, JSON_FORCE_OBJECT);

?>