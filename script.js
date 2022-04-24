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

let lastTime
let speedScale
let score
let nftScore = 0

function setPixelToGameScale(){
   let gameToPixelScale

   if(window.innerWidth/window.innerHeight < GAME_WIDTH/ GAME_HEIGHT){
      gameToPixelScale = window.innerWidth / GAME_WIDTH
   }else{
      gameToPixelScale = window.innerHeight / GAME_HEIGHT
   }

   gameElem.style.width = `${GAME_WIDTH  * gameToPixelScale}px`
   gameElem.style.height = `${GAME_HEIGHT  * gameToPixelScale}px`
}