const width = 320;
const height = 0;
const streaming = false;

let captureBtns = document.querySelectorAll('.capture');
captureBtns.forEach((d, index) => {
    d.addEventListener('click', () => {
        handleCamera(d, `camera-id--${index}`);
    });
});

const genrateCameraViewPort = (id = 'player_camera_view') => {
    const cameraVideo = document.createElement('video');
    cameraVideo.setAttribute('id', id);
    cameraVideo.setAttribute('height', '60%');
    cameraVideo.setAttribute('width', '60%');
    cameraVideo.style.borderRadius = '50%';
    return cameraVideo;
};

const handleCamera = (d, id) => {
    let cameraContainer = d.parentElement.querySelector('.camera');
    // console.log(cameraContainer);
    if (!!cameraContainer) {
        if (!cameraContainer.contains(document.querySelector(`#${id}`))) {
            const cameraViewPort = genrateCameraViewPort(id);
            cameraContainer.innerHTML = null;
            cameraContainer.append(cameraViewPort);
            openCamera(d, cameraViewPort, cameraContainer);
        } else {
            console.log('Already Running an nstance with the existing ID');
        }
    }
};

function openCamera(captureBtn, video, cameraContainer) {
    captureBtn.innerHTML = 'Capture Image';
    console.log(captureBtn);
    captureBtn.removeEventListener('click', handleCamera);

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            captureBtn.addEventListener('click', () => {
                captureImage(captureBtn, video, cameraContainer);
                stopStream(stream);
                if (cameraContainer.contains(document.querySelector('video'))) {
                    cameraContainer.querySelector('video').style.display = 'none';
                }
            });
        })
        .catch(function (err) {
            console.log('An error occurred: ' + err);
        });
}

function stopStream(stream) {
    stream.getVideoTracks().forEach(function (track) {
        track.stop();
    });
}

function captureImage(captureBtn, video, cameraContainer) {
    let imageCanvas = document.createElement('canvas');
    imageCanvas.height = '150';
    imageCanvas.width = '180';
    imageCanvas.style.borderRadius = "50%";
    cameraContainer.append(imageCanvas);
    var ctx = imageCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 200, 200);
    var data = imageCanvas.toDataURL('image/png');
    console.log(data);
    captureBtn.innerHTML = 'Recapture';
    captureBtn.addEventListener('click', () => {
        handleCamera(captureBtn, 'recapture_id');
    });
}