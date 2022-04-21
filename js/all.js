const prevBtn = document.querySelector('#btn-previous');
const nextBtn = document.querySelector('#btn-next');
const inputBtn = document.querySelector('.input-file-button ');
const upload = document.querySelector('#upload');
const uploadedImg = document.querySelector('#uploaded-img');
const btnReupload = document.querySelector('#btn-reupload');
const cropped = document.querySelector('#cropped');
const rotateLeftBtn = document.querySelector('#rotate-left');
const rotateRightBtn = document.querySelector('#rotate-right');
const ratioSqaure = document.querySelector('#ratio-sqaure');
const ratioRec = document.querySelector('#ratio-rec');
const ratioFree = document.querySelector('#ratio-free');
const cropperImg = document.createElement("img");
const preview = document.querySelector('#preview');
const download = document.querySelector('#download');
const downloadImg = document.querySelector('#downloadImg');
let cropper = '';

// step into editing
nextBtn.addEventListener('click', () => {
  carousel.scrollTo(document.body.clientWidth, 0);
  watermarkImage();
});

prevBtn.addEventListener('click', () => {
  carousel.scrollTo(0, 0);
});

// 選擇上傳檔案
inputBtn.addEventListener('click', function(e) {
  e.preventDefault();
  upload.click()
})

upload.addEventListener('change', async (e) => {
  e.preventDefault();
  const file = upload.files[0]
  uploadedImg.src = window.URL.createObjectURL(file);
  uploadedImg.classList.remove('hidden');
  inputBtn.classList.add('hidden');
  cropperImg.src = window.URL.createObjectURL(file);
  cropper = new Cropper(cropperImg, {
    aspectRatio: 16 / 9
    // preview: '#preview'
  });
  cropped.appendChild(cropperImg);
})

// 裁切事件
cropped.addEventListener('cropend', (e) => {
  watermarkImage();
})

// 重新上傳
btnReupload.addEventListener('click', (e) => {
  e.preventDefault();
  uploadedImg.classList.add('hidden');
  inputBtn.classList.remove('hidden');
  // 清除 cropper 資料
  if (cropper) {
    cropper.destroy();
    cropped.innerHTML = '';
    preview.src = '';
  }
})

// 1*1 
ratioSqaure.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(1 / 1);
  watermarkImage();
})

// 16*9 
ratioRec.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(16 / 9);
  watermarkImage();
})

// Free
ratioFree.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(NaN);
  watermarkImage();
})

// rotateLeft
rotateLeftBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.rotate(-90);
  watermarkImage();
})

// rotateRight
rotateRightBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.rotate(90);
  watermarkImage();
})

// download
download.addEventListener('click', (e) => {
  e.preventDefault();
  saveCropImg();
})
function saveCropImg() {
  const _this = this
  downloadImg.download = _this.imgName
  document.body.appendChild(downloadImg);
  downloadImg.click();
  window.URL.revokeObjectURL(downloadImg.href);
}

// 預覽圖片加浮水印
function watermarkImage() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();
  img.src = 'https://hexschool.github.io/escape-cropper/photo.png';
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    const canvasWidth = cropper.getCroppedCanvas().width;
    const canvasHeight = cropper.getCroppedCanvas().height;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // initializing the canvas with the original image
    context.drawImage(cropper.getCroppedCanvas(), 0, 0, canvasWidth, canvasHeight);

    // translating the watermark image to the bottom right corner
    context.drawImage(img, canvas.width - 110, canvas.height - 100, 100, 100);
    preview.src = canvas.toDataURL('image/png');
    downloadImg.href = canvas.toDataURL('image/png');
  }
}