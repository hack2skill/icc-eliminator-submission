using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class TouchManager : MonoBehaviour
{
    private Vector3 touch;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.touchCount > 0)
        {
            Debug.Log("After  Input");
             touch = Input.GetTouch(0).position;
            for (var i = 0; i < Input.touchCount; i++)
            {
                if (Input.GetTouch(i).phase == TouchPhase.Began)
                {
                    RaycastHit Hit;
                    Debug.Log("Before");
                    var ray = Camera.main.ScreenPointToRay(Input.GetTouch(i).position);
                    Debug.Log(ray);
                    if (Physics.Raycast(ray, out Hit))
                    {
                        Debug.Log("Name is " + Hit.transform.name);
                        if (Hit.transform.name == "Screen")
                        {
                            var videoPlayer = Hit.transform.gameObject.GetComponent<VideoPlayer>();
                            var audioPlayer = Hit.transform.gameObject.GetComponent<AudioSource>();
                            PlayPause(videoPlayer, audioPlayer);
                        }
                        else if (Hit.transform.name == "Poster")
                        {
                            var nft = Hit.transform.parent.gameObject;
                            nft.GetComponent<NFTController>().showvideo();
                            Application.OpenURL("https://www.fancode.com/shop/category/t-shirts/india-men-camo-black-round-neck-t-shirt/T2INMTS205");
                        }
                    }
                }
            }
        }
    }
    public void PlayPause(VideoPlayer cp, AudioSource aus)
    {
        if (!cp.isPlaying)
        {
            cp.Play();
            aus.Play();
        }
        else
        {
            cp.Pause();
            aus.Pause();
        }
    }
}
