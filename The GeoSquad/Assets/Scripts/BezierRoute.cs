using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class BezierRoute : MonoBehaviour
{
    private VPSManager vpsManager;
    [SerializeField] private List<Vector3> routePoints = new List<Vector3>();
    [SerializeField] private LineRenderer lineRenderer;
    [SerializeField] private TMP_Text distanceText;

    private Vector3 lastPoint;

    
    void OnEnable()
    {
        vpsManager = GetComponent<VPSManager>();
        lastPoint = vpsManager.geospatialObjects[vpsManager.geospatialObjects.Count - 1].objectPrefab.transform.position;
        Debug.Log("last point found: " + vpsManager.geospatialObjects[vpsManager.geospatialObjects.Count - 1].objectPrefab.name);
        SetRoute();
    }

    private void SetRoute()
    {
        //get the positions of the instantiated photos
        foreach (var obj in vpsManager.geospatialObjects)
        {
            routePoints.Add(obj.objectPrefab.transform.position);
        }     
    }

    private void GetDistance()
    {
        float distance = (lastPoint - Camera.main.transform.position).magnitude;
        distanceText.text = distance.ToString("F2") + " m";
    }

    void Update()
    {
        lineRenderer.positionCount = routePoints.Count;
        lineRenderer.SetPositions(routePoints.ToArray());
        GetDistance();
    }
}
