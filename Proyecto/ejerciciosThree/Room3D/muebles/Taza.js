import * as THREE from '../../libs/three.module.js'

import { ThreeBSP } from '../../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Taza extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = true;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 0.00;

    // Creo la geometria
    this.cubo = this.construirObjeto();

    // Creo los colisionadores
    var bboxaux = new THREE.Box3();
    bboxaux.setFromObject(this.cubo);
    this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
    this.bbox.visible = true;

    // Añado todo
    this.add(this.cubo);
    this.add(this.bbox);

    this.nombre="Taza";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var material = new THREE.MeshPhongMaterial(0xFFFFFF); // Creo el material
  
    var cil_ext = new THREE.CylinderGeometry(0.25, 0.25, 0.375, 20);
    var cil_int = new THREE.CylinderGeometry(0.175, 0.175, 0.375, 20);
    var asa = new THREE.TorusGeometry(0.1, 0.05, 10, 10);

    cil_ext.translate(0, 0.175, 0);
    cil_int.translate(0, 0.175, 0);
    asa.translate(0, 0.175, 0);
    cil_int.translate(0, 0.075, 0);
    asa.translate(0.25, 0.0, 0);

    var cil_ext_BSP = new ThreeBSP(cil_ext);
    var taza_media = cil_ext_BSP.union(new ThreeBSP(asa));
    var taza_final = taza_media.subtract(new ThreeBSP(cil_int));

    var cubo = taza_final.toMesh(material);
    cubo.scale.set(0.5, 0.5, 0.5);

    objeto.add(cubo);

    objeto.traverseVisible(function(unnodo){
      unnodo.castShadow = true;
      unnodo.receiveShadow = true;
    });

    return objeto;
  }

}

export { Taza }

    
