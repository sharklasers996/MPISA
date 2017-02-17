<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>

<h1>
<?php echo "px vapsie"; ?>
</h1>

<?php

require_once "./Dropbox/autoload.php";
use \Dropbox as dbx;

try{

$appInfo = dbx\AppInfo::loadFromJsonFile("./appInfo.json");
$webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");

$dbxClient = new dbx\Client("-AhUuFSiUWwAAAAAAAAFATBKl0YJfp8KMvdZnJoIAm6v1Ad_ToqVxSofApxKLxVG", "PHP-Example/1.0");


$path = "/photo_20170216";
$entry = $dbxClient->getMetadataWithChildren($path);

$contents = $entry['contents'];

foreach($contents as $content){
    $contentPath = $content['path'];

    $contentMetadata = $dbxClient->getMetadata($contentPath);

echo "<br>";


echo "Path: ". $contentMetadata['path'];
echo "<br>";

if(array_key_exists('client_mtime', $contentMetadata)){
echo "Uploaded at: ". $contentMetadata['client_mtime'];
echo "<br>";
}

if(array_key_exists('mime_type', $contentMetadata)){
    echo "Mime: ". $contentMetadata['mime_type'];
    echo "<br>";
}

  if($contentMetadata['is_dir'] == false){
        $link = $dbxClient->createTemporaryDirectLink($contentPath);
        echo $link[0];
    }

// echo "Video info: ". $contentMetadata['video_info'];
// echo "<br>";



    // foreach($contentMetadata as $data){
    //     echo "Meta data: ". $data;
    //     echo "<br>";
    // }
echo "<br>";
    echo "<br>";
    // if($contentMetadata['is_dir'] == false){

    //     $link = $dbxClient->createTemporaryDirectLink($contentPath);
    //     echo "<img src=\"". $link[0] . "\"/><hr/>" ;        
        
    // }
}

}catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}


?>
<!--
<script>

$.ajax({
    url: 'helper.php?url=http://www.dropbox.com/sh/xswz2fnlctx2obw/AACRVJapzV1gYHIEVQ8n5n4Ka?dl=0',
    dataType: 'text',
    success:  function (data) {
        document.write(data);
    }
});

</script>-->

</body>
</html>