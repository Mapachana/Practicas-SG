
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto

import { Habitacion } from './Habitacion.js'

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Listado de posibles muebles a añadir
    this.nombres = [];
    this.nombres = ['Mesa', 'Mesa2', 'Mesita', 'Silla', 'Lampara', 'Taza', 'Cama', 'Cajonera', 'Armario'];

    this.coloresLuz = [];
    this.coloresLuz = ['Neutro', 'Blanco', 'Azul', 'Rojo', 'Amarillo', 'Verde'];

    this.modoActual = MyScene.MovingMueble;
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    // Creo el reproductor de sonidos
    this.createSonidos();
    
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.model = new Habitacion(this.gui, "Controles del bicho", this.sonidoAdd, this.audioLoader);
    this.add (this.model);


    // Objeto seleccionado
    this.selectedObject = this.model.muebles[0];
    // Objetos que se pueden seleccionar
    this.pickableObjects = [];

    var that = this;
    this.model.muebles.forEach(element => {
      that.pickableObjects.push(element.cubo);
    });

    
 
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (2, 10, 6);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;

    // Inicio con el control de camara desactivada
    this.cameraControl.enabled = false;
  }

  
  
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    var that = this;
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.lightColor = 'Neutro';
      this.axisOnOff = true;
      this.nuevoMueble = 'Mesa';
      this.aniadirMueble = function(){
        that.modoActual = MyScene.AddingMueble;
      }
      this.moverMueble = function(){
        if(that.selectedObject != null)
          that.modoActual = MyScene.MovingMueble;
      }
    }

    var folderAddMuebles = gui.addFolder("Aniadir");
    
    var tipo_mueble = folderAddMuebles.add(this.guiControls, 'nuevoMueble').options(this.nombres).name("Mueble");
    var aniadir = folderAddMuebles.add(this.guiControls, 'aniadirMueble').name("Añadir");

    var folderMoveMuebles = gui.addFolder("Mover");

    var mover = folderMoveMuebles.add(this.guiControls, 'moverMueble').name("Mover");
  

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ').onChange(function(){
      that.spotLight.intensity = that.guiControls.lightIntensity;
    });
    // Control para el color de la luz ambiental
    folder.add(this.guiControls, 'lightColor').options(this.coloresLuz).name("Color").onChange(function(){
      switch(that.guiControls.lightColor){
        case "Neutro":
          that.ambientLight.color = new THREE.Color(0xCCDDEE);
          break;
        case "Blanco":
          that.ambientLight.color = new THREE.Color(0xFFFFFF);
          break;
        case "Azul":
          that.ambientLight.color = new THREE.Color(0x0000FF);
          break;
        case "Rojo":
          that.ambientLight.color = new THREE.Color(0xFF0000);
          break;
        case "Amarillo":
          that.ambientLight.color = new THREE.Color(0xFFFF00);
          break;
        case "Verde":
          that.ambientLight.color = new THREE.Color(0x00FF00);
          break;
      }
    });
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ').onChange(function(){
      that.axis.visible = that.guiControls.axisOnOff;
    });
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  createSonidos(){
    // create an AudioListener and add it to the camera
    this.listener = new THREE.AudioListener();
    this.getCamera().add( this.listener );
    
    // create a global audio source
    this.sonidoAdd = new THREE.Audio( this.listener );

    // load a sound and set it as the Audio object's buffer
    this.audioLoader = new THREE.AudioLoader();
   

    // Musica de fondo
    this.musicaFondo = new THREE.Audio(this.listener);
    this.musicaFondoLoader = new THREE.AudioLoader();
    var that = this;
      this.musicaFondoLoader.load( './sonidos/ScottHolmesMusic-UrbanHaze.mp3', function( buffer ) {
      that.musicaFondo.setBuffer( buffer );
      that.musicaFondo.setLoop( true );
      that.musicaFondo.setVolume( 0.5 );
      that.musicaFondo.play();
    });
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x333333), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  // Funcion que devuelve los controles de camara
  getCameraControls () {
    return this.cameraControl;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  onKeyDown (event) {
    var x = event.which || event.keyCode;
    if(this.modoActual == MyScene.MovingMueble){
      if (String.fromCharCode(x) == "W"){
        this.model.moverAdelante(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "A"){
        this.model.moverIzquierda(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "S"){
        this.model.moverAtras(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "D"){
        this.model.moverDerecha(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "Q"){
        this.model.rotarIzquierda(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "E"){
        this.model.rotarDerecha(this.selectedObject);
      }
      else if (String.fromCharCode(x) == "R"){
        this.model.eliminarMueble(this.selectedObject);
      }
    }

    switch (x) {
      case 17 : // Ctrl key
        this.getCameraControls().enabled = true;
    }
    
  }

  onKeyUp (event) {
    var x = event.which || event.keyCode;
    switch (x) {
      case 17 : // Ctrl key
        this.getCameraControls().enabled = false;
    }
  }

  onMouseDown (event) {
    console.log("picking");
    if(this.modoActual == MyScene.MovingMueble){
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX/window.innerWidth)*2-1;
      mouse.y = 1-2*(event.clientY/window.innerHeight);

      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.getCamera());

      var pickedObjects = raycaster.intersectObjects(this.pickableObjects, true);

      if(pickedObjects.length > 0){
        this.selectedObject = pickedObjects[0].object.parent.parent;
        console.log(pickedObjects.length);
        console.log(this.selectedObject.ident);
      }
    }
    else if(this.modoActual == MyScene.AddingMueble){
      var coords = this.model.suelo.calcularCoordenadas(event, this.getCamera());
      if (coords != null){
        this.model.aniadirMueble(this.guiControls.nuevoMueble, coords);
      }


      
    }
  }

}

// Atributos de clase: Modos de la aplicacion
MyScene.AddingMueble = 1;
MyScene.MovingMueble = 2;


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Añado los listener de la aplicacion
  window.addEventListener ("keydown", (event) => scene.onKeyDown (event), true); // Pulsar tecla
  window.addEventListener ("keyup", (event) => scene.onKeyUp(event), true); // Levantar tecla
  window.addEventListener ("mousedown", (event) => scene.onMouseDown(event), true); // Pulsar con el raton (picking)
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
