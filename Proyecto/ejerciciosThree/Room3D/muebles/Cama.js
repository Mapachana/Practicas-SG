import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Cama extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 1.05;

    // Creo la geometria
    this.cubo = new MeshCama();

    // Creo los colisionadores
    var bboxaux = new THREE.Box3();
    bboxaux.setFromObject(this.cubo);
    this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
    this.bbox.visible = true;

    // Añado todo
    this.add(this.cubo);
    this.add(this.bbox);

    this.nombre="Cama";

  }
  createGUI (gui,titleGui) {
  }
      
  update () {
  }
}

/* Clase para crear el mesh del mueble */
class MeshCama extends THREE.Object3D{
  constructor (ancho, profundidad) {
    super();
    var pata = new THREE.BoxGeometry(0.15, 0.2, 0.15);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    this.pata1 = new THREE.Mesh(pata, material);
    this.pata1.position.set(-0.7, 0.1, 1.5);

    this.pata2 = new THREE.Mesh(pata, material);
    this.pata2.position.set(-0.7, 0.1, -1.5);

    this.pata3 = new THREE.Mesh(pata, material);
    this.pata3.position.set(0.7, 0.1, -1.5);

    this.pata4 = new THREE.Mesh(pata, material);
    this.pata4.position.set(0.7, 0.1, 1.5);

    var base = new THREE.BoxGeometry(1.55, 0.2, 3.15);
    base.translate(0.0, 0.3, 0.0);

    this.base = new THREE.Mesh(base, material);

    var colchon = new THREE.BoxGeometry(1.55, 0.4, 3.15);
    colchon.translate(0.0, 0.6, 0.0);
    var texturemanta = new THREE.TextureLoader().load('./imgs/manta.jpg');
    var materialColchon = new THREE.MeshPhongMaterial({map: texturemanta});

    this.colchon = new THREE.Mesh(colchon, materialColchon);

    var material_almohada = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
    var almohada = new THREE.BoxGeometry(1.4, 0.2, 0.5);
    almohada.translate(0.0, 0.9, 1.3);

    this.almohada = new THREE.Mesh(almohada, material_almohada);

    this.add(this.pata1);
    this.add(this.pata2);
    this.add(this.pata3);
    this.add(this.pata4);
    this.add(this.base);
    this.add(this.colchon);
    this.add(this.almohada);
  }
}


export { Cama }

    
