import * as THREE from '../libs/three.module.js'

import { ThreeBSP } from '../libs/ThreeBSP.js'
// import { MTLLoader } from '../libs/MTLLoader.js'
// import { OBJLoader } from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'


class Bicho extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);

      // Creo la cabeza del comecocos con csv (estoy intentando crear el comecocos con dos medias esferas para animar la boca pero no me da tiempo, el comecoco simple esta en la otra clase)
    /* Si me diera tiempo a crearlo seria animarlo con una rotacion en el update de anim3 de la otra clase y el comecocos seria instancair esta clase
    pero no me da*/
      var bola_parcial = new THREE.SphereGeometry(1,30,30,0,Math.PI, 0, 2*Math.PI);
      bola_parcial.rotateX(Math.PI);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      var cilindro = new THREE.CylinderGeometry(0.2, 0.2, 10, 20, 20);

      cilindro.rotateZ(Math.PI/2);
      cilindro.translate(0, 0.5, 0);

      var esfera_BSP = new ThreeBSP(bola_parcial);
      var geo = esfera_BSP.subtract(new ThreeBSP(cilindro));

      var bola2 = new THREE.SphereGeometry(1,30,30,0,Math.PI, 0, 2*Math.PI);
      bola2.rotateX(Math.PI);
      bola2.translate(0,-1,0);
      this.bola2 = new THREE.Mesh(bola2, material);
      this.add(this.bola2);


      this.comecocos1 = geo.toMesh(material);
      this.add(this.comecocos1);

      
  }

  createGUI (gui,titleGui) {

    
  }
       
  update () {
    TWEEN.update();
  }

}

class Comecocos extends THREE.Mesh{

  constructor(gui, titlegui){
      super();
      this.createGUI(gui, titlegui);
      /* Aqui instanciaria le otro comecocos si me hubiera dado tiepo
      this.coso = new Bicho(gui, titlegui);
      this.add(this.coso);*/
      // Como no me ha dado tiempo a hacer el otro comecocos para animar la boca lo voy a hacer con el otro mas simple

      // Creo la cabeza del comecocos con csv

      var bola_parcial = new THREE.SphereGeometry(1,30,30);

      var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

      var cilindro = new THREE.CylinderGeometry(0.2, 0.2, 10, 20, 20);

      cilindro.rotateZ(Math.PI/2);
      cilindro.translate(0, 0.5, 0);

      var esfera_BSP = new ThreeBSP(bola_parcial);
      var geo = esfera_BSP.subtract(new ThreeBSP(cilindro));

      this.comecocos = geo.toMesh(material);
      this.add(this.comecocos);

      // Forma de P a seguir por el comecocos, en el plano y = 3 para darle altura

      this.path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3, -5),
        new THREE.Vector3(0, 3, -10),
        new THREE.Vector3(10, 3, -10),
        new THREE.Vector3(10, 3, -5),
        new THREE.Vector3(4, 3, -5),
        new THREE.Vector3(4, 3, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(0, 3, -5)
      ]);

      // Creo la curva visible del spline a seguir por el comecocos
      var puntos = this.path.getPoints(30);

      var spline_geo = new THREE.Geometry();
      spline_geo.vertices = puntos;
      var materialRojo = new THREE.MeshPhongMaterial({color:0xFF0000});
      this.spline_visible = new THREE.Line(spline_geo, materialRojo);
      
      this.add(this.spline_visible);


      // Creo las dos animaciones de recorrer la linea

      // Creo primera animacion (parte superior de la P)

      var origen1 = { lambda: 0};
      var destino1 = { lambda: 0.6};

      var that = this;

      this.anim1 = new TWEEN.Tween(origen1).to(destino1, 6000);
      this.anim1.easing(TWEEN.Easing.Quadratic.InOut);
      this.anim1.onUpdate(function(){
        var nueva_pos = that.path.getPointAt(origen1.lambda);
        that.comecocos.position.copy(nueva_pos);

        var tang = that.path.getTangentAt(origen1.lambda);
        nueva_pos.add(tang);
        that.comecocos.lookAt(nueva_pos);
      });

      // Creo segunda animacion (parte inferior de la P)

      var origen2 = { lambda: 0.6};
      var destino2 = { lambda: 1};

      this.anim2 = new TWEEN.Tween(origen2).to(destino2, 4000);
      this.anim2.easing(TWEEN.Easing.Quadratic.InOut);
      this.anim2.onUpdate(function(){
        var nueva_pos = that.path.getPointAt(origen2.lambda);
        that.comecocos.position.copy(nueva_pos);

        var tang = that.path.getTangentAt(origen2.lambda);
        nueva_pos.add(tang);
        that.comecocos.lookAt(nueva_pos);
      });

      // Encadeno y hago empezar

      this.anim1.chain(this.anim2);
      this.anim2.chain(this.anim1);

      this.anim1.start();

      // Animacion de abrir y cerrar la boca
      var origen3 = {alfa : 0};
      var destino3 = {alfa : Math.PI/2};

      this.anim3 = new TWEEN.Tween(origen3).to(destino3, 2000);
      this.anim3.onUpdate(function(){
        /* Falta la parte en la que abre y cierra la boca, mi idea era hacinedo recalculando la geometria en cada 
        vez de nuevo usanod csv partiendo de una bola con el ultimo parametro cambiado, pero es tan ineficiente
        que mi ordenador no le funciona bien asi (va realentizado) y no se me ocurre otra forma de hacerlo.
        Dejo el codigo que tenia por si sirve de algo
        Dejo tambien el resto del codigo de la animacion3 para que se vea que se gharia asi similar
        En el update se deberia animar la boca bajando o subiendo y el yoyo haria que volviera a la posicion inicial */
        /* Tambien si se hiciera con dos medias esferas se podria animar la de abajo, pero no me da tiempo a cambiar le modelado*/
        
        /* Con el comecocos en 2 piezas seria ir cambiandole la rotacion a la pieza de abajo en el update, pero me he ddado cuenta tarde*/
        /*var bola_parcial = new THREE.SphereGeometry(1,30,30, 0, Math.PI*2, 0, Math.PI+2*origen3.alfa);

        var material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

        var cilindro = new THREE.CylinderGeometry(0.2, 0.2, 10, 20, 20);

        cilindro.rotateZ(Math.PI/2);
        cilindro.translate(0,0.5, 0);

        var esfera_BSP = new ThreeBSP(bola_parcial);
        var geo = esfera_BSP.subtract(new ThreeBSP(cilindro));
        
        that.comecocos.Geometry = geo;*/
      })
      this.anim3.yoyo(true);
      this.anim3.repeat(Infinity);
      this.anim3.onComplete(function(){
        origen3.alfa = 0;
      })
      this.anim3.start();
  }

  createGUI (gui,titleGui) {

    
  }
       
  update () {
    TWEEN.update();
  }

}


export { Comecocos }

    
