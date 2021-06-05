import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Mueble extends THREE.Object3D{

  constructor(identificador, gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      // Identificador univoco del mueble en la habitacion
      this.ident = new Number(identificador);

      // Mueble que se puede poner encima de otros y si esta encima de alguien de quien
      this.estarEncima = false;
      this.encimaDe = -1;

      // Mueble que puede tener otros encima y altura
      this.ponerEncima = false;
      this.altura = 0.00;

      // Creo la geometria
      this.cubo = null;

      // Creo los colisionadores
      this.bboxaux = null;
      this.bbox = null;
      
      this.nombre = "mueble generico";

  }
  createGUI (gui,titleGui) {
  }
       
  update () {
  }

}

export { Mueble }

    
