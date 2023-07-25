<?
//CORS 크로스 오리진 정책 Cross Origin Resourse Sharing
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

$db_server      = 'localhost';
$db_user_name   = 'navhyun2023';
$db_user_pw     = 'moon2023^^';
$db_name        = 'navhyun2023';

$conn = mysqli_connect($db_server, $db_user_name, $db_user_pw , $db_name);
mysqli_set_charset($conn, "utf8");


$name = $_POST['name']; // 문자열
$email = $_POST['email']; // 문자열
$guests = $_POST['guests']; //숫자
$event = $_POST['event']; // 문자열


$sql = "INSERT INTO wedding_table(이름, 이메일, 게스트, 이벤트) 
        VALUES ('$name', '$email', '$guests', '$event')";
mysqli_query($conn, $sql); // 저장 실행
?>