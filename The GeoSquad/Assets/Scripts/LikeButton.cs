using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LikeButton : MonoBehaviour
{
    public Animator anim;
    public AudioSource audio;
    public GameObject heartsPrefab;

    
    public void ButtonClicked()
    {        
        anim.SetTrigger("Click");
        audio.Play();
        Instantiate(heartsPrefab, transform.position, Quaternion.LookRotation(-transform.forward, transform.up));
    }
}
