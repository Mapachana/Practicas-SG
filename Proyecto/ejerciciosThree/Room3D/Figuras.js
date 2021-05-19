import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Cubo extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);
      /* Aqui instanciaria le otro comecocos si me hubiera dado tiepo
      this.coso = new Bicho(gui, titlegui);
      this.add(this.coso);*/
      // Como no me ha dado tiempo a hacer el otro comecocos para animar la boca lo voy a hacer con el otro mas simple

      // Creo la cabeza del comecocos con csv

      var cubo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      cubo.translate(0.0, 0.5, 0.0);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      this.cubo = new THREE.Mesh(cubo, material);

      //this.cubo.geometry.computeBoundingBox();
      this.bbox = new THREE.BoxHelper (this.cubo, 0xFF0000);
      this.bbox.visible = true;
      console.log("aaa");

      this.add(this.cubo);
      this.add(this.bbox);

  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

}


export { Cubo }

    
