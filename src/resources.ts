export default {
    sounds: {
      swordSlash: new AudioClip('sounds/sword_slash.mp3')
    },
    models: {
        baseGrid: new GLTFShape('models/baseGrid.glb')
    },
    images: {
      healthBarImage: new Texture('images/healthBarImage.png',{samplingMode:0}),
      slashImage: new Texture('images/swordSlash.png',{samplingMode:0})
      
    }
}
