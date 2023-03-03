<img src="https://wellness.edu.au/wp-content/uploads/2019/05/circket.jpg" width="250px" alt="GeoCricket AR" align="right">

# Introduction
<div>Tired of cluttered photo albums and boring Match Day waiting? Say goodbye to snooze-fest and hello to GeoCricket AR! The ultimate cricket fan app allows you to capture all of your favorite moments from the game or event with your smartphone camera, and then easily store, organize, and share them in a meaningful and fun way. Our cutting-edge technology allows you to create your own personalized 3D stadium, where you can revisit your memories and share them with friends, family, and the world. So why wait? Download GeoCricket AR today and get ready to hit a home run!</div>

## About ARCore Geospatial API
 ARCore Geospatial API is a cloud localization service that allows clients to precisely geolocate smartphones with six degrees of freedom (6dof).</br>
 Unlike GPS, it can provide a **<1m translational and ~1-2 degrees rotational accuracy.** This is accomplished through visually matching your surroundings in streetview covered areas.
 
Dig into the API https://developers.google.com/ar/develop/geospatial

## Software

1. Unity 2021.3.14f1 with Android Build Support
2. ARCore Extensions for AR Foundation (https://developers.google.com/ar/develop/unity-arf/getting-started-extensions)
3. AR Foundation (automatically installed with the ARCore Extensions for AR Foundation SDK)
4. ARCore XR Plugin (automatically installed with the ARCore Extensions for AR Foundation SDK)
5. ARKit XR Plugin (automatically installed with the ARCore Extensions for AR Foundation SDK)

#### Building GeoCricket AR
1. In Google Cloud Console enable the ARCore api https://console.cloud.google.com/apis/library/arcore.googleapis.com
2. Create a Google Cloud Console api key by visiting https://console.cloud.google.com/. Click APIs & Services, and click Credentials.
3. Create a new API key and if you choose to restrict it, make sure you enable the ARCoreAPI
4. Add your API key in Project Settings > XR Plug-in Management > ARCore Extensions > Android API Key
6. Build and deploy to your Android device

---

# Using This Project


## To make it work in your area

1. Load the `PopularityRoute` Unity scene. 
2. Pick `ARVPSManager` object from Hierarchy.
3. Add as many as desired entries in GeospatialObjects List on Inspector
3. Enter Longitude, Latitude, Altitude and the prefab to show.

1. Load the `Selfie` Unity scene. 
2. Pick `VoluManager` object from Hierarchy.
3. Add a 4D-ready prefab to the `VoluObject` slot on Inspector


## Start Scene

Load the `Start` Unity scene in the `Assets/Scenes/` folder.

Pick any of the three menu options.
 
---

# FAQ

<em>My location never localizes</em>
> <p>Make sure you're in an outdoors area with Google Street View coverage, places like public parks may be tougher to localize.  Make sure you also have data service, and not just GPS.</p>

<em>I can't initialize the app</em>
> <p>Make sure you've created an API key in Google Cloud Console and enabled the ARCore API.  A data service is also necessary to use this API.</p>


