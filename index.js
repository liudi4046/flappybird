// 获取画布元素
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var image = document.getElementById("s")
var sky = document.getElementById("sky")
// 定义游戏元素
var bird = {
  x: 50,
  y: 150,
  radius: 12,
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
let randomPipes = [
  [500, 150],
  [450, 200],
  [550, 100],
  [600, 50],
  [150, 500],
  [200, 450],
  [100, 550],
  [50, 600],
]
var pipe = {
  x: canvas.width,
  y: 0,

  yb: canvas.height,
  width: 50,
  height: 100,
  heightb: 550,
  speed: 6,
  color: "#008000",
  draw: function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fillRect(this.x, this.yb, this.width, -this.heightb)
  },
}

// 绘制游戏
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(sky, 0, 0, 800, 800)
  bird.draw()
  pipe.draw()
}

draw()
// 添加交互性
let accu = 0
let add = 2
function jump() {
  bird.y -= add
  add++
  if (accu++ < 10) window.requestAnimationFrame(jump)
}
canvas.addEventListener("click", function () {
  accu = 0
  add = 2
  dropDelta = 0.5
  window.requestAnimationFrame(jump)
})

// 检测碰撞
function collision() {
  if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
    return true
  }

  if (
    bird.x + bird.radius > pipe.x &&
    bird.x - bird.radius < pipe.x + pipe.width &&
    bird.y - bird.radius < pipe.height
  ) {
    return true
  }
  if (
    bird.x + bird.radius > pipe.x &&
    bird.x - bird.radius < pipe.x + pipe.width &&
    bird.y + bird.radius > canvas.height - pipe.heightb
  ) {
    return true
  }

  return false
}

// 游戏循环

let dropDelta = 0.5
let count = 0
function gameLoop() {
  if (collision()) {
    alert("Game Over!")
    pipe.x = canvas.width
    bird.y = 150
    dropDelta = 0.5
  }
  bird.y += dropDelta
  dropDelta += 0.1

  pipe.x -= pipe.speed

  if (pipe.x < -pipe.width) {
    pipe.x = canvas.width
    pipe.xb = canvas.width
    let index = Math.floor(Math.random() * 8)
    console.log(index)
    pipe.height = randomPipes[index][0]
    pipe.heightb = randomPipes[index][1]
    count++
    let domCount = document.getElementById("count")
    domCount.innerHTML = count
  }

  draw()
  requestAnimationFrame(gameLoop)
}

gameLoop()
