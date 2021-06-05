
import * as THREE from '../libs/three.module.js'

class Suelo extends THREE.Object3D {

  constructor (ancho, profundidad) {
    super();

    this.raycaster = new THREE.Raycaster();

    // Calculo el ancho y profundidad real a partir de los parametros pasados de dimensiones de la habitacion
    var ancho_real = 2*ancho+0.5;
    var profundidad_real = 2*profundidad+0.5;

    // Creo el mesh del suelo (para lo que creo geometria y material)
    var geometryGround = new THREE.BoxGeometry (ancho_real,0.2,profundidad_real);
    
    var texture = new THREE.TextureLoader().load('./imgs/marmol-blanco.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    this.ground = new THREE.Mesh (geometryGround, materialGround);
    
    this.ground.position.y = -0.1; // Hago que quede por debajo de altura 0
    
    this.add(this.ground);
  }

  /* Funcion para calcular las coordenadas de donde se ha pulsado en el suelo */
  calcularCoordenadas(event, camara){
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    
    this.raycaster.setFromCamera(mouse, camara);

    var pickedObjects = this.raycaster.intersectObjects([this.ground]);
    if (pickedObjects.length > 0) {
      return new THREE.Vector3 (pickedObjects[0].point.x, 0.0, pickedObjects[0].point.z);
    }
    else{
      return null;
    } 
  }
  
}

export { Suelo };
