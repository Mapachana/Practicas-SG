import { ThreeBSP } from "../libs/ThreeBSP.js";
import * as THREE from '../libs/three.module.js'

class Taza extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    //this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
  
    var cil_ext = new THREE.CylinderGeometry(10, 10, 15, 30);
    var cil_int = new THREE.CylinderGeometry(7, 7, 15, 30);
    var asa = new THREE.TorusGeometry(4, 2, 10, 100);

    cil_int.translate(0, 3, 0);
    asa.translate(10, 0.0, 0);

    var cil_ext_BSP = new ThreeBSP(cil_ext);
    var taza_media = cil_ext_BSP.union(new ThreeBSP(asa));
    var taza_final = taza_media.subtract(new ThreeBSP(cil_int));

    this.taza = taza_final.toMesh(this.material);
    this.add(this.taza);

  }

  createGUI(GUI, titleGui){
  }

  update(){
  }
}



export { Taza }
