<?php
// Initialize the session
session_start();
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Scouting a Match</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="script.js" type="text/javascript"></script>
    <script> balance = <?php echo $_SESSION["balance"] ?>; name = "<?php echo $_SESSION['name'] ?>"</script>
    <link rel="stylesheet" type="text/css" href="stylesheet.css" />
  </head>
  <body>
    <div id="wrapper">
      <div id="start">
        <div class="half">
          <h1>Match Number</h1>
          <input min="1" class="button" type="number" name="matchnum"></input>
        </div>
        <div class="half">
          <h1>Team Number</h1>
          <input min="1" class="button" type="number" name="teamnum"></input>
        </div>
        <h1>Bet (Balance: <?php echo $_SESSION["balance"] ?>)</h1>
        <div class="half">

          <input min="0" class="button" type="number" name="bet" value="0"></input>
        </div>
        <div class="half">
          <div class="half">
            <div class="button" name="bwin">Win</div>
          </div>
          <div class="half">
            <div class="button" name="blose">Lose</div>
          </div>
        </div>

        <div class="spacer">
        </div>
      </div>
      <div id="pages">
        <div id="1">
            <h1>Starting Position</h1>
            <div class="half">
              <div class="button" name="stl1">Lvl 1</div>
            </div>
            <div class="half">
              <div class="button" name="stl2">Lvl 2</div>
            </div>
            <div class="third stpos">
              <div class="button" name="stlft">Left</div>
            </div>
            <div class="third stpos" name="mid">
              <div class="button" name="stmid">Mid</div>
            </div>
            <div class="third stpos">
              <div class="button" name="strt">Right</div>
            </div>
            <h1>Preloads</h1>
            <div class="half">
              <p>Robot</p>
              <div class="button" name="prh">Hatch</div>
              <div class="button" name="prc">Cargo</div>
            </div>
            <div class="half">
              <p>Ship</p>
              <div class="button" name="psh">Hatch</div>
              <div class="button" name="psc">Cargo</div>
            </div>
            <div class="spacer"></div>
          </div>
          <div id="cross">
            <h1>Habline Crossed</h1>
            <div class="half">
              <div class="button " name="hcy">Yes</div>
            </div>
            <div class="half">
              <div class="button" name="hcn">No</div>
            </div>

          <div class="spacer"></div>
        </div>
        <div id="2">
          <div>
            <h1>Endgame</h1>
            <div class="third" name="endlevelone">
              <p>Lvl 1</p>
              <div class="button"name="success">
                Climb
              </div>
              <div class="button"name="failure">
                Fail
              </div>
              <div class="button"name="noattempt">
                DNA
              </div>
            </div>
            <div class="third" name="endleveltwo">
              <p>Lvl 2</p>
              <div class="button" name="success">
                Climb
              </div>
              <div class="button" name="failure">
                Fail
              </div>
              <div class="button" name="noattempt">
                DNA
              </div>
            </div>
            <div class="third" name="endlevelthree">
              <p>Lvl 3</p>
              <div class="button"name="success">
                Climb
              </div>
              <div class="button"name="failure">
                Fail
              </div>
              <div class="button"name="noattempt">
                DNA
              </div>
            </div>
          </div>
          <div>
            <h1>Match Results</h1>
            <div class="half">
              <div class="button" name="mw">Won</div>
            </div>
              <div class="half">
                <div class="button" name="ml">Lost</div>
              </div>
          </div>
          <div>
            <h1>Can Hold</h1>
            <div class="half">
              <div class="button" name="chh">Hatch</div>
            </div>
            <div class="half">
              <div class="button" name="chc">Cargo</div>
            </div>
          </div>
          <div>
            <h1>Ground Intake</h1>
            <div class="half">
              <div class="button" name="gih">Hatch</div>
            </div>
            <div class="half">
              <div class="button" name="gic">Cargo</div>
            </div>
          </div>
          <div>
            <h1>Can Score</h1>
            <div class="third">
              <p>L1</p>
              <div class="button" name="cs1c">Cargo</div>
              <div class="button" name="cs1h">Hatch</div>
            </div>
            <div class="third">
              <p>L2</p>
              <div class="button" name="cs2c">Cargo</div>
              <div class="button" name="cs2h">Hatch</div>
            </div>
            <div class="third">
              <p>L3</p>
              <div class="button" name="cs3c">Cargo</div>
              <div class="button" name="cs3h">Hatch</div>
            </div>
            <div class="button" name="css">Ship Cargo</div>
            <h1>Driver Skill</h1>
            <input min="1" max="10" type="range" name="nav">
            <h1>Strategies</h1>
            <div class="third">
              <div class="button" name="sr">Rocket</div>
            </div>
            <div class="third">
              <div class="button" name="ss">Ship</div>
            </div>
            <div class="third">
              <div class="button" name="sd">Defense</div>
            </div>
            <h1>Alliance Strength</h1>
            <div class="third">
              <div class="button str" name="sp">Poor</div>
            </div>
            <div class="third">
              <div class="button str" name="sa">Average</div>
            </div>
            <div class="third">
              <div class="button str" name="sst">Stellar</div>
            </div>
            <h1>Additional Notes</h1>
            <textarea name="notes" class="button" placeholder="Notes here"></textarea>
          </div>
          <div class="spacer"></div>
        </div>

        <div id="pieces">
          <div id="empty">
            <div class="button" name="cpick">Cargo</div>
            <div class="button" name="hpick">Hatch</div>
          </div>
          <div id="hold">
            <div class="button" name="rdep">Rocket</div>
            <div class="button" name="sdep">Ship</div>
            <div class="button" name="ddrop">Drop</div>
          </div>
        </div>
      </div>
    </div>
    <div id="topbar">

      <p id="matchinfo"></p>
    </div>
    <div id="footer">
      <div id="f1">
        <div class="button" name="begin">Start Match</div>
      </div>
      <div id="f2">
        <div class="button" id="sandbutton">Sandstorm Start</div>
      </div>
      <div id="f3">
        <div class="button">End Match</div>
      </div>
      <div id="f4">
        <div class="half">
          <h1>Are you sure?</h1>
        </div>
        <div class="half">
          <div class="half">
            <div class="button" id="eyes">Yes</div>
          </div>
          <div class="half">
            <div class="button" id="eno">No</div>
          </div>
        </div>
      </div>
      <div id="f5">
        <div class="button">
          Submit
        </div>
      </div>
    </div>
  </body>
</html>
