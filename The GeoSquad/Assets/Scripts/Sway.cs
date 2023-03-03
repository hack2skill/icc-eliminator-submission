using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Sway : MonoBehaviour
{
    public float amount = 0.08f;
    public float maxAmount = 0.09f;
    public float UpAmount = 0.03f;
    float smooth = 3;
    Vector3 def;
    Vector2 defAth;
    Vector3 euler;

    void Start()
    {
        def = transform.localPosition;
        euler = transform.localEulerAngles;
    }

    float _smooth;

    void Update()
    {
        _smooth = smooth;

        float fx = Camera.main.transform.rotation.y * amount;
        float fy = -Camera.main.transform.rotation.x * amount;

        if(fx > maxAmount)
        {
            fx = maxAmount;
        }
        if(fx < -maxAmount)
        {
            fx = -maxAmount;
        }

        if(fy > UpAmount)
        {
            fy = UpAmount;
        }
        if(fy < -UpAmount)
        {
            fy = -UpAmount;
        }

        Vector3 final = new Vector3 (def.x + fx, def.y + fy, def.z);
        transform.localPosition = Vector3.Lerp(transform.localPosition, final, Time.deltaTime * _smooth);
    }
}
