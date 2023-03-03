using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;


public class Screenshot : MonoBehaviour
{
    public List<GameObject> UIList;
    public List<GameObject> RandomFrame;
    public GameObject savedAt;

    private string directoryName = "GeoCricketAR";
    private int rndFrame;
    private AudioSource audioS;


    private void Start()
    {
        audioS = GetComponent<AudioSource>();
        savedAt.SetActive(false);
    }


    public void clickTakeScreenshot()
    {
        Debug.Log("@@ Take Shot");
        audioS.Play();

        //Hide Canvas UI items
        //ToggleCanvasItems(false);

        //Show a Random Frame
        //showRandomFrame();
        
        //Take the shot
        StartCoroutine(TakeScreenshotAndSave());
    }

    private IEnumerator TakeScreenshotAndSave()
    {
        yield return new WaitForEndOfFrame();

        Texture2D ss = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        ss.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
        ss.Apply();
        
        // Save the screenshot to Gallery/Photos
        string name = string.Format("{0}_{1}.png", Application.productName, System.DateTime.Now.ToString("yyyy-MM-dd-HHmmss"));
	    NativeGallery.Permission permission = NativeGallery.SaveImageToGallery(ss, Application.productName + " Captures", name + ".jpg");
        Debug.Log("@@@ Permission result: " + permission );

        yield return new WaitForSeconds(.5f);
        //ToggleCanvasItems(true);
        //RandomFrame[rndFrame].SetActive(false);

        if (permission != NativeGallery.Permission.Denied) {
            savedAt.SetActive(true);
            yield return new WaitForSeconds(3f);
            savedAt.SetActive(false);
        }
    }

    void ToggleCanvasItems(bool show)
    {
        for (int i=0; i < UIList.Count; i++)
            UIList[i].SetActive(show);
    }

    void showRandomFrame()
    {
        rndFrame = UnityEngine.Random.Range(0, RandomFrame.Count);
        RandomFrame[rndFrame].SetActive(true);
    }
}
