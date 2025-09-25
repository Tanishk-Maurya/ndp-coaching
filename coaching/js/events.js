const galleryItems = document.querySelectorAll('#image-gallery .gallery-item');
const fullscreenPreview = document.getElementById('fullscreen-preview');
const previewImg = document.getElementById('preview-img');
const thumbnailsContainer = document.getElementById('thumbnails');
const closeBtn = document.getElementById('close-preview');
const videoItems = document.querySelectorAll('#video-gallery .gallery-item');



galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    fullscreenPreview.style.display = 'flex';
    previewImg.src = img.src;
    createThumbnails(index);
  });

  // Masonry row span calculation
  img.addEventListener('load', () => {
    const rowHeight = 10; // same as CSS grid-auto-rows
    const rowGap = 10;
    const rowSpan = Math.ceil((img.naturalHeight / img.naturalWidth) * (img.clientWidth / rowHeight));
    img.style.gridRowEnd = `span ${rowSpan}`;
  });

  if (img.complete) {
    const rowHeight = 10;
    const rowSpan = Math.ceil((img.naturalHeight / img.naturalWidth) * (img.clientWidth / rowHeight));
    img.style.gridRowEnd = `span ${rowSpan}`;
  }
});

// Fullscreen close
closeBtn.addEventListener('click', () => {
  fullscreenPreview.style.display = 'none';
});

// Create thumbnails in fullscreen
function createThumbnails(activeIndex) {
  thumbnailsContainer.innerHTML = '';
  galleryItems.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    if (index === activeIndex) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      previewImg.src = img.src;
      document.querySelectorAll('.thumbnails img').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbnailsContainer.appendChild(thumb);
  });
}


// %%%%%%%%%%%%%%%%  video section

videoItems.forEach((vid, index) => {
  vid.addEventListener('click', () => {
    fullscreenPreview.style.display = 'flex';

    // Replace image with video
    previewImg.style.display = 'none';

    // Remove previous video if any
    const existingVideo = fullscreenPreview.querySelector('video');
    if (existingVideo) existingVideo.remove();

    const fullVideo = document.createElement('video');
    fullVideo.src = vid.querySelector('source').src;
    fullVideo.controls = true;
    fullVideo.autoplay = true;
    fullVideo.classList.add('fullscreen-video');
    fullscreenPreview.insertBefore(fullVideo, thumbnailsContainer);

    createVideoThumbnails(index);
  });
});

// Close button also removes fullscreen video
closeBtn.addEventListener('click', () => {
    fullscreenPreview.style.display = 'none';
    const fullVideo = fullscreenPreview.querySelector('video');
    if(fullVideo) fullVideo.remove();
    previewImg.style.display = 'block';
});

// Create video thumbnails
function createVideoThumbnails(activeIndex) {
  thumbnailsContainer.innerHTML = '';
  videoItems.forEach((vid, index) => {
    const thumb = document.createElement('video');
    thumb.src = vid.querySelector('source').src;
    thumb.width = 80;
    thumb.height = 60;
    thumb.muted = true;
    thumb.controls = false;
    thumb.style.objectFit = 'cover';
    thumb.style.cursor = 'pointer';
    if (index === activeIndex) thumb.classList.add('active');

    thumb.addEventListener('click', () => {
      const fullscreenVideo = fullscreenPreview.querySelector('video');
      if (fullscreenVideo) fullscreenVideo.src = thumb.src;
      document.querySelectorAll('.thumbnails video').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });

    thumbnailsContainer.appendChild(thumb);
  });
}
