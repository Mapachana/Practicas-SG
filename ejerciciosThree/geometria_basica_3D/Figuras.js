
import * as THREE from '../libs/three.module.js'

class Cubo extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    //this.material = new THREE.MeshNormalMaterial(); // Creo que el material
    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.geometry = new Three.BoxGeometry(1, 1, 1); // Creo la geometría

    this.cubo = new THREE.Mesh(this.geometry, this.material); // Creo el cubo con la geometría y material asociados
    this.add(this.cubo); // Cuelgo el cubo al arbol.

  }

  createGUI(GUI, titleGui){
    this.guiControls = new function (){
      this.sizeX = 1;
      this.sizeY = 1;
      this.sizeZ = 1;
    }

      var folder = GUI.addFolder(titleGui);
      folder.add (this.guiControls, 'sizeX', 0.1, 10, 0.2).name ('sizeX : ');
      folder.add (this.guiControls, 'sizeY', 0.1, 10, 0.2).name ('sizeY : ');
      folder.add (this.guiControls, 'sizeZ', 0.1, 10, 0.2).name ('sizeZ : ');
      folder.listen();
  }

  update(){
    this.cubo.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
  }
}

export { Cubo }
