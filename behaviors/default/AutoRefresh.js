// Function to check temperature and update object color
const checkTemperatureAndUpdateColor = (object) => {
  const temperature = generateDynamicTemperature();

  if (temperature > 30) {
    // Change object color to red
    object.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(0xff0000); // Red color
      }
    });

    // Announce the temperature is high
    const message = `The temperature of ${
      object.name || "this object"
    } is high: ${temperature}°C.`;
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);

    console.log(message);
  } else {
    // Reset object color to its original
    object.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(0xffffff); // Original color (white)
      }
    });
  }
};

// Modify the existing loadModelPromise to include temperature check
const loadModelPromise = new Promise((resolve, reject) => {
  gltfLoader.load(
    "./assets/Change New.glb",
    (gltf) => {
      model = gltf.scene;

      model.position.set(0, -1.6, 0);
      const scaleFactor = 2;
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);

      group.add(model);
      console.log(model);

      model.children.forEach((child, index) => {
        if ((index >= 0 && index <= 4) || (index >= 16 && index <= 70)) {
          allowedObjects.add(child);
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

      // Check temperature and update color for all allowed objects
      allowedObjects.forEach((object) => {
        checkTemperatureAndUpdateColor(object);
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

loadModelPromise
  .then((model) => {})
  .catch((error) => {
    console.error("Error loading GLTF model:", error);
  });
