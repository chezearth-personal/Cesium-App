// import React from "react";
// window.CESIUM_BASE_URL = '/';
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

export default async function Map3d() {
  /**
    * Your access token can be found at: https://ion.cesium.com/tokens
    */
  Ion.defaultAccessToken = "";
  /**
    * Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    */
  const viewer = new Viewer(
    "cesiumContainer",
    { terrain: Terrain.fromWorldTerrain() }
  );
  /**
    * Fly the camera to San Francisco at the given longitude, latitude, and height.
    */
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0)
    }
  });
  /**
    * Add Cesium OSM Buildings, a global 3D buildings layer.
    */
  const buildingTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);
  return viewer;
  // return (
    // <p>Map will go here</p>
  // )
}
