using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class NFTController : MonoBehaviour
{

    public bool purchased,unlocked=true;
    public GameObject Video, Poster;
    // Start is called before the first frame update
    void Start()
    {


    }
   public void showvideo()
    {
        Video.SetActive(true);
        Poster.SetActive(false);
    }
    // Update is called once per frame
    void Update()
    {
    }
}
