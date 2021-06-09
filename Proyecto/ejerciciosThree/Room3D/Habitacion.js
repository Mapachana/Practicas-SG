import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Mesa } from './muebles/Mesa.js'
import { Taza } from './muebles/Taza.js'
import { Silla } from './muebles/Silla.js'
import { Mesa2 } from './muebles/Mesa2.js'
import { Lampara } from './muebles/Lampara.js'
import { Cama } from './muebles/Cama.js'
import { Mesita } from './muebles/Mesita.js'
import { Cajonera } from './muebles/Cajonera.js'
import { Armario } from './muebles/Armario.js'
import { Pared } from './pared.js'
import { Suelo } from './Suelo.js'

class Habitacion extends THREE.Mesh{

  constructor(sonido, loadSonido){
      super();

      // Cojo el reproductor de sonidos
      this.sonidoAdd = sonido;
      this.audioLoader = loadSonido;

      // Atributo de cuanto avanza un mueble por cada pulsacion de teclas
      this.INCREMENTOS = 0.05;
      this.ANGULO = Math.PI/2;

      // Ancho y largo de la habitacion
      this.ANCHO = 5;
      this.LARGO = 5;

      // Identificador para ir asignandolo a los muebles
      this.num_id = 1;

      // Instancio el suelo
      this.suelo = new Suelo(this.LARGO, this.ANCHO);
      this.add(this.suelo);

      // Instancio las paredes
      this.paredes = [];

      var pared1 = new Pared(this.LARGO);
      pared1.position.z = -this.ANCHO;
      this.paredes.push(pared1);

      var pared2 = new Pared(this.LARGO);
      pared2.position.z = this.ANCHO;
      this.paredes.push(pared2);

      var pared3 = new Pared(this.ANCHO);
      pared3.rotation.y = Math.PI/2;
      pared3.position.x = -this.LARGO;
      this.paredes.push(pared3);

      var pared4 = new Pared(this.ANCHO);
      pared4.rotation.y = Math.PI/2;
      pared4.position.x = this.LARGO;
      this.paredes.push(pared4);

      var that = this;
      this.paredes.forEach(element => {
        that.add(element);
      });

      // Array de muebles en la habitacion
      this.muebles = [];

      // Añado muebles iniciales de ejemplo
      var mueble1 = new Mesa(this.num_id);
      this.muebles.push(mueble1);
      this.num_id++;

      var mueble2 = new Lampara(this.num_id);
      mueble2.position.set(0.0, mueble1.getAltura(), 0.0);
      mueble2.setEncimaDe(mueble1.getIdent());
      this.muebles.push(mueble2);
      this.num_id++;

      var mueble3 = new Silla(this.num_id);
      mueble3.position.set(0.0, 0.0, 1.0);
      this.muebles.push(mueble3);
      this.num_id++;
 
      // Añado los muebles
      this.muebles.forEach(element => {
        that.add(element);
      });

      // Objetos que se pueden seleccionar
      this.pickableObjects = [];

      var that = this;
      this.muebles.forEach(element => {
        that.pickableObjects.push(element.cubo);
      });


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
    mueble.rotation.y += this.ANGULO;

    var res = this.colisionaParedes(mueble);
    if(res[0]){
      mueble.rotation.y -= this.ANGULO;
    }
    else{
      mueble.position.y = res[1];
    }
  }

  /* Funcion para rotar hacia la derecha un mueble comprobadno colisiones */
  rotarDerecha(mueble){
    mueble.rotation.y -= this.ANGULO;

    var res = this.colisionaParedes(mueble);
    if(res[0]){
      mueble.rotation.y += this.ANGULO;
    }
    else{
      mueble.position.y = res[1];
    }
  }

  /* Funcion para añadir un mueble de un tipo en unas coordenadas concretas */
  aniadirMueble(tipoMueble, coordenadas){    
    var nuevoMueble = null;
    switch (tipoMueble){
      case "Mesa":
        nuevoMueble = new Mesa(this.num_id);
        break;
      case "Taza":
        nuevoMueble = new Taza(this.num_id);
        break;
      case "Mesa2":
        nuevoMueble = new Mesa2(this.num_id);
        break;
      case "Mesita":
        nuevoMueble = new Mesita(this.num_id);
        break;
      case "Lampara":
        nuevoMueble = new Lampara(this.num_id);
        break;
      case "Cama":
        nuevoMueble = new Cama(this.num_id);
        break;
      case "Silla":
        nuevoMueble = new Silla(this.num_id);
        break;
      case "Cajonera":
        nuevoMueble = new Cajonera(this.num_id);
        break;
      case "Armario":
        nuevoMueble = new Armario(this.num_id);
        break;
    }

    nuevoMueble.position.x = coordenadas.x;
    nuevoMueble.position.y = coordenadas.y;
    nuevoMueble.position.z = coordenadas.z;

    var res = this.colisionaParedes(nuevoMueble);
    // Si no colisiona lo instancio y añado a los arrays correspondientes
    if(!res[0]){
      nuevoMueble.position.y = res[1];
      this.muebles.push(nuevoMueble);
      this.pickableObjects.push(nuevoMueble.cubo);
      this.add(nuevoMueble);
      this.num_id++;
      this.sonidoMueble();
    }

  }

  /* Funcion para eliminar un mueble */
  eliminarMueble(mueble){
    var tieneMuebleEncima = this.muebles.find(function(elemento){
      return elemento.getEncimaDe() == mueble.getIdent();
    });

    var estaEnHabitacion = this.muebles.find(function(elemento){
      return elemento.getIdent() == mueble.getIdent();
    });

    // Si el mueble tiene otro mueble encima no se puede eliminar, compruebo que no tiene ninguno encima y lo elimino
    if(typeof tieneMuebleEncima == 'undefined' && !(typeof estaEnHabitacion == 'undefined')){
      var indiceMueble = this.muebles.findIndex(function(elemento){
        return elemento.getIdent() == mueble.getIdent();
      });

      var indiceSeleccionable = this.pickableObjects.findIndex(function(elemento){
        return elemento.id == mueble.cubo.id;
      });

      this.muebles.splice(indiceMueble, 1);
      this.pickableObjects.splice(indiceSeleccionable, 1);
      this.remove(mueble);
    }
    
  }

  /* Funcion para que suene pop al añadir un mueble */
  sonidoMueble(){
      var that = this;
      this.audioLoader.load( './sonidos/menu.ogg', function( buffer ) {
      that.sonidoAdd.setBuffer( buffer );
      that.sonidoAdd.setLoop( false );
      that.sonidoAdd.setVolume( 0.7 );
      that.sonidoAdd.play();
    });
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
      return elemento.getEncimaDe() == mueble.getIdent();
    });

    // Si el mueble tiene otro mueble encima no se puede mover
    if(typeof tieneMuebleEncima !== 'undefined'){
      resultado[0] = true;
    }
 

    // Si estoy encima de otro mueble guardo la altura
    if(mueble.getEncimaDe() > 0){
      resultado[1] = this.muebles.find(function(elemento){
        return elemento.getIdent() == mueble.getEncimaDe();
      }).getAltura();
    }

    // Actualizo colisionadores del mueble
    mueble.updateMatrixWorld();
    var aux = mueble.getBbox().box.clone().applyMatrix4(mueble.matrixWorld);

    // Compruebo si colisiona con las paredes de la habitacion
    this.paredes.forEach(element => {
      element.updateMatrixWorld();

      var aux2 = element.getBbox().box.clone().applyMatrix4(element.matrixWorld);
      
      if (aux.intersectsBox(aux2)){
        resultado[0] = true;
      }
    });

    // Compruebo si colisiona con otro mueble
    this.muebles.forEach(element => {
      element.updateMatrixWorld();

      var aux = mueble.getBbox().box.clone().applyMatrix4(mueble.matrixWorld);

      var aux2 = element.getBbox().box.clone().applyMatrix4(element.matrixWorld);
      
      if(mueble.getIdent() != element.getIdent()){
        // Si choca con otro mueble distinto
        if (aux.intersectsBox(aux2)){
          // Si el elemento se puede poner encima del otro
          if(element.getPonerEncima() && mueble.getEstarEncima() && !acaboDePonerloAbajo){
            aux.translate(new THREE.Vector3(0.0, element.altura, 0.0));

            that.muebles.forEach(element2 => {
              element2.updateMatrixWorld();
        
              var aux3 = element2.getBbox().box.clone().applyMatrix4(element2.matrixWorld);
              
              // Si se choca con otro mueble no lo subo, si no si lo subo
              if (mueble.getIdent() != element2.getIdent() && aux.intersectsBox(aux3)){ // aqui antes comparaba ident con element y no element2
                resultado[0] = true;
              }

              if(!resultado[0]){
                resultado[1] = element.getAltura();
                mueble.setEncimaDe(element.getIdent());
                acaboDePonerloEncima = true;
              }
            });

          }
          else{ // Si no se puede poner encima choca
            resultado[0] = true;
          }
        }
        else if(mueble.getEncimaDe() > 0 && !acaboDePonerloEncima){ // Si ya esta encima
          var elemento_abajo = that.muebles.find(function(elemento){
              return elemento.getIdent() == mueble.getEncimaDe();
            });

          aux.translate(new THREE.Vector3(0.0, -elemento_abajo.altura, 0.0));

          elemento_abajo.updateMatrixWorld();

          var aux3 = elemento_abajo.getBbox().box.clone().applyMatrix4(elemento_abajo.matrixWorld);
          
          // Aqui hay que comprobar que cuando lo bajo no choque con nadie

          that.muebles.forEach(element2 => {
            var aux4 = element2.getBbox().box.clone().applyMatrix4(element2.matrixWorld);
            if(mueble.getIdent() != element2.getIdent() && aux.intersectsBox(aux4)){
              if(mueble.getEstarEncima() && element2.getPonerEncima()){
                if(element2.getAltura() > elemento_abajo.getAltura()){
                  resultado[1] = element2.getAltura();
                  mueble.setEncimaDe(element2.getIdent());
                }
                if(!aux.intersectsBox(aux3)){ // Si no colisiona  con el anterior objeto con el que estaba encima pongo el nuevo
                  resultado[1] = element2.getAltura();
                  mueble.setEncimaDe(element2.getIdent());
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
            mueble.setEncimaDe(-1);
            acaboDePonerloAbajo = true;
          }
          
        }
      }
    });

    return resultado;
  }

  getMuebles(){
    return this.muebles;
  }

  calcularCoordenadas(evento, camara){
    return this.suelo.calcularCoordenadas(evento, camara);
  }

  getPickableObjects(){
    return this.pickableObjects;
  }
}






export { Habitacion }

    
