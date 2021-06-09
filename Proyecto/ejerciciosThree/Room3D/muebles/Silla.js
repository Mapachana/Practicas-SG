import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Silla extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
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

    this.nombre="Silla";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var pata = new THREE.BoxGeometry(0.15, 0.4, 0.15);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    var pata1 = new THREE.Mesh(pata, material);
    pata1.position.set(-0.25, 0.2, 0.25);
    
    var pata2 = new THREE.Mesh(pata, material);
    pata2.position.set(-0.25, 0.2, -0.25);

    var pata3 = new THREE.Mesh(pata, material);
    pata3.position.set(0.25, 0.2, -0.25);

    var pata4 = new THREE.Mesh(pata, material);
    pata4.position.set(0.25, 0.2, 0.25);

    var respaldo1 = new THREE.Mesh(pata, material);
    respaldo1.position.set(0.25, 0.8, 0.25);

    var respaldo2 = new THREE.Mesh(pata, material);
    respaldo2.position.set(-0.25, 0.8, 0.25);

    var respaldo3 = new THREE.Mesh(pata, material);
    respaldo3.rotation.z = Math.PI/2;
    respaldo3.position.set(0.0, 0.9, 0.25);

    var cuboaux = new THREE.BoxGeometry(0.65, 0.2, 0.65);
    cuboaux.translate(0.0, 0.5, 0.0);

    var cubo = new THREE.Mesh(cuboaux, material);

    objeto.add(pata1);
    objeto.add(pata2);
    objeto.add(pata3);
    objeto.add(pata4);
    objeto.add(respaldo1);
    objeto.add(respaldo2);
    objeto.add(respaldo3);
    objeto.add(cubo);
    
    objeto.traverseVisible(function(unnodo){
      unnodo.castShadow = true;
      unnodo.receiveShadow = true;
    });

    return objeto;
  }

}


export { Silla }

    
