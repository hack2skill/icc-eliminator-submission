
# Team Name -
**Convai Innovations**
# Track -
**AR/VR**
# Brief Description and Snapshots -

# Virtual Reality Cricket Coaching with Cricketers Avatar
## Overview
This project provides virtual reality coaching for cricket with a 3D avatar of Virat Kohli, a famous Indian cricketer. The coaching covers multiple master batting classes, including the flick, cover drive, pull shot, and more. Users can access the training on the Meta Quest headset. The platform uses advanced technologies like Unreal Engine, MetaHuman 3D avatar creator platform, and AI based pose estimation using MeTRAbs(https://arxiv.org/abs/2007.07227) to provide an immersive and engaging experience to the users.
We have employed MeTRAbs, a reliable 3D pose estimation technique, to streamline control rig animation. To facilitate our upcoming **chatbot** AI integration, **we have developed a PyTorch-based API, which is deployed on an AWS EC2 GPU instance for improved performance.**

## Demo Video

Check out the demo video

[![Alt text](https://img.youtube.com/vi/i4E9pcAUN5c/0.jpg)](https://www.youtube.com/watch?v=i4E9pcAUN5c)

## Requirements
To run this project, you will need:

1. A Meta Quest headset
2. Unreal Engine 4.27 or higher
3. MetaHuman 3D avatar creator platform

## Usage
To use the platform, follow these steps:

### Download and install the app on Meta Quest 2

**APK Link** : https://drive.google.com/file/d/1uqhaYZOzGVh08LTyucLwd6O-Bfb6z8m0/view?usp=share_link

Put on the Meta Quest headset
Follow the instructions provided by the 3D avatar to learn the techniques

## Installation

1. Clone the repository to your local machine
2. Install Unreal Engine 4.27 or higher
3. Open the project in Unreal Engine : NOTE THAT DUE TO HIGHER SIZE OF THE GAME(> 5GB) DIDN'T UPLOADED IN THE GITHUB REPO. 
4. Connect the Meta Quest headset to your computer
5. Build and run the project 

## Features
1. Virtual reality coaching for cricket with a 3D avatar of Virat Kohli
2. Multiple master batting classes included, such as the flick, cover drive, and pull shot
3. Advanced technologies like Unreal Engine, MetaHuman 3D avatar creator platform, and Pose estimation
4. Immersive and engaging experience

## Advanced video to 3d pose conversion for control rig animation Unreal Engine
![alt text](https://github.com/NandhaKishorM/icc-eliminator-submission/blob/main/Convai%20Innovations/screenshots/metrabs.png)

## Todo List
1. We have recently introduced **CUTY**, a **3D avatar powered by our state-of-the-art 400M large language model**. The model leverages a Transformer-based architecture similar to **GPT** and includes **internet search capability**. It took us **two years** to develop and incorporates a **Cross platform API** for intelligent interaction with a **persona of cricket coach**. The model has been **fine-tuned on a cricket dataset** to enhance its accuracy. To experience its full potential, **kindly turn on the volume in the video demonstration**. CUTY is available both on the **web and VR platforms**. PS: Server has been turned off due to development and server cost(Nvidia A10 GPU costs)

https://user-images.githubusercontent.com/48623612/222485817-e996263d-aced-4b49-9180-1f27246d3fb7.mp4


You can find more details on the CUTY on : https://convaiinnovations.com/

2. Implement deep reinforcement learning to create an intelligent 3D avatar that can improve the user experience
3. Add more master classes for batting
4. Create an analytics dashboard to track user progress and performance
5. Integrate social media sharing features to allow users to share their experience with others
## Screenshots

<div align="center">
  <img src="./Convai Innovations/screenshots/5.png" width="500" />
  <img src="Convai Innovations/screenshots/6.png" width="500" />
  <br />
  <img src="Convai Innovations/screenshots/1.png" width="500" />
  <img src="Convai Innovations/screenshots/2.png" width="500" />
</div>

## Reference

1. Thanks to the original video for the reference : https://www.youtube.com/shorts/OmR4WMIQcek
2. https://arxiv.org/abs/2007.07227


