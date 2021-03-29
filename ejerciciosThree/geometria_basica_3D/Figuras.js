
import * as THREE from '../libs/three.module.js'

class Cubo extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
    //this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.geometry = new THREE.BoxGeometry(1, 1, 1); // Creo la geometría

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
      /*folder.listen();*/
  }

  update(){
    this.cubo.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
  }
}

class Cono extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
    //this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.geometry = new THREE.ConeGeometry(1, 1, 10); // Creo la geometría

    this.cono = new THREE.Mesh(this.geometry, this.material); // Creo el cubo con la geometría y material asociados
    this.add(this.cono); // Cuelgo el cubo al arbol.

  }

  createGUI(GUI, titleGui){
    this.guiControls = new function (){
      this.radio = 1;
      this.altura = 1;
      this.segmentos_radiales = 10;
    }

    var that = this;

      var folder = GUI.addFolder(titleGui);
      folder.add (this.guiControls, 'radio', 0.1, 10, 0.2).name ('radio : ').onChange(function(){
        that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.segmentos_radiales);
      });
      folder.add (this.guiControls, 'altura', 0.1, 10, 0.2).name ('altura : ').onChange(function(){
        that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.segmentos_radiales);
      });
      folder.add (this.guiControls, 'segmentos_radiales', 1, 20, 1).name ('segmentos radiales : ').onChange(function(){
        that.cono.geometry = new THREE.ConeGeometry(that.guiControls.radio, that.guiControls.altura, that.guiControls.segmentos_radiales);
      });
      /*folder.listen();*/
  }

  update(){
    /*this.geometry = new THREE.ConeGeometry(this.guiControls.radio, this.guiControls.altura, this.guiControl.segmentos_radiales);

    this.cono = new THREE.Mesh(this.geometry, this.material);*/

  }
}

export { Cubo, Cono }
