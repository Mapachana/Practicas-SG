
import * as THREE from '../libs/three.module.js'

class CorazonBisel extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    //this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
  
    var formaCorazon = new THREE.Shape();

    formaCorazon.moveTo( 0, 75 );
    formaCorazon.bezierCurveTo( 0, 75, -10, 100,-25,100);
    formaCorazon.bezierCurveTo( -55, 100, -55, 65, -55, 65 );
    formaCorazon.bezierCurveTo( -55, 45, -35, 33, -5, 5 );
    formaCorazon.bezierCurveTo( 35, 33, 55, 45, 55, 65 );
    formaCorazon.bezierCurveTo( 55, 65, 55, 100, 25, 100 );
    formaCorazon.bezierCurveTo( 10, 100, 0, 75, 0, 75 );

    var opcionesBisel = { //Extrusion con bisel
      steps: 2,
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10
    };

    this.geometry = new THREE.ExtrudeGeometry(formaCorazon, opcionesBisel); // Creo la geometría

    this.cuerpo = new THREE.Mesh(this.geometry, this.material); // Creo el cubo con la geometría y material asociados
    this.add(this.cuerpo); // Cuelgo el cubo al arbol.

  }

  createGUI(GUI, titleGui){
  }

  update(){
  }
}


class CorazonPath extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    //this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    this.material = new THREE.MeshNormalMaterial(); // Creo que el material
  
    var formaCorazon = new THREE.Shape();

    formaCorazon.moveTo( 0, 75 );
    formaCorazon.bezierCurveTo( 0, 75, -10, 100,-25,100);
    formaCorazon.bezierCurveTo( -55, 100, -55, 65, -55, 65 );
    formaCorazon.bezierCurveTo( -55, 45, -35, 33, -5, 5 );
    formaCorazon.bezierCurveTo( 35, 33, 55, 45, 55, 65 );
    formaCorazon.bezierCurveTo( 55, 65, 55, 100, 25, 100 );
    formaCorazon.bezierCurveTo( 10, 100, 0, 75, 0, 75 );

    var path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(50,0,0),
      new THREE.Vector3(25,25,15),
      new THREE.Vector3(0,50,0),
      new THREE.Vector3(-25,75,0),
    ]);

    var opcionesSinBisel = {
      steps: 50,
      depth: 16,
      bevelEnabled: false,
      extrudePath: path
    };

    this.geometry = new THREE.ExtrudeGeometry(formaCorazon, opcionesSinBisel); // Creo la geometría

    this.cuerpo = new THREE.Mesh(this.geometry, this.material); // Creo el cubo con la geometría y material asociados
    this.add(this.cuerpo); // Cuelgo el cubo al arbol.

  }

  createGUI(GUI, titleGui){
  }

  update(){
  }
}

export { CorazonBisel, CorazonPath }
