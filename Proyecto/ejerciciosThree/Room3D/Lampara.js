import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Lampara extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);


    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = true;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 0.0;

    // Creo la geometria

    /*var pantalla = new THREE.CylinderGeometry(0.2, 0.4, 0.3, 10, 10);
    pantalla.translate(0.0, 0.75, 0.0);
    var material_pantalla = new THREE.MeshLambertMaterial(0x00FFFF);
    this.pantalla = new THREE.Mesh(pantalla, material_pantalla);

    var material_base = new THREE.MeshPhongMaterial(0x0000FF);

    var palo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 10, 10);
    palo.translate(0.0, 0.55, 0.0);
    this.palo = new THREE.Mesh(palo, material_base);

    var base = new THREE.SphereGeometry(0.25, 10, 10);
    base.translate(0.0, 0.25, 0.0);
    this.cubo = new THREE.Mesh(base, material_base);

    this.cubo.add(this.pantalla);
    this.cubo.add(this.palo);*/
    this.cubo = new MeshLampara();

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

class MeshLampara extends THREE.Object3D{
  constructor (ancho, profundidad) {
    super();
    var pantalla = new THREE.CylinderGeometry(0.2, 0.4, 0.3, 10, 10);
    pantalla.translate(0.0, 0.75, 0.0);
    var material_pantalla = new THREE.MeshLambertMaterial({color: 0x00FFFF});
    this.pantalla = new THREE.Mesh(pantalla, material_pantalla);

    var material_base = new THREE.MeshPhongMaterial({color: 0x0000FF});

    var palo = new THREE.CylinderGeometry(0.1, 0.15, 0.1, 10, 10);
    palo.translate(0.0, 0.55, 0.0);
    this.palo = new THREE.Mesh(palo, material_base);

    var base = new THREE.SphereGeometry(0.25, 10, 10);
    base.translate(0.0, 0.25, 0.0);
    this.base = new THREE.Mesh(base, material_base);

    this.add(this.pantalla);
    this.add(this.palo);
    this.add(this.base);   
  }
}


export { Lampara }

    
