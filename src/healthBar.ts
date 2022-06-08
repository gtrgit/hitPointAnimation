import { Dash_AnimationQueue, Dash_Ease, } from "dcldash"
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

    private percentageRemaing:number  = 1 
    

    private damageEntity: Entity = new Entity()
    private damagePlane: PlaneShape = new PlaneShape()
    private damageMaterial: Material = new Material()
    private damageMaterialTransform: Transform = new Transform({position: new Vector3(0,.3,0),scale: new Vector3(1,1,1)})

    private healthTexture: Texture = resources.images.healthBarImage

    private percentDamage:number = 0

    private bl = { x: 0,  y: .76  }
    private br = { x: .5,  y: .76  }
    private tr = { x: .5,  y: 1  }
    private tl = { x: 0,   y: 1  }
    


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
            this.bl.x, this.bl.y,
            this.br.x, this.br.y,
            this.tr.x,  this.tr.y,
            this.tl.x, this.tl.y,
            
            this.br.x,  this.br.y,
            this.bl.x,  this.bl.y,
            this.tl.x,  this.tl.y,
            this.tr.x,  this.tr.y
            
           
            
        ]

        this.uvsFrame(0,0)
    }

    uvsFrame(leftRight:number, upDown:number){

        
        // this.currentHealthPlane.uvs = [
        let tmp = [
            
            this.bl.x  ,                    this.bl.y,
            this.br.x = 1-leftRight, this.br.y,
            this.tr.x = 1-leftRight,  this.tr.y,
            this.tl.x,                      this.tl.y,
            

            this.br.x = 1-leftRight,this.br.y,
            this.bl.x,                      this.bl.y, 
            this.tl.x,                      this.tl.y,
            this.tr.x = 1-leftRight ,  this.tr.y,
            
            // this.bl.x,                       this.bl.y = this.bl.y+upDown,
            // this.br.x = this.br.x+leftRight,  this.br.y = this.br.y+upDown,
            
            // this.tr.x = this.tr.x+leftRight,  this.tr.y = this.tr.y+upDown,
            // this.tl.x,                      this.tl.y = this.tl.y+upDown
            



            // this.bl.x,                          this.bl.y = this.bl.y+upDown, 
            // this.br.x = this.br.x+leftRight,  this.br.y = this.br.y+upDown,
            
            // this.tl.x,                      this.tl.y = this.tl.y+upDown,
            // this.tr.x = this.tr.x+leftRight,  this.tr.y = this.tr.y+upDown,
            

            // this.tr.x = this.tr.x+leftRight,  this.tr.y = this.tr.y+upDown,
            // this.tl.x,                      this.tl.y = this.tl.y+upDown,
            // this.br.x = this.br.x+leftRight,  this.br.y = this.br.y+upDown,
            // this.bl.x,                          this.bl.y = this.bl.y+upDown
        ]
        log('bl.x '+tmp[0]+' br.x '+tmp[4])
log('-----------')
        for (let i = 0; i <tmp.length; i++) {
            // log(tmp[i])
        }
        return tmp
    }

    damageReceived(dmg:number){
        // log('current health before dmg '+this.currentHealth+' -dmg '+dmg)
        this.currentHealth = this.currentHealth -dmg
        // log('current health AFTER dmg '+this.currentHealth)

        
        this.percentDamage =  (dmg / this.initalHealth)
        this.percentageRemaing = this.percentageRemaing - this.percentDamage
        log('percentDamage '+this.percentDamage+'remaining '+ this.percentageRemaing)
        this.currentHealthPlane.uvs = this.uvsFrame(this.percentageRemaing,0)
        log('currentHealth '+this.currentHealth+ ' percentageDamage '+this.percentDamage+' remaining '+this.percentageRemaing+' -dmg '+dmg)

        if (this.currentHealth >= this.initalHealth/1.1){
            this.currentHealthMaterial.emissiveColor = Color3.Green()
        }
        if (this.currentHealth < this.initalHealth/1.5){
            this.currentHealthMaterial.emissiveColor = Color3.Yellow()
        }
        if (this.currentHealth < this.initalHealth/2){
            this.currentHealthMaterial.emissiveColor = Color3.Red()
        }
        if (this.currentHealth <= 0){

            let parent = this.getParent()!.uuid
            this.enemyRemove(parent)
        }

    }

    enemyRemove(enemyParentUUid:string){
        // enemy health bars
        this.healthBarBgPlane.visible = false
        this.currentHealthPlane.visible = false

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
                engine.removeEntity(this)
                log('Animation Done!')
            }
        })

        //removes entity
        //engine.removeEntity(engine.entities[enemyParentUUid])
    }

}