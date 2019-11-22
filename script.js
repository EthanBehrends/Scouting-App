$(document).ready(function() {
  $("#position").hide();
  $("#drop").hide();
  $("div[name=hatchpickup]").click(function(){
    piecePickedUp("hatch");
  });
  $("div[name=depositrocket]").click(function(){
    pieceDeposited("rocket");
    $("div[name=time]").html(match.pieces[length].cycleTime);
  });
  $("div[name=infosubmit]").click(function(){
    match.matchNumber = $("input[name=matchnum]").val();
    match.teamNumber = $("input[name=teamnum]").val();
    $("#teaminfo").remove();
  });
  $("div[name=levelone]").click(function(){
    match.startingposition.level = 1;
    $("#position").show();
    $('#position div').removeClass('selected');
    $(this).addClass("selected");
    $("div[name=leveltwo]").removeClass("selected");
    $("div[name=middle]").show();
    match.startingposition.position ="N/A";
    match.sandstorm.level2Performance = "N/A";
  });
  $("div[name=leveltwo]").click(function(){
    match.startingposition.level = 2;
    $("#position").show();
    $('#position div').removeClass('selected');
    $(this).addClass("selected");
    $("div[name=levelone]").removeClass("selected");
    $("#drop").show();
    $("div[name=middle]").hide();
    match.startingposition.position ="N/A";
    match.sandstorm.level2Performance = "N/A";
  });
  $("#position div").click(function(){
    match.startingposition.position = $(this).attr('name')
    $('#position div').removeClass('selected');
    $(this).addClass('selected');
  });
  $("div[name=successfuldrop]").click(function(){
    match.sandstorm.level2Performance = "Success";
    $("#drop").hide();
  });
  $("div[name=faileddrop]").click(function(){
    match.sandstorm.level2Performance = "Failure";
    $("#drop").hide();
  });
});

function Piece(type, place, time)  {
  this.type = type;
  this.placement = place;
  this.cycleTime = time/1000;
}
function updateVals(){
  match.matchNumber = $("input[name=matchnum]").val();
}
function piecePickedUp(type) {
  currentCycle.type=type;
  currentCycle.timestart=Date.now();

}
function pieceDeposited(place) {
  match.pieces[match.pieces.length] = new Piece(currentCycle.type,place,(Date.now() - currentCycle.timestart));
  if(place != "drop"){
    if(currentCycle.type == "cargo"){
      match.tele.cargo += 1;
    }
    if(currentCycle.type == "hatch"){
      match.tele.hatch +=1;
    }
  }
}
var currentCycle = {
  type: "N/A",
  timestart:0
}
var match = {
matchNumber:0,
teamNumber:0,
pieces:[],
startingposition:{
  level:0,
  position:"N/A",
  preload : {
    cargoShip:"N/A",
    robot:"N/A",
  }
},
sandstorm : {
  level2Performance:"N/A",
  HablineCrossed:false
},
tele: {
  cargo:0,
  hatch:0,
},
endgame:[],
capabilities: {
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
      hatch:false,
    },
  },
  driver: {
    navigation:"N/A",
    robotSpeed:"N/A",
    accuracy:"N/A",
  },
  strategies: {
    rocket:false,
    cargoShip:false,
    defense:false,
  },
  allianceCohesiveness:"N/A"
}
}
