import Matter from "matter-js"
import Bird from "../components/Bird"
import Floor from "../components/Floor"
import Obstacle from "../components/Obstacle"
import { Dimensions } from "react-native"
import { getPipeSizePosPair } from "../utils/random"
import { theme } from "../../core/theme"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default (nickname) => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 0.6

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)

    return {
        physics: {engine, world},
        
        Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 20, width: 20}),
        
        ObstacleTop1: Obstacle(world, 'ObstacleTop1', theme.colors.red, pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', theme.colors.black, pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),
        
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', theme.colors.black, pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', theme.colors.red, pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
        
        Floor: Floor(world, 'green', {x: windowWidth/2, y: windowHeight}, {height: 50, width: windowWidth})
   
    }
}