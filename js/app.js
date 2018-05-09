// Global Variables
// --------------------
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then((stream) => {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch(e => {
    console.log(`Error: ${e}`);
  });

// Play when ready
video.addEventListener('canplay', e => {
  if (!streaming) {
    // Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

// Photo button event
photoButton.addEventListener('click', e => {
  takePicture();

  e.preventDefault();
}, false);

// Filter event
photoFilter.addEventListener('change', e => {
  // Set filter to chosen option
  filter = e.target.value;
  // Set filter to video
  video.style.filter = filter;

  e.preventDefault();
});

// Clear event
clearButton.addEventListener('click', e => {
  // Clear photos
  photos.innerHTML = '';
  // Change filter back to none
  filter = 'none';
  // Set video filter
  video.style.filter = filter;
  // Reset select list
  photoFilter.selectedIndex = 0;
});

// Take picture from canvas
const takePicture = () => {
  // Create canvas
  const context = canvas.getContext('2d');

  if (width && height) {
    // Set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Create image from the canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create img element
    const img = document.createElement('img');

    // Set img src
    img.setAttribute('src', imgUrl);

    // Set image filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
};
