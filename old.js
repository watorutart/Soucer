var angle = 0;
var shot_angle = -30;

// **** ミサイル用のプログラムを定義 ****
var missile = function(controller) {
  // 相手が左側にいるか判定する
  // （左90度の角度から、180度の範囲に敵が居るか判定）
  if(controller.scanEnemy(90, 180)) {
    // 左側にいる場合は、左へ回転
    controller.turnLeft();
  } else {
    // それ以外は、右へ回転
    controller.turnRight();
  }
  if(controller.altitude() < 100 && controller.scanEnemy(0, 3)){
    controller.speedDown();
  }else if(controller.altitude() < 20 && controller.scanEnemy(0, 1)){
    controller.speedDown();
  }else{
    // 今向いている方向へ、加速する
    controller.speedUp();
  }
};

var speed_Mssl = function(controller) {
  
  //controller.scanDebug(0, 5);

  if(controller.scanEnemy(90, 180)) {
    // 左側にいる場合は、左へ回転
    controller.turnLeft();
  } else {
    // それ以外は、右へ回転
    controller.turnRight();
  }
  // 今向いている方向へ、加速する
  if(controller.scanEnemy(0,5) || controller.frame() > 50){
    controller.speedUp();
  }
};

var creep_mssl = function(controller){
  // 相手が左側にいるか判定する
  // （左90度の角度から、180度の範囲に敵が居るか判定）
  if(controller.scanEnemy(90, 180)) {
    // 左側にいる場合は、左へ回転
    controller.turnLeft();
  } else {
    // それ以外は、右へ回転
    controller.turnRight();
  }
  
  if(controller.frame() % 3 !== 0){
    // 今向いている方向へ、加速する
    controller.speedUp();
    return;
  }else{
    controller.speedDown();
    return;
  }
};


// **** 本体用のプログラムを定義 ****
var bot = function(controller) {
  var random = Math.floor( Math.random() * 3 );
  controller.scanDebug(angle, 60);
  
  if(controller.scanEnemy(0, 180)){
    controller.ahead();
  } else {
    controller.back();
  }

  if(controller.altitude() < 200){
    controller.ascent();
    return;
  }

  if(controller.frame() < 30 || controller.scanEnemy(0, 360, 170)){
    controller.ascent();
    //return;
  }
  
  if(controller.temperature() < 80){
    /*
    if(controller.scanAttack(angle, 60) || shot_angle != - 30){
      controller.fireLaser(angle + shot_angle, 1);
      shot_angle += 7;
      if(shot_angle > 35)shot_angle = -30;
      //return;
    } else {
      if(angle == 180)angle = 0;
      else angle = -180;
    }
    */
    if(controller.missileAmmo() !== 0){
      if(controller.frame() < 20){
        if(controller.missileAmmo() > 10)
          controller.fireMissile(speed_Mssl);
      }
      if(controller.frame() > 25 && controller.frame() % 4 === 0){
        //random = Math.floor(Math.random() * 11);
        //controller.turn();
        //if(controller.altitude() < 250)
          controller.fireMissile(creep_mssl);
        //else  controller.fireMissile(missile);
      }
    }
    
    if(controller.scanEnemy(-90, 3)){
      //controller.fireMissile(creep_mssl);
      random = Math.floor( Math.random() * 2 );
      var random2 = Math.floor(Math.random() * 20);
      if(random2 < 5)random = 1;
      else random2 = 1000;
      controller.fireLaser(-91 + random, random2);
      return;
    }
  }
  
    if(controller.scanEnemy(0, 360, 30)){
      random = Math.floor( Math.random() * 361);
      controller.fireLaser(0 + random, 1);
    }

};

return bot;
