import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

import { Mueble } from './Mueble.js'

class Cajonera extends Mueble{
  constructor(identificador){
    super(identificador);

    // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = true;
    this.altura = 1.85;

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

    this.nombre="Cajonera";

  }

  construirObjeto(){
    var objeto = new THREE.Object3D();

    var lateral = new THREE.BoxGeometry(0.1, 1.6, 0.5);
    var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    var lateral1 = new THREE.Mesh(lateral, material);
    lateral1.position.set(-0.5, 0.9, 0.0);

    var lateral2 = new THREE.Mesh(lateral, material);
    lateral2.position.set(0.5, 0.9, 0.0);

    var baseaux = new THREE.BoxGeometry(1.1, 0.1, 0.5);

    var base = new THREE.Mesh(baseaux, material);
    base.position.set(0.0, 0.05, 0.0);

    var techo = new THREE.Mesh(baseaux, material);
    techo.position.set(0.0, 1.75, 0.0);

    var cajon = new THREE.BoxGeometry(0.9, 0.4, 0.5);
    cajon.translate(0.0, 0.2, 0.0);

    var tirador = new THREE.SphereGeometry(0.05, 10, 10);
    var materialTirador = new THREE.MeshPhongMaterial({color: 0x111111});
    
    var cajon1 = new THREE.Mesh(cajon, material);
    cajon1.position.y = 0.1;
    var tirador1 = new THREE.Mesh(tirador, materialTirador);
    tirador1.position.set(0.0, 0.4, 0.25);

    var cajon2 = new THREE.Mesh(cajon, material);
    cajon2.position.y = 0.5;
    var tirador2 = new THREE.Mesh(tirador, materialTirador);
    tirador2.position.set(0.0, 0.8, 0.25);

    var cajon3 = new THREE.Mesh(cajon, material);
    cajon3.position.y = 0.9;
    var tirador3 = new THREE.Mesh(tirador, materialTirador);
    tirador3.position.set(0.0, 1.2, 0.25);

    var cajon4 = new THREE.Mesh(cajon, material);
    cajon4.position.y = 1.3;
    var tirador4 = new THREE.Mesh(tirador, materialTirador);
    tirador4.position.set(0.0, 1.6, 0.25);

    objeto.add(lateral1);
    objeto.add(lateral2);
    objeto.add(base);
    objeto.add(techo);
    objeto.add(cajon1);
    objeto.add(tirador1);
    objeto.add(cajon2);
    objeto.add(tirador2);
    objeto.add(cajon3);
    objeto.add(tirador3);
    objeto.add(cajon4);
    objeto.add(tirador4);

    objeto.traverseVisible(function(unnodo){
      unnodo.castShadow = true;
      unnodo.receiveShadow = true;
    });

    return objeto;
  }

}



export { Cajonera }

    
