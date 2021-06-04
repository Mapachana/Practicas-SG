import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Mesa extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);


    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = true;
    this.altura = 1.05;

    // Creo la geometria

    var cubo = new THREE.BoxGeometry(1.0, 1.0, 2.0, 1.0, 1.0, 1.0);
    cubo.translate(0.0, 0.5, 0.0);

    var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

    this.cubo = new THREE.Mesh(cubo, material);

    // Creo los colisionadores
    var bboxaux = new THREE.Box3();
    bboxaux.setFromObject(this.cubo);
    this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
    this.bbox.visible = true;

    // Añado todo
    this.add(this.cubo);
    this.add(this.bbox);


    this.nombre="mesa";

  }
  createGUI (gui,titleGui) {
  }
      
  update () {
  }
}


export { Mesa }

    
