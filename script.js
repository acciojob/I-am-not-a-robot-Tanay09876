// script.js

const images = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];
let duplicateClass = "";


const h = document.createElement("h3");
h.id = "h";
h.innerText = "Please click on the identical tiles to verify that you are not a robot.";
document.body.prepend(h);

const container = document.createElement("div");
container.classList.add("flex");
container.classList.add("container");
document.querySelector("main").appendChild(container);

const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.innerText = "Reset";
resetBtn.style.display = "none";
document.body.appendChild(resetBtn);

const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.innerText = "Verify";
verifyBtn.style.display = "none";
document.body.appendChild(verifyBtn);

const result = document.createElement("p");
result.id = "para";
document.body.appendChild(result);


function setupImages() {
  container.innerHTML = "";
  selectedImages = [];
  result.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  const imagesWithDup = [...images];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  duplicateClass = randomImage;
  imagesWithDup.push(randomImage); 

 
  imagesWithDup.sort(() => Math.random() - 0.5);


  imagesWithDup.forEach((imgClass, i) => {
    const img = document.createElement("img");
    img.classList.add(imgClass, "tile"); // critical: use classList.add, not className
    img.dataset.class = imgClass;
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selectedImages.includes(img)) return;
  if (selectedImages.length >= 2) return;

  img.classList.add("selected");
  selectedImages.push(img);
  resetBtn.style.display = "inline";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  result.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;
  const class1 = img1.dataset.class;
  const class2 = img2.dataset.class;

  if (class1 === class2) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});


setupImages();
