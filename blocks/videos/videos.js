// https://drive.google.com/file/d/1W693LJuC_zrx4dc2lCTVkIk2DbXwd4DV/preview?usp=drive_link

// const videoLink = document.querySelector('a[href*="drive.google.com/file"]');

// if (videoLink) {
//   const fileId = videoLink.href.split('/d/')[1].split('/')[0]; // Extract file ID
//   const iframe = document.createElement('iframe');
//   iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
//   iframe.allow = 'autoplay; encrypted-media';
//   iframe.width = '560';
//   iframe.height = '315';
//   iframe.frameBorder = '0';
//   iframe.allowFullscreen = true;
  
//   videoLink.parentNode.replaceChild(iframe, videoLink); // Replace link with iframe
// }

// https://www.youtube.com/watch?v=1SP0FHO4tIE&list=PLEaEQSM_Y4tlrOCheSWep4r6yTjA3eL_0&index=16

const videoLink = document.querySelector('a[href*="youtube.com/watch"]');

if (videoLink) {
  const urlParams = new URLSearchParams(new URL(videoLink.href).search);
  const videoId = urlParams.get('v'); // Extract YouTube video ID
  if (videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;

    videoLink.parentNode.replaceChild(iframe, videoLink);
  }
}
