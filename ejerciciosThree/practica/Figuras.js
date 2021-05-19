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

      this.silla = new SitioSentarse(gui, titlegui);
      this.add(this.silla);

      this.silla.position.y = 1;

      var barra_geo = new THREE.CylinderBufferGeometry(1.0, 1.0, 1.0, 10, 10);
      var material = new THREE.MeshPhongMaterial({color: 0x00FF00});

      barra_geo.translate(0, 0.5, 0);

      this.barra = new THREE.Mesh(barra_geo, material);
      this.add(this.barra);
      

      var escalado_ini = {y : 1};
      var escalado_fin = {y : 5};

      var that = this;

      this.anim = new TWEEN.Tween(escalado_ini);
      this.anim.to(escalado_fin, 5000);
      this.anim.easing(TWEEN.Easing.Quadratic.InOut);
      this.anim.onComplete(function(){
        escalado_ini = 1;
      })
      this.anim.yoyo(true);
      this.anim.repeat(Infinity);
      this.anim.onUpdate(function(){
        that.silla.position.set(0, escalado_ini.y, 0);
        that.barra.scale.set(1, escalado_ini.y, 1);
      })
      this.anim.start();

      var rot_ini = {alfa : 0};
      var rot_fin = {alfa : 2*Math.PI};

      this.animrot = new TWEEN.Tween(rot_ini);
      this.animrot.to(rot_fin, 3000);
      this.animrot.repeat(Infinity);
      this.animrot.onUpdate(function(){
        that.silla.rotation.y = rot_ini.alfa;
      })
      this.animrot.onComplete(function(){
        rot_ini = 0;
      })
      this.animrot.start();
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
    TWEEN.update();
  }

}

// ────────────────────────────────────────────────────────────────────────────────

// TODO exportar las clases
export { Silla }

    
