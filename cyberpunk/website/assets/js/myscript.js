$(document).ready(function () {
  var timer = setInterval(function () {
    var count = $("span.countdown").html();
    // console.log(count);
    if (count > 1) {
      $("span.countdown").html(count - 1);
    } else {
      
      $("#timerdata").html("Time Up");
      clearInterval(timer);
      setTimeout(function() {
        $('#exampleModal').modal('toggle');
      }, 1000);
      
    }
  }, 1000);

  const galleryImages = document.querySelectorAll("#gallery .portfolio-wrap");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const portfolioImg = document.querySelector(".portfolio-container img");

      portfolioImg.src = img.firstElementChild.src;
    });
  });
});

let isCanvasAdded = false;
function myFunction() {
  const canvasContainer = document.querySelector(".convasContainer");
  if (!isCanvasAdded) {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    video.classList.add("w-100");

    const captureButton = document.createElement("button");
    captureButton.textContent = "Capture";
    // canvasContainer.appendChild(canvas);
    canvasContainer.appendChild(video);
    canvasContainer.appendChild(captureButton);
    isCanvasAdded = true;

    const constraints = {
      video: true,
      deviceId: {
        exact:
          "562599c08dba1463dfbc478606bd6cc3ebe47e2d80bb91b8b33c04000f2d65b2",
      },
    };

    // Get access to the webcam and display the video stream
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error("Unable to access camera: " + err));

    // Take a snapshot of the video feed and display it on the canvas
    captureButton.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      //   console.log(myimage);
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.getElementById("downloadLink");

        const img = document.getElementById("mainimagetop");
        img.src = url;
        // document.getElementById("imageContainershot").appendChild(img);

        link.href = url;
        link.click();

        const parentDivHeader = document.getElementById("share2shineheader");
        parentDivHeader.scrollIntoView({ behavior: "smooth" });

        canvasContainer.innerHTML = "";
        isCanvasAdded = false;
      }, "image/png");
    });
  } else {
    canvasContainer.innerHTML = "";

    isCanvasAdded = false;
  }
}

function uploadImage() {
  $('#uploadsuccess').modal('toggle');
}

myFunction();
