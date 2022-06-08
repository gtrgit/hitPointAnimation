import { Dash_AnimationQueue, Dash_Ease } from "dcldash"
import  resources  from './resources'
import { getRandomInt } from './modules/random'


export class HealthBar extends Entity{
    private healthBarTransform: Transform = new Transform({position: new Vector3(0,1,0),scale: new Vector3(1,.07,1)})
    private healthBarBgPlane: PlaneShape = new PlaneShape()
    private healthBarBgMaterial: Material = new Material()

    private currentHealth: number = 0
    private initalHealth: number = 0

    
    private currentHealthEntity: Entity = new Entity()
    private currentHealthPlane: PlaneShape = new PlaneShape()
    private currentHealthMaterial: Material = new Material()
    private currentHealthTransform: Transform = new Transform({position: new Vector3(0,0,.01),scale: new Vector3(1,1,1)})

    private percentageRemaing:number  = 100 
    

    private damageEntity: Entity = new Entity()
    private damagePlane: PlaneShape = new PlaneShape()
    private damageMaterial: Material = new Material()
    private damageMaterialTransform: Transform = new Transform({position: new Vector3(0,.3,0),scale: new Vector3(1,1,1)})

    private healthTexture: Texture = resources.images.healthBarImage

    constructor(initHp: number){
        super()

        engine.addEntity(this)

        this.initalHealth = initHp

        this.addComponent(new Billboard)
        this.addComponent(this.healthBarTransform)

        this.currentHealth = initHp
        this.healthBarBgMaterial.albedoColor = Color3.White() 

        this.addComponent(this.healthBarBgMaterial)
        this.addComponent(this.healthBarBgPlane)

        this.currentHealthEntity.addComponent(this.currentHealthPlane)
        this.currentHealthEntity.addComponent(this.currentHealthTransform)
        this.currentHealthMaterial.albedoTexture = this.healthTexture
        this.currentHealthMaterial.alphaTexture = this.healthTexture
        this.currentHealthEntity.addComponent(this.currentHealthMaterial)

        this.currentHealthEntity.setParent(this)
        
        this.currentHealthPlane.uvs = [
                    0, .76,
                    .5, .76,
                    .5, 1,
                    0, 1,

                    1, 0,
                    1, 1,
                    0, 1,
                    0, 0,
        ]

    }
    damageReceived(dmg:number){
        // log('current health before dmg '+this.currentHealth+' -dmg '+dmg)
        this.currentHealth = this.currentHealth -dmg
        // log('current health AFTER dmg '+this.currentHealth)

        let percentDamage = dmg / this.initalHealth
  

        log('currentHealth '+this.currentHealth+ ' percentageDamage '+percentDamage+' -dmg '+dmg)


        if (this.currentHealth <= 0){

            let parent = this.getParent()!.uuid
            this.enemyRemove(parent)
        }

    }

    enemyRemove(enemyParentUUid:string){
            // log('enemyRemove')
        
        let startScale = 1
        let endScale = 0
        Dash_AnimationQueue.add({
            duration: 1,
            data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
            onFrame: (progress, data) => {
                const enemyTransform = engine.entities[enemyParentUUid].getComponent(Transform)
                const easeValue = Scalar.Lerp(startScale, endScale, Dash_Ease.easeInOutQuad(progress))
               
                enemyTransform.scale.setAll(easeValue)
                
        
            },
            onComplete: () => {
                // this.slashFade()
                log('Animation Done!')
            }
        })

        //removes entity
        //engine.removeEntity(engine.entities[enemyParentUUid])
    }

}