import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Cama extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = false;
    this.altura = 1.05;

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

    this.nombre="Cama";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var pata = new THREE.BoxGeometry(0.15, 0.2, 0.15);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    var pata1 = new THREE.Mesh(pata, material);
    pata1.position.set(-0.7, 0.1, 1.5);

    var pata2 = new THREE.Mesh(pata, material);
    pata2.position.set(-0.7, 0.1, -1.5);

    var pata3 = new THREE.Mesh(pata, material);
    pata3.position.set(0.7, 0.1, -1.5);

    var pata4 = new THREE.Mesh(pata, material);
    pata4.position.set(0.7, 0.1, 1.5);

    var base = new THREE.BoxGeometry(1.55, 0.2, 3.15);
    base.translate(0.0, 0.3, 0.0);

    var base = new THREE.Mesh(base, material);

    var colchon = new THREE.BoxGeometry(1.55, 0.4, 3.15);
    colchon.translate(0.0, 0.6, 0.0);
    var texturemanta = new THREE.TextureLoader().load('./imgs/manta.jpg');
    var materialColchon = new THREE.MeshPhongMaterial({map: texturemanta});

    var colchon = new THREE.Mesh(colchon, materialColchon);

    var material_almohada = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
    var almohada = new THREE.BoxGeometry(1.4, 0.2, 0.5);
    almohada.translate(0.0, 0.9, 1.3);

    var almohada = new THREE.Mesh(almohada, material_almohada);

    objeto.add(pata1);
    objeto.add(pata2);
    objeto.add(pata3);
    objeto.add(pata4);
    objeto.add(base);
    objeto.add(colchon);
    objeto.add(almohada);

    objeto.traverseVisible(function(unnodo){
      unnodo.castShadow = true;
      unnodo.receiveShadow = true;
    });

    return objeto;
  }

}

export { Cama }

    
