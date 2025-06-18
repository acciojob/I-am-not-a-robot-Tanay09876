const allImages = Array.from(document.querySelectorAll('.tile'));
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const result = document.getElementById('para');

let selectedImages = [];

function shuffleImages() {
  const container = document.getElementById('image-container');
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  shuffled.forEach(img => container.appendChild(img));
}

function resetSelection() {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  result.innerText = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;
  if (selectedImages.length >= 2) return;

  img.classList.add('selected');
  selectedImages.push(img);
  resetBtn.style.display = 'inline';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline';
  }
}

function verifySelection() {
  const [img1, img2] = selectedImages;
  const class1 = img1.dataset.class;
  const class2 = img2.dataset.class;

  if (class1 === class2) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = 'none';
}

resetBtn.addEventListener('click', resetSelection);
verifyBtn.addEventListener('click', verifySelection);

allImages.forEach(img => {
  img.addEventListener('click', () => handleImageClick(img));
});

shuffleImages();
