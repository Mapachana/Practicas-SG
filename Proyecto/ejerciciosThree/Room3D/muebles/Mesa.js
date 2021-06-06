import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Mesa extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = true;
    this.altura = 1.05;

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


    this.nombre="Mesa";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var pata = new THREE.BoxGeometry(0.15, 0.8, 0.15);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    var pata1 = new THREE.Mesh(pata, material);
    pata1.position.set(-0.5, 0.4, 0.5);

    var pata2 = new THREE.Mesh(pata, material);
    pata2.position.set(-0.5, 0.4, -0.5);

    var pata3 = new THREE.Mesh(pata, material);
    pata3.position.set(0.5, 0.4, -0.5);

    var pata4 = new THREE.Mesh(pata, material);
    pata4.position.set(0.5, 0.4, 0.5);

    var cuboaux = new THREE.BoxGeometry(1.15, 0.2, 1.15);
    cuboaux.translate(0.0, 0.9, 0.0);

    var cubo = new THREE.Mesh(cuboaux, material);
    objeto.add(pata1);
    objeto.add(pata2);
    objeto.add(pata3);
    objeto.add(pata4);
    objeto.add(cubo);

    return objeto;
  }


}



export { Mesa }

    
