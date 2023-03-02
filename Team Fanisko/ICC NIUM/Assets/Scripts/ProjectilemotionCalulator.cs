using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Threading.Tasks;
using TMPro;

public class ProjectilemotionCalulator : MonoBehaviour
{
    public float Speed = 10f, Angle = 45f, height = .1f;
    public GameObject projectilePrefab, m_playerScore;
    public Transform projectileStartTransform, projectileEndTransform, parentTansform;
    public Material _6sMat, _4sMat, _1sMat;
    public Transform[] arrayOf4s, arrayOf6s, arrayOf1s;
    public TMP_Text scoreText;
    // Start is called before the first frame update
    void Start()
    {
        ThrowProjectile();
    }

    // Update is called once per frame
    void Update()
    {

    }



    public async static void CalculateTrajectory(Transform parenttranf, GameObject projectileObj, Vector3 projectileStartPoint, Quaternion proctileStartAngle, Vector3 projectileEndPoint, float launchAngle, float launchSpeed, float projectileHeight, Material renderMat)
    {
        float _launchangle = launchAngle;// 45f; // or whatever angle you want
        float _launchspeed = launchSpeed;// 10f; // or whatever speed you want
        float radians = launchAngle * Mathf.Deg2Rad;
        float initialVelocity = launchSpeed / Mathf.Cos(radians);

        Debug.Log($"initial velocity {initialVelocity}");

        float distance = Vector3.Distance(projectileStartPoint, projectileEndPoint);
        float time = distance / initialVelocity;
        Debug.Log($"value for time and distance is {time} {distance}");

        Vector3 direction = (projectileEndPoint - projectileStartPoint).normalized;
        float vx = initialVelocity * direction.z;
        float vy = initialVelocity * direction.y;

        Debug.Log($"direction vector {direction}");
        Debug.Log($"value of vx and vy {vx} {vy}");

        // Instantiate and throw projectile
        GameObject projectile = Instantiate(projectileObj, projectileStartPoint, proctileStartAngle, parenttranf);
        Rigidbody rigidbody = projectile.GetComponent<Rigidbody>();
        rigidbody.AddForce(new Vector3(0, vy, vx), ForceMode.VelocityChange);

        Vector3[] positions = CalculateProjectilePath(projectileStartPoint, projectileEndPoint, projectileHeight, 0.01f);
        projectile.GetComponent<LineRenderer>().positionCount = positions.Length;
        projectile.GetComponent<LineRenderer>().SetPositions(positions);
        projectile.GetComponent<LineRenderer>().material = renderMat;

        await Task.Yield();


    }

    public void ThrowProjectile()
    {
        for (int i = 0; i < arrayOf4s.Length; i++)
        {
            CalculateTrajectory(parentTansform, projectilePrefab, projectileStartTransform.position, projectileStartTransform.rotation, arrayOf4s[i].position, Angle, Speed, Random.Range(0f,0.05f), _4sMat);
        }
        for (int i = 0; i < arrayOf6s.Length; i++)
        {
            CalculateTrajectory(parentTansform, projectilePrefab, projectileStartTransform.position, projectileStartTransform.rotation, arrayOf6s[i].position, Angle, Speed, Random.Range(0.05f, 0.15f), _6sMat);
        }
        for (int i = 0; i < arrayOf1s.Length; i++)
        {
            CalculateTrajectory(parentTansform, projectilePrefab, projectileStartTransform.position, projectileStartTransform.rotation, arrayOf1s[i].position, Angle, Speed, Random.Range(0f,.01f), _1sMat);
        }

        m_playerScore.SetActive(true);
        var total6sPoints = 6*arrayOf6s.Length;
        var total4sPoints = 4* arrayOf4s.Length;
        var totsl1sPoints = arrayOf1s.Length;
        var total = total4sPoints + total6sPoints + totsl1sPoints;
        scoreText.text = total.ToString()+"*";
    }

    private static Vector3[] CalculateProjectilePath(Vector3 start, Vector3 end, float height, float interval)
    {
        Vector3 direction = (end - start).normalized;
        float distance = Vector3.Distance(start, end);

        List<Vector3> positions = new List<Vector3>();
        for (float i = 0; i <= distance; i += interval)
        {
            float t = i / distance;
            Vector3 position = Vector3.Lerp(start, end, t);
            position.y += height * Mathf.Sin(t * Mathf.PI);
            positions.Add(position);
        }

        return positions.ToArray();
    }

    private void OnDisable()
    {
        m_playerScore.SetActive(false);
    }
}
