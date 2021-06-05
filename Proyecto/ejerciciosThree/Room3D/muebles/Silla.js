import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Silla extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);


    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 0.0;

    // Creo la geometria

    this.cubo = new MeshSilla();

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

class MeshSilla extends THREE.Object3D{
  constructor (ancho, profundidad) {
    super();
    var pata = new THREE.BoxGeometry(0.15, 0.4, 0.15);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    this.pata1 = new THREE.Mesh(pata, material);
    this.pata1.position.set(-0.25, 0.2, 0.25);

    this.pata2 = new THREE.Mesh(pata, material);
    this.pata2.position.set(-0.25, 0.2, -0.25);

    this.pata3 = new THREE.Mesh(pata, material);
    this.pata3.position.set(0.25, 0.2, -0.25);

    this.pata4 = new THREE.Mesh(pata, material);
    this.pata4.position.set(0.25, 0.2, 0.25);

    this.respaldo1 = new THREE.Mesh(pata, material);
    this.respaldo1.position.set(0.25, 0.8, 0.25);

    this.respaldo2 = new THREE.Mesh(pata, material);
    this.respaldo2.position.set(-0.25, 0.8, 0.25);

    this.respaldo3 = new THREE.Mesh(pata, material);
    this.respaldo3.rotation.z = Math.PI/2;
    this.respaldo3.position.set(0.0, 0.9, 0.25);

    var cubo = new THREE.BoxGeometry(0.65, 0.2, 0.65);
    cubo.translate(0.0, 0.5, 0.0);

    this.cubo = new THREE.Mesh(cubo, material);
    this.add(this.pata1);
    this.add(this.pata2);
    this.add(this.pata3);
    this.add(this.pata4);
    this.add(this.respaldo1);
    this.add(this.respaldo2);
    this.add(this.respaldo3);
    this.add(this.cubo);
  }
}


export { Silla }

    
