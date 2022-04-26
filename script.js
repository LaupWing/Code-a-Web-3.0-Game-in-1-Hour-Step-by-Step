const GAME_WIDTH = 100
const GAME_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const gameElem = document.querySelector("[data-game]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const gweiTotalScoreEleme = document.querySelector("[data-wei-total-score]")
const nftTotalScoreElem = document.querySelector("[data-nft-total-score]")

setPixelToGameScale()
window.addEventListener('resize', setPixelToGameScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
let nftScore = 0

function update(time) {
   if (lastTime == null) {
      lastTime = time
      window.requestAnimationFrame(update)
      return
   }
   const delta = time - lastTime

   updateGround(delta, speedScale)
   updatePlayer(delta, speedScale)
   updateObstacle(delta, speedScale)
   updateNft(delta, speedScale)
   updateSpeedScale(delta)
   updateScore(delta)
   checkIfWeGotNft()
   // if there is a collision lose the game
   if (checkLose()) return handleLose()
   lastTime = time
   window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

function handleLose() {
   window.totalGweiScore += Math.floor(score)
   window.totalNFTScore += nftScore

   nftTotalScoreElem.textContent = `NFT total score: ${window.totalNFTScore}`
   gweiTotalScoreEleme.textContent = `Wei total score ${window.totalGweiScore}`

   nftScore = 0
   nftScoreElem.textContent = `nft score: ${nftScore}`
   setPlayerLose()
   // save
   setTimeout(() => {
      document.addEventListener("keydown", handleStart, { once: true })
      startScreenElem.classList.remove("hide")
   }, 100)
}

function setPixelToGameScale() {
   let gameToPixelScale

   if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
      gameToPixelScale = window.innerWidth / GAME_WIDTH
   } else {
      gameToPixelScale = window.innerHeight / GAME_HEIGHT
   }

   gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`
   gameElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`
}