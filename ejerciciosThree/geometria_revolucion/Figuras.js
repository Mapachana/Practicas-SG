
import * as THREE from '../libs/three.module.js'

class GeometriaRevolucion extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
  
    this.points = [];

    this.points.push(new THREE.Vector3(0, 0, 0));
    this.points.push(new THREE.Vector3(3.0, 0, 0));
    this.points.push(new THREE.Vector3(3.0, 1.0, 0));
    this.points.push(new THREE.Vector3(2.75, 1.5, 0));
    this.points.push(new THREE.Vector3(2.0, 2.25, 0));
    this.points.push(new THREE.Vector3(1.75, 3.25, 0));
    this.points.push(new THREE.Vector3(1.5, 4.5, 0));
    this.points.push(new THREE.Vector3(1.25, 6.0, 0));
    this.points.push(new THREE.Vector3(1.25, 7.0, 0));
    this.points.push(new THREE.Vector3(1.5, 7.25, 0));
    this.points.push(new THREE.Vector3(1.75, 7.75, 0));
    this.points.push(new THREE.Vector3(2.0, 8.5, 0));
    this.points.push(new THREE.Vector3(2.0, 9.0, 0));
    this.points.push(new THREE.Vector3(1.75, 9.75, 0));
    this.points.push(new THREE.Vector3(1.5, 10.25, 0));
    this.points.push(new THREE.Vector3(1.25, 10.5, 0));
    this.points.push(new THREE.Vector3(0.75, 10.75, 0));
    this.points.push(new THREE.Vector3(0, 11.0, 0));

    this.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, 0.0, this.guiControls.phi_finish); // Creo la geometría

    this.cuerpo = new THREE.Mesh(this.geometry, this.material); // Creo el cubo con la geometría y material asociados
    this.add(this.cuerpo); // Cuelgo el cubo al arbol.

  }

  createGUI(GUI, titleGui){
    this.guiControls = new function (){
      this.segments = 12;
      this.phi_finish = 2*Math.PI;
    }

    var that = this;

      var folder = GUI.addFolder(titleGui);
      folder.add (this.guiControls, 'segments', 5, 100, 5).name ('segments : ').onChange( function() {
        that.cuerpo.geometry = new THREE.LatheGeometry(that.points, that.guiControls.segments, 0.0, that.guiControls.phi_finish);
      });
      folder.add (this.guiControls, 'phi_finish', 0.0, 2*Math.PI, 0.2).name ('phi_finish : ').onChange( function() {
        that.cuerpo.geometry = new THREE.LatheGeometry(that.points, that.guiControls.segments, 0.0, that.guiControls.phi_finish);
      });
  }

  update(){
  }
}

export { GeometriaRevolucion }
