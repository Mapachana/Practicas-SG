
import * as THREE from '../libs/three.module.js'

class Suelo extends THREE.Object3D {

  constructor (ancho, profundidad) {
    super();
    
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (ancho,0.2,profundidad);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    this.ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add(this.ground);
  }

  calcularCoordenadas(event, camara){
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camara);

    var pickedObjects = raycaster.intersectObjects([this.ground]);
    if (pickedObjects.length > 0) {
      return new THREE.Vector3 (pickedObjects[0].point.x, 0.0, pickedObjects[0].point.z);
    }
    else{
      return null;
    } 
  }
  
}

export { Suelo };
