/**
  * Photo Snap
  * Snap selfies from the browser with filters.
  *
  * Author: Leonardo Da Costa
  * Date: 08/05/18
  * License: MIT
  *
  **/

// --------- Global Variables --------- //

let width     = 500,
    height    = 0,
    filter    = 'none',
    streaming = false;

// Cache DOM
const video       = document.getElementById('video'),
      canvas      = document.getElementById('canvas'),
      photos      = document.getElementById('photos'),
      photoButton = document.getElementById('photo-button'),
      clearButton = document.getElementById('clear-button'),
      photoFilter = document.getElementById('photo-filter');

// --------- Events --------- //

navigator.mediaDevices.getUserMedia({ video: true})
  .then(stream => {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch(e => console.log(`Error: ${e}`));

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

// Listen for click on photo button
photoButton.addEventListener('click', e => {
  // Prevent default behaviour
  e.preventDefault();

  takePicture();
}, false);

// Listen for change on filter
photoFilter.addEventListener('change', e => {
  e.preventDefault();

  // Set filter to chosen option
  filter = e.target.value;
  // Set filter to video
  video.style.filter = filter;
});

// Listen for click on clear
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

// Take piture from canvas
const takePicture = () => {
  // Create canvas
  const context = canvas.getContext('2d');
  // Check for width & height
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
    // Set img filter
    img.style.filter = filter;

    // Add img to photos
    photos.appendChild(img);
  }
};
