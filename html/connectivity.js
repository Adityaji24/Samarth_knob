const images = [
  { id: "img1", src: "images/ac1.jpg", category: "Air Conditioner", title: "Blue Star 1.5 Ton AC", description: "Energy-efficient cooling for summer heat." },
  { id: "img3", src: "images/microwave1.jpg", category: "Microwave", title: "Samsung 23L Microwave", description: "Fast and even heating with a modern design." },
  { id: "img4", src: "images/fan1.jpg", category: "Fan", title: "Oreva Smart Ceiling Fan", description: "Smart cooling and customizable lighting." },
  { id: "img5", src: "images/washingm1.jpg", category: "Washing Machine", title: "LG 6.5 kg Front-load Washer", description: "Efficient washing for small families." },
  { id: "img6", src: "images/airfryer1.jpg", category: "Air Fryer", title: "Bosch 3.5L Air Fryer", description: "Fry with less oil and large capacity." },
  { id: "img11", src: "images/tv1.jpg", category: "TV", title: "Samsung 55\" 4K TV", description: "Stunning picture quality with Smart features." },
  { id: "img12", src: "images/hometheatre1.jpg", category: "Home Theatre", title: "Sony 5.1 Channel Home Theatre", description: "Experience cinema-quality sound at home." },
  { id: "img13", src: "images/mixergrinder1.jpg", category: "Mixer Grinder", title: "Philips 750W Mixer Grinder", description: "Powerful motor and multi-purpose grinding." }
];

function renderGallery(filteredImages) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  const categories = [...new Set(filteredImages.map(image => image.category))];

  categories.forEach(category => {
    const categorySection = document.createElement("div");
    categorySection.className = "category-section";

    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = category;
    categorySection.appendChild(categoryHeading);

    const categoryGallery = document.createElement("div");
    categoryGallery.className = "category-gallery";

    filteredImages
      .filter(image => image.category === category)
      .forEach(image => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${image.src}" alt="">
          <div class="content">
            <h3>${image.title}</h3>
            <p>${image.description}</p>
          </div>
        `;

        categoryGallery.appendChild(card);
      });

    categorySection.appendChild(categoryGallery);
    gallery.appendChild(categorySection);
  });

  if (filteredImages.length === 0) {
    gallery.innerHTML = "<p>No images found for the given title.</p>";
  }

  // Re-attach knob interactions after rendering
  setupKnobInteraction();
}

function searchImage() {
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
  const filteredImages = images.filter(image => image.title.toLowerCase().includes(searchInput));
  renderGallery(filteredImages);
}

function resetSearch() {
  document.getElementById("search-input").value = "";
  renderGallery(images);
}

function showRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  renderGallery([images[randomIndex]]);
}

function setupKnobInteraction() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      showKnobOverlay(card.querySelector("h3").textContent);
    });
  });
}

function showKnobOverlay(title) {
  const overlay = document.createElement("div");
  overlay.className = "knob-overlay";

  overlay.innerHTML = `
    <div class="knob-container">
      <h2>${title}</h2>
      <div class="controls">
        <button id="on-off-button" class="control-button">Off</button>
        <div class="circular-knob">
          <div class="knob" id="knob"></div>
          <div class="value" id="speed-value">5</div>
        </div>
      </div>
      <button class="close-button">Close</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const knob = overlay.querySelector("#knob");
  const speedValue = overlay.querySelector("#speed-value");
  const onOffButton = overlay.querySelector("#on-off-button");
  const closeButton = overlay.querySelector(".close-button");

  let currentAngle = 0;
  let isDragging = false;

  function updateValue(angle) {
    const normalizedValue = Math.round((angle / 360) * 5);
    speedValue.textContent = normalizedValue;
    console.log(`Speed: ${normalizedValue}`);
  }

  knob.addEventListener("mousedown", () => (isDragging = true));
  document.addEventListener("mouseup", () => (isDragging = false));
  document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const rect = knob.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
    currentAngle = (angle + 360) % 360;
    knob.style.transform = `rotate(${currentAngle}deg)`;
    updateValue(currentAngle);
  });

  onOffButton.addEventListener("click", () => {
    onOffButton.textContent = onOffButton.textContent === "Off" ? "On" : "Off";
  });

  closeButton.addEventListener("click", () => {
    overlay.remove();
  });
}

// Initial render
renderGallery(images);
