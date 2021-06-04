import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Mueble } from './Mueble.js'
import { Mesa } from './Mesa.js'
import { Taza } from './Taza.js'
import { Pared } from './pared.js'
import { Suelo } from './Suelo.js'

class Habitacion extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      // this.createGUI(gui, titlegui);

      this.suelo = new Suelo(50, 50);
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

      
      this.model = new Mesa(this.num_id, this.gui, "Controles del bicho");
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
      case "Mueble":
        nuevoMueble = new Mueble(this.num_id, this.gui, "");
        break;
      case "Mesa":
        nuevoMueble = new Mesa(this.num_id, this.gui, "");
        break;
      case "Taza":
        nuevoMueble = new Taza(this.num_id, this.gui, "");
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

  /* FUncion para comprobar si colisiona con las paredes */
  colisionaParedes(mueble){
    var that = this;
    var entra = false;
    var acaboDePonerloEncima = false;
    var acaboDePonerloAbajo = false;
    var resultado = []; // Primera componente es si colisiona y segunda la altura
    resultado.push(false);
    resultado.push(0.0);

    if(mueble.encimaDe > 0){
      resultado[1] = this.muebles.find(function(elemento){
        return elemento.ident == mueble.encimaDe;
      }).altura;
    }

    mueble.updateMatrixWorld();
    var aux = mueble.bbox.box.clone().applyMatrix4(mueble.matrixWorld);

    this.paredes.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        resultado[0] = true;
      }
    });


    this.muebles.forEach(element => {
      element.updateMatrixWorld();

      var aux = mueble.bbox.box.clone().applyMatrix4(mueble.matrixWorld);

      var aux2 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
      
      if(mueble.ident != element.ident){
        // Si choca con otro mueble distinto
        if (mueble.ident != element.ident && aux.intersectsBox(aux2)){
          // Si el elemento se puede poner encima del otro
          if(element.ponerEncima && mueble.estarEncima && !acaboDePonerloAbajo){
            aux.translate(new THREE.Vector3(0.0, element.altura, 0.0));

            that.muebles.forEach(element2 => {
              element2.updateMatrixWorld();
        
              var aux3 = element2.bbox.box.clone().applyMatrix4(element2.matrixWorld);
              
              // Si se choca con otro mueble no lo subo, si no si lo subo
              if (mueble.ident != element.ident && aux.intersectsBox(aux3)){
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
        else if(mueble.encimaDe > 0 && !acaboDePonerloEncima && mueble.ident != element.ident){ // Si ya esta encima
          var elemento_abajo = that.muebles.find(function(elemento){
              return elemento.ident == mueble.encimaDe;
            });

          aux.translate(new THREE.Vector3(0.0, -elemento_abajo.altura, 0.0));

          elemento_abajo.updateMatrixWorld();

          var aux3 = elemento_abajo.bbox.box.clone().applyMatrix4(elemento_abajo.matrixWorld);
          
          if (!aux.intersectsBox(aux3)){ // Aqui hay que comprobar que cuando lo bajo no choque con nadie

            that.muebles.forEach(element => {
              var aux4 = element.bbox.box.clone().applyMatrix4(element.matrixWorld);
              if(mueble.ident != element.ident && aux.intersectsBox(aux4)){
                if(mueble.estarEncima && element.ponerEncima){
                  if(element.altura > elemento_abajo.altura){
                    resultado[1] = element.altura;
                    mueble.encimaDe = element.ident;
                  }
                  acaboDePonerloEncima = true;
                }
                else{
                  resultado[0] = true;
                }
                
              }
            });
            if(!resultado[0] && !acaboDePonerloEncima){ // Si no choca con nadie lo bajo
              resultado[1] = 0.0;
              mueble.encimaDe = -1;
              acaboDePonerloAbajo = true;
            }
          }
        }
      }
    });

    return resultado;
  }
}


export { Habitacion }

    
