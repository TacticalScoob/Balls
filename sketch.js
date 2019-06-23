let Balls = []
let MX
let MY
let Mtime = 0
var mouseTimer
let started = false

// function setup() {
//   mouseTimer = setInterval(checkMouse,1000)
// }

// function checkMouse() {
//   if (Mtime == 3) {
//     start()
//     clearInterval(mouseTimer)
//   }
//   if (MX == mouseX) {
//     if (MY == mouseY) {
//       Mtime += 1
//     } else {
//       mouseUpdate()
//     }
//   } else {
//     mouseUpdate()
//   }
// }

// function mouseUpdate() {
//   MX = mouseX
//   MY = mouseY
//   Mtime = 0
// }

function setup() {
  started = true
  createCanvas(displayWidth,displayHeight);
  Balls[0] = new Ball(width / 2, height / 2, 'Oof', random(-1, 1), random(-1, 1))
  noCursor()
}

function draw() {
  if (started == true) {
    background(55);
    for (let i = 0; i <= Balls.length - 1; i++) {
      Balls[i].run()
    }
    StopCheck()
    text(Balls.length, 30, 50)
    if (mouseIsPressed) {
      fullscreen(false)
      remove()
    } else {
      fullscreen(true)
    }
  }
}

class Ball {
  constructor(x, y, side, vx, vy) {
    var fClock
    this.position = createVector(x, y)
    this.size = (random(2, 5) * 10) * (((displayWidth + displayHeight) / 2) / 500)
    this.velocity = p5.Vector.random2D()
    this.maxSpeed = random(1, 3)
    this.Side = side
    this.velocity.set(vx, vy)
    this.R = random(50, 300)
    this.G = random(50, 300)
    this.B = random(50, 300)
    this.RTimer = 0
    this.Remove = false
    this.startRemove = false
    this.Alpha = 255
    this.mTime = 1
    this.fading = false
    this.secret = random(0, 1000)
  }

  update() {
    this.velocity.mult(1.05)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)
    this.mTime -= 1
    if (this.Alpha < 0) {
      Balls.splice(Balls.indexOf(this), 1)
    }
  }

  render() {
    noStroke()
    fill(this.R, this.G, this.B, this.Alpha)
    if (this.secret > 1) {
      ellipse(this.position.x, this.position.y, this.size)
    } else {
      rectMode(CENTER)
      rect(this.position.x, this.position.y, this.size, this.size)
    }
  }

  borders() {
    if ((this.position.x - (this.size / 2) < 0) & (this.Side != 'Left')) {
      this.velocity.x *= -1
      this.velocity.setMag(1.5)
      this.Side = 'Left'
      if (this.mTime < 0) {
        NewBall(this, 'Left')
        //NewBall(this,'Left')
      } else {
        this.velocity.set(1, random(-1, 1))
      }
    }
    if ((this.position.x + (this.size / 2) > width) & (this.Side != 'Right')) {
      this.velocity.x *= -1
      this.velocity.setMag(1.5)
      this.Side = 'Right'
      if (this.mTime < 0) {
        NewBall(this, 'Right')
        //NewBall(this,'Right')
      } else {
        this.velocity.set(-1, random(-1, 1))
      }
    }
    if ((this.position.y - (this.size / 2) < 0) & (this.Side != 'Top')) {
      this.velocity.y *= -1
      this.velocity.setMag(1.5)
      this.Side = 'Top'
      if (this.mTime < 0) {
        NewBall(this, 'Top')
        //NewBall(this,'Top')
      } else {
        this.velocity.set(random(-1, 1), 1)
      }
    }
    if ((this.position.y + (this.size / 2) > height) & (this.Side != 'Bottom')) {
      this.velocity.y *= -1
      this.velocity.setMag(1.5)
      this.Side = 'Bottom'
      if (this.mTime < 0) {
        NewBall(this, 'Bottom')
        //NewBall(this,'Bottom')
      } else {
        this.velocity.set(random(-1, 1), -1)
      }
    }
  }

  run() {
    if (this.Remove == false) {
      this.update()
      this.render()
      this.borders()
    }
  }

  Fade() {
    setInterval(subAlpha, 50, this)
  }
}

function NewBall(Object, Side) {
  Object.mTime = 10
  Balls[Balls.length] = new Ball(Object.position.x, Object.position.y, Side, Object.velocity.x * random(0.1, 5), Object.velocity.y * random(0.1, 5))
}

function StopCheck() {
  if (Balls.length - 1 > 30) {
    Balls[0].Fade()
    Balls[1].Fade()
    Balls[2].Fade()
  }
  if (Balls.length - 1 > 150) {
    for (let k = 1; k < Balls.length - 1; k++) {
      Balls[k].Fade()
    }
  }
  if (Balls.length - 1 > 500) {
    Balls.splice(200, Balls.length - 1)
  }
}

function subAlpha(Object) {
  Object.Alpha -= 2
}