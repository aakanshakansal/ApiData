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
    let params;
    let temperatureInterval;

    if (this.actor._cardData.toneMappingExposure !== undefined) {
      trm.renderer.toneMappingExposure =
        this.actor._cardData.toneMappingExposure;
    }

    const originalMaterials = new Map(); // Store original materials for each object
    let highlightedObject = null; // Define highlightedObject variable

    // List of allowed objects to interact with
    const allowedObjects = new Set();
    const onDocumentMouseClick = async (event) => {
      try {
        // Fetch the API value
        const apiResponse = await fetch(
          "https://full-duplex-dynalic-api.vercel.app/btn-state"
        );
        const apiData = await apiResponse.json();
        const apiValue = apiData.btnState;

        console.log("API Value:", apiValue); // Debug log for the API value

        if (apiValue === 1) {
          const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, trm.camera);

          const intersects = raycaster.intersectObjects(
            Array.from(allowedObjects),
            true
          );

          console.log("Intersects:", intersects); // Debug log for intersects

          if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            console.log("Clicked Object:", clickedObject.name); // Log clicked object

            if (highlightedObject === clickedObject) {
              resetObjectMaterial(clickedObject);
              hideAllInfo();
              stopSpeaking();
              highlightedObject = null;
            } else {
              // Reset previously highlighted object
              if (highlightedObject) {
                resetObjectMaterial(highlightedObject);
                stopSpeaking();
              }

              // Highlight the clicked object
              highlightObject(clickedObject);
              speakObjectName(clickedObject.name);

              let isTile = false;
              let isRack = false;
              let isObject = false;

              // Check if clickedObject is a tile
              for (let i = 0; i <= 77; i++) {
                if (clickedObject === model.children[71].children[i]) {
                  isTile = true;
                  break;
                }
              }

              if (isTile) {
                hideServerInfo();
                hideCharts();
                hideCharts2();
                hideCharts1();
                hideCharts3();
                hideHVACInfo();
                hideCharts4();
                displayTileInfo(clickedObject);
              } else {
                // Check if clickedObject is a rack
                for (let i = 0; i <= 70; i++) {
                  if (clickedObject === model.children[i].children[0]) {
                    if (i >= 5 && i <= 15) {
                      continue; // Skip certain racks
                    }
                    isRack = true;
                    break;
                  }
                }

                if (isRack) {
                  displayServerInfo(clickedObject);
                  updateCharts(clickedObject);
                  hideTileInfo();
                  hideHVACInfo();
                  hideCharts();
                  hideCharts2();
                  hideCharts4();
                } else {
                  // Check if clickedObject is another specific object type
                  for (let i = 0; i <= 17; i++) {
                    for (let j = 0; j <= 2; j++) {
                      if (
                        clickedObject ===
                        model.children[79].children[i].children[j]
                      ) {
                        isObject = true;
                        break;
                      }
                    }
                  }

                  if (isObject) {
                    displayHVACInfo(clickedObject);
                    updateCharts2(clickedObject);
                    hideServerInfo();
                    hideCharts3();
                    hideCharts1();
                    hideTileInfo();
                    hideCharts();
                    hideCharts2();
                  } else {
                    displayServerInfo(clickedObject);
                    hideHVACInfo();
                    updateCharts1(clickedObject);
                    hideTileInfo();
                    hideCharts1();
                    hideCharts3();
                    hideCharts4();
                    hideHVACInfo();
                  }
                }
              }
            }
          } else {
            console.log("No object clicked."); // Log if no object was clicked

            // Hide the serverInfo div and charts if no object is clicked
            hideAllInfo();

            // Reset previously highlighted object
            if (highlightedObject) {
              resetObjectMaterial(highlightedObject);
              stopSpeaking();
              highlightedObject = null; // Clear the highlightedObject
            }
          }
        } else {
          console.log("API value is 0, no action taken."); // Log if API value is 0

          // If API value is 0, reset the object and hide data
          hideAllInfo();

          if (highlightedObject) {
            resetObjectMaterial(highlightedObject);
            stopSpeaking();
            highlightedObject = null; // Clear the highlightedObject
          }
        }
      } catch (error) {
        console.error("Error fetching API value:", error);
      }
    };

    const highlightObject = (object) => {
      // Store original material
      if (!originalMaterials.has(object)) {
        originalMaterials.set(object, object.material.clone()); // Clone the material to ensure a deep copy
      }

      // Set highlight material
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      object.material = highlightMaterial;

      // Store highlighted object
      highlightedObject = object;
      console.log("Object highlighted:", object.name); // Log when object is highlighted
    };

    const resetObjectMaterial = (object) => {
      // Reset to original material
      const originalMaterial = originalMaterials.get(object);
      if (originalMaterial) {
        object.material = originalMaterial;
      }

      // Clear the highlightedObject if it is being reset
      if (highlightedObject === object) {
        highlightedObject = null;
      }
      console.log("Object reset:", object.name); // Log when object is reset
    };

    // const onDocumentMouseClick = (event) => {
    //   const mouse = new THREE.Vector2(
    //     (event.clientX / window.innerWidth) * 2 - 1,
    //     -(event.clientY / window.innerHeight) * 2 + 1
    //   );

    //   const raycaster = new THREE.Raycaster();
    //   raycaster.setFromCamera(mouse, trm.camera);

    //   const intersects = raycaster.intersectObjects(
    //     Array.from(allowedObjects),
    //     true
    //   );

    //   if (intersects.length > 0) {
    //     const clickedObject = intersects[0].object;

    //     if (highlightedObject === clickedObject) {
    //       resetObjectMaterial(clickedObject);
    //       hideAllInfo();
    //       stopSpeaking();
    //       highlightedObject = null;
    //     } else {
    //       // Reset previously highlighted object
    //       if (highlightedObject) {
    //         resetObjectMaterial(highlightedObject);
    //         stopSpeaking();
    //       }

    //       // Highlight the clicked object
    //       highlightObject(clickedObject);
    //       speakObjectName(clickedObject.name);

    //       let isTile = false;
    //       let isRack = false;
    //       let isObject = false;

    //       // Check if clickedObject is a tile
    //       for (let i = 0; i <= 77; i++) {
    //         if (clickedObject === model.children[71].children[i]) {
    //           isTile = true;
    //           break;
    //         }
    //       }

    //       if (isTile) {
    //         hideServerInfo();
    //         hideCharts();
    //         hideCharts2();
    //         hideCharts1();
    //         hideCharts3();
    //         hideHVACInfo();
    //         hideCharts4();
    //         displayTileInfo(clickedObject);
    //       } else {
    //         // Check if clickedObject is a rack
    //         for (let i = 0; i <= 70; i++) {
    //           if (clickedObject === model.children[i].children[0]) {
    //             if (i >= 5 && i <= 15) {
    //               continue; // Skip certain racks
    //             }
    //             isRack = true;
    //             break;
    //           }
    //         }

    //         if (isRack) {
    //           displayServerInfo(clickedObject);
    //           updateCharts(clickedObject);
    //           hideTileInfo();
    //           hideHVACInfo();
    //           hideCharts();
    //           hideCharts2();
    //           hideCharts4();
    //         } else {
    //           // Check if clickedObject is another specific object type
    //           for (let i = 0; i <= 17; i++) {
    //             for (let j = 0; j <= 2; j++) {
    //               if (
    //                 clickedObject === model.children[79].children[i].children[j]
    //               ) {
    //                 isObject = true;
    //                 break;
    //               }
    //             }
    //           }

    //           if (isObject) {
    //             displayHVACInfo(clickedObject);
    //             updateCharts2(clickedObject);
    //             hideServerInfo();
    //             hideCharts3();
    //             hideCharts1();
    //             hideTileInfo();
    //             hideCharts();
    //             hideCharts2();
    //           } else {
    //             displayServerInfo(clickedObject);
    //             hideHVACInfo();
    //             updateCharts1(clickedObject);
    //             hideTileInfo();
    //             hideCharts1();
    //             hideCharts3();
    //             hideCharts4();
    //             hideHVACInfo();
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     // Hide the serverInfo div and charts if no object is clicked
    //     hideAllInfo();

    //     // Reset previously highlighted object
    //     if (highlightedObject) {
    //       resetObjectMaterial(highlightedObject);
    //       stopSpeaking();
    //       highlightedObject = null; // Clear the highlightedObject
    //     }
    //   }
    // };

    const speakObjectName = (name) => {
      const utterance = new SpeechSynthesisUtterance(name);
      speechSynthesis.speak(utterance);
    };
    const stopSpeaking = () => {
      speechSynthesis.cancel();
    };

    const displayHVACInfo = (object) => {
      const HVACInfo = document.getElementById("HVACInfo");
      const powerCoolingTower = generateDynamicPower();

      HVACInfo.innerHTML = `
                <h3>HVAC Rack Info</h3>
                <p>Name: ${object.name || "N/A"}</p>
                <p>Power Cooling Tower: ${powerCoolingTower} kW</p>
                <hr>
            `;

      HVACInfo.style.left = "10px"; // Set position to fixed values for now
      HVACInfo.style.top = "10px";
      HVACInfo.style.display = "block";

      // Update and display the perforation chart
    };

    const generateDynamicPower = () => {
      return 5 + Math.floor(Math.random() * 6); // Generate power between 5 and 10 kW
    };
    const hideHVACInfo = () => {
      const HVACInfo = document.getElementById("HVACInfo");
      HVACInfo.style.display = "none";
    };

    const displayServerInfo = (server) => {
      const serverInfo = document.getElementById("serverInfo");
      serverInfo.innerHTML = `
                <h3>${server.name || "N/A"} Info</h3>
                <p>Name: ${server.name || "N/A"}</p>
                ${getSubChildrenInfo(server)}
                <hr>
            `;
      serverInfo.style.left = "10px"; // Set position to fixed values for now
      serverInfo.style.top = "10px";
      serverInfo.style.display = "block";
    };

    const getSubChildrenInfo = (object) => {
      let info = "";
      object.children.forEach((child, index) => {
        info += `<p>Sub-child Name: ${child.name || "N/A"}</p>`;
      });
      return info;
    };

    const hideServerInfo = () => {
      const serverInfo = document.getElementById("serverInfo");
      serverInfo.style.display = "none";
    };

    const displayTileInfo = (object) => {
      const tileInfo = document.getElementById("TileInfo");
      const dynamicTemperature = generateDynamicTemperature();
      const perforationPercentage = generatePerfuration();

      tileInfo.innerHTML = `
                <h3>Perforated Tile Info</h3>
                <p>Name: ${object.name || "N/A"}</p>
                <p>Temperature: ${dynamicTemperature} °C</p>
                <p>Perforation: ${perforationPercentage} %</p>
                <div id="perfurationChartContainer" style=" position: absolute;
             
               
                padding: 3px;
                border: 0.2px solid #ccc;
                z-index: 1000;
                top: 150px !important;
                left: 5px;
                bottom: 100px;
                height: 170px !important;
                width: 180px !important;"></div>
                <hr>
            `;
      tileInfo.style.left = "10px"; // Set position to fixed values for now
      tileInfo.style.top = "10px";
      tileInfo.style.display = "block";

      // Update and display the perforation chart
      const perforationData = {
        percentage: perforationPercentage,
      };
      updatePerfurationChart(perforationData);
    };

    const hideTileInfo = () => {
      const tileInfo = document.getElementById("TileInfo");
      tileInfo.style.display = "none";
    };

    const hideCharts = () => {
      const chartContainer = document.getElementById("chartContainer");
      // const powerProfileContainer = document.getElementById('powerProfileContainer');

      if (chartContainer) {
        chartContainer.style.display = "none";
      }

      // if (powerProfileContainer) {
      //     powerProfileContainer.style.display = 'none';
      // }
    };
    const hideCharts1 = () => {
      const chartContainer1 = document.getElementById("chartContainer1");

      if (chartContainer1) {
        chartContainer1.style.display = "none";
      }
    };
    const hideCharts2 = () => {
      const powerProfileContainer = document.getElementById(
        "powerProfileContainer"
      );

      if (powerProfileContainer) {
        powerProfileContainer.style.display = "none";
      }
    };
    const hideCharts3 = () => {
      const powerProfileContainer1 = document.getElementById(
        "powerProfileContainer1"
      );

      if (powerProfileContainer1) {
        powerProfileContainer1.style.display = "none";
      }
    };
    const hideCharts4 = () => {
      const chartContainerA = document.getElementById("chartContainerA");

      if (chartContainerA) {
        chartContainerA.style.display = "none";
      }
      const chartContainerB = document.getElementById("chartContainerB");

      if (chartContainerB) {
        chartContainerB.style.display = "none";
      }
      const container_humidity = document.getElementById("container_humidity");

      if (container_humidity) {
        container_humidity.style.display = "none";
      }
    };

    const hideAllInfo = () => {
      hideServerInfo();
      hideCharts();
      hideCharts1();
      hideCharts2();
      hideCharts3();
      hideTileInfo();
      hideCharts4();
      hideHVACInfo();
    };

    const updateCharts = (object) => {
      // updateHighchartsChart(object);
      updateHighchartsChart1(object);
      updatePowerProfileChart1(object);
    };
    const updateCharts1 = (object) => {
      updateHighchartsChart(object);
      // updateHighchartsChart1(object);
      updatePowerProfileChart(object);
    };
    const updateCharts2 = (object) => {
      // updateHighchartsChart(object);
      updateAirGuageChart1(object);
      updateTempChart1(object);
      updateHumidityChart(object);
    };

    let tempChart; // Declare a variable to hold the reference to the temperature chart
    let humidityChart; // Declare a variable to hold the reference to the humidity chart

    const updateAirGuageChart1 = (object) => {
      const chartContainerA = document.getElementById("chartContainerA");

      if (!(chartContainerA instanceof HTMLDivElement)) {
        return;
      }

      const dynamicData = generateDynamicDataA(object);

      Highcharts.chart("chartContainerA", {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        },
        title: {
          text: "Air Flow Rate",
          style: {
            color: "black",
            fontWeight: "bold",
          },
        },
        pane: {
          startAngle: -90,
          endAngle: 90,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },
        yAxis: {
          min: 0,
          max: 500,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: 250,
              color: "#55BF3B",
              thickness: 20,
              borderRadius: "50%",
            },
            {
              from: 250,
              to: 400,
              color: "#DDDF0D",
              thickness: 20,
              borderRadius: "50%",
            },
            {
              from: 400,
              to: 500,
              color: "#DF5353",
              thickness: 20,
            },
          ],
        },
        series: [
          {
            name: "Flow",
            data: dynamicData.series[0].data,
            tooltip: {
              valueSuffix: " cfm",
            },
            dataLabels: {
              format: "{y} cfm",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
      });

      chartContainerA.style.display = "block";
    };

    const generateDynamicDataA = (object) => {
      const categories = ["00:00"];
      const seriesData = categories.map((category, index) => {
        const baseTime = Date.now();
        const timestamp = baseTime + index * 3600 * 1000 * 4;
        const flow = 300 + Math.floor(Math.random() * 100);
        return [timestamp, flow];
      });

      return {
        categories,
        series: [
          {
            name: object.name || "Object",
            data: seriesData,
          },
        ],
      };
    };

    // Add some life
    setInterval(() => {
      if (tempChart) {
        const point = tempChart.series[0].points[0],
          inc = Math.round((Math.random() - 0.5) * 20);

        let newVal = point.y + inc;
        if (newVal < 300 || newVal > 400) {
          newVal = point.y - inc;
        }

        point.update(newVal);
      }
    }, 3000);

    const updateTempChart1 = (object) => {
      const chartContainerB = document.getElementById("chartContainerB");

      if (!(chartContainerB instanceof HTMLDivElement)) {
        return;
      }

      const dynamicData = generateDynamicDataB(object);

      const gaugeOptions = {
        chart: {
          type: "solidgauge",
          height: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        },
        title: {
          text: "Set Point Temperature",
          style: {
            color: "black",
            fontWeight: "bold",
          },
        },
        pane: {
          center: ["50%", "75%"],
          size: "110%",
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: null,
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },
        tooltip: {
          enabled: false,
        },
        yAxis: {
          min: 0,
          max: 35,
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 5,
          title: {
            y: -70,
          },
          labels: {
            y: 16,
            style: {
              fontSize: "14px",
            },
          },
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
              style: {
                color: "black",
                fontWeight: "bold",
              },
            },
          },
        },
        series: [
          {
            name: "Temp",
            data: [dynamicData.series[0].data[0][1]],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px; color: black; font-weight: bold">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">°C</span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: "°C",
            },
          },
        ],
      };

      tempChart = Highcharts.chart(
        "chartContainerB",
        Highcharts.merge(gaugeOptions)
      );

      chartContainerB.style.display = "block";

      const updateChart = () => {
        if (tempChart && !tempChart.renderer.forExport) {
          const point = tempChart.series[0].points[0];
          const newTemp = dynamicData.series[0].data[0][1];
          point.update(newTemp);
        }
      };

      setInterval(updateChart, 3000);
    };

    const generateDynamicDataB = (object) => {
      const categories = ["00:00"];
      const seriesData = categories.map(() => {
        const baseTime = Date.now();
        const temp = Math.floor(Math.random() * 35);
        return [baseTime, temp];
      });

      return {
        categories,
        series: [
          {
            name: object.name || "Object",
            data: seriesData,
          },
        ],
      };
    };

    const updateHumidityChart = (object) => {
      const chartContainerHumidity =
        document.getElementById("container_humidity");

      if (!(chartContainerHumidity instanceof HTMLDivElement)) {
        return;
      }

      const dynamicDataHumidity = generateDynamicDataHumidity(object);

      const gaugeOptionsHumidity = {
        chart: {
          type: "solidgauge",
          height: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        },
        title: {
          text: "Humidity",
          style: {
            color: "black",
            fontWeight: "bold",
          },
        },
        pane: {
          center: ["50%", "75%"],
          size: "110%",
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: null,
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },
        tooltip: {
          enabled: false,
        },
        yAxis: {
          min: 20,
          max: 80,
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 5,
          title: {
            y: -70,
          },
          labels: {
            y: 16,
            style: {
              fontSize: "14px",
            },
          },
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
              style: {
                color: "black",
                fontWeight: "bold",
              },
            },
          },
        },
        series: [
          {
            name: "Humidity",
            data: [dynamicDataHumidity.series[0].data[0][1]],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px; color: black; font-weight: bold">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: "°C",
            },
          },
        ],
      };

      humidityChart = Highcharts.chart(
        "container_humidity",
        Highcharts.merge(gaugeOptionsHumidity)
      );

      chartContainerHumidity.style.display = "block";

      const updateChart = () => {
        if (humidityChart && !humidityChart.renderer.forExport) {
          const point = humidityChart.series[0].points[0];
          const newHumidity = dynamicDataHumidity.series[0].data[0][1];
          point.update(newHumidity);
        }
      };

      setInterval(updateChart, 3000);
    };

    const generateDynamicDataHumidity = (object) => {
      const categories = ["00:00"];
      const seriesData = categories.map(() => {
        const baseTime = Date.now();
        const humidity = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
        return [baseTime, humidity];
      });

      return {
        categories,
        series: [
          {
            name: object.name || "Object",
            data: seriesData,
          },
        ],
      };
    };

    const updateHighchartsChart = (object) => {
      const chartContainer = document.getElementById("chartContainer");

      // Ensure chartContainer is a div element
      if (!(chartContainer instanceof HTMLDivElement)) {
        return;
      }

      // Example dynamic data generation
      const dynamicData = generateDynamicData(object);

      Highcharts.chart("chartContainer", {
        chart: {
          type: "line",
          zooming: {
            type: "x",
          },
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent blue background
        },
        title: {
          text: "Server Temperature Profile",
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        xAxis: {
          categories: dynamicData.categories, // Add categories to the x-axis
          title: {
            text: `${object.name || "N/A"}`, // Correctly reference object.name
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
              rotate: 45, // Rotation angle
            },
          },
          type: "datetime",
          tickPositions: dynamicData.categories.map(
            (_, index) => Date.now() + index * 3600 * 1000 * 4
          ),
          labels: {
            style: {
              color: "black", // Font color for x-axis values
              fontWeight: "bold", // Font weight
              fontSize: "14px", // Decrease font size
            },
            formatter: function () {
              return Highcharts.dateFormat("%H:%M", this.value); // Format to show hours and minutes
            },
            rotation: -45, // Rotate labels
          },
        },
        yAxis: {
          title: {
            text: "Temperature(°C)",
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for y-axis values
              fontWeight: "bold", // Font weight
            },
          },
          min: 0, // Adjusted minimum y-axis value to show full range
          max: 100, // Adjusted maximum y-axis value to show full range
          tickInterval: 10, // Set interval of y-axis
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: "°C",
          xDateFormat: "%A, %b %e %H:%M",
        },
        legend: {
          enabled: true,
        },
        series: [
          {
            name: "CPU Temperature",
            data: dynamicData.cpuData,
            color: "#EE2E3A",
            style: {
              color: "black", // Font color for y-axis values
              fontWeight: "bold", // Font weight
            }, // Corrected color code
          },
          {
            name: "GPU Temperature",
            data: dynamicData.gpuData,
            color: "#80f2ff",
            style: {
              color: "black", // Font color for y-axis values
              fontWeight: "bold", // Font weight
            },
            // Corrected color code
          },
          {
            name: "RAM Temperature",
            data: dynamicData.ramData,
            color: "#ffde2d",
            style: {
              color: "black", // Font color for y-axis values
              fontWeight: "bold", // Font weight
            }, // Corrected color code
          },
        ],
      });

      // Display the chart
      chartContainer.style.display = "block";
    };

    const generateDynamicData = (object) => {
      const categories = [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
      ];
      const baseTime = Date.now(); // Use current time as a base

      // Generate random temperature data for each category
      const cpuData = categories.map((category, index) => {
        const timestamp = baseTime + index * 3600 * 1000 * 4; // Increment by four hours
        const temperature = 40 + Math.floor(Math.random() * 46); // Generate temperature between 40 and 85
        return [timestamp, temperature];
      });

      const gpuData = categories.map((category, index) => {
        const timestamp = baseTime + index * 3600 * 1000 * 4; // Increment by four hours
        const temperature = 55 + Math.floor(Math.random() * 46); // Generate temperature between 55 and 100
        return [timestamp, temperature];
      });

      const ramData = categories.map((category, index) => {
        const timestamp = baseTime + index * 3600 * 1000 * 4; // Increment by four hours
        const temperature = 30 + Math.floor(Math.random() * 31); // Generate temperature between 30 and 60
        return [timestamp, temperature];
      });

      return {
        categories,
        cpuData,
        gpuData,
        ramData,
      };
    };

    const updateHighchartsChart1 = (object) => {
      const chartContainer1 = document.getElementById("chartContainer1");

      // Ensure chartContainer is a div element
      if (!(chartContainer1 instanceof HTMLDivElement)) {
        return;
      }

      // Example dynamic data generation
      const dynamicData = generateDynamicData1(object);

      Highcharts.chart("chartContainer1", {
        chart: {
          type: "arearange",
          zooming: {
            type: "x",
          },
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent blue background
        },
        title: {
          text: "Rack Temperature Profile",
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        xAxis: {
          title: {
            text: `${object.name || "N/A"}`, // Correctly reference object.name
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          type: "datetime",
          tickPositions: dynamicData.categories.map(
            (_, index) => Date.now() + index * 3600 * 1000 * 4
          ),
          labels: {
            style: {
              color: "black", // Font color for x-axis values
              fontWeight: "bold", // Font weight
            },
            formatter: function () {
              return Highcharts.dateFormat("%H:%M", this.value); // Format to show hours and minutes
            },
          },
        },
        yAxis: {
          title: {
            text: "Temperature(°C)",
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for y-axis values
              fontWeight: "bold", // Font weight
            },
          },
          min: 50, // Set minimum y-axis value
          max: 300, // Set maximum y-axis value
          tickInterval: 50, // Set interval of y-axis
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: "°C",
          xDateFormat: "%A, %b %e %H:%M",
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Temperatures",
            data: dynamicData.series[0].data, // Assuming the dynamic data series structure matches
            color: {
              linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1,
              },
              stops: [
                [0, "#ff0000"],
                [1, "#0000ff"],
              ],
            },
          },
        ],
      });

      // Display the chart
      chartContainer1.style.display = "block";
    };

    const generateDynamicData1 = (object) => {
      const categories = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

      // Generate random temperature range data for each category
      const seriesData = categories.map((category, index) => {
        const baseTime = Date.now(); // Use current time as a base
        const timestamp = baseTime + index * 3600 * 1000 * 4; // Increment by four hours
        const minTemp = 50 + Math.floor(Math.random() * 50); // Generate min temperature between 50 and 100
        const maxTemp = minTemp + Math.floor(Math.random() * 200); // Generate max temperature up to 300
        return [timestamp, minTemp, maxTemp];
      });

      return {
        categories,
        series: [
          {
            name: object.name || "Object",
            data: seriesData,
          },
        ],
      };
    };
    const updatePowerProfileChart = (object) => {
      const powerProfileContainer = document.getElementById(
        "powerProfileContainer"
      );

      // Ensure powerProfileContainer is a div element
      if (!(powerProfileContainer instanceof HTMLDivElement)) {
        return;
      }

      // Generate dynamic data for power profile
      const powerProfileData = generatePowerProfileData(object);

      Highcharts.chart("powerProfileContainer", {
        chart: {
          zoomType: "x",
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent blue background
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        title: {
          text: "Server Power Profile",
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        xAxis: {
          categories: powerProfileData.categories,
          title: {
            text: `${object.name || "N/A"}`, // Correctly reference object.name
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for x-axis values
              fontSize: "10px", // Decrease font size
            },
            rotation: -45, // Rotate labels
          },
        },
        yAxis: {
          title: {
            text: "Power Consumption (W)",
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for y-axis values
            },
          },
          min: 400, // Set minimum y-axis value
          max: 1400, // Set maximum y-axis value
          tickInterval: 200, // Set y-axis interval to 200
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
            marker: {
              radius: 2,
              enabled: true, // Enable markers
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        series: [
          {
            type: "area",
            name: "Watts",
            data: powerProfileData.data,
            marker: {
              enabled: true, // Enable markers
              radius: 4, // Set marker radius
            },
            dataLabels: {
              enabled: true, // Enable data labels
              format: "{y} W", // Format for data labels
              style: {
                fontSize: "10px", // Set font size for data labels
              },
            },
          },
        ],
      });

      // Display the chart
      powerProfileContainer.style.display = "block";
    };

    const generatePowerProfileData = (object) => {
      // Example dynamic data generation for power profile
      const categories = [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
      ];

      // Example: generating random data for power profile within 400W to 1400W
      const data = Array.from(
        { length: categories.length },
        () => 400 + Math.floor(Math.random() * 1000)
      );

      // Mark 10 points with markers
      const markedData = data.map((value, index) => {
        return {
          y: value,
          marker: {
            enabled: index < 10, // Enable marker for the first 10 points
          },
        };
      });

      return { categories, data: markedData };
    };
    const updatePowerProfileChart1 = (object) => {
      const powerProfileContainer1 = document.getElementById(
        "powerProfileContainer1"
      );

      // Ensure powerProfileContainer is a div element
      if (!(powerProfileContainer1 instanceof HTMLDivElement)) {
        return;
      }

      // Generate dynamic data for power profile
      const powerProfileData = generatePowerProfileData1(object);

      Highcharts.chart("powerProfileContainer1", {
        chart: {
          zoomType: "x",
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparent blue background
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        title: {
          text: "Rack Power Profile",
          style: {
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        xAxis: {
          categories: powerProfileData.categories,
          title: {
            text: `${object.name || "N/A"}`, // Correctly reference object.name
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for x-axis values
              fontSize: "10px", // Decrease font size
            },
            rotation: -45, // Rotate labels
          },
        },
        yAxis: {
          title: {
            text: "Power Consumption (kW)",
            style: {
              color: "black", // Font color
              fontWeight: "bold", // Font weight
            },
          },
          labels: {
            style: {
              color: "black", // Font color for y-axis values
            },
            formatter: function () {
              return this.value / 1000 + "kW"; // Format labels as kW
            },
          },
          min: 1000, // Set minimum y-axis value to 1kW (1000W)
          max: 10000, // Set maximum y-axis value to 10kW (10000W)
          tickInterval: 1000, // Set y-axis interval to 1kW (1000W)
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
            marker: {
              radius: 2,
              enabled: true, // Enable markers
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        series: [
          {
            type: "area",
            name: "Watts",
            data: powerProfileData.data,
            marker: {
              enabled: true, // Enable markers
              radius: 4, // Set marker radius
            },
            dataLabels: {
              enabled: true, // Enable data labels
              format: "{y} W", // Format for data labels
              style: {
                fontSize: "10px", // Set font size for data labels
              },
              formatter: function () {
                return this.y / 1000 + "kW"; // Format data labels as kW
              },
            },
          },
        ],
      });

      // Display the chart
      powerProfileContainer1.style.display = "block";
    };

    const generatePowerProfileData1 = (object) => {
      // Set specific time categories for the x-axis
      const categories = [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
      ];

      // Example: generating random data for power profile within 1kW to 10kW
      const data = Array.from(
        { length: categories.length },
        () => 1000 + Math.floor(Math.random() * 9000)
      );

      // Mark 10 points with markers
      const markedData = data.map((value, index) => {
        return {
          y: value,
          marker: {
            enabled: index < 10, // Enable marker for the first 10 points
          },
        };
      });

      return { categories, data: markedData };
    };

    const generateDynamicTemperature = () => {
      return 5 + Math.floor(Math.random() * 11); // Generate temperature between 5 and 15 °C
    };

    const updatePerfurationChart = (perforationData) => {
      Highcharts.chart("perfurationChartContainer", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparent white background
        },
        title: {
          text: `Tile<br>Perforation<br>${perforationData.percentage}%`,
          align: "center",
          verticalAlign: "middle",
          y: 70,
          style: {
            fontSize: "1.1em",
            color: "black", // Font color
            fontWeight: "bold", // Font weight
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: "bold",
                color: "white",
              },
            },
            startAngle: -90,
            endAngle: 90,
            center: ["50%", "75%"],
            size: "100%",
          },
        },
        series: [
          {
            type: "pie",
            name: "Perforation",
            innerSize: "50%",
            data: [
              {
                name: "Perforation",
                y: perforationData.percentage,
                color: "blue",
              },
              {
                name: "",
                y: 100 - perforationData.percentage,
                color: "lightblue",
              },
            ],
          },
        ],
      });
    };

    const generatePerfuration = () => {
      const minPercentage = 30; // 30%
      const maxPercentage = 75; // 75%
      const range = maxPercentage - minPercentage;
      const percentage = minPercentage + Math.random() * range;
      return Math.round(percentage);
    };
    // const checkTemperatureAndUpdateColor = (object) => {
    //   const temperature = generateDynamicTemperature();

    //   // console.log(
    //   //   `Temperature for ${object.name || "this object"}: ${temperature}°C`
    //   // );

    //   if (temperature > 10) {
    //     // Adjusted the temperature threshold to 30°C
    //     // Change object color to red
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xff0000); // Red color
    //       }
    //     });

    //     // Announce the temperature is high
    //     const message = `The temperature of ${
    //       object.name || "this object"
    //     } is high: ${temperature}°C.`;

    //     // Check if the browser supports speech synthesis
    //     if ("speechSynthesis" in window) {
    //       const speech = new SpeechSynthesisUtterance(message);

    //       // Set voice parameters if necessary
    //       speech.rate = 1; // Speed of the speech
    //       speech.pitch = 1; // Pitch of the voice
    //       speech.volume = 1; // Volume of the speech

    //       speechSynthesis.speak(speech);

    //       console.log(message);
    //     } else {
    //       console.log("Speech synthesis is not supported in this browser.");
    //     }
    //   } else {
    //     // Reset object color to its original
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xffffff); // Original color (white)
    //       }
    //     });
    //   }
    // };

    /// updated for gui

    // const checkTemperatureAndUpdateColor = (object) => {
    //   const temperature = generateDynamicTemperature();

    //   if (temperature > params.temperatureThreshold) {
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xff0000); // Red color
    //       }
    //     });

    //     const message = `The temperature of ${
    //       object.name || "this object"
    //     } is high: ${temperature}°C.`;

    //     if ("speechSynthesis" in window) {
    //       const speech = new SpeechSynthesisUtterance(message);
    //       speech.rate = 1;
    //       speech.pitch = 1;
    //       speech.volume = 1;
    //       speechSynthesis.speak(speech);
    //       console.log(message);
    //     } else {
    //       console.log("Speech synthesis is not supported in this browser.");
    //     }
    //   } else {
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xffffff); // Original color (white)
    //       }
    //     });
    //   }
    // };

    // const checkTemperatureAndUpdateColor = (object) => {
    //   const dynamicData = generateDynamicData(object);

    //   // Get the highest CPU temperature
    //   const latestCpuTemperature = Math.max(
    //     ...dynamicData.cpuData.map((data) => data[1])
    //   );

    //   console.log(latestCpuTemperature);

    //   if (latestCpuTemperature > params.temperatureThreshold) {
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xff0000); // Red color
    //       }
    //     });

    //     const message = `The temperature of ${
    //       object.name || "this object"
    //     } is high: ${latestCpuTemperature}°C.`;

    //     if ("speechSynthesis" in window) {
    //       const speech = new SpeechSynthesisUtterance(message);
    //       speech.rate = 1;
    //       speech.pitch = 1;
    //       speech.volume = 1;
    //       speechSynthesis.speak(speech);
    //     } else {
    //       console.log("Speech synthesis is not supported in this browser.");
    //     }
    //   }
    // };

    const checkTemperatureAndUpdateColor = (object) => {
      const temperature = generateDynamicTemperature();

      // console.log(
      //   `Temperature for ${object.name || "this object"}: ${temperature}°C`
      // );

      if (temperature > 10) {
        // Adjusted the temperature threshold to 30°C
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

        // Check if the browser supports speech synthesis
        if ("speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(message);

          // Set voice parameters if necessary
          speech.rate = 1; // Speed of the speech
          speech.pitch = 1; // Pitch of the voice
          speech.volume = 1; // Volume of the speech

          speechSynthesis.speak(speech);

          console.log(message);
        } else {
          console.log("Speech synthesis is not supported in this browser.");
        }
      } else {
        // Reset object color to its original
        object.traverse((child) => {
          if (child.isMesh) {
            child.material.color.set(0xffffff); // Original color (white)
          }
        });
      }
    };

    // Function to reset object color to its original
    const resetObjectColor = (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(child.userData.originalColor || 0xffffff); // Reset to original color
        }
      });
    };

    // Save original color for each mesh
    allowedObjects.forEach((object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          const savedColor = localStorage.getItem(
            `originalColor-${child.uuid}`
          );
          if (savedColor) {
            child.material.color.setHex(parseInt(savedColor, 16)); // Restore original color from localStorage
          } else {
            const originalColor = child.material.color.getHex();
            localStorage.setItem(
              `originalColor-${child.uuid}`,
              originalColor.toString(16)
            ); // Store original color in localStorage
            child.userData.originalColor = originalColor;
          }
        }
      });
    });

    // const checkTemperatureAndUpdateColor = (object) => {
    //   const temperature = generateDynamicTemperature();

    //   // console.log(`Temperature for ${object.name || "this object"}: ${temperature}°C`);

    //   object.traverse((child) => {
    //     if (child.isMesh) {
    //       // Store the original color if not already stored
    //       if (!child.userData.originalColor) {
    //         child.userData.originalColor = child.material.color.clone();
    //       }
    //     }
    //   });

    //   if (temperature > 10) {
    //     // Change object color to red
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.set(0xff0000); // Red color
    //       }
    //     });

    //     // Announce the temperature is high
    //     const message = `The temperature of ${
    //       object.name || "this object"
    //     } is high: ${temperature}°C.`;

    //     // Check if the browser supports speech synthesis
    //     if ("speechSynthesis" in window) {
    //       const speech = new SpeechSynthesisUtterance(message);

    //       // Set voice parameters if necessary
    //       speech.rate = 1; // Speed of the speech
    //       speech.pitch = 1; // Pitch of the voice
    //       speech.volume = 1; // Volume of the speech

    //       speechSynthesis.speak(speech);

    //       console.log(message);
    //     } else {
    //       console.log("Speech synthesis is not supported in this browser.");
    //     }
    //   } else {
    //     // Reset object color to its original
    //     object.traverse((child) => {
    //       if (child.isMesh) {
    //         child.material.color.copy(child.userData.originalColor); // Restore the original color
    //       }
    //     });
    //   }
    // };

    document.addEventListener("click", onDocumentMouseClick, false);

    // Initialize DRACOLoader
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
    );

    // Set DRACOLoader as an extension to GLTFLoader
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.lights = [];

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
              child.children.forEach((subchild, subIndex) => {
                if (subIndex >= 2 && subIndex <= 13) {
                  allowedObjects.add(subchild);
                }
              });
            }
          });

          model.children.forEach((child, index) => {
            if (index == 71) {
              allowedObjects.add(child);
            }
          });
          model.children.forEach((child, index) => {
            if (index == 79) {
              allowedObjects.add(child);
            }
          });
          // setInterval(() => {
          //   allowedObjects.forEach((object) => {
          //     checkTemperatureAndUpdateColor(object);
          //   });
          // }, 5000);

          // setInterval(() => {
          //   if (params.checkTemperature) {
          //     allowedObjects.forEach((object) => {
          //       checkTemperatureAndUpdateColor(object);
          //     });
          //   }
          // }, 5000);

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
      .then((model) => {
        const colors = [
          0xff0e00, 0xff7100, 0xffde2d, 0xfbffff, 0x80f2ff, 0x01aeff, 0x0029ff,
        ];

        // Shuffle the colors array to randomize the order
        for (let i = colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        let colorIndex = 0;

        const originalMaterials = new Map();

        function traverseAndColor(object, restore = false) {
          if (object.isMesh) {
            if (restore) {
              const originalMaterial = originalMaterials.get(object);
              if (originalMaterial) {
                object.material = originalMaterial;
              }
            } else {
              if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material);
              }
              const color = colors[colorIndex % colors.length];
              const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.3,
              });
              object.material = material;
              colorIndex++;
            }
          }

          object.children.forEach((child, index) => {
            if (index >= 1) {
              // Only affect children with an index of 1 or higher
              traverseAndColor(child, restore);
            }
          });
        }
        function traverseAndColor1(object, restore = false) {
          if (object.isMesh) {
            if (restore) {
              const originalMaterial = originalMaterials.get(object);
              if (originalMaterial) {
                object.material = originalMaterial;
              }
            } else {
              if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material);
              }
              const color = colors[colorIndex % colors.length];
              const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.3,
              });
              object.material = material;
              colorIndex++;
            }
          }

          object.children.forEach((child, index) => {
            if (index >= 0) {
              // Only affect children with an index of 2 or higher
              traverseAndColor1(child, restore);
            }
          });
        }

        function traverseAndColor2(object, texturePath, restore = false) {
          if (object.isMesh) {
            if (restore) {
              const originalMaterial = originalMaterials.get(object);
              if (originalMaterial) {
                object.material = originalMaterial;
              }
            } else {
              if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material);
              }
              const textureLoader = new THREE.TextureLoader();
              textureLoader.load(texturePath, (texture) => {
                const material = new THREE.MeshBasicMaterial({
                  map: texture,
                  transparent: true,
                  opacity: 0.6,
                });
                object.material = material;
              });
            }
          }

          object.children.forEach((child) => {
            traverseAndColor2(child, texturePath, restore);
          });
        }

        function traverseAndColor3(object, restore = false) {
          if (object.isMesh) {
            if (restore) {
              const originalMaterial = originalMaterials.get(object);
              if (originalMaterial) {
                object.material = originalMaterial;
              }
            } else {
              if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material);
              }
              const color = colors[colorIndex % colors.length];
              const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.3,
              });
              object.material = material;
              colorIndex++;
            }
          }

          object.children.forEach((child, index) => {
            if (index >= 1) {
              // Only affect children with an index of 2 or higher
              traverseAndColor3(child, restore);
            }
          });
        }
        function traverseAndColor4(object, restore = false) {
          if (object.isMesh) {
            if (restore) {
              const originalMaterial = originalMaterials.get(object);
              if (originalMaterial) {
                object.material = originalMaterial;
              }
            } else {
              if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material);
              }
              const color = 0x0000ff; // Set color to blue
              const material = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.3,
              });
              object.material = material;
            }
          }

          object.children.forEach((child, index) => {
            if (index >= 2) {
              // Only affect children with an index of 2 or higher
              traverseAndColor4(child, restore);
            }
          });
        }

        function createTemperatureSimulation(
          group,
          THREE,
          xRange,
          yRange,
          zRange
        ) {
          const particleCount = 3000;
          const particles = [];

          // Create temperature particles
          for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(
              new THREE.SphereGeometry(0.02, 1, 1),
              new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
            );

            particle.position.set(
              xRange[0] + Math.random() * xRange[1],
              -Math.random() * yRange,
              zRange[0] + Math.random() * zRange[1]
            );

            // Assign temperature based on height (warmer at the top, cooler at the bottom)
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(
              temperature / 255,
              0,
              (255 - temperature) / 255
            );

            particles.push(particle);
            group.add(particle);
          }

          // Function to remove temperature particles
          function removeParticles() {
            particles.forEach((particle) => {
              group.remove(particle); // Remove particle from the group
            });
            particles.length = 0; // Clear the array
          }

          // Function to update temperature particles
          function updateTemperature() {
            particles.forEach((particle) => {
              // Move particles upward
              particle.position.y += 0.01;

              // Simulate temperature diffusion or other effects here

              // For simplicity, let's just randomly adjust temperature colors
              const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
              particle.material.color.setRGB(
                temperature / 255,
                0,
                (255 - temperature) / 255
              );

              // Reset temperature particle position if it goes beyond certain height
              if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
              }
            });

            // Schedule next update
            requestAnimationFrame(updateTemperature);
          }

          // Start the temperature simulation
          updateTemperature();

          // Return an object with a remove function to clean up particles
          return {
            remove: removeParticles,
          };
        }

        function init() {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          const renderer = new THREE.WebGLRenderer();

          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);

          const group = new THREE.Group();
          scene.add(group);

          // Adjust the camera position to view the simulation
          camera.position.set(5, 5, 20);
          camera.lookAt(5, 0, 5); // Looking at the center of the room

          function animate() {
            requestAnimationFrame(animate);
            updateTemperature(); // Update temperature particles
            renderer.render(scene, camera);
          }

          // Consolidated update function for all particles
          function updateTemperature() {
            group.children.forEach((particles) => {
              particles.children.forEach((particle) => {
                // Move particles upward
                particle.position.y += 0.01;

                // Simulate temperature diffusion or other effects here

                // Randomly adjust temperature colors
                const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
                particle.material.color.setRGB(
                  temperature / 255,
                  0,
                  (255 - temperature) / 255
                );

                // Reset temperature particle position if it goes beyond certain height
                if (particle.position.y > 3) {
                  particle.position.y = -Math.random() * 3; // Reset to the bottom
                }
              });
            });
          }

          animate();
        }

        init();

        if (!window.gui) {
          window.gui = new dat.GUI();
          const rackImage = document.getElementById("rackImage");

          // var obj = {
          //   traverseAndColor: false, // Initial state of the checkbox
          // };

          // window.gui
          //   .add(obj, "traverseAndColor")
          //   .name("Server wise Temp")
          //   .onChange(function (value) {
          //     if (value) {
          //       for (let i = 0; i <= 70; i++) {
          //         if (i >= 5 && i <= 15) {
          //           continue;
          //         }

          //         // Reset colorIndex for each row
          //         colorIndex = i - 1;
          //         for (let j = 1; j <= 12; j++) {
          //           traverseAndColor(model.children[i].children[j], false);
          //         }
          //       }
          //       // Show the image when checkbox is checked
          //       rackImage.style.display = "block";
          //     } else {
          //       for (let i = 0; i <= 70; i++) {
          //         if (i >= 5 && i <= 15) {
          //           continue;
          //         }
          //         for (let j = 1; j <= 12; j++) {
          //           traverseAndColor(model.children[i].children[j], true);
          //         }
          //       }

          //       rackImage.style.display = "none";
          //     }
          //   });
          var obj1 = {
            traverseAndColor1: false, // Initial state of the checkbox
          };

          window.gui
            .add(obj1, "traverseAndColor1")
            .name("Rack wise Temp")
            .onChange(function (value) {
              if (value) {
                for (let i = 0; i <= 70; i++) {
                  if (i >= 5 && i <= 15) {
                    continue;
                  }
                  // Reset colorIndex for each row
                  colorIndex = i;
                  traverseAndColor1(model.children[i].children[0], false);
                  // traverseAndColor1(model.children[i].children[0].children[0], false);
                }
                rackImage.style.display = "block";
              } else {
                for (let i = 0; i <= 70; i++) {
                  if (i >= 5 && i <= 15) {
                    continue;
                  }

                  traverseAndColor1(model.children[i].children[0], true);
                  // traverseAndColor1(model.children[i].children[0].children[0], true);
                }
                rackImage.style.display = "none";
              }
            });
          const obj2 = {
            traverseAndColor2: false,
          };

          const texturePaths = [
            "./assets/images/Texture.jpg",
            "./assets/images/Texture1.jpg",
            "./assets/images/Texture2.jpg",
            "./assets/images/Texture3.jpg",
            "./assets/images/Texture5.jpg",
          ];

          window.gui
            .add(obj2, "traverseAndColor2")
            .name("CFD")
            .onChange(function (value) {
              const applyOrRestore = (start, end, texturePath, restore) => {
                for (let i = start; i <= end; i++) {
                  traverseAndColor2(
                    model.children[14].children[i],
                    texturePath,
                    restore
                  );
                }
              };

              if (value) {
                applyOrRestore(0, 10, texturePaths[0], false);
                applyOrRestore(11, 22, texturePaths[1], false);
                applyOrRestore(23, 34, texturePaths[2], false);
                applyOrRestore(35, 46, texturePaths[3], false);
                applyOrRestore(47, 59, texturePaths[4], false);
                rackImage.style.display = "block"; // Show image when checkbox is checked
              } else {
                applyOrRestore(0, 10, "", true);
                applyOrRestore(11, 22, "", true);
                applyOrRestore(23, 34, "", true);
                applyOrRestore(35, 46, "", true);
                applyOrRestore(47, 59, "", true);
                rackImage.style.display = "none"; // Hide image when checkbox is unchecked
              }
            });

          var obj3 = {
            traverseAndColor3: false, // Initial state of the checkbox
          };

          window.gui
            .add(obj3, "traverseAndColor3")
            .name("Hvac Convection ")
            .onChange(function (value) {
              if (value) {
                for (let i = 0; i <= 178; i++) {
                  colorIndex = i - 1;

                  traverseAndColor3(model.children[73].children[i], false);
                }
                for (let i = 0; i <= 167; i++) {
                  colorIndex = i - 1;

                  traverseAndColor4(model.children[74].children[i], false);
                }

                rackImage.style.display = "block";
              } else {
                for (let i = 0; i <= 178; i++) {
                  traverseAndColor3(model.children[73].children[i], true);
                }
                for (let i = 0; i <= 167; i++) {
                  colorIndex = i - 1;

                  traverseAndColor4(model.children[74].children[i], true);
                }
                rackImage.style.display = "none";
              }
            });

          const obj6 = {
            createTemperatureSimulation: false, // Initial state of the checkbox
          };

          let temperatureSimulations = []; // Store all simulation instances

          // Define ranges for each simulation
          const simulationRanges = [
            [[3, 7.2], 5, [-2, 7]],
            [[13, 5.5], 5, [-2, 7]],
            [[-13, 1], 5, [-2, 7]],
            [[0.1, -9], 5, [-2, 7]],
            [[3, 7.2], 5, [8.5, 8.5]],
            [[13, 5.5], 5, [8.5, 8.5]],
            [[-13, 1], 5, [8.5, 8.5]],
            [[0.1, -9], 5, [8.5, 8.5]],
          ];

          // GUI event handler
          window.gui
            .add(obj6, "createTemperatureSimulation")
            .name("Air Flow")
            .onChange(function (value) {
              if (value) {
                // Iterate over each range and create simulations
                simulationRanges.forEach((range) => {
                  const simulation = createTemperatureSimulation(
                    group,
                    THREE,
                    ...range
                  );
                  temperatureSimulations.push(simulation);
                });
              } else {
                // Remove all simulations
                temperatureSimulations.forEach((simulation) => {
                  simulation.remove(); // Call the remove function for each simulation
                });
                temperatureSimulations = []; // Clear the array
              }
            });
          params = {
            temperatureThreshold: 10, // Default temperature threshold
            checkTemperature: false, // Initially unchecked
          };

          window.gui
            .add(params, "temperatureThreshold", 0, 100)
            .name("Temperature Threshold (°C)");
          window.gui
            .add(params, "checkTemperature")
            .name("Temp(CPU)")
            .onChange((value) => {
              if (value) {
                // Start checking temperature if checkbox is ticked
                temperatureInterval = setInterval(() => {
                  allowedObjects.forEach((object) => {
                    checkTemperatureAndUpdateColor(object);
                  });
                }, 15000);
              } else {
                // Stop checking temperature if checkbox is unticked
                clearInterval(temperatureInterval);

                // Reset object color to its original color when the checkbox is unticked
                allowedObjects.forEach((object) => {
                  resetObjectColor(object);
                });
              }
            });
        }
        // params = {
        //   temperatureThreshold: 10, // Default temperature threshold
        //   checkTemperature: true, // Enable/disable temperature checking
        // };

        // window.gui
        //   .add(params, "temperatureThreshold", 0, 100)
        //   .name("Temperature Threshold (°C)");
        // window.gui.add(params, "checkTemperature").name("Check Temperature");
      })
      .catch((error) => {
        console.error("Error loading GLTF model:", error);
      });
  }

  teardown() {
    let scene = this.service("ThreeRenderManager").scene;

    scene.background?.dispose();
    scene.environment?.dispose();
    scene.background = null;
    scene.environment = null;

    // Dispose particle system
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
      name: "Model",
      pawnBehaviors: [LightPawn],
    },
  ],
};
