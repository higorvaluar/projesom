document.addEventListener('DOMContentLoaded', () => {
  const publicGallery = document.getElementById('publicGallery');
  const mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];

  const previewOverlay = document.getElementById('mediaPreview');
  const previewMedia = document.getElementById('previewMedia');
  const previewTitle = document.getElementById('previewTitle');
  const previewDescription = document.getElementById('previewDescription');
  const closeBtn = document.getElementById('closePreview');

  mediaList.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';

    let media;
    if (item.type.startsWith('image/')) {
      media = document.createElement('img');
      media.src = item.dataUrl;
    } else {
      media = document.createElement('video');
      media.src = item.dataUrl;
      media.controls = true;
    }

    const title = document.createElement('h3');
    title.textContent = item.title;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    div.appendChild(media);
    div.appendChild(title);
    div.appendChild(desc);

    div.addEventListener('click', () => {
      previewMedia.innerHTML = '';
      
      // Reinicia a animação
      const content = previewOverlay.querySelector('.preview-content');
      content.style.animation = 'none';
      void content.offsetWidth; // forçar reflow
      content.style.animation = 'fadeInScale 0.3s ease';

      previewOverlay.querySelector('.preview-content').classList.remove('vertical');

      const tempImage = new Image();
      tempImage.onload = () => {
        const ratio = tempImage.height / tempImage.width;
        if (ratio > 1.3) {
          previewOverlay.querySelector('.preview-content').classList.add('vertical');
        }
      };
      if (item.type.startsWith('image/')) {
        tempImage.src = item.dataUrl;
      }
      const clone = media.cloneNode(true);
      if (clone.tagName === 'VIDEO') clone.controls = true;
      previewMedia.appendChild(clone);

      previewTitle.textContent = item.title;
      previewDescription.textContent = item.description;
      previewOverlay.classList.remove('hidden');
    });

    publicGallery.appendChild(div);
  });

  closeBtn.addEventListener('click', () => {
    previewOverlay.classList.add('hidden');
  });

  previewOverlay.addEventListener('click', (e) => {
    const content = document.querySelector('.preview-content');
    if (!content.contains(e.target)) {
      previewOverlay.classList.add('hidden');
    }
  });
})
