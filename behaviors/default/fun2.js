// // import { PawnBehavior } from "../PrototypeBehavior";

// // class FunPawn extends PawnBehavior {
// //   setup() {
// //     let trm = this.service("ThreeRenderManager");
// //     let THREE = Microverse.THREE;

// //     // Tone mapping exposure settings
// //     if (this.actor._cardData.toneMappingExposure !== undefined) {
// //       trm.renderer.toneMappingExposure =
// //         this.actor._cardData.toneMappingExposure;
// //     }

// //     // Create a video element
// //     const video = document.createElement("video");
// //     video.src = "./assets/Fastest Way to Learn React in 2024 🔥.mp4"; // Replace with your video file path
// //     video.crossOrigin = "anonymous"; // Allow cross-origin if needed
// //     video.loop = true; // Set loop if desired
// //     video.muted = true; // Mute video to allow autoplay
// //     video.playsInline = true; // Required for iOS
// //     video.load(); // Load the video

// //     // Create a texture from the video
// //     const videoTexture = new THREE.VideoTexture(video);
// //     videoTexture.minFilter = THREE.LinearFilter;
// //     videoTexture.magFilter = THREE.LinearFilter;
// //     videoTexture.format = THREE.RGBAFormat;

// //     // Create a material using the video texture
// //     const videoMaterial = new THREE.MeshBasicMaterial({
// //       map: videoTexture,
// //       side: THREE.DoubleSide,
// //     });

// //     // Create a plane geometry for the canvas
// //     const geometry = new THREE.PlaneGeometry(2, 2); // Adjust size as needed
// //     const videoMesh = new THREE.Mesh(geometry, videoMaterial);
// //     videoMesh.position.set(0, 1, 0); // Position the plane in the scene
// //     videoMesh.name = "videoMesh"; // Name the video mesh for reference
// //     trm.scene.add(videoMesh);

// //     // Check if the video was previously played
// //     const wasPlaying = localStorage.getItem("videoPlaying") === "true";

// //     if (wasPlaying) {
// //       video.play().catch((error) => {
// //         console.error("Error playing video:", error);
// //       });
// //     }

// //     // Play the video after the first user interaction
// //     const handleUserInteraction = () => {
// //       video.muted = false; // Unmute the video after interaction
// //       video.play().catch((error) => {
// //         console.error("Error playing video:", error);
// //       });
// //       localStorage.setItem("videoPlaying", "true"); // Store the playing state

// //       // Remove the event listeners after the first interaction
// //       window.removeEventListener("click", handleUserInteraction);
// //       window.removeEventListener("touchstart", handleUserInteraction);
// //     };

// //     // Listen for the first user interaction
// //     window.addEventListener("click", handleUserInteraction);
// //     window.addEventListener("touchstart", handleUserInteraction);

// //     // Add click event to play/pause the video with sound
// //     videoMesh.addEventListener("pointerdown", () => {
// //       if (video.paused) {
// //         video.play().catch((error) => {
// //           console.error("Error playing video:", error);
// //         });
// //       } else {
// //         video.pause();
// //       }
// //     });

// //     // Create buttons for rewind and forward
// //     this.createControlButtons(videoMesh, video);

// //     this.listen("updateShape", "updateShape");
// //   }

// //   createControlButtons(videoMesh, video) {
// //     // Create a div to hold the controls
// //     const controlDiv = document.createElement("div");
// //     controlDiv.style.position = "absolute";
// //     controlDiv.style.bottom = "20px"; // Position controls at the bottom
// //     controlDiv.style.left = "50%";
// //     controlDiv.style.transform = "translateX(-50%)";
// //     controlDiv.style.zIndex = "1000"; // Ensure controls are on top
// //     controlDiv.style.display = "flex";
// //     controlDiv.style.gap = "10px"; // Space between buttons

// //     // Create the rewind button
// //     const rewindButton = document.createElement("button");
// //     rewindButton.innerText = "Rewind 5s";
// //     rewindButton.style.padding = "10px";
// //     rewindButton.onclick = () => {
// //       video.currentTime = Math.max(0, video.currentTime - 5); // Rewind 5 seconds
// //     };

// //     // Create the pause button
// //     const pauseButton = document.createElement("button");
// //     pauseButton.innerText = video.paused ? "Play" : "Pause";
// //     pauseButton.style.padding = "10px";
// //     pauseButton.onclick = () => {
// //       if (video.paused) {
// //         video.play().catch((error) => {
// //           console.error("Error playing video:", error);
// //         });
// //         pauseButton.innerText = "Pause";
// //       } else {
// //         video.pause();
// //         pauseButton.innerText = "Play";
// //       }
// //     };

// //     // Create the forward button
// //     const forwardButton = document.createElement("button");
// //     forwardButton.innerText = "Forward 5s";
// //     forwardButton.style.padding = "10px";
// //     forwardButton.onclick = () => {
// //       video.currentTime = Math.min(video.duration, video.currentTime + 5); // Forward 5 seconds
// //     };

// //     // Append buttons to the control div
// //     controlDiv.appendChild(rewindButton);
// //     controlDiv.appendChild(pauseButton);
// //     controlDiv.appendChild(forwardButton);

// //     // Append control div to the body
// //     document.body.appendChild(controlDiv);
// //   }

// //   teardown() {
// //     console.log("teardown lights");
// //     let scene = this.service("ThreeRenderManager").scene;
// //     scene.background?.dispose();
// //     scene.environment?.dispose();
// //     scene.background = null;
// //     scene.environment = null;

// //     // Remove video mesh
// //     let videoMesh = scene.getObjectByName("videoMesh");
// //     if (videoMesh) {
// //       videoMesh.geometry.dispose();
// //       videoMesh.material.map.dispose();
// //       videoMesh.material.dispose();
// //       scene.remove(videoMesh);
// //     }

// //     // Clear the playing state on teardown
// //     localStorage.removeItem("videoPlaying");

// //     // Remove control buttons
// //     const controlDiv = document.querySelector("div");
// //     if (controlDiv) {
// //       controlDiv.remove();
// //     }
// //   }
// // }

// // export default {
// //   modules: [
// //     {
// //       name: "FUN2",
// //       pawnBehaviors: [FunPawn],
// //     },
// //   ],
// // };

// // function of play pause forward backward on the video itself
// import { PawnBehavior } from "../PrototypeBehavior";

// class FunPawn extends PawnBehavior {
//   setup() {
//     let trm = this.service("ThreeRenderManager");
//     let THREE = Microverse.THREE;

//     // Tone mapping exposure settings
//     if (this.actor._cardData.toneMappingExposure !== undefined) {
//       trm.renderer.toneMappingExposure =
//         this.actor._cardData.toneMappingExposure;
//     }

//     // Create a video element
//     const video = document.createElement("video");
//     video.src = "./assets/Fastest Way to Learn React in 2024 🔥.mp4"; // Replace with your video file path
//     video.crossOrigin = "anonymous"; // Allow cross-origin if needed
//     video.loop = true; // Set loop if desired
//     video.muted = true; // Mute video to allow autoplay
//     video.playsInline = true; // Required for iOS
//     video.load(); // Load the video

//     // Create a texture from the video
//     const videoTexture = new THREE.VideoTexture(video);
//     videoTexture.minFilter = THREE.LinearFilter;
//     videoTexture.magFilter = THREE.LinearFilter;
//     videoTexture.format = THREE.RGBAFormat;

//     // Create a material using the video texture
//     const videoMaterial = new THREE.MeshBasicMaterial({
//       map: videoTexture,
//       side: THREE.DoubleSide,
//     });

//     // Create a plane geometry for the canvas
//     const geometry = new THREE.PlaneGeometry(2, 2); // Adjust size as needed
//     const videoMesh = new THREE.Mesh(geometry, videoMaterial);
//     videoMesh.position.set(0, 1, 0); // Position the plane in the scene
//     videoMesh.name = "videoMesh"; // Name the video mesh for reference
//     trm.scene.add(videoMesh);

//     // Create the control overlay
//     this.createControlOverlay(video);

//     // Play the video after the first user interaction
//     const handleUserInteraction = () => {
//       video.muted = false; // Unmute the video after interaction
//       video.play().catch((error) => {
//         console.error("Error playing video:", error);
//       });
//       localStorage.setItem("videoPlaying", "true"); // Store the playing state

//       // Remove the event listeners after the first interaction
//       window.removeEventListener("click", handleUserInteraction);
//       window.removeEventListener("touchstart", handleUserInteraction);
//     };

//     // Listen for the first user interaction
//     window.addEventListener("click", handleUserInteraction);
//     window.addEventListener("touchstart", handleUserInteraction);

//     this.listen("updateShape", "updateShape");
//   }

//   createControlOverlay(video) {
//     // Create a div to hold the controls
//     const controlOverlay = document.createElement("div");
//     controlOverlay.style.position = "absolute";
//     controlOverlay.style.bottom = "20px"; // Position controls at the bottom
//     controlOverlay.style.left = "50%";
//     controlOverlay.style.transform = "translateX(-50%)";
//     controlOverlay.style.zIndex = "1000"; // Ensure controls are on top
//     controlOverlay.style.display = "flex";
//     controlOverlay.style.gap = "10px"; // Space between buttons

//     // Create the rewind button
//     const rewindButton = document.createElement("button");
//     rewindButton.innerText = "⏪ 5s";
//     rewindButton.style.fontSize = "20px";
//     rewindButton.onclick = () => {
//       video.currentTime = Math.max(0, video.currentTime - 5); // Rewind 5 seconds
//     };

//     // Create the play/pause button
//     const playPauseButton = document.createElement("button");
//     playPauseButton.innerText = "▶️"; // Play icon
//     playPauseButton.style.fontSize = "20px";
//     playPauseButton.onclick = () => {
//       if (video.paused) {
//         video.play().catch((error) => {
//           console.error("Error playing video:", error);
//         });
//         playPauseButton.innerText = "⏸️"; // Pause icon
//       } else {
//         video.pause();
//         playPauseButton.innerText = "▶️"; // Play icon
//       }
//     };

//     // Create the forward button
//     const forwardButton = document.createElement("button");
//     forwardButton.innerText = "5s ⏩";
//     forwardButton.style.fontSize = "20px";
//     forwardButton.onclick = () => {
//       video.currentTime = Math.min(video.duration, video.currentTime + 5); // Forward 5 seconds
//     };

//     // Append buttons to the control overlay
//     controlOverlay.appendChild(rewindButton);
//     controlOverlay.appendChild(playPauseButton);
//     controlOverlay.appendChild(forwardButton);

//     // Append control overlay to the body
//     document.body.appendChild(controlOverlay);
//   }

//   teardown() {
//     console.log("teardown lights");
//     let scene = this.service("ThreeRenderManager").scene;
//     scene.background?.dispose();
//     scene.environment?.dispose();
//     scene.background = null;
//     scene.environment = null;

//     // Remove video mesh
//     let videoMesh = scene.getObjectByName("videoMesh");
//     if (videoMesh) {
//       videoMesh.geometry.dispose();
//       videoMesh.material.map.dispose();
//       videoMesh.material.dispose();
//       scene.remove(videoMesh);
//     }

//     // Clear the playing state on teardown
//     localStorage.removeItem("videoPlaying");

//     // Remove control overlay
//     const controlOverlay = document.querySelector("div");
//     if (controlOverlay) {
//       controlOverlay.remove();
//     }
//   }
// }

// export default {
//   modules: [
//     {
//       name: "FUN2",
//       pawnBehaviors: [FunPawn],
//     },
//   ],
// };
import { PawnBehavior } from "../PrototypeBehavior";

class FunPawn extends PawnBehavior {
  setup() {
    let trm = this.service("ThreeRenderManager");
    let THREE = Microverse.THREE;

    // Tone mapping exposure settings
    if (this.actor._cardData.toneMappingExposure !== undefined) {
      trm.renderer.toneMappingExposure =
        this.actor._cardData.toneMappingExposure;
    }

    // Create a video element
    const video = document.createElement("video");
    video.src = "./assets/Fastest Way to Learn React in 2024 🔥.mp4"; // Replace with your video file path
    video.crossOrigin = "anonymous"; // Allow cross-origin if needed
    video.loop = true; // Set loop if desired
    video.muted = true; // Mute video to allow autoplay
    video.playsInline = true; // Required for iOS
    video.load(); // Load the video

    // Create a texture from the video
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

    // Create a material using the video texture
    const videoMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.DoubleSide,
    });

    // Create a plane geometry for the canvas
    const geometry = new THREE.PlaneGeometry(2, 2); // Adjust size as needed
    const videoMesh = new THREE.Mesh(geometry, videoMaterial);
    videoMesh.position.set(0, 1, 0); // Position the plane in the scene
    videoMesh.name = "videoMesh"; // Name the video mesh for reference
    trm.scene.add(videoMesh);

    // Control Overlay
    const controlContainer = document.createElement("div");
    controlContainer.style.position = "absolute";
    controlContainer.style.top = "50%";
    controlContainer.style.left = "50%";
    controlContainer.style.transform = "translate(-50%, -50%)";
    controlContainer.style.display = "flex";
    controlContainer.style.gap = "10px";
    controlContainer.style.zIndex = "1000"; // Ensure controls are on top

    // Play/Pause Button
    const playPauseButton = document.createElement("button");
    playPauseButton.innerText = "Play";
    playPauseButton.style.padding = "5px 10px";
    playPauseButton.onclick = () => {
      if (video.paused) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
        });
        playPauseButton.innerText = "Pause";
      } else {
        video.pause();
        playPauseButton.innerText = "Play";
      }
    };

    // Rewind Button
    const rewindButton = document.createElement("button");
    rewindButton.innerText = "Rewind 5s";
    rewindButton.style.padding = "5px 10px";
    rewindButton.onclick = () => {
      video.currentTime = Math.max(0, video.currentTime - 5); // Rewind 5 seconds
    };

    // Forward Button
    const forwardButton = document.createElement("button");
    forwardButton.innerText = "Forward 5s";
    forwardButton.style.padding = "5px 10px";
    forwardButton.onclick = () => {
      video.currentTime = Math.min(video.duration, video.currentTime + 5); // Forward 5 seconds
    };

    // Append buttons to the control container
    controlContainer.appendChild(rewindButton);
    controlContainer.appendChild(playPauseButton);
    controlContainer.appendChild(forwardButton);

    // Append control container to the body
    document.body.appendChild(controlContainer);

    // Check if the video was previously played
    const wasPlaying = localStorage.getItem("videoPlaying") === "true";

    if (wasPlaying) {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
      playPauseButton.innerText = "Pause"; // Update button text
    }

    // Play the video after the first user interaction
    const handleUserInteraction = () => {
      video.muted = false; // Unmute the video after interaction
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
      localStorage.setItem("videoPlaying", "true"); // Store the playing state

      // Remove the event listeners after the first interaction
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    // Listen for the first user interaction
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    // Add click event to play/pause the video with sound
    videoMesh.addEventListener("pointerdown", () => {
      if (video.paused) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
        });
        playPauseButton.innerText = "Pause"; // Update button text
      } else {
        video.pause();
        playPauseButton.innerText = "Play"; // Update button text
      }
    });

    this.listen("updateShape", "updateShape");
  }

  teardown() {
    console.log("teardown lights");
    let scene = this.service("ThreeRenderManager").scene;
    scene.background?.dispose();
    scene.environment?.dispose();
    scene.background = null;
    scene.environment = null;

    // Remove video mesh
    let videoMesh = scene.getObjectByName("videoMesh");
    if (videoMesh) {
      videoMesh.geometry.dispose();
      videoMesh.material.map.dispose();
      videoMesh.material.dispose();
      scene.remove(videoMesh);
    }

    // Clear the playing state on teardown
    localStorage.removeItem("videoPlaying");

    // Remove control container
    const controlContainer = document.querySelector("div");
    if (controlContainer) {
      controlContainer.remove();
    }
  }
}

export default {
  modules: [
    {
      name: "FUN2",
      pawnBehaviors: [FunPawn],
    },
  ],
};
