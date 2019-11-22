var betAmt = 0;
var balance = 0;
var newBalance = 0;
var winpredict;
var matchphase = 0;
var inSandstorm = false;
var team = "";
var name = "";
$(document).ready(function() {
  $("#pages>div").hide();
  $("#nav").hide();
  $("#pieces").hide();
  $("#f2").hide();
  $("#f3").hide();
  $("#f4").hide();
  $("#f5").hide();
  $("#hold").hide();
  $("#topbar").hide();
  $("div[name=begin]").click(function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    $("#start").hide();
    $("#f1").hide();
    $("#f2").show();
    $("#1").show();
    betAmt = parseInt($("input[name=bet]").val());
    matchphase = 1;
    $("#topbar").show();
    match.matchNumber = $("input[name=matchnum]").val();
    match.teamNumber = $("input[name=teamnum]").val();
    $("#topbar p").html("Match: " + $("input[name=matchnum]").val() + "  Team: " +$("input[name=teamnum]").val());
  });
  $("div[name=bwin]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      winpredict = undefined;
    }
    else {
      $(this).addClass('selected');
      $("div[name=blose]").removeClass('selected');
      winpredict = true;
    }
  });
  $("div[name=blose]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      winpredict = undefined;
    }
    else {
      $(this).addClass('selected');
      $("div[name=bwin]").removeClass('selected');
      winpredict = false;
    }
  });
  $("div[name=stl1]").click(function() {
    match.start.level = 1;
    $(".stpos").removeClass("half");
    $("div[name=stl2]").removeClass('selected');
    $(this).addClass('selected');
    $(".stpos").addClass("third");
    $("div[name=mid]").show();
  });
  $("div[name=stl2]").click(function() {
    match.start.level = 2;
    $(".stpos").removeClass("third");
    $("div[name=stl1]").removeClass('selected');
    $(this).addClass('selected');
    $(".stpos").addClass("half");
    $("div[name=mid]").hide();
  });
  $("div[name=stlft]").click(function() {
    match.start.position = "left";
    $('.stpos .button').removeClass('selected');
    $(this).addClass("selected");
  });
  $("div[name=stmid]").click(function() {
    match.start.position = "middle";
    $('.stpos .button').removeClass('selected');
    $(this).addClass("selected");
  });
  $("div[name=strt]").click(function() {
    match.start.position = "right";
    $('.stpos .button').removeClass('selected');
    $(this).addClass("selected");
  });
  $("div[name=prh]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      match.start.preload.rhatch = undefined;
    }
    else {
      $('div[name=prc]').removeClass('selected');
      $('div[name=prh]').addClass('selected');
      match.start.preload.rhatch = true;
      match.start.preload.rcargo = false;
    }
  });
  $("div[name=prc]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      match.start.preload.rcargo = undefined;
    }
    else {
      $('div[name=prh]').removeClass('selected');
      $('div[name=prc]').addClass('selected');
      match.start.preload.rhatch = false;
      match.start.preload.rcargo = true;
    }
  });
  $("div[name=psh]").click(function() {
    if($(this).hasClass('selected')) {
      $('div[name=psh]').removeClass('selected');
      match.start.preload.cshatch = undefined;
    }
    else {
      $('div[name=psh]').addClass('selected');
      match.start.preload.cshatch = true;
    }
  });
  $("div[name=psc]").click(function() {
    if($(this).hasClass('selected')) {
      $('div[name=psc]').removeClass('selected');
      match.start.preload.cscargo = undefined;
    }
    else {
      $('div[name=psc]').addClass('selected');
      match.start.preload.cscargo = true;
    }
  });
  $("div[name=hcy]").click(function () {
    match.start.hab = true;
    $("#cross").hide();
  });
  $("div[name=hcn]").click(function () {
    match.start.hab = false;
    $("#cross").hide();
  });
  $("#sandbutton").click(function() {
    $("#12").hide();
    matchphase += 1;
    if(matchphase == 2) {
      inSandstorm = true;
      $("#sandbutton").html("Sandstorm End");
      $("#1").hide();
      $("#cross").show();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#pieces").show();
      if(match.start.preload.rhatch) {
        piecePickedUp("hatch");
        $("#empty").hide();
        $("#hold").show();
      }
      if(match.start.preload.rcargo) {
        piecePickedUp("hatch");
        $("#empty").hide();
        $("#hold").show();
      }
    }
    if(matchphase == 3) {
      inSandstorm = false;
      $("#f2").hide();
      $("#cross").hide();
      $("#f3").show();
    }
  });
  $("#empty").click(function () {
    $(this).hide();
    $("#hold").show();
  });
  $("#hold").click(function () {
    $(this).hide();
    $("#empty").show();
  });

  $("div[name=mw]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      match.won = undefined;
    }
    else {
      $(this).addClass('selected');
      $("div[name=ml]").removeClass('selected');
      match.won = true;
    }
  });
  $("div[name=ml]").click(function() {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      match.won = undefined;
    }
    else {
      $(this).addClass('selected');
      $("div[name=mw]").removeClass('selected');
      match.won = false;
    }
  });
  $("div[name=endlevelone] .button").click(function() {
    $("div[name=endlevelone] .button").removeClass('selected');
    $(this).addClass('selected');
    match.endgame[0] = $(this).attr('name');
  });
  $("div[name=endleveltwo] .button").click(function() {
    $("div[name=endleveltwo] .button").removeClass('selected');
    $(this).addClass('selected');
    match.endgame[1] = $(this).attr('name');
  });
  $("div[name=endlevelthree] .button").click(function() {
    $("div[name=endlevelthree] .button").removeClass('selected');
    $(this).addClass('selected');
    match.endgame[2] = $(this).attr('name');
  });
  $("div[name=chc]").click(function() {
    if($(this).hasClass("selected")) {
      match.canHold.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.canHold.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=chh]").click(function() {
    if($(this).hasClass("selected")) {
      match.canHold.hatch = false;
      $(this).removeClass('selected');
    }
    else {
      match.canHold.hatch = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=gic]").click(function() {
    if($(this).hasClass("selected")) {
      match.groundIntake.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.groundIntake.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=gih]").click(function() {
    if($(this).hasClass("selected")) {
      match.groundIntake.hatch = false;
      $(this).removeClass('selected');
    }
    else {
      match.groundIntake.hatch = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs1c]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket1.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket1.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs1h]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket1.hatch = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket1.hatch = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs2c]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket2.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket2.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs2h]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket2.hatch = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket2.hatch = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs3c]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket3.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket3.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=cs3h]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.rocket3.hatch = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.rocket3.hatch = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=css]").click(function() {
    if($(this).hasClass("selected")) {
      match.placementAbility.cargoShip.cargo = false;
      $(this).removeClass('selected');
    }
    else {
      match.placementAbility.cargoShip.cargo = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=sr]").click(function() {
    if($(this).hasClass("selected")) {
      match.strategies.rocket = false;
      $(this).removeClass('selected');
    }
    else {
      match.strategies.rocket = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=ss]").click(function() {
    if($(this).hasClass("selected")) {
      match.strategies.cargoShip = false;
      $(this).removeClass('selected');
    }
    else {
      match.strategies.cargoShip = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=sd]").click(function() {
    if($(this).hasClass("selected")) {
      match.strategies.defense = false;
      $(this).removeClass('selected');
    }
    else {
      match.strategies.defense = true;
      $(this).addClass('selected');
    }
  });
  $("div[name=sp]").click(function() {
    $('.str').removeClass('selected');
    $(this).addClass('selected');
    match.allianceCohesiveness = "Poor";
  });
  $("div[name=sa]").click(function() {
    $('.str').removeClass('selected');
    $(this).addClass('selected');
    match.allianceCohesiveness = "Average";
  });
  $("div[name=sst]").click(function() {
    $('.str').removeClass('selected');
    $(this).addClass('selected');
    match.allianceCohesiveness = "Stellar";
  });
  $("#f3 .button").click(function(){
    $("#f4").show();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#f3").hide();
  });
  $("#eyes").click(function() {
    $("#f4").hide();
    $("#f5").show();
    $("#2").show();
    $("#pieces").hide();
  });
  $("#eno").click(function() {
    $("#f4").hide();
    $("#f3").show();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $("div[name=cpick]").click(function() {
    piecePickedUp("cargo");
  });
  $("div[name=hpick]").click(function() {
    piecePickedUp("hatch");
  });
  $("div[name=rdep]").click(function() {
    pieceDeposited("rocket");
  });
  $("div[name=sdep]").click(function() {
    pieceDeposited("ship");
  });
  $("div[name=ddrop]").click(function() {
    pieceDeposited("drop");
  });
  $("#f5 .button").click(function() {
    match.driverskill = $("input[name=nav]").val();
    match.notes = $("textarea[name=notes]").val();
    team = match.teamNumber;
    interpretData();
    bet();
    submit('matchover.php', 'POST', [
      {name:'teamnumber', value: team},
      {name:'data', value: data},
      {name: 'balance',value: balance},
      {name:'newBal',value: newBalance}
    ]);
  });
});

function Piece(type, place, time, sand)  {
  this.type = type;
  this.placement = place;
  this.cycleTime = time/1000;
  this.sand = sand;
}
function piecePickedUp(type) {
  currentCycle.type=type;
  currentCycle.timestart=Date.now();
}
function pieceDeposited(place) {
  match.pieces[match.pieces.length] = new Piece(currentCycle.type,place,(Date.now() - currentCycle.timestart),inSandstorm);

}
function bet() {
  if(betAmt > balance) {
    betAmt = balance;
  }
  if (betAmt < 0) {
    betAmt = 0;
  }
  if(match.won == winpredict) {
    newBalance = balance + (betAmt * 1.1) + 10;
  }
  else {
    newBalance = (balance - betAmt) + 10;
  }
}
function submit(action, method, values) {
    var form = $('<form/>', {
        action: action,
        method: method
    });
    $.each(values, function() {
        form.append($('<input/>', {
            type: 'hidden',
            name: this.name,
            value: this.value
        }));
    });
    form.appendTo('body').submit();
}
function interpretData() {
  var pieceRundown = "";
  var cargo = 0;
  var hatch = 0;
  match.pieces.forEach(function (piece) {
    pieceRundown += pieceToString(piece);
    if(piece.type == 'cargo' && piece.placement != 'drop') {
      cargo++;
    }
    if(piece.type == 'hatch' && piece.placement != 'drop') {
      hatch++;
    }
  });
  data = "";
  data += (match.matchNumber + ", ");
  data += (match.teamNumber + ", ");
  data += ("\"" + pieceRundown + "\"" + ", ");
  data += (match.start.level + ", ");
  data += (match.start.position + ", ");
  data += (cargo + ", " + averageCargoCycle() + ", " + (cargo * averageCargoCycle()) + ", ");
  data += (hatch + ", " + averageHatchCycle() + ", " + (hatch * averageHatchCycle()) + ", ");
  data += ((match.pieces.length) + ", " + dropPercent() + ", ");
  data += (match.start.preload.cshatch + ", ");
  data += (match.start.preload.cscargo + ", ");
  data += (match.start.preload.rhatch + ", ");
  data += (match.start.preload.rcargo + ", ");
  data += (placedSand() + ", ");
  data += (match.endgame[0] + ", ");
  data += (match.endgame[1] + ", ");
  data += (match.endgame[2] + ", ");
  data += (match.canHold.cargo + ", ");
  data += (match.canHold.hatch + ", ");
  data += (match.groundIntake.cargo + ", ");
  data += (match.groundIntake.hatch + ", ");
  data += (match.placementAbility.rocket1.hatch + ", ");
  data += (match.placementAbility.rocket1.cargo + ", ");
  data += (match.placementAbility.rocket2.hatch + ", ");
  data += (match.placementAbility.rocket2.cargo + ", ");
  data += (match.placementAbility.rocket3.hatch + ", ");
  data += (match.placementAbility.rocket3.cargo + ", ");
  data += (match.placementAbility.cargoShip.cargo + ", ");
  data += (match.driverskill + ", ");
  data += (match.strategies.rocket + ", ");
  data += (match.strategies.cargoShip + ", ");
  data += (match.strategies.defense + ", ");
  data += (match.allianceCohesiveness + ", ");
  data += (name + ", ");
  data += (match.notes + "\n");
}
function averageCargoCycle() {
  var total = 0;
  var num = 0;
  match.pieces.forEach(function (piece) {
    if(piece.type == "cargo"&& piece.placement != "drop") {
      total += piece.cycleTime;
      num++;
    }
  });
  return (total / num);
}
function averageHatchCycle() {
  var total = 0;
  var num = 0;
  match.pieces.forEach(function (piece) {
    if(piece.type == "hatch" && piece.placement != "drop") {
      total += piece.cycleTime;
      num++;
    }
  });
  return (total / num);
}
function placedSand() {
  var total = 0;
  match.pieces.forEach(function (piece) {
    if(piece.sand && piece.placement != 'drop') {
      total++;
    }
  });
  return (total);
}
function dropPercent(){
  var total = 0;
  var num = 0;
  match.pieces.forEach(function (piece) {
    total++;
    if(piece.placement == "drop") {
      num++;
    }
  });
  return (num/total);
}
function pieceToString(piece) {
  return("Piece: " + piece.type + "\n" + "Cycle: " + piece.cycleTime + "\nDeposit: " + piece.placement + "\nSandstorm: " + piece.sand + "\n");
}
var currentCycle = {
  type: "N/A",
  timestart:0
}
var data ="";
var match = {
matchNumber:0,
teamNumber:0,
pieces:[],
start:{
  level:0,
  position:"N/A",
  drop:false,
  hab:false,
  preload : {
    cshatch: false,
    cscargo: false,
    rhatch: false,
    rcargo: false
  }
},
endgame:[],
canHold: {
  cargo:false,
  hatch:false,
},
groundIntake: {
  cargo:false,
  hatch:false,
},
  placementAbility: {
    rocket1: {
      cargo:false,
      hatch:false,
    },
    rocket2: {
      cargo:false,
      hatch:false,
    },
    rocket3: {
      cargo:false,
      hatch:false,
    },
    cargoShip: {
      cargo:false,
    },
  },
  driverskill: "N/A",
  strategies: {
    rocket:false,
    cargoShip:false,
    defense:false,
  },
  allianceCohesiveness:"N/A",
  notes:"N/A",
  won: false
}
