import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Cubo } from './Figuras.js'

class Habitacion extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      this.MAXIMO_X = 5.0;
      this.MINIMO_X = -5.0;
      this.MAXIMO_Z = 5.0;
      this.MINIMO_Z = -5.0;

      this.INCREMENTOS = 1.0;

      
      this.model = new Cubo(this.gui, "Controles del bicho");
      this.add (this.model);
  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

  /* Funcion para mover adelante un mueble */
  moverAdelante(){
    
    var min_bb = this.model.bbox.min;
    var max_bb = this.model.bbox.max;
    console.log(min_bb);
    console.log(max_bb);

    var pos_z = this.model.position.z;

    if(pos_z - this.INCREMENTOS > this.MINIMO_Z && pos_z - this.INCREMENTOS < this.MAXIMO_Z){
      this.model.position.z = this.model.position.z - this.INCREMENTOS;
      this.model.bbox.update();
      console.log("act");
    }
  }
}


export { Habitacion }

    
