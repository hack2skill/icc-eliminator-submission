using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using Google.XR.ARCoreExtensions;
using UnityEngine.SceneManagement;
using UnityEngine.Events;
using System;
using TMPro;


public class VPSManager : MonoBehaviour
{
    [SerializeField] private AREarthManager earthManager;

    [Serializable]
    public struct GeospatialObject
    {
        public GameObject objectPrefab;
        public EarthPosition earthPosition; 
    }

    [Serializable]
    public struct EarthPosition
    {
        public double Latitude;
        public double Longitude;
        public double Altitude;
    }

    [SerializeField] private ARAnchorManager aRAnchorManager;
    public List<GeospatialObject> geospatialObjects = new List<GeospatialObject>();

    //Positions of the instantiated photos
    [SerializeField] private List<Vector3> routePoints = new List<Vector3>();
    [SerializeField] private List<Transform> instantiatedPhotos = new List<Transform>();

    [SerializeField] private LineRenderer lineRenderer;
    [SerializeField] private TMP_Text distanceText;
    [SerializeField] private TMP_Text debugText;

    [SerializeField] private GameObject photo;

    private ARGeospatialAnchor terrainAnchor;

    private GameObject InfoText;
    private bool isSupported = false;
    private bool objectsPlaced = false;


    void Start()
    {
        StartCoroutine(VerifySupport());
    }


    IEnumerator VerifySupport()
    {
        while (!isSupported)
        {
            var result = earthManager.IsGeospatialModeSupported(GeospatialMode.Enabled);
            if (result == FeatureSupported.Supported)
            {
                Debug.Log("Ready to use VPS");
                isSupported = true;
            }
            else if (result == FeatureSupported.Unknown)
            {
                Debug.Log("Unknown...");
            }
            else if (result == FeatureSupported.Unsupported)
            {
                Debug.Log("VPS Unsupported");
            }
            yield return new WaitForSeconds(1f);
        }

        if (geospatialObjects.Count > 0)
            PlaceObjects();
    }


    private void PlaceObjects()
    {
        if (objectsPlaced) return;

        if (earthManager.EarthTrackingState == TrackingState.Tracking)
        {
            Debug.Log("Placing objects...");
            foreach (var obj in geospatialObjects)
            {
                var earthPosition = obj.earthPosition;
                var objAnchor = ARAnchorManagerExtensions.AddAnchor(aRAnchorManager, earthPosition.Latitude, earthPosition.Longitude, earthPosition.Altitude, Quaternion.identity);
                GameObject photo = Instantiate(obj.objectPrefab, objAnchor.transform);
                instantiatedPhotos.Add(photo.transform);
                Debug.Log("Placed");
            }

            objectsPlaced = true;
        }
        else if (earthManager.EarthTrackingState == TrackingState.Limited)
        {
            Invoke("PlaceObjects", 3.0f);
            Debug.Log("EarthTrackingState = Limited. Retrying in 3 secs...");
        }
        else if (earthManager.EarthTrackingState == TrackingState.None)
        {
            Invoke("PlaceObjects", 3.0f);
            Debug.Log("EarthTrackingState = None. Retrying in 3 secs...");
        }
    }

    private void GetDistance()
    {
        routePoints = new List<Vector3>();
        foreach(Transform photo in instantiatedPhotos)
        {
            routePoints.Add(photo.position + Vector3.up * 0.2f);
        }

        //the last photo:
        Vector3 lastPoint = instantiatedPhotos[0].position;

        //distance to reach the last geo-photo
        float distance = (lastPoint - Camera.main.transform.position).magnitude;
        distanceText.text = distance.ToString("F2") + " m";

        //time: 1 min to walk 100m
        float time = distance/100;

        if (InfoText == null) {
            InfoText = GameObject.FindWithTag("Info");
            InfoText.GetComponent<TMP_Text>().text = distance.ToString("F1") + "m " + time.ToString("F1") + "min";
        }
    }

    private int frames = 0;

    void Update()
    {
        //Exit to Menu
        if (Input.GetKeyDown(KeyCode.Escape)) {
            SceneManager.LoadScene("Start");
        }

        if (!objectsPlaced) return;

        lineRenderer.positionCount = routePoints.Count;
        lineRenderer.SetPositions(routePoints.ToArray());

        frames++;
        if (frames % 10 == 0)
            GetDistance();

    }


    public void GetCameraPose()
    {
        if (earthManager.EarthTrackingState == TrackingState.Tracking)
        {
            var geospatialPose = earthManager.CameraGeospatialPose;
            debugText.text = string.Format(
                                    "Lat/Long: {1}°, {2}°{0}" +
                                    "Altitude: {3}m{0}" +
                                    "Heading: {4}°",
                                    Environment.NewLine,
                                    geospatialPose.Latitude.ToString("F6"),
                                    geospatialPose.Longitude.ToString("F6"),
                                    geospatialPose.Altitude.ToString("F2"),
                                    geospatialPose.EunRotation.ToString("F1"));

            terrainAnchor = aRAnchorManager.ResolveAnchorOnTerrain(
                geospatialPose.Latitude,
                geospatialPose.Longitude,
                1, //altitudeAboveTerrain,
                Quaternion.identity
            );

            StartCoroutine(PlaceContentWhenAnchorCreated());
        }
        else if (earthManager.EarthTrackingState == TrackingState.Limited)
        {
            Invoke("GetCameraPose", 3.0f);
            Debug.Log("[GetCameraPose] EarthTrackingState = Limited. Retrying in 3 secs...");
        }
        else if (earthManager.EarthTrackingState == TrackingState.None)
        {
            Invoke("GetCameraPose", 3.0f);
            Debug.Log("[GetCameraPose] EarthTrackingState = None. Retrying in 3 secs...");
        }
    }


    IEnumerator PlaceContentWhenAnchorCreated()
    {
        bool isAnchorReady = false;

        while (!isAnchorReady)
        {
            yield return new WaitForSeconds(1f);

            switch (terrainAnchor.terrainAnchorState)
            {
                case TerrainAnchorState.Success:
                    Instantiate(photo, terrainAnchor.transform);
                    Debug.Log("Photo Placed: " + terrainAnchor.transform.position);
                    //Pose ARPose = earthManager.Convert(geospatialPose); //converts an Earth-specified horizontal position, altitude, and quaternion rotation with respect to an east-up-north coordinate frame to an AR pose
                    //earthManager.Convert(ARPose): determine the latitude and longitude by converting an AR pose to a Geospatial pose.
                    isAnchorReady = true;
                    break;
                case TerrainAnchorState.TaskInProgress:
                    Debug.Log("TaskInProgress: ARCore is contacting the ARCore API to resolve the Terrain anchor's pose.");
                    break;
                case TerrainAnchorState.ErrorUnsupportedLocation:
                    Debug.Log("ErrorUnsupportedLocation: The requested anchor is in a location that isn't supported by the Geospatial API.");
                    break;
                case TerrainAnchorState.ErrorNotAuthorized:
                    Debug.Log("ErrorNotAuthorized: An error occurred while authorizing your app with the ARCore API. ");
                    break;
                case TerrainAnchorState.ErrorInternal:
                    Debug.Log("ErrorInternal");
                    break;
                case TerrainAnchorState.None:
                    Debug.Log("None: This Anchor isn't a Terrain anchor or it became invalid because the Geospatial Mode was disabled");
                    break;
            }
        }
    }

}