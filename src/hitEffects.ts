import resources from './resources'
import { Audio } from './modules/audio'
import { Dash_AnimationQueue, Dash_Ease } from "dcldash";
// Sound entities
const swordSlash = new Audio(resources.sounds.swordSlash)


export class  EnemyHitEffects extends Entity{

    public  facingContainer: Entity = new Entity()
    public  startScale = 0
    public  endScale = .5
    public  hitText = new Entity()
    public  hitTextShape = new TextShape()
    public slashImage = resources.images.slashImage

    constructor(parent:Entity){
        super()
        this.setParent(parent)
        engine.addEntity(this)
        this.facingContainer.addComponent(new Transform)
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
    }


  public  hitDamage(hitD6:number){
    log('hit damage '+hitD6)
    
    this.hitTextShape.value = '- '+hitD6.toString()

    Dash_AnimationQueue.add({
        duration: .5,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const transform = this.facingContainer.getComponent(Transform)
            const easeValue = Scalar.Lerp(this.startScale, this.endScale, Dash_Ease.easeInOutCirc(progress))
            transform.scale.setAll(easeValue)
            transform.position.y = easeValue
    
        },
        onComplete: () => {
            this.hitDamageFade()
            log('Animation Done!')
        }
    })

   
  }

  public hitDamageFade(){
      //swap scales 

    Dash_AnimationQueue.add({
        duration: .5,
        data: { someval: 'foo' }, // optionally pass along some data that is accessible every frame
        onFrame: (progress, data) => {
            const transform = this.facingContainer.getComponent(Transform)
            const easeValue = Scalar.Lerp(this.endScale, this.startScale,  Dash_Ease.easeInOutCirc(progress))
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
