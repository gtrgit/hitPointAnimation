import {CubeMonster} from "./cubeMonster";

const transform = new Transform({position: new Vector3(8,1,9)})
let tmp = new CubeMonster(transform,20)

const transform2 = new Transform({position: new Vector3(6,1,9)})
let tmp2 = new CubeMonster(transform2,20)


const transform3 = new Transform({position: new Vector3(8,1,5)})
let tmp3 = new CubeMonster(transform3,20)

// /// --- Set up a system ---

// // class RotatorSystem {
// //   // this group will contain every entity that has a Transform component
// //   group = engine.getComponentGroup(Transform)

// //   update(dt: number) {
// //     // iterate over the entities of the group
// //     for (const entity of this.group.entities) {
// //       // get the Transform component of the entity
// //       const transform = entity.getComponent(Transform)

// //       // mutate the rotation
// //       transform.rotate(Vector3.Up(), dt * 10)
// //     }
// //   }
// // }

// // Add a new instance of the system to the engine
// // engine.addSystem(new RotatorSystem())

// /// --- Spawner function ---

// function spawnCube(x: number, y: number, z: number) {
//   // create the entity
//   const cube = new Entity()

//   // add a transform to the entity
//   cube.addComponent(new Transform({ 
//     position: new Vector3(x, y, z),
//     scale: new Vector3(1,1,1)
//   }))

//   // add a shape to the entity
//   cube.addComponent(new BoxShape())
//   let tmp = new HealthBar(100)
//   tmp.setParent(cube)

//   // const hitEffect = new EnemyHitEffects(cube)
//   // cube.setParent(hitEffect)
//   // hitEffect.setParent(cube)
  
//   // add the entity to the engine
//   engine.addEntity(cube)

//   return cube
// }

// /// --- Spawn a cube ---

// const cube = spawnCube(8, 1, 8)
// const cube2 = spawnCube(10, 1, 8)

// // const swordHiSound = SwordSound.playSwordSlash()
// // SwordSound.playSwordSlash()


// cube.addComponent(
//   new OnPointerDown((e) => {
    

//     cube.getComponent(EnemyHitEffects).hitDamage(getRandomInt(1,6))
//     cube.getComponent(EnemyHitEffects).playSwordSlash()

//     // cube.getComponent(Transform).scale.z *= 1.1
//     // cube.getComponent(Transform).scale.x *= 0.9

//     spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
//   })
// )


// const hitEffect:EnemyHitEffects = new EnemyHitEffects(cube)
// const hitEffect2:EnemyHitEffects = new EnemyHitEffects(cube2)
