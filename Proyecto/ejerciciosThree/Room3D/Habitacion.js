import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Cubo } from './Figuras.js'
import { Pared } from './pared.js'

class Habitacion extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      this.MAXIMO_X = 5.0;
      this.MINIMO_X = -5.0;
      this.MAXIMO_Z = 5.0;
      this.MINIMO_Z = -5.0;

      this.INCREMENTOS = 0.05;

      this.colisiona = false;

      this.paredes = [];
      var pared1 = new Pared();
      pared1.position.z = -5;
      this.paredes.push(pared1);
      var that = this;
      this.paredes.forEach(element => {
        that.add(element);
      });

      
      this.model = new Cubo(this.gui, "Controles del bicho");
      this.add (this.model);
  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

  /* Funcion mover hacia alante comrpobando colisiones */
  moverAdelante(){
    if(!this.colisiona){
      this.model.position.z = this.model.position.z - this.INCREMENTOS;

      if(this.colisionaParedes()){
        this.model.position.z = this.model.position.z + this.INCREMENTOS;
        this.colisiona = true;
      }
    }
    
   // console.log(this.colisionaParedes());
  }

  /* FUncion para comprobar si colisiona con las paredes */
  colisionaParedes(){
    var that = this;
    var entra = false;
    this.model.updateMatrixWorld();
    var aux = this.model.bbox.box.clone().applyMatrix4(this.model.matrixWorld);

    this.paredes.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        entra = true;
      }
    });
    return entra;
  }
}


export { Habitacion }

    
