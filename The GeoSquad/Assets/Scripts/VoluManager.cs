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


public class VoluManager : MonoBehaviour
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

    [SerializeField] private GameObject voluObject;

    private bool isSupported = false;
    private bool objectsPlaced = false;


    void Start()
    {
        StartCoroutine(VerifySupport());
    }


    void Update()
    {
        //Exit to Menu
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            SceneManager.LoadScene("Start");
        }
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

        PlaceObjects();
    }


    private void PlaceObjects()
    {
        if (objectsPlaced) return;
        if (earthManager.EarthTrackingState == TrackingState.Tracking)
        {            
            var earthPosition1 = geospatialObjects[0].earthPosition;
            var objAnchor1 = ARAnchorManagerExtensions.AddAnchor(aRAnchorManager, earthPosition1.Latitude, earthPosition1.Longitude, earthPosition1.Altitude, Quaternion.identity);
            voluObject.transform.position = objAnchor1.transform.position;
            voluObject.transform.SetParent(objAnchor1.transform);

            var earthPosition2 = geospatialObjects[1].earthPosition;
            var objAnchor2 = ARAnchorManagerExtensions.AddAnchor(aRAnchorManager, earthPosition2.Latitude, earthPosition2.Longitude, earthPosition2.Altitude, Quaternion.identity);
            Instantiate(geospatialObjects[1].objectPrefab, objAnchor2.transform);

            objectsPlaced = true;
        }
        else if (earthManager.EarthTrackingState == TrackingState.Limited)
        {
            Invoke("PlaceObjects", 5.0f);
            Debug.Log("EarthTrackingState = Limited. Retrying in 5 secs...");
        }
        else if (earthManager.EarthTrackingState == TrackingState.None)
        {
            Invoke("PlaceObjects", 5.0f);
            Debug.Log("EarthTrackingState = None. Retrying in 5 secs...");
        }
    }

}