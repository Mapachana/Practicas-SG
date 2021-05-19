import * as THREE from '../libs/three.module.js'

// import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'


class SitioSentarse extends THREE.Mesh{

    constructor(gui, titlegui){
        super();
        //this.createGUI(gui, titlegui);

        // Creo la geometria y material e instancio objeto
        var cojin_geo = new THREE.BoxBufferGeometry(5, 1, 5);
        var material = new THREE.MeshPhongMaterial({color: 0xFF0000});

        this.cojin = new THREE.Mesh(cojin_geo, material);
        this.add(this.cojin);

        this.cojin.position.set(0.0, 0.5, 0.0);

        var respaldo_geo = new THREE.BoxBufferGeometry(5,5,1);
        
        this.respaldo = new THREE.Mesh(respaldo_geo, material);

        this.add(this.respaldo);

        this.respaldo.position.set(0.0, 2.5, 2.5);
        
    }

    createGUI (gui,titleGui) {
    }
     
    update () {
    }

}

class Silla extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      var forma = new THREE.Shape();

      forma.moveTo( 0, 0.75 );
      forma.bezierCurveTo( 0, 0.75, -0.1, 1,-0.25,1);
      forma.bezierCurveTo( -0.55, 1, -0.55, 0.65, -0.55, 0.65 );
      forma.bezierCurveTo( -0.55, 0.45, -0.35, 0.33, -0.05, 0.05 );
      forma.bezierCurveTo( 0.35, 0.33, 0.55, 0.45, 0.55, 0.65 );
      forma.bezierCurveTo( 0.55, 0.65, 0.55, 1, 0.25, 1 );
      forma.bezierCurveTo( 0.1, 1, 0, 0.75, 0, 0.75 );

      //forma.absellipse(1,1, 0.5, 1, 0, 2*Math.PI);

      var path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(5,0,0),
        new THREE.Vector3(5,5,0),
        new THREE.Vector3(10,5,0),
      ])

      var opciones = { //Extrusion con bisel
        steps: 50,
        depth: 32,
        bevelEnabled: false,
        extrudePath: path
      };

      this.geo = new THREE.ExtrudeBufferGeometry(forma, opciones);
      var material = new THREE.MeshNormalMaterial();

      this.objeto = new THREE.Mesh(this.geo, material);

      this.add(this.objeto);
  }

  createGUI (gui,titleGui) {

    this.guiControls = new function () {
      // Traslacion en x de la bola y escalado en x,z del cilindro
      this.trasl_x = 5;
    } 

    var that = this;

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'trasl_x', 2, 10, 0.2).name ('trasl_x :').onChange(function(){
      
    });
  }
       
  update () {
    
  }

}

// ────────────────────────────────────────────────────────────────────────────────

// TODO exportar las clases
export { Silla }

    
