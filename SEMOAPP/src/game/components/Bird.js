import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
const Bird = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;
    var src;
    switch(props.nick)
    {
        default:
            src = require('../../assets/game/rowdy3.png')
    }
    return(
        <View style={{
            borderWidth: 0,
            borderRadius: 100,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}><Image source={src} style={{width: 40, height: 40}}></Image></View>
    )

}

export default (world, color, pos, size) => {
    //Todo: Change rect to circle
    const initialBird = Matter.Bodies.circle(
        pos.x, pos.y, size.width,
        {label: 'Bird'}
    )
    Matter.World.add(world, initialBird)

    return {
        body: initialBird,
        color,
        pos,
        renderer: <Bird/>
    }
}
