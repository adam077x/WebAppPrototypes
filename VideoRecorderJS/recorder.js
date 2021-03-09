const { desktopCapturer, remote } = require('electron');

const { writeFile } = require('fs');

const { dialog, Menu } = remote;

let mediaRecorder;
const recordedChunks = [];

const videoElement = document.querySelector('video');

var recording = false;

const startBtn = document.getElementById('startBtn');
startBtn.onclick = e => {
    if(!recording) {
        mediaRecorder.start();
        startBtn.classList.add('is-danger');
        startBtn.innerText = 'Stop Recording';
    }
    else {
        mediaRecorder.stop();
        startBtn.classList.remove('is-danger');
        startBtn.innerText = "Start Recording";
    }
    recording = !recording;
};

//const videoSelectBtn = document.getElementById('videoSelectBtn');
videoElement.onclick = getViewSources;

async function getViewSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ["window", "screen"]
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            };
        })
    );
    
    videoOptionsMenu.popup();
}

async function selectSource(source) {
    videoElement.innerText = source.name;

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.play();

    const options = { mimeType: 'video/webm; codecs=vp9'};
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
}

function handleDataAvailable(e) {
    recordedChunks.push(e.data);
} 

async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const {filePath} = await dialog.showSaveDialog({
        buttonLabel: 'Save video',
        defaultPath: `vid-${Date.now()}.webm`
    });

    if(filePath) {
        writeFile(filePath, buffer, () => console.log("Video has been saved"));
    }
}