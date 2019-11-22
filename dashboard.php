<?php
// Initialize the session
session_start();
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
else {

  require_once "signup/config.php";
  $update = "SELECT balance, matchesScouted FROM users WHERE username = \"" . $_SESSION["username"] . "\"";

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
  $queryBiggestBalance = "SELECT name, balance FROM users ORDER BY balance DESC LIMIT 1";
  if($stmt = mysqli_prepare($link, $queryBiggestBalance)) {
    if(mysqli_stmt_execute($stmt)) {
      mysqli_stmt_store_result($stmt);
      mysqli_stmt_bind_result($stmt, $shekelName, $shekelTop);
      if(mysqli_stmt_fetch($stmt)) {
        $_SESSION["topshekel"] = $shekelTop;
        $_SESSION["shekname"] = $shekelName;
      }
    }
  }
  $queryMostMatches = "SELECT name, matchesScouted FROM users ORDER BY matchesScouted DESC LIMIT 1";
  if($stmt = mysqli_prepare($link, $queryMostMatches)) {
    if(mysqli_stmt_execute($stmt)) {
      mysqli_stmt_store_result($stmt);
      mysqli_stmt_bind_result($stmt, $matchName, $matchTop);
      if(mysqli_stmt_fetch($stmt)) {
        $_SESSION["topmatch"] = $matchTop;
        $_SESSION["matchname"] = $matchName;
      }
    }
  }
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <title>Team 1710 Scouting Dashboard</title>
    <link rel="stylesheet" type="text/css" href="stylesheet.css" />
  </head>
  <body>
    <div id="wrapper">
      <div id="teaminfo">
        <img src="assets/logo.png" />
        </br>
        </br>
        <p>TEAM 1710 SCOUTING APP | DEEP SPACE</p>
        </br>
      <h1>Wisconsin Regional 2019</h1>
      <p>Hello, <?php echo $_SESSION["name"] ?>. </p>
      <div class="half big">
        Shekels: <?php echo $_SESSION["balance"] ?>
      </div>
      <div class="half big">
        Matches: <?php echo $_SESSION["matchesScouted"] ?>
      </div>
      <a href="scout.php" ><div class="button">Scout a Match</div></a>
      <div class="spacer"></div>
      <div class="spacer"></div>
    </div>
    <div id="footer"><p>Leaderboard:</p><p><?php echo $_SESSION["shekname"] . ": " . $_SESSION["topshekel"] . " Shekels </p><p> ". $_SESSION["matchname"] .": " . $_SESSION["topmatch"] . " matches scouted" ?></p> </div>
  </body>
</html>
