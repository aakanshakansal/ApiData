// import { PawnBehavior } from "../PrototypeBehavior";
// import * as THREE from "three";
// import * as dat from "dat.gui";
// import Highcharts from "highcharts";

// class LightPawn extends PawnBehavior {
//   setup() {
//     let trm = this.service("ThreeRenderManager");
//     let group = this.shape;
//     let THREE = Microverse.THREE;
//     let model;

//     const gltfLoader = new THREE.GLTFLoader();
//     const dracoLoader = new THREE.DRACOLoader();
//     dracoLoader.setDecoderPath(
//       "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
//     );
//     gltfLoader.setDRACOLoader(dracoLoader);

//     this.lights = [];
//     const loadModelPromise = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "./assets/Change New.glb",
//         (gltf) => {
//           model = gltf.scene;
//           model.position.set(0, -1.6, 0);
//           model.scale.set(2, 2, 2);
//           group.add(model);

//           model.children.forEach((child, index) => {
//             if ((index >= 0 && index <= 4) || (index >= 16 && index <= 70)) {
//               child.children.forEach((subchild, subIndex) => {
//                 if (subIndex >= 2 && subIndex <= 13) {
//                   allowedObjects.add(subchild);
//                 }
//               });
//             }
//           });

//           model.children.forEach((child, index) => {
//             if (index == 71) {
//               allowedObjects.add(child);
//             }
//           });
//           model.children.forEach((child, index) => {
//             if (index == 79) {
//               allowedObjects.add(child);
//             }
//           });

//           resolve(model);
//         },
//         null,
//         (error) => {
//           console.error("Error loading GLTF model:", error);
//           reject(error);
//         }
//       );
//     });

//     loadModelPromise.catch((error) => {
//       console.error("Error loading GLTF model:", error);
//     });
//   }

//   teardown() {
//     let scene = this.service("ThreeRenderManager").scene;
//     scene.background?.dispose();
//     scene.environment?.dispose();
//     scene.background = null;
//     scene.environment = null;

//     if (this.particleSystem) {
//       this.shape.remove(this.particleSystem);
//       this.particleSystem.geometry.dispose();
//       this.particleSystem.material.dispose();
//     }
//   }
// }

// export default {
//   modules: [
//     {
//       name: "Fn",
//       pawnBehaviors: [LightPawn],
//     },
//   ],
// };
import { PawnBehavior } from "../PrototypeBehavior";
import * as THREE from "three";
import * as dat from "dat.gui";
import Highcharts from "highcharts";

class LightPawn extends PawnBehavior {
  setup() {
    let trm = this.service("ThreeRenderManager");
    let group = this.shape;
    let THREE = Microverse.THREE;
    let model;
    let apiValue = 0; // Initial API value set to 0

    const gltfLoader = new THREE.GLTFLoader();
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
    );
    gltfLoader.setDRACOLoader(dracoLoader);

    this.lights = [];
    const allowedObjects = new Set();

    const loadModelPromise = new Promise((resolve, reject) => {
      gltfLoader.load(
        "./assets/Change New.glb",
        (gltf) => {
          model = gltf.scene;
          model.position.set(0, -1.6, 0);
          model.scale.set(2, 2, 2);
          group.add(model);

          model.children.forEach((child, index) => {
            if ((index >= 0 && index <= 4) || (index >= 16 && index <= 70)) {
              child.children.forEach((subchild, subIndex) => {
                if (subIndex >= 2 && subIndex <= 13) {
                  allowedObjects.add(subchild);
                }
              });
            }
          });

          model.children.forEach((child, index) => {
            if (index == 71 || index == 79) {
              allowedObjects.add(child);
            }
          });

          // Attach the event listener for model clicks
          allowedObjects.forEach((object) => {
            object.userData = { isClickable: true }; // Mark objects as clickable
            object.addEventListener("click", () =>
              this.handleModelClick(object)
            );
          });

          resolve(model);
        },
        null,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });

    loadModelPromise.catch((error) => {
      console.error("Error loading GLTF model:", error);
    });

    // Handle model click and toggle API value
    this.handleModelClick = (object) => {
      // Toggle API value between 1 and 0
      apiValue = apiValue === 0 ? 1 : 0;

      // Call the API with the updated value
      this.updateAPI(apiValue);

      // Handle any other functionality, like highlighting the object
      if (apiValue === 1) {
        object.material.color.set(0xff0000); // Highlight the object in red
      } else {
        object.material.color.set(0xffffff); // Reset the object color
      }
    };

    // API call function
    this.updateAPI = (value) => {
      fetch("https://btnstate.onrender.com/toggle-btn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: value }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
        })
        .catch((error) => {
          console.error("Error updating API:", error);
        });
    };
  }

  teardown() {
    let scene = this.service("ThreeRenderManager").scene;
    scene.background?.dispose();
    scene.environment?.dispose();
    scene.background = null;
    scene.environment = null;

    if (this.particleSystem) {
      this.shape.remove(this.particleSystem);
      this.particleSystem.geometry.dispose();
      this.particleSystem.material.dispose();
    }
  }
}

export default {
  modules: [
    {
      name: "Fn",
      pawnBehaviors: [LightPawn],
    },
  ],
};
