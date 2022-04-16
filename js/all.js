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
let cropper = '';

// step into editing
nextBtn.addEventListener('click', () => {
  carousel.scrollTo(document.body.clientWidth, 0);
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
    aspectRatio: 16 / 9,
    preview: '#preview'
  });
  cropped.appendChild(cropperImg);
})

// 重新上傳
btnReupload.addEventListener('click', (e) => {
  e.preventDefault();
  uploadedImg.classList.add('hidden');
  inputBtn.classList.remove('hidden');
})

// 1*1 
ratioSqaure.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(1 / 1);
})

// 16*9 
ratioRec.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(16 / 9);
})

// Free
ratioFree.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.setAspectRatio(NaN);
})

// rotateLeft
rotateLeftBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.rotate(-90);
})

// rotateRight
rotateRightBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cropper.rotate(90);
})

// download
download.addEventListener('click', (e) => {
  e.preventDefault();
  saveCropImg();
})
function saveCropImg() {
  const _this = this
  cropper.getCroppedCanvas().toBlob(function (blob) {
    const href = window.URL.createObjectURL(blob);
    // 加入浮水印
    watermark([href, './photo.png'])
      .image(watermark.image.lowerRight())
      .then(img => {
        const downloadElement = document.createElement('a');
        downloadElement.href = img.src;
        downloadElement.download = _this.imgName
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href); 
      });
    
  }, 'image/png')
}
