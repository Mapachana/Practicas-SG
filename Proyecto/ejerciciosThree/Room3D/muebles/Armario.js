import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Armario extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 0.00;

    // Creo la geometria
    this.cubo = new MeshArmario();
    

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

class MeshArmario extends THREE.Object3D{
  constructor (ancho, profundidad) {
    super();
    var lateral = new THREE.BoxGeometry(0.1, 1.8, 0.5);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    this.lateral1 = new THREE.Mesh(lateral, material);
    this.lateral1.position.set(-0.5, 1.0, 0.0);

    this.lateral2 = new THREE.Mesh(lateral, material);
    this.lateral2.position.set(0.5, 1.0, 0.0);

    var base = new THREE.BoxGeometry(1.1, 0.1, 0.5);

    this.base = new THREE.Mesh(base, material);
    this.base.position.set(0.0, 0.05, 0.0);

    this.techo = new THREE.Mesh(base, material);
    this.techo.position.set(0.0, 1.95, 0.0);

    var cajon = new THREE.BoxGeometry(0.9, 0.4, 0.5);
    cajon.translate(0.0, 0.2, 0.0);

    var tirador = new THREE.SphereGeometry(0.05, 10, 10);
    var materialTirador = new THREE.MeshPhongMaterial({color: 0x111111});
    
    this.cajon1 = new THREE.Mesh(cajon, material);
    this.cajon1.position.y = 0.1;
    this.tirador1 = new THREE.Mesh(tirador, materialTirador);
    this.tirador1.position.set(0.0, 0.4, 0.25);

    this.cajon2 = new THREE.Mesh(cajon, material);
    this.cajon2.position.y = 0.5;
    this.tirador2 = new THREE.Mesh(tirador, materialTirador);
    this.tirador2.position.set(0.0, 0.8, 0.25);

    var puerta = new THREE.BoxGeometry(0.45, 1.0, 0.5);
    puerta.translate(0.0, 0.5, 0.0);

    this.puerta1 = new THREE.Mesh(puerta, material);
    this.puerta1.position.set(-0.225, 0.9, 0.0);
    this.tirador3 = new THREE.Mesh(tirador, materialTirador);
    this.tirador3.position.set(-0.15, 1.2, 0.25);

    this.puerta2 = new THREE.Mesh(puerta, material);
    this.puerta2.position.set(0.225, 0.9, 0.0);
    this.tirador4 = new THREE.Mesh(tirador, materialTirador);
    this.tirador4.position.set(0.15, 1.2, 0.25);

    this.add(this.lateral1);
    this.add(this.lateral2);
    this.add(this.base);
    this.add(this.techo);
    this.add(this.cajon1);
    this.add(this.tirador1);
    this.add(this.cajon2);
    this.add(this.tirador2);
    this.add(this.puerta1);
    this.add(this.tirador3);
    this.add(this.puerta2);
    this.add(this.tirador4);

  }
}


export { Armario }

    
