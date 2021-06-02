import * as THREE from '../libs/three.module.js'

 import { ThreeBSP } from '../libs/ThreeBSP.js'
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
      this.estarEncima = true;
      this.encimaDe = -1;

      // Mueble que puede tener otros encima y altura
      this.ponerEncima = false;
      this.altura = 1.05;

      var cubo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      cubo.translate(0.0, 0.5, 0.0);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      this.cubo = new THREE.Mesh(cubo, material);

      var bboxaux = new THREE.Box3();
      bboxaux.setFromObject(this.cubo);
      this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
      this.bbox.visible = true;

      this.add(this.cubo);
      this.add(this.bbox);
      
      this.nombre = "mueble generico";

  }
  createGUI (gui,titleGui) {

    
  }
       
  update () {
   
  }

}

class Mesa extends Mueble{
  constructor(identificador, gui, titlegui){
    super(identificador, gui, titlegui);
    this.createGUI(gui, titlegui);

    this.estarEncima = false;
    this.encimaDe = -1;

    // Mueble que puede tener otros encima y altura
    this.ponerEncima = true;
    this.altura = 1.05;

    var cubo = new THREE.BoxGeometry(1.0, 1.0, 1.0, 1.0, 1.0, 1.0);
    cubo.translate(0.0, 0.5, 0.0);

    var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

    this.cubo = new THREE.Mesh(cubo, material);

    /*
    CODIGO DE UNA TAZA PARA LUEGO
    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
  
    var cil_ext = new THREE.CylinderGeometry(0.5, 0.5, 0.75, 30);
    var cil_int = new THREE.CylinderGeometry(0.35, 0.35, 0.75, 30);
    var asa = new THREE.TorusGeometry(0.2, 0.1, 10, 100);

    cil_ext.translate(0, 0.35, 0);
    cil_int.translate(0, 0.35, 0);
    asa.translate(0, 0.35, 0);
    cil_int.translate(0, 0.15, 0);
    asa.translate(0.5, 0.0, 0);

    var cil_ext_BSP = new ThreeBSP(cil_ext);
    var taza_media = cil_ext_BSP.union(new ThreeBSP(asa));
    var taza_final = taza_media.subtract(new ThreeBSP(cil_int));

    

    this.cubo = taza_final.toMesh(this.material);*/

    var bboxaux = new THREE.Box3();
    bboxaux.setFromObject(this.cubo);
    this.bbox = new THREE.Box3Helper (bboxaux, 0xFF0000);
    this.bbox.visible = true;

    this.add(this.cubo);
    this.add(this.bbox);


    this.nombre="mesa";

  }
  createGUI (gui,titleGui) {
  }
      
  update () {
  }
}


export { Mueble, Mesa }

    
