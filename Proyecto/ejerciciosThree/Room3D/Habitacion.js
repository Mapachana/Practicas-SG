import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Mesa } from './Mesa.js'
import { Taza } from './Taza.js'
import { Silla } from './Silla.js'
import { Mesa2 } from './Mesa2.js'
import { Lampara } from './Lampara.js'
import { Cama } from './Cama.js'
import { Mesita } from './Mesita.js'
import { Cajonera } from './Cajonera.js'
import { Armario } from './Armario.js'
import { Pared } from './pared.js'
import { Suelo } from './Suelo.js'

class Habitacion extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
       
      this.createGUI(gui, titlegui);

      this.suelo = new Suelo(10.5, 10.5);
      this.add(this.suelo);

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

      
      this.model = new Armario(this.num_id, this.gui, "Controles del bicho");
      //this.add (this.model);
      this.muebles.push(this.model);

      this.num_id++;

      this.estorbo = new Mesa(this.num_id, this.gui, "Controles del bicho");
      this.num_id++;

      this.estorbo.position.x = 2.0;
      this.estorbo.position.z = 2.0;
      this.muebles.push(this.estorbo);
 
      this.muebles.forEach(element => {
        that.add(element);
      });

      this.createGUI(gui, titlegui);


  }
  createGUI (gui,titleGui) {
  }
       
  update () {
   
  }

  /* Funcion mover hacia alante comrpobando colisiones */
  moverAdelante(mueble){
     mueble.position.z = mueble.position.z - this.INCREMENTOS;

      var res = this.colisionaParedes(mueble);
      if(res[0]){
        mueble.position.z = mueble.position.z + this.INCREMENTOS;
      }

      mueble.position.y = res[1];
    
  }

   /* Funcion mover hacia atras comrpobando colisiones */
   moverAtras(mueble){

      mueble.position.z = mueble.position.z + this.INCREMENTOS;

      var res = this.colisionaParedes(mueble);
      if(res[0]){
        mueble.position.z = mueble.position.z - this.INCREMENTOS;
      }

      mueble.position.y = res[1];

  }

   /* Funcion mover hacia izquierda comrpobando colisiones */
   moverIzquierda(mueble){

      mueble.position.x = mueble.position.x - this.INCREMENTOS;

      var res = this.colisionaParedes(mueble);
      if(res[0]){
        mueble.position.x = mueble.position.x + this.INCREMENTOS;
      }

      mueble.position.y = res[1];


  }

  /* Funcion mover hacia derecha comrpobando colisiones */
  moverDerecha(mueble){
      mueble.position.x = mueble.position.x + this.INCREMENTOS;

      var res = this.colisionaParedes(mueble);
      if(res[0]){
        mueble.position.x = mueble.position.x - this.INCREMENTOS;
      }

      mueble.position.y = res[1];
  }

  /* Funcion para rotar hacia la izquierda un mueble comprobadno colisiones */
  rotarIzquierda(mueble){
    mueble.rotation.y += Math.PI/2;

    var res = this.colisionaParedes(mueble);
    if(res[0]){
      mueble.rotation.y -= Math.PI/2;
    }
    else{
      mueble.position.y = res[1];
    }
  }

  /* Funcion para rotar hacia la derecha un mueble comprobadno colisiones */
  rotarDerecha(mueble){
    mueble.rotation.y -= Math.PI/2;

    var res = this.colisionaParedes(mueble);
    if(res[0]){
      mueble.rotation.y += Math.PI/2;
    }
    else{
      mueble.position.y = res[1];
    }
  }

  /* Funcion para añadir un mueble de un tipo en unas coordenadas concretas */
  aniadirMueble(tipoMueble, coordenadas){    var nuevoMueble = null;
    switch (tipoMueble){
      case "Mesa":
        nuevoMueble = new Mesa(this.num_id, this.gui, "");
        break;
      case "Taza":
        nuevoMueble = new Taza(this.num_id, this.gui, "");
        break;
      case "Mesa2":
        nuevoMueble = new Mesa2(this.num_id, this.gui, "");
        break;
      case "Mesita":
        nuevoMueble = new Mesita(this.num_id, this.gui, "");
        break;
      case "Lampara":
        nuevoMueble = new Lampara(this.num_id, this.gui, "");
        break;
      case "Cama":
        nuevoMueble = new Cama(this.num_id, this.gui, "");
        break;
      case "Silla":
        nuevoMueble = new Silla(this.num_id, this.gui, "");
        break;
      case "Cajonera":
        nuevoMueble = new Cajonera(this.num_id, this.gui, "");
        break;
      case "Armario":
        nuevoMueble = new Armario(this.num_id, this.gui, "");
        break;
    }

    nuevoMueble.position.x = coordenadas.x;
    nuevoMueble.position.y = coordenadas.y;
    nuevoMueble.position.z = coordenadas.z;

    var res = this.colisionaParedes(nuevoMueble);
    if(!res[0]){
      nuevoMueble.position.y = res[1];
      this.muebles.push(nuevoMueble);
      this.parent.pickableObjects.push(nuevoMueble.cubo);
      this.add(nuevoMueble);
      this.num_id++;
    }

  }

  /* Funcion para eliminar un mueble */
  eliminarMueble(mueble){
    console.log(this.muebles);
    var indiceMueble = this.muebles.findIndex(function(elemento){
      return elemento.ident == mueble.ident;
    });
    var indiceSeleccionable = this.parent.pickableObjects.findIndex(function(elemento){
      return elemento.id == mueble.cubo.id;
    });
    this.muebles.splice(indiceMueble, 1);
    this.parent.pickableObjects.splice(indiceSeleccionable, 1);
    //mueble.eliminar();
    this.remove(mueble);
    console.log(this.muebles);
  }

  /* Funcion para comprobar si colisiona con las paredes */
  colisionaParedes(mueble){
    var that = this;
    var entra = false;
    var acaboDePonerloEncima = false;
    var acaboDePonerloAbajo = false;
    var resultado = []; // Primera componente es si colisiona (bool) y segunda la altura a la que debe subir o bajar
    resultado.push(false);
    resultado.push(0.0);

    var tieneMuebleEncima = this.muebles.find(function(elemento){
      return elemento.encimaDe == mueble.ident;
    });

    // Si el mueble tiene otro mueble encima no se puede mover
    if(typeof tieneMuebleEncima !== 'undefined'){
      resultado[0] = true;
    }
 

    // Si estoy encima de otro mueble guardo la altura
    if(mueble.encimaDe > 0){
      resultado[1] = this.muebles.find(function(elemento){
        return elemento.ident == mueble.encimaDe;
      }).altura;
    }

    // Actualizo colisionadores del mueble
    mueble.updateMatrixWorld();
    var aux = mueble.bbox.box.clone().applyMatrix4(mueble.matrixWorld);

    // Compruebo si colisiona con las paredes de la habitacion
    this.paredes.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        resultado[0] = true;
      }
    });

    // Compruebo si colisiona con otro mueble
    this.muebles.forEach(element => {
      element.updateMatrixWorld();

      var aux = mueble.bbox.box.clone().applyMatrix4(mueble.matrixWorld);

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if(mueble.ident != element.ident){
        // Si choca con otro mueble distinto
        if (aux.intersectsBox(aux2)){
          // Si el elemento se puede poner encima del otro
          if(element.ponerEncima && mueble.estarEncima && !acaboDePonerloAbajo){
            aux.translate(new THREE.Vector3(0.0, element.altura, 0.0));

            that.muebles.forEach(element2 => {
              element2.updateMatrixWorld();
        
              var aux3 = element2.bbox.box.clone().applyMatrix4(element2.matrixWorld);
              
              // Si se choca con otro mueble no lo subo, si no si lo subo
              if (mueble.ident != element2.ident && aux.intersectsBox(aux3)){ // aqui antes comparaba ident con element y no element2
                resultado[0] = true;
              }

              if(!resultado[0]){
                resultado[1] = element.altura;
                mueble.encimaDe = element.ident;
                acaboDePonerloEncima = true;
              }
            });

          }
          else{ // Si no se puede poner encima choca
            resultado[0] = true;
          }
        }
        else if(mueble.encimaDe > 0 && !acaboDePonerloEncima){ // Si ya esta encima
          var elemento_abajo = that.muebles.find(function(elemento){
              return elemento.ident == mueble.encimaDe;
            });

          aux.translate(new THREE.Vector3(0.0, -elemento_abajo.altura, 0.0));

          elemento_abajo.updateMatrixWorld();

          var aux3 = elemento_abajo.bbox.box.clone().applyMatrix4(elemento_abajo.matrixWorld);
          
          // Aqui hay que comprobar que cuando lo bajo no choque con nadie

          that.muebles.forEach(element => {
            var aux4 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
            if(mueble.ident != element.ident && aux.intersectsBox(aux4)){
              if(mueble.estarEncima && element.ponerEncima){
                if(element.altura > elemento_abajo.altura){
                  resultado[1] = element.altura;
                  mueble.encimaDe = element.ident;
                }
                if(!aux.intersectsBox(aux3)){ // Si no colisiona  con el anterior objeto con el que estaba encima pongo el nuevo
                  resultado[1] = element.altura;
                  mueble.encimaDe = element.ident
                }
                acaboDePonerloEncima = true;
              }
              else{
                resultado[0] = true;
              }
              
            }
          });
          if(!resultado[0] && !acaboDePonerloEncima && !aux.intersectsBox(aux3)){ // Si no choca con nadie lo bajo
            resultado[1] = 0.0;
            mueble.encimaDe = -1;
            acaboDePonerloAbajo = true;
          }
          
        }
      }
    });

    return resultado;
  }
}


export { Habitacion }

    
