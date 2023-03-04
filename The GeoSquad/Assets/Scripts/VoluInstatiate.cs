using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VoluInstatiate : MonoBehaviour
{
    public GameObject voluPrefab;


    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey("space"))
        {
            Debug.Log("pressed space");
            //Instantiate(voluPrefab, transform.position, Quaternion.identity);
            voluPrefab.SetActive(true);
        }
    }
}
