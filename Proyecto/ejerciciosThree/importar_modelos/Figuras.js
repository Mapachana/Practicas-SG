
import * as THREE from '../libs/three.module.js'

import { MTLLoader } from "../libs/MTLLoader.js";
import { OBJLoader } from "../libs/OBJLoader.js";

class Coche extends THREE.Object3D{
  constructor(GUI, titleGui){
    super(); // Llamo al constructor de la clase Object3D

    var that = this;

    var material_loader = new MTLLoader();
    var object_loader = new OBJLoader();

    material_loader.load("../models/porsche911/911.mtl",
        function (materials) {
            //materials.preload();
            object_loader.setMaterials(materials);
            object_loader.load("../models/porsche911/Porsche_911_GT2.obj",
                function (object) {
                    var modelo = object;
                    that.add(modelo);
                },
                null,
                null
            );
        }
    );

  }

}



export { Coche }
