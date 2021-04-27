import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
// import * as TWEEN from '../libs/tween.esm.js'


class Esfera_traslx extends THREE.Mesh{

    constructor(gui, titlegui){
        super();
        //this.createGUI(gui, titlegui);

        // Creo la geometria y material e instancio objeto
        var esfera_geo = new THREE.SphereGeometry(1, 10, 10);
        var material = new THREE.MeshPhongMaterial({color: 0xFF0000});

        this.esfera = new THREE.Mesh(esfera_geo, material);
        this.add(this.esfera);

        // Pongo la esfera a 5 en el eje x de base (Se puede cambiar luego)
        this.esfera.position.x = 5;
        
    }

    createGUI (gui,titleGui) {

        /*this.guiControls = new function () {
            // TODO Añadir atributos de la interfaz
            this.trasl_x = 5;
        } 

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'trasl_x', 2, 10, 0.2).name ('trasl_x :').onChange(function(){
          that.esfera.position.x = that.guiControls.trasl_x;    
          
        });*/
    }
     
    update () {
    }

    // Funcion para modifica la posicion de la esfera en el eje x segun un parametro
    modificar_pos(nueva_pos){
      this.esfera.position.x = nueva_pos;
    }

}

class Esfera extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      // Instancio esfera
      this.esfera = new Esfera_traslx(gui, titlegui);
      this.add(this.esfera);
      
      // Instancio reloj para las animaciones
      this.reloj = new THREE.Clock();

      // Parametros de la animacion de subir y bajar de la esfera
      this.velocidad = 2.0;
      //this.velocidad2 = 20.0;
      this.direccion = 1;

      // Instancio cilindro con material transparente (fancy)
      this.altura_cilindro = 10;
      var cilindro_geo = new THREE.CylinderGeometry(1, 1, this.altura_cilindro, 10, 10);
      var material = new THREE.MeshPhongMaterial({color: 0x00FF00});
      material.transparent = true;
      material.opacity = 0.5;
      this.cilindro = new THREE.Mesh(cilindro_geo, material);
      this.add(this.cilindro);

      // Subo el cilindro y lo escalo con los valores correspondientes
      this.cilindro.position.y = this.altura_cilindro/2;
      this.cilindro.scale.set(this.guiControls.trasl_x, 1.0, this.guiControls.trasl_x);
      
  }

  createGUI (gui,titleGui) {

    this.guiControls = new function () {
      // Traslacion en x de la bola y escalado en x,z del cilindro
      this.trasl_x = 5;
    } 

    var that = this;

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'trasl_x', 2, 10, 0.2).name ('trasl_x :').onChange(function(){
      that.esfera.modificar_pos(that.guiControls.trasl_x);
      that.cilindro.scale.set(that.guiControls.trasl_x, 1.0, that.guiControls.trasl_x);
      
    });
  }
       
  update () {
    // Cojo delta time
    var delta_time = this.reloj.getDelta();
    
    // Rotacion en y de la esfera
    this.esfera.rotation.y += this.velocidad * delta_time; 

    // Movimiento de sube y baja en y de la esfera
    this.esfera.position.y += this.direccion * this.velocidad * delta_time;

    if (this.esfera.position.y >= this.altura_cilindro){
      this.direccion = -1.0;
    }
    if(this.esfera.position.y <= 0){
      this.direccion = 1.0;
    }
  }

}

// ────────────────────────────────────────────────────────────────────────────────

// TODO exportar las clases
export { Esfera }

    
