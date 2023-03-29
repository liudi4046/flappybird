// 获取画布元素
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var image = document.getElementById("s")
// 定义游戏元素
var bird = {
  x: 50,
  y: 150,
  radius: 20,
  color: "#FFC0CB",
  draw: function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.drawImage(image, this.x - 20, this.y - 20, 40, 40)
  },
}

var pipe = {
  x: canvas.width,
  y: 0,
  xb: canvas.width,
  yb: canvas.height,
  width: 50,
  height: 100,
  heightb: 200,
  speed: 2,
  color: "#008000",
  draw: function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillRect(this.xb, this.yb, this.width, -this.heightb)
  },
}

// 绘制游戏
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bird.draw()
  pipe.draw()
}

draw()
// 添加交互性
let accu = 0
let add = 5
function jump() {
  bird.y -= add
  add++
  if (accu++ < 10) window.requestAnimationFrame(jump)
}
canvas.addEventListener("click", function () {
  accu = 0
  add = 5
  dropDelta = 1
  window.requestAnimationFrame(jump)
})

// 检测碰撞
function collision() {
  if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
    return true
  }

  if (
    bird.x + bird.radius > pipe.x &&
    bird.x - bird.radius < pipe.x &&
    bird.y - bird.radius < pipe.height
  ) {
    return true
  }
  if (
    bird.x + bird.radius > pipe.x &&
    bird.x - bird.radius < pipe.x &&
    bird.y + bird.radius > canvas.height - pipe.heightb
  ) {
    return true
  }

  return false
}

// 游戏循环
let dropDelta = 1
function gameLoop() {
  if (collision()) {
    alert("Game Over!")
    return
  }
  bird.y += dropDelta
  dropDelta += 0.1

  pipe.x -= pipe.speed
  pipe.xb -= pipe.speed
  if (pipe.x < -pipe.width) {
    pipe.x = canvas.width
    pipe.xb = canvas.width
  }

  draw()
  requestAnimationFrame(gameLoop)
}

gameLoop()
