import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Pared extends THREE.Mesh{

  constructor(tamanio){
      super();

      // Calculo el largo real de la pared para las dimension de la habitacion
      var largo = 2*tamanio+0.5;

      // Creo el mesh de la pared (geometria+material)
      var cubo = new THREE.BoxGeometry(largo, 2.5, 0.5);
      cubo.translate(0.0, 1.25, 0.0);

      var texture = new THREE.TextureLoader().load('./imgs/walltexture.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});

      this.cubo = new THREE.Mesh(cubo, material);

      // Creo los colisionadores
      var bboxaux = new THREE.Box3();
      bboxaux.setFromObject(this.cubo);
      this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);

      this.add(this.cubo);
      this.add(this.bbox);

  }
  
  getBbox(){
    return this.bbox;
  }


}


export { Pared }

    
