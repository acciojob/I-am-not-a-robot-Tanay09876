//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const container = document.getElementById("image-container");
const h = document.getElementById("h");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

let selected = [];

function shuffleAndRenderImages() {
  container.innerHTML = "";
  para.textContent = "";
  selected = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  const dupIndex = Math.floor(Math.random() * images.length);
  const dupClass = images[dupIndex];

  let allImages = [...images, dupClass];

  // Shuffle
  allImages = allImages.sort(() => Math.random() - 0.5);

  allImages.forEach((imgClass, i) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.dataset.class = imgClass;
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selected.includes(img)) return;

  img.classList.add("selected");
  selected.push(img);

  if (selected.length === 1) {
    resetBtn.style.display = "inline-block";
  }

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }

  if (selected.length > 2) {
    selected.forEach((el) => el.classList.remove("selected"));
    selected = [];
    verifyBtn.style.display = "none";
    para.textContent = "You can only select two tiles.";
  }
}

resetBtn.addEventListener("click", () => {
  selected.forEach((img) => img.classList.remove("selected"));
  selected = [];
  para.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  const [img1, img2] = selected;
  if (img1.dataset.class === img2.dataset.class) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

shuffleAndRenderImages();
