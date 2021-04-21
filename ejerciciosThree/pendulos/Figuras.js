import * as THREE from '../libs/three.module.js'

class Pendulo_Inferior extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
    var materialAzul = new THREE.MeshPhongMaterial({color:0x4285F4});
    var materialVerde = new THREE.MeshPhongMaterial({color:0x34A853});
    var materialRojo = new THREE.MeshPhongMaterial({color:0xEA4335});

    this.bolageometry = new THREE.SphereGeometry(0.5);

    this.palo = new Pendulo_Inferior_Caja(GUI, "Longitud pendulo");

    this.palo.position.set(0, 1, 0);

    this.bola = new THREE.Mesh(this.bolageometry, materialRojo);
    
    this.add(this.palo);
    this.add(this.bola);


  
    
  }

  createGUI(GUI, titleGui){
    this.guiControls = new function(){
      this.rotacion = 0;
    }

    var that = this;

    var folder = GUI.addFolder(titleGui);

    folder.add(this.guiControls, 'rotacion', -Math.PI/4, Math.PI/4, 0.1).name('rotacion').onChange(function(){
      that.rotation.set(0, 0, that.guiControls.rotacion);
    });

  }

  update(){
  }
}

class Pendulo_Inferior_Caja extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    var materialAzul = new THREE.MeshPhongMaterial({color:0x4285F4});

    this.palogeometry = new THREE.BoxGeometry(2, 10, 0.5);

    this.palogeometry.translate(0, -5, 0);

    this.palo = new THREE.Mesh(this.palogeometry, materialAzul);
    
    this.add(this.palo);
  
  }

  createGUI(GUI, titleGui){
    this.guiControls = new function(){
      this.escala = 1;
    }

    var that = this;

    var folder = GUI.addFolder(titleGui);
    folder.add(this.guiControls, 'escala', 1, 2, 0.1).name('escala').onChange(function() {
      that.palo.scale.set(1.0, that.guiControls.escala);
    });

  }

  update(){
  }
}



export { Pendulo_Inferior }
