import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Mueble } from './Mueble.js'
import { Pared } from './pared.js'

class Habitacion extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      this.INCREMENTOS = 0.05;

      this.paredes = [];
      this.muebles = []

      var pared1 = new Pared();
      pared1.position.z = -5;
      this.paredes.push(pared1);

      var pared2 = new Pared();
      pared2.position.z = 5;
      this.paredes.push(pared2);

      var pared3 = new Pared();
      pared3.rotation.y = Math.PI/2;
      pared3.position.x = -5;
      this.paredes.push(pared3);

      var pared4 = new Pared();
      pared4.rotation.y = Math.PI/2;
      pared4.position.x = 5;
      this.paredes.push(pared4);

      var that = this;
      this.paredes.forEach(element => {
        that.add(element);
      });

      
      this.model = new Mueble(this.gui, "Controles del bicho");
      this.add (this.model);

      this.estorbo = new Mueble(this.gui, "Controles del bicho");
      this.estorbo.position.x = 2.0;
      this.estorbo.position.z = 2.0;
      this.muebles.push(this.estorbo);

      this.muebles.forEach(element => {
        that.add(element);
      });
  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

  /* Funcion mover hacia alante comrpobando colisiones */
  moverAdelante(){
      this.model.position.z = this.model.position.z - this.INCREMENTOS;

      if(this.colisionaParedes()){
        this.model.position.z = this.model.position.z + this.INCREMENTOS;
      }
    
  }

   /* Funcion mover hacia atras comrpobando colisiones */
   moverAtras(){

      this.model.position.z = this.model.position.z + this.INCREMENTOS;

      if(this.colisionaParedes()){
        this.model.position.z = this.model.position.z - this.INCREMENTOS;
      }

  }

   /* Funcion mover hacia izquierda comrpobando colisiones */
   moverIzquierda(){

      this.model.position.x = this.model.position.x - this.INCREMENTOS;

      if(this.colisionaParedes()){
        this.model.position.x = this.model.position.x + this.INCREMENTOS;
      }

  }

  /* Funcion mover hacia derecha comrpobando colisiones */
  moverDerecha(){
      this.model.position.x = this.model.position.x + this.INCREMENTOS;

      if(this.colisionaParedes()){
        this.model.position.x = this.model.position.x - this.INCREMENTOS;
      }
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

    this.muebles.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        entra = true;
      }
    });

    return entra;
  }

  /* FUncion para comprobar si colisiona con otros objetos */
  colisionaMuebles(){
    var that = this;
    var entra = false;
    this.model.updateMatrixWorld();
    var aux = this.model.bbox.box.clone().applyMatrix4(this.model.matrixWorld);

    this.muebles.forEach(element => {
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

    
