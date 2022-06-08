import resources from './resources'
import { Audio } from './modules/audio'
import { Dash_AnimationQueue, Dash_Ease } from "dcldash"
import { getRandomInt } from './modules/random'

// Sound entities
const swordSlash = new Audio(resources.sounds.swordSlash)


export class  EnemyHitEffects extends Entity{

    public  facingContainer: Entity = new Entity()
    public  startScale = 0
    public  endScale = .5
    public  hitText = new Entity()
    public  hitTextShape = new TextShape()
    public  slashImage = resources.images.slashImage
    public  newEndScale = 0
    public  slashMaterial = new BasicMaterial()
    public  plane = new PlaneShape()
    public  slashEntity: Entity = new Entity()
    public slashEndScale = 0

    constructor(
        parent:Entity
        ){
        super()
        // this.setParent(parent)
        engine.addEntity(this)
        this.facingContainer.addComponent(new Transform())
        this.facingContainer.setParent(this)
        
        this.facingContainer.addComponent(new Billboard())

        ////
        this.hitTextShape.fontSize = 20  
        this.hitTextShape.color = Color3.Red()
        this.hitText.addComponent(this.hitTextShape)
        this.hitText.addComponent(new Transform({ 
            position: new Vector3(0,4,0),
            rotation: Quaternion.Euler(0,180,0)
              }))
    
        this.hitText.setParent(this.facingContainer)


        // //sword slash plane
        this.slashMaterial.texture = this.slashImage
        this.plane.withCollisions = false
        // //Create shape component
        this.slashEntity.addComponent(this.plane)
        this.slashEntity.addComponent(this.slashMaterial)
        this.slashEntity.addComponent(new Transform({ position: new Vector3(1,0,0),
                                                      scale: new Vector3(0,0,0),
                                                      rotation: Quaternion.Euler(90,0,0)
                                                    }))
        // this.slashEntity.addComponent(new Billboard)

        this.slashEntity.setParent(this)

    }


  public  hitDamage(hitD6:number){
    log('hit damage '+hitD6)
    

    this.hitTextShape.value = '- '+hitD6.toString()
    this.newEndScale = (this.endScale * hitD6/4)
    this.slashEndScale = (this.endScale * hitD6)
    Dash_AnimationQueue.add({
        duration: .2,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const slashTransform = this.slashEntity.getComponent(Transform)
            const easeValue = Scalar.Lerp(this.startScale, this.slashEndScale, Dash_Ease.easeInOutQuad(progress))
           
            slashTransform.scale.setAll(easeValue)
            slashTransform.position.x = getRandomInt(0,.7) 
            slashTransform.position.y = getRandomInt(0,.7) 
            slashTransform.position.z = getRandomInt(0,.7) 
            slashTransform.rotation.x = getRandomInt(-180,180) 
            slashTransform.rotation.y = getRandomInt(-180,180) 

    
        },
        onComplete: () => {
            this.slashFade()
            log('Animation Done!')
        }
    })

   
  }

  public slashFade(){
      
    Dash_AnimationQueue.add({
        duration: .2,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const slashTransform = this.slashEntity.getComponent(Transform)   
            const easeValue = Scalar.Lerp(this.newEndScale, this.startScale, Dash_Ease.easeInOutQuad(progress))
            slashTransform.scale.setAll(easeValue)
            
        },
        onComplete: () => {
            this.hitDamageGrow()
            log('Animation Done!')
        }
    })
  }


  public hitDamageGrow(): void{
    // this.newEndScale = (this.endScale * hitD6/2)
    Dash_AnimationQueue.add({
        duration: .5,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const transform = this.facingContainer.getComponent(Transform)    
            const easeValue = Scalar.Lerp(this.startScale, this.newEndScale, Dash_Ease.easeInOutQuad(progress))
            transform.scale.setAll(easeValue)
            transform.position.y = easeValue
        },
        onComplete: () => {
            this.hitDamageFade()
            log('Animation Done!')
        }
    })
  }

  public hitDamageFade(): void{
      //swap scales 

    Dash_AnimationQueue.add({
        duration: .5,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const transform = this.facingContainer.getComponent(Transform)
            const easeValue = Scalar.Lerp(this.newEndScale, this.startScale,  Dash_Ease.easeInOutQuad(progress))
            transform.scale.setAll(easeValue)
            transform.position.y = easeValue
    
        },
        onComplete: () => {
            log('Animation Done!')
        }
    })
  }

  // Sound
  public  playSwordSlash(): void {
      log('sound played')
    swordSlash.getComponent(AudioSource).playOnce()
  }


}
