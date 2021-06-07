import * as THREE from '../../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Mueble extends THREE.Object3D{

  constructor(identificador){
      super();

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

  /* Funcion para construir el objeto con los mesh */
  construirObjeto(){
  }

  /* Funcion para cpnsultar si puede estar encima */
  getEstarEncima(){
    return this.estarEncima;
  }

  /* Funcion para consultar encima de quien esta */
  getEncimaDe(){
    return this.encimaDe;
  }

  /* Funcion para consultar si se le pueden poner encima otros muebles */
  getPonerEncima(){
    return this.ponerEncima;
  }

  /* Funcion para obtener a que altura se deben poner muebles encima suyo */
  getAltura(){
    return this.altura;
  }

  /* Funcion para indicar encima de quien esta el mueble */
  setEncimaDe(ident){
    this.encimaDe = ident;
  }

  /* Funcion para consultar la bbox (bounding box)*/
  getBbox(){
    return this.bbox;
  }

}

export { Mueble }

    
