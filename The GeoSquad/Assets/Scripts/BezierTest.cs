using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class BezierTest : MonoBehaviour
{
    [SerializeField] private Transform[] points;
    [SerializeField] private List<Vector3> routePoints = new List<Vector3>();
    [SerializeField] private LineRenderer lineRenderer;
    [SerializeField] private TMP_Text distanceText;

    private Vector3 lastPoint;
    public int vertexCount = 4; //number of vertices in the curve


    void Start()
    {
        lastPoint = points[points.Length-1].position;

        //SetCurve();
        foreach(Transform point in points)
            routePoints.Add(point.position);


    }

    private void SetCurve()
    {
        Vector3 tangentLineV1;
        Vector3 tangentLineV2;

        for (float ratio = 0; ratio <= 1f; ratio += 1f / vertexCount)
        {
            tangentLineV1 = Vector3.Lerp(points[0].position, points[1].position, ratio);
            tangentLineV2 = Vector3.Lerp(points[1].position, points[2].position, ratio);
            Vector3 bezierPoint = Vector3.Lerp(tangentLineV1, tangentLineV2, ratio);
            routePoints.Add(bezierPoint);
        }
        for (float ratio = 0; ratio <= 1f; ratio += 1f / vertexCount)
        {
            tangentLineV1 = Vector3.Lerp(points[2].position, points[3].position, ratio);
            tangentLineV2 = Vector3.Lerp(points[3].position, points[4].position, ratio);
            Vector3 bezierPoint = Vector3.Lerp(tangentLineV1, tangentLineV2, ratio);
            routePoints.Add(bezierPoint);
        }
        for (float ratio = 0; ratio <= 1f; ratio += 1f / vertexCount)
        {
            tangentLineV1 = Vector3.Lerp(points[4].position, points[5].position, ratio);
            tangentLineV2 = Vector3.Lerp(points[3].position, points[4].position, ratio);
            Vector3 bezierPoint = Vector3.Lerp(tangentLineV1, tangentLineV2, ratio);
            routePoints.Add(bezierPoint);
        }
    }

    private void GetDistance()
    {
        // Loop through all pairs of points and sum up their distances
        // float totalDistance = 0f;
        // for (int i = 0; i < points.Length - 1; i++)
        //     totalDistance += Vector3.Distance(points[i].position, points[i + 1].position);
        // Debug.Log("The distance of the LineRenderer is " + totalDistance);

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
