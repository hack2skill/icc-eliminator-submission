# Team Information

#### Team Name - The GeoSquad
#### Track - Stadium Experience

<img src="https://wellness.edu.au/wp-content/uploads/2019/05/circket.jpg" width="250px" alt="GeoCricket AR" align="right">

# Introduction
GeoCricket AR ™ is an app that allows capturing and storing photos in the geo-space and time. Using the smartphone and, with the help of augmented reality and geospatial technology, the app will capture photos of your visit to a cricket sports event and overlay them onto the real-world map, creating a virtual time capsule of your cricket experience. Other visitors to the same cricket stadium (or even yourself at a later time) will walk around and view photos at the place and angle they were captured. This results in stadiums all over the world that are geotagged with past and current photographic memories of the cricket fans.


**Metadata:** the app will also provide context to your photos, such as the date and time they were taken, providing users with a sense of historical context of the location.


**Social Engagement**: the app will also feature a social component, allowing users, not only see photos from matches and events they attended, but also to leave comments, likes and reactions to photos, creating a social and interactive experience for everyone. This way the app will not only preserve anyone’s memories but also create a community of cricket enthusiasts who share a love for the sport.


**Web Platform**: optionally, from the comfort of your couch, you’ll be able to explore the collection of any cricket stadium in the world, revisit favorite moments, award popularity points (“likes”) to the best photos and share your own photos collections with friends and family.


**Selfies with your favorite players**: on your way to your seat, the app will superimpose 4D life-sized, volumetric models of your favorite cricket players among the crowd. When you walk close to them, they will talk to you and you could then take a virtual selfie with the player and share it on social media.


**Popularity Routes**: the app will track the number of views, likes, comments, and shares each photo receives and assign it a popularity score based on this data. The next time you arrive at the stadium with your ticket at hand, you will scan the barcode in your ticket and the app will suggest routes to your seat based on the sum of the popularity scores of the pictures taken on the way - providing an enjoyable and fun way to spend spare time before the great event. 

## Tech Stack

1. Mobile Development:  Unity 3D Game Engine

2. Augmented Reality (AR) SDK: Google’s ARCore/ Apple’s ARKit. 

3. Geospatial Technology / VPS Service: Geospatial technology is handled by Google’s ARCore Geospatial API or by Niantic’s LightShip ARDK.

4. Volumetric video capture technology: using Volu service, create volumetric holograms of sports players – recorded with just a smartphone.

5. Web Development: Web platform created with Javascript framework ReactJS, CSS, HTML5.


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


