// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
  Constants.AvatarNames = ["newwhite"];

  Constants.UserBehaviorDirectory = "behaviors/default";
  Constants.UserBehaviorModules = [
    "lights.js",
    "functionality.js",
    "names.js",
    "fun1.js",
    "fun2.js",

    "few2.js",
  ];
  const avatarModels = [
    "3kDNEN2jKhiPYcYAfItpXCcaahDmYM54K-kP6mKb_x8AAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5ELA89CRIHIhgqADoIKTMPWCwTCh0SHD4gPDIyWUQCBEUIGQQaHg4fRQYCCBkEHQ4ZGA5EEgMHOzsPIC46GCoaMxsfOjwhBCIuWxM8XzwZHjpfND8JIw4cBQ8oXi8lOkQPCh8KRD0aDSQSEjkvICQ5BQM6Xi1GHhk9OglGOAcDBw0CHAEYD1wkKR0PITNGDBg",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
    "3pOqrArMCIRUilNQ5kh5jDQpDI9rMSWBMf3S8zPNUX4gGAQEAANKX18WGRwVA14FA14TAh8BBRUEXhkfXwVfNxQmEgkcOQMxGyETMigUQzcIEQYJByU7JykpQl8ZH14TAh8BBRUEXh0ZEwIfBhUCAxVfCRgcICAUOzUhAzEBKAAEISc6Hzk1QAgnRCcCBSFELyQSOBUHHhQzRTQ-IV8UEQQRXxEIHEcpEkc-IDIKSDRIFgo7RwdJNUM_Ej4-FyhGChwfPD1DM0QIMSAcNjE",
    "3YrnwoVTORoxhAZDdVvJXzOO62FQKMuP7C2JaVRcRhXMMS0tKSpjdnY_MDU8KncsKnc6KzYoLDwtdzA2dix2Hj0POyA1ECoYMgg6GwE9ah4hOC8gLgwSDgAAa3YwNnc6KzYoLDwtdzQwOis2LzwrKjx2IDE1CQk9EhwIKhgoASktCA4TNhAcaSEObQ4rLAhtBg07ETwuNz0abB0XCHY9OC04dhg4FmA1Dho2KBNhGGh0YSg1ETcqDhoDNy07OGgJODMbHD4JHTNoMhFoPDI",
    "3B45okYnR2Z096wkAU7ACqQg7iGeh5lcva8FNB-RZ-sgKjY2MjF4bW0kKy4nMWw3MWwhMC0zNyc2bCstbTdtBSYUIDsuCzEDKRMhABomcQU6IzQ7NRcJFRsbcG0rLWwhMC0zNyc2bC8rITAtNCcwMSdtOyouEhImCQcTMQMzGjI2ExUILQsHcjoVdhUwNxN2HRYgCic1LCYBdwYME20mIzYjbRc1BHcpdQcrIDsWBDs6ehY2Eht2Fxd6cBAxKCUzNnMQHRgUCggKcAUgHQ8",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
    "3kDNEN2jKhiPYcYAfItpXCcaahDmYM54K-kP6mKb_x8AAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5ELA89CRIHIhgqADoIKTMPWCwTCh0SHD4gPDIyWUQCBEUIGQQaHg4fRQYCCBkEHQ4ZGA5EEgMHOzsPIC46GCoaMxsfOjwhBCIuWxM8XzwZHjpfND8JIw4cBQ8oXi8lOkQPCh8KRD0aDSQSEjkvICQ5BQM6Xi1GHhk9OglGOAcDBw0CHAEYD1wkKR0PITNGDBg",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
    "3pOqrArMCIRUilNQ5kh5jDQpDI9rMSWBMf3S8zPNUX4gGAQEAANKX18WGRwVA14FA14TAh8BBRUEXhkfXwVfNxQmEgkcOQMxGyETMigUQzcIEQYJByU7JykpQl8ZH14TAh8BBRUEXh0ZEwIfBhUCAxVfCRgcICAUOzUhAzEBKAAEISc6Hzk1QAgnRCcCBSFELyQSOBUHHhQzRTQ-IV8UEQQRXxEIHEcpEkc-IDIKSDRIFgo7RwdJNUM_Ej4-FyhGChwfPD1DM0QIMSAcNjE",
    "3YrnwoVTORoxhAZDdVvJXzOO62FQKMuP7C2JaVRcRhXMMS0tKSpjdnY_MDU8KncsKnc6KzYoLDwtdzA2dix2Hj0POyA1ECoYMgg6GwE9ah4hOC8gLgwSDgAAa3YwNnc6KzYoLDwtdzQwOis2LzwrKjx2IDE1CQk9EhwIKhgoASktCA4TNhAcaSEObQ4rLAhtBg07ETwuNz0abB0XCHY9OC04dhg4FmA1Dho2KBNhGGh0YSg1ETcqDhoDNy07OGgJODMbHD4JHTNoMhFoPDI",
    "3B45okYnR2Z096wkAU7ACqQg7iGeh5lcva8FNB-RZ-sgKjY2MjF4bW0kKy4nMWw3MWwhMC0zNyc2bCstbTdtBSYUIDsuCzEDKRMhABomcQU6IzQ7NRcJFRsbcG0rLWwhMC0zNyc2bC8rITAtNCcwMSdtOyouEhImCQcTMQMzGjI2ExUILQsHcjoVdhUwNxN2HRYgCic1LCYBdwYME20mIzYjbRc1BHcpdQcrIDsWBDs6ehY2Eht2Fxd6cBAxKCUzNnMQHRgUCggKcAUgHQ8",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
    "3kDNEN2jKhiPYcYAfItpXCcaahDmYM54K-kP6mKb_x8AAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5ELA89CRIHIhgqADoIKTMPWCwTCh0SHD4gPDIyWUQCBEUIGQQaHg4fRQYCCBkEHQ4ZGA5EEgMHOzsPIC46GCoaMxsfOjwhBCIuWxM8XzwZHjpfND8JIw4cBQ8oXi8lOkQPCh8KRD0aDSQSEjkvICQ5BQM6Xi1GHhk9OglGOAcDBw0CHAEYD1wkKR0PITNGDBg",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
    "3pOqrArMCIRUilNQ5kh5jDQpDI9rMSWBMf3S8zPNUX4gGAQEAANKX18WGRwVA14FA14TAh8BBRUEXhkfXwVfNxQmEgkcOQMxGyETMigUQzcIEQYJByU7JykpQl8ZH14TAh8BBRUEXh0ZEwIfBhUCAxVfCRgcICAUOzUhAzEBKAAEISc6Hzk1QAgnRCcCBSFELyQSOBUHHhQzRTQ-IV8UEQQRXxEIHEcpEkc-IDIKSDRIFgo7RwdJNUM_Ej4-FyhGChwfPD1DM0QIMSAcNjE",
    "3YrnwoVTORoxhAZDdVvJXzOO62FQKMuP7C2JaVRcRhXMMS0tKSpjdnY_MDU8KncsKnc6KzYoLDwtdzA2dix2Hj0POyA1ECoYMgg6GwE9ah4hOC8gLgwSDgAAa3YwNnc6KzYoLDwtdzQwOis2LzwrKjx2IDE1CQk9EhwIKhgoASktCA4TNhAcaSEObQ4rLAhtBg07ETwuNz0abB0XCHY9OC04dhg4FmA1Dho2KBNhGGh0YSg1ETcqDhoDNy07OGgJODMbHD4JHTNoMhFoPDI",
    "3B45okYnR2Z096wkAU7ACqQg7iGeh5lcva8FNB-RZ-sgKjY2MjF4bW0kKy4nMWw3MWwhMC0zNyc2bCstbTdtBSYUIDsuCzEDKRMhABomcQU6IzQ7NRcJFRsbcG0rLWwhMC0zNyc2bC8rITAtNCcwMSdtOyouEhImCQcTMQMzGjI2ExUILQsHcjoVdhUwNxN2HRYgCic1LCYBdwYME20mIzYjbRc1BHcpdQcrIDsWBDs6ehY2Eht2Fxd6cBAxKCUzNnMQHRgUCggKcAUgHQ8",
    "3qPM9OnJ8B8G-bx-DZtT_uk55iJ-4seqH4D_N7XJcmxMGQUFAQJLXl4XGB0UAl8EAl8SAx4ABBQFXxgeXgReNhUnEwgdOAIwGiASMykVQjYJEAcIBiQ6JigoQ14YHl8SAx4ABBQFXxwYEgMeBxQDAhReCBkdISEVOjQgAjAAKQEFICY7Hjg0QQkmRSYDBCBFLiUTORQGHxUyRDU_IF4VEAUQXjwFBSNHOj4rAgIbNz8COSEnFTUFCD4gJD4gKTIkRQZEGi42CRQAKDk8MAY",
  ];

  Constants.AvatarNames = avatarModels.map((dataLocation, i) => ({
    type: "3d",
    name: `Visitor ${i + 1}`,
    modelType: "glb",
    avatarType: "wonderland",
    dataLocation,
    dataRotation: [0, Math.PI, 0],
    dataScale: [0.3, 0.3, 0.3],
  }));

  Constants.DefaultCards = [
    {
      card: {
        name: "world model",
        layers: ["walk"],
        type: "3d",
        singleSided: true,
        shadow: true,
        translation: [0, -1.7, 0],
        placeholder: true,
        placeholderSize: [400, 0.1, 400],
        placeholderColor: 0xe0e0e0,
        placeholderOffset: [0, 0, 0],
      },
    },
    {
      card: {
        name: "light",
        layers: ["light"],
        type: "lighting",
        behaviorModules: ["Light", "Few2"],
        fileName: "/sky/hamburg_canal_4k.exr",
        dataLocation: "./assets/sky/hamburg_canal_4k.exr",
        dataType: "exr",
        toneMappingExposure: 0.7,
        loadSynchronously: true,
      },
    },
    {
      card: {
        name: "entrance",
        type: "object",
        translation: [
          0.9523000197314464, -0.14595834442125688, 8.863921777540416,
        ],
        rotation: [0, 0.3440628632260013, 0, 0.9389466151750726],
        spawn: "default",
        behaviorModules: ["Names"],
      },
    },
    {
      card: {
        translation: [
          4.3812816900214235, 0.5850223148710518, -9.447632027796125,
        ],
        scale: [38.08166587516445, 38.08166587516445, 38.08166587516445],
        rotation: [
          -0.7056855084663199, 0.7085084057605934, -0.0034478222169491562,
          0.003451757403767755,
        ],
        layers: ["pointer", "walk"],
        name: "/1.jpg",
        cornerRadius: 0.02,
        fileName: "/1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3bT61S2HrCp5EMhc4uLXnqNbdLM4oqfSDZr2ZfCKFaIkChYWEhFYTU0ECw4HEUwXEUwBEA0TFwcWTAsNTRdNGDcWFTItGCQXLTFTKQsFLzgLV1FbGiQmJVpSUE0LDUwBEA0TFwcWTA8LARANFAcQEQdMDg0BAw4GBxQGBwQDFw4WTREbLBE6BQYSLAsQEiMzFCUTKFMyIwcoNQ5RIFAFKixUUygvWgFaNlBSMFZNBgMWA01ULzslFFUsIBYWKFMDADtbAFVPElEDECoBNT0qBhEBUhQKDCwIJU8AES5S",
        textureType: "image",
        type: "2d",
      },
    },
    {
      card: {
        translation: [
          18.439547436715756, 2.2536957954636905, 6.649569662004688,
        ],
        scale: [-31.554500149572995, -31.554500149572995, -31.554500149572995],
        rotation: [
          -0.5002053013653008, 0.49924535557240707, -0.5007605481886884,
          0.4997875596723008,
        ],
        layers: ["pointer", "walk"],
        name: "/1.jpg",
        cornerRadius: 0.02,
        fileName: "/1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3kJQrutiHbjWkBnLF1S3_rfIneQYwQjQCrxvH0nHPxbsAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5EET4fHDskES0eJDhaIAIMJjECXlhSEy0vLFNbWUQCBEUIGQQaHg4fRQYCCBkEHQ4ZGA5FBwQICgcPDh0PDg0KHgcfRCUOLCxcAzpeOiMALgMTPiUJEz0aJAANOB1TUxgvCA5bE1MtW1MbET88Uy5EDwofCkQ0ADEZATkxEzRaHi4HWB1fXgkYLFMpWF84MRMxGDMAIV4qLQwmPl8bWSgm",
        textureType: "image",
        type: "2d",
      },
    },
    {
      card: {
        translation: [-15.28375395285914, 2.166131436320742, 6.726313322071988],
        scale: [2.4208843451826296, 2.4208843451826296, 2.4208843451826296],
        rotation: [0, -0.7089220091103616, 0, -0.7052868813461146],
        layers: ["pointer", "walk"],
        name: "/og-cs_1.jpg",
        cornerRadius: 0.02,
        fileName: "/og-cs_1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3MjvpspECWUlULB3AUNpJTAcqjpVaSImJDMP80Ua-2o4JTk5PT53YmIrJCEoPmM4PmMuPyI8OCg5YyQiYjhiIwE6GhodCi4aHhccKgAkIDgiFwQqDgg1DH4pf2IuIiBjKiAsJCFjPywkJiIgLCF7f2MgJC4_IjsoPz4oYnUACywdLnQjCh8GFwcKG3gaFRx8e3kAKygjAAwXOxgZIhV4OSIreHx1PD5iKSw5LGIlCSA8ODkdNRI-GhV4GzQrFTd7Ij54Igd9DA4rey4-fx4IGzsdORsiBC8E",
        textureType: "image",
        type: "2d",
      },
    },
    {
      card: {
        translation: [17.569518139692917, 2.166131436320742, 6.726313322071988],
        scale: [2.4208843451826296, 2.4208843451826296, 2.4208843451826296],
        rotation: [0, -0.706935800511074, 0, 0.7072777205283417],
        layers: ["pointer", "walk"],
        name: "/og-cs_1.jpg",
        cornerRadius: 0.02,
        fileName: "/og-cs_1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3MjvpspECWUlULB3AUNpJTAcqjpVaSImJDMP80Ua-2o4JTk5PT53YmIrJCEoPmM4PmMuPyI8OCg5YyQiYjhiIwE6GhodCi4aHhccKgAkIDgiFwQqDgg1DH4pf2IuIiBjKiAsJCFjPywkJiIgLCF7f2MgJC4_IjsoPz4oYnUACywdLnQjCh8GFwcKG3gaFRx8e3kAKygjAAwXOxgZIhV4OSIreHx1PD5iKSw5LGIlCSA8ODkdNRI-GhV4GzQrFTd7Ij54Igd9DA4rey4-fx4IGzsdORsiBC8E",
        textureType: "image",
        type: "2d",
      },
    },
    {
      card: {
        translation: [
          0.7922171346752886, 0.5850223148710518, 22.479009294128375,
        ],
        scale: [38.08166587516445, 38.08166587516445, 38.08166587516445],
        rotation: [
          -0.7056855084663199, 0.7085084057605934, -0.0034478222169491562,
          0.003451757403767755,
        ],
        layers: ["pointer", "walk"],
        name: "/1.jpg",
        cornerRadius: 0.02,
        fileName: "/1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3bT61S2HrCp5EMhc4uLXnqNbdLM4oqfSDZr2ZfCKFaIkChYWEhFYTU0ECw4HEUwXEUwBEA0TFwcWTAsNTRdNGDcWFTItGCQXLTFTKQsFLzgLV1FbGiQmJVpSUE0LDUwBEA0TFwcWTA8LARANFAcQEQdMDg0BAw4GBxQGBwQDFw4WTREbLBE6BQYSLAsQEiMzFCUTKFMyIwcoNQ5RIFAFKixUUygvWgFaNlBSMFZNBgMWA01ULzslFFUsIBYWKFMDADtbAFVPElEDECoBNT0qBhEBUhQKDCwIJU8AES5S",
        textureType: "image",
        type: "2d",
      },
    },
    {
      card: {
        translation: [
          -16.391969500818774, 2.004249405026291, 6.649569662004688,
        ],
        scale: [-32.498003719053386, -32.498003719053386, -32.498003719053386],
        rotation: [
          -0.5002053013653008, 0.49924535557240707, -0.5007605481886884,
          0.4997875596723008,
        ],
        layers: ["pointer", "walk"],
        name: "/1.jpg",
        cornerRadius: 0.02,
        fileName: "/1.jpg",
        fullBright: true,
        modelType: "img",
        shadow: true,
        singleSided: true,
        textureLocation:
          "3kJQrutiHbjWkBnLF1S3_rfIneQYwQjQCrxvH0nHPxbsAx8fGxhRREQNAgcOGEUeGEUIGQQaHg4fRQIERB5EET4fHDskES0eJDhaIAIMJjECXlhSEy0vLFNbWUQCBEUIGQQaHg4fRQYCCBkEHQ4ZGA5FBwQICgcPDh0PDg0KHgcfRCUOLCxcAzpeOiMALgMTPiUJEz0aJAANOB1TUxgvCA5bE1MtW1MbET88Uy5EDwofCkQ0ADEZATkxEzRaHi4HWB1fXgkYLFMpWF84MRMxGDMAIV4qLQwmPl8bWSgm",
        textureType: "image",
        type: "2d",
      },
    },
  ];
}
