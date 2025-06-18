function setupImages() {
  selectedImages = [];
  result.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  const imagesWithDup = [...images];
  const duplicateClass = images[Math.floor(Math.random() * images.length)];
  imagesWithDup.push(duplicateClass);
  imagesWithDup.sort(() => Math.random() - 0.5);

  imagesWithDup.forEach((imgClass, index) => {
    const img = document.getElementById(`img${index}`);
    img.className = `tile ${imgClass}`;
    img.dataset.class = imgClass;
    img.classList.remove("selected");
    img.addEventListener("click", () => handleImageClick(img));
  });
}
