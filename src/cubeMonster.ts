import {EnemyHitEffects} from './hitEffects'
import { getRandomInt } from './modules/random'
import {HealthBar} from './healthBar'

export class CubeMonster extends Entity{

    private cubeMonsterShape: BoxShape = new BoxShape()
    // private healthBar = new HealthBar(100)

    constructor(
        transform: TranformConstructorArgs,
        health: number
    ){
        super()
        engine.addEntity(this)
        this.addComponent(new Transform(transform))
        this.getComponent(Transform).scale.x = .5
        this.getComponent(Transform).scale.z = .5
        
        this.addComponent(this.cubeMonsterShape)
        

        let healthBar = new HealthBar(health)
        healthBar.setParent(this)

        const hitEffects: EnemyHitEffects = new EnemyHitEffects(this)
        hitEffects.setParent(this)

        

        this.addComponent(
            new OnPointerDown((e) => {
            log('does this work')
          
            let damage = getRandomInt(1,6)
            hitEffects.hitDamage(damage)
            hitEffects.playSwordSlash()

            healthBar.damageReceived(damage)
          
            
            })
          )
    }

   
      
}