import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Lampara extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = true;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 0.0;

    // Creo la geometria
    this.cubo = this.construirObjeto();

    // Creo los colisionadores
    var bboxaux = new THREE.Box3();
    bboxaux.setFromObject(this.cubo);
    this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
    this.bbox.visible = false;

    // Añado todo
    this.add(this.cubo);
    this.add(this.bbox);

    this.nombre="Lampara";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var pantallaaux = new THREE.CylinderGeometry(0.2, 0.4, 0.3, 10, 10);
    pantallaaux.translate(0.0, 0.75, 0.0);
    var material_pantalla = new THREE.MeshLambertMaterial({color: 0x00FFFF});
    var pantalla = new THREE.Mesh(pantallaaux, material_pantalla);

    var material_base = new THREE.MeshPhongMaterial({color: 0x0000FF});

    var paloaux = new THREE.CylinderGeometry(0.1, 0.15, 0.1, 10, 10);
    paloaux.translate(0.0, 0.55, 0.0);
    var palo = new THREE.Mesh(paloaux, material_base);

    var baseaux = new THREE.SphereGeometry(0.25, 10, 10);
    baseaux.translate(0.0, 0.25, 0.0);
    var base = new THREE.Mesh(baseaux, material_base);

    objeto.add(pantalla);
    objeto.add(palo);
    objeto.add(base);

    objeto.traverseVisible(function(unnodo){
      unnodo.castShadow = true;
      unnodo.receiveShadow = true;
    });

    return objeto;
  }

}

export { Lampara }

    
