import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Pared extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);
      /* Aqui instanciaria le otro comecocos si me hubiera dado tiepo
      this.coso = new Bicho(gui, titlegui);
      this.add(this.coso);*/
      // Como no me ha dado tiempo a hacer el otro comecocos para animar la boca lo voy a hacer con el otro mas simple

      // Creo la cabeza del comecocos con csv

      var cubo = new THREE.BoxGeometry(10.0, 5, 0.5);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      this.cubo = new THREE.Mesh(cubo, material);

      var bboxaux = new THREE.Box3();
      bboxaux.setFromObject(this.cubo);
      this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
      // this.bbox.visible = false; Hace visible o invisible las colisiones
      //this.bbox.visible = true;

      this.add(this.cubo);
      this.add(this.bbox);

  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

}


export { Pared }

    
