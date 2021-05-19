import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Nave extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    // Creo la nave

    //var nave_geo = new THREE.IcosahedronGeometry(1);
    var nave_geo = new THREE.ConeGeometry(0.5,1);
    nave_geo.rotateX(2*Math.PI/4);
    var materialAzul = new THREE.MeshPhongMaterial({color:0x4285F4});

    this.nave = new THREE.Mesh(nave_geo, materialAzul);

    this.add(this.nave);


    // Creo el spline

    this.spline_nave = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0, 0, 0),
      new THREE.Vector3( -5, -5, 0 ),
      new THREE.Vector3( -5, 0, 0 ),
      new THREE.Vector3( -5, 5, 0 ),
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 5, -5, 0),
      new THREE.Vector3( 5, 0, 0 ),
      new THREE.Vector3( 5, 5, 0 ),
      new THREE.Vector3( 0, 0, 0)
    ]);

    var puntos = this.spline_nave.getPoints(30);

    var spline_geo = new THREE.Geometry();
    spline_geo.vertices = puntos;
    var materialRojo = new THREE.MeshPhongMaterial({color:0xEA4335});
    this.spline_visible = new THREE.Line(spline_geo, materialRojo);
    
    this.add(this.spline_visible);

    // Creo primera animacion

    var origen1 = { lambda: 0};
    var destino1 = { lambda: 0.5};

    var that = this;

    this.anim1 = new TWEEN.Tween(origen1).to(destino1, 2000);
    this.anim1.easing(TWEEN.Easing.Quadratic.InOut);
    this.anim1.onUpdate(function(){
      var nueva_pos = that.spline_nave.getPointAt(origen1.lambda);
      that.nave.position.copy(nueva_pos);

      var tang = that.spline_nave.getTangentAt(origen1.lambda);
      nueva_pos.add(tang);
      that.nave.lookAt(nueva_pos);
    });

    // Creo segunda animacion

    var origen2 = { lambda: 0.5};
    var destino2 = { lambda: 1};

    var that = this;

    this.anim2 = new TWEEN.Tween(origen2).to(destino2, 2000);
    this.anim2.easing(TWEEN.Easing.Quadratic.InOut);
    this.anim2.onUpdate(function(){
      var nueva_pos = that.spline_nave.getPointAt(origen2.lambda);
      that.nave.position.copy(nueva_pos);

      var tang = that.spline_nave.getTangentAt(origen2.lambda);
      nueva_pos.add(tang);
      that.nave.lookAt(nueva_pos);
    });

    // Encadeno

    this.anim1.chain(this.anim2);
    this.anim2.chain(this.anim1);

    this.anim1.start();


  }

  createGUI(GUI, titleGui){
    this.guiControls = new function(){
      this.velocidad = 1;
    }

    var that = this;

    var folder = GUI.addFolder(titleGui);

    folder.add(this.guiControls, 'velocidad', -5, 5, 0.2).name('velocidad').listen();

  }

  update(){
    TWEEN.update();
  }
}



export { Nave }
