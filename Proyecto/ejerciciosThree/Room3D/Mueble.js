import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Mueble extends THREE.Mesh{

  constructor(identificador, gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      // Identificador univoco del mueble en la habitacion
      this.ident = new Number(identificador);

      // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
      this.estarEncima = true;
      this.encimaDe = -1;

      // Mueble que puede tener otros encima y altura
      this.ponerEncima = true;
      this.altura = 1.05;

      var cubo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      cubo.translate(0.0, 0.5, 0.0);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      this.cubo = new THREE.Mesh(cubo, material);

      var bboxaux = new THREE.Box3();
      bboxaux.setFromObject(this.cubo);
      this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
      this.bbox.visible = true;

      this.add(this.cubo);
      this.add(this.bbox);

      this.puedoPonerEncima = false;

  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

}


export { Mueble }

    
