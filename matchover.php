<?php
if(isset($_POST['data'])){
  $data = $_POST['data'];
};
if(isset($_POST['teamnumber'])){
  $teamNumber = $_POST['teamnumber'];
};
if(isset($_POST['balance'])){
  $balance = $_POST['balance'];
};
if(isset($_POST['newBal'])){
  $newBalance = $_POST['newBal'];
};
$dataFile = fopen("data/data.csv", "a+") or die("Data unable to open file!");
fwrite($dataFile, $data);
fclose($dataFile);
mkdir("data" . "/" . $teamNumber);
$teamFile = fopen("data" . "/" . $teamNumber . "/data.csv", "a+") or die("Team unable to open file!");
fwrite($teamFile, $data);
fclose($teamFile);
session_start();
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
else {

  require_once "signup/config.php";
  $update = "UPDATE users SET balance=" . $newBalance . ", matchesScouted= " . ($_SESSION["matchesScouted"] + 1) . " WHERE username = \"" . $_SESSION["username"] . "\"";
  if($stmt = mysqli_prepare($link, $update)){
      if(mysqli_stmt_execute($stmt)){
          mysqli_stmt_store_result($stmt);
          mysqli_stmt_bind_result($stmt, $balance, $matchesScouted);
            if(mysqli_stmt_fetch($stmt)){
              session_start();
              $_SESSION["balance"] = $balance;
              $_SESSION["matchesScouted"] = $matchesScouted;
              }
            }
          }
}
 ?>
 <!DOCTYPE html>
 <html lang="en" dir="ltr">
   <head>
     <meta charset="utf-8">
     <title>Match Over</title>
     <link rel="stylesheet" type="text/css" href="stylesheet.css" />
     <?php echo ("<script>var origBalance = " . $balance . ";var newBalance = " . $newBalance . ";</script>");?>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
     <script>
      $(document).ready(function() {
        var iterator = origBalance;
        var counter = (newBalance - origBalance) / 100;
        $("#bal").html(origBalance);
        setTimeout(function () {
          var int = setInterval(function() {
            iterator += counter;
            $("#bal").html(iterator);
            if(iterator >= newBalance) {
              $("#bal").html(newBalance);
              clearInterval(int);
            }
          },10);
        },1000);
      });
     </script>
   </head>
   <body>
     <div id="wrapper">
       <div id="matchover">
         <h1>Balance</h1>
         <h1 id="bal"></h1>
       </div>
       <a href="dashboard.php" ><div class="button">Dashboard</div></a>
     </div>
   </body>
 </html>
