import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    this.createGUI(GUI, titleGui); // Llamo a la creación de la GUI del cubo

    var radio_reloj = 10;

    this.bola_reloj = new THREE.SphereGeometry(2, 10, 10, 0, 2*Math.PI);
    var material_azul = new THREE.MeshPhongMaterial({ color: 0xFF1111});

    this.bola_reloj.translate(radio_reloj-1, 0, 0);
    this.manecilla = new THREE.Mesh(this.bola_reloj, material_azul);

    this.add(this.manecilla);

    var num_puntos = 12;
    var punto_geo = new THREE.SphereGeometry(2, 10, 10, 0, 2*Math.PI);
    for (var i = 0; i < num_puntos; ++i) {
      var pointColor = (i === 0 ? 0x1111FF : 0x16DC15); // El primer punto lo pongo azul, el resto verdes
      var angulo = (i * 360 / num_puntos) * (Math.PI / 180); // A radianes
      var material = new THREE.MeshPhongMaterial({ color: pointColor});
      var point = new THREE.Mesh(punto_geo, material);
      point.position.set(Math.sin(angulo) * radio_reloj, 0, Math.cos(angulo) * radio_reloj);
      this.add(point);
    }

    //this.tiempoAnterior = Date.now();  

    this.reloj = new THREE.Clock();
    this.reloj.start();
    
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

    //var tiempoActual = Date.now();
    //var delta_t = (tiempoActual - this.tiempoAnterior) / 1000;
    //this.tiempoAnterior = tiempoActual;



    var delta_t = this.reloj.getDelta();

    this.manecilla.rotation.y += this.guiControls.velocidad * delta_t;

  }
}



export { Reloj }
