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
      // this.createGUI(gui, titlegui);

      this.INCREMENTOS = 0.05;

      this.num_id = 1;

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

      
      this.model = new Mueble(this.num_id, this.gui, "Controles del bicho");
      this.add (this.model);
      this.muebles.push(this.model);

      this.num_id++;

      this.estorbo = new Mueble(this.num_id, this.gui, "Controles del bicho");
      this.num_id++;

      this.estorbo.position.x = 2.0;
      this.estorbo.position.z = 2.0;
      this.muebles.push(this.estorbo);
      this.nombres = [];
      this.nombres = ['1', '2'];
 
      this.muebles.forEach(element => {
        that.add(element);
      });

      this.createGUI(gui, titlegui);
      this.nombres.push("3");

  }
  createGUI (gui,titleGui) {
    var that = this;

    this.guiControls = new function (){
      this.current = 'Mueble';
    }
    var folder = gui.addFolder("Seleccion");
    
    var seleccion = folder.add(this.guiControls, 'current').options(this.nombres).name("Mueble");
    
  }
       
  update () {
   
  }

  /* Funcion mover hacia alante comrpobando colisiones */
  moverAdelante(){
      this.model.position.z = this.model.position.z - this.INCREMENTOS;

      var res = this.colisionaParedes();
      if(res[0]){
        this.model.position.z = this.model.position.z + this.INCREMENTOS;
      }

      this.model.position.y = res[1];
    
  }

   /* Funcion mover hacia atras comrpobando colisiones */
   moverAtras(){

      this.model.position.z = this.model.position.z + this.INCREMENTOS;

      var res = this.colisionaParedes();
      if(res[0]){
        this.model.position.z = this.model.position.z - this.INCREMENTOS;
      }

      this.model.position.y = res[1];

  }

   /* Funcion mover hacia izquierda comrpobando colisiones */
   moverIzquierda(){

      this.model.position.x = this.model.position.x - this.INCREMENTOS;

      var res = this.colisionaParedes();
      if(res[0]){
        this.model.position.x = this.model.position.x + this.INCREMENTOS;
      }

      this.model.position.y = res[1];


  }

  /* Funcion mover hacia derecha comrpobando colisiones */
  moverDerecha(){
      this.model.position.x = this.model.position.x + this.INCREMENTOS;

      var res = this.colisionaParedes();
      if(res[0]){
        this.model.position.x = this.model.position.x - this.INCREMENTOS;
      }

      this.model.position.y = res[1];
  }

  /* FUncion para comprobar si colisiona con las paredes */
  colisionaParedes(){
    var that = this;
    var entra = false;
    var resultado = []; // Primera componente es si colisiona y segunda la altura
    resultado.push(false);
    resultado.push(0.0);

    if(that.model.encimaDe > 0){
      resultado[1] = that.muebles.find(function(elemento){
        return elemento.ident == that.model.encimaDe;
      }).altura;
    }

    this.model.updateMatrixWorld();
    var aux = this.model.bbox.box.clone().applyMatrix4(this.model.matrixWorld);

    this.paredes.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        resultado[0] = true;
      }
    });


    this.muebles.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      // Si choca con otro mueble distinto
      if (that.model.ident != element.ident && aux.intersectsBox(aux2)){
        // Si el elemento se puede poner encima del otro
        if(element.ponerEncima && that.model.estarEncima && that.model.encimaDe < 0){
          aux.translate(new THREE.Vector3(0.0, element.altura, 0.0));
          
          that.muebles.forEach(element2 => {
            element2.updateMatrixWorld();
      
            var aux3 = element2.bbox.box.clone().applyMatrix4(element2.matrixWorld);
            
            // Si se choca con otro mueble no lo subo, si no si lo subo
            if (that.model.ident != element.ident && aux.intersectsBox(aux3)){
              resultado[0] = true;
            }
            else{
              resultado[1] = element.altura;
              that.model.encimaDe = element.ident;
            }
          });

        }
        else{ // Si no se puede poner encima choca
          resultado[0] = true;
        }
      }
      else if(that.model.encimaDe > 0 && that.model.ident != element.ident){ // Si ya esta encima
        var elemento_abajo = that.muebles.find(function(elemento){
            return elemento.ident == that.model.encimaDe;
          });

        aux.translate(new THREE.Vector3(0.0, -elemento_abajo.altura, 0.0));

        elemento_abajo.updateMatrixWorld();

        var aux2 = elemento_abajo.bbox.box.clone().applyMatrix4(elemento_abajo.matrixWorld);
        
        if (!aux.intersectsBox(aux2)){
          resultado[1] = 0.0;
          that.model.encimaDe = -1;
        }
      }
    });

    return resultado;
  }
}


export { Habitacion }

    
