import React, { useState, useEffect } from "react";
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from "cesium";
import access from "../../keys/cesium-access";

export default function Map3d() {
  const [mapView, setMapView] = useState({
    long: 122.4175,
    lat: 37.655,
    height: 400,
    viewer: null
  });
  useEffect(() => {
    /**
      * Your access token can be found at: https://ion.cesium.com/tokens
      */
    console.log(access);
    Ion.defaultAccessToken = access.key;
    window.CESIUM_BASE_URL = '/';
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
    createOsmBuildingsAsync()
      .then(buildingTileset => {
        viewer.scene.primitives.add(buildingTileset);
        setMapView(mapView => Object.assign(mapView, { viewer: viewer }));
      })
      .catch(err => console.log("Error with fetching tileset", err));
    // (async function fetchMapSet() {
      // const buildingTileset = await createOsmBuildingsAsync();
      // viewer.scene.primitives.add(buildingTileset);
      // setMapView(mapView => Object.assign(mapView, {viewer: viewer}));
    // })();
  }, [0]);
  return (
    <div>
      <p>Map will go here</p>
      <div id="cesiumContainer"></div>
    </div>
  );
}

