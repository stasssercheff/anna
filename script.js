// ================== Меню 3 точки ==================
const menuBtn = document.getElementById("menu-btn");
const menuDropdown = document.getElementById("menu-dropdown");
const menuItems = document.querySelectorAll(".menu-item");
const contentBlocks = document.querySelectorAll(".content-block");

menuBtn.addEventListener("click", () => {
  menuDropdown.classList.toggle("hidden");
});

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;

    contentBlocks.forEach(block => {
      if(block.id === target) block.classList.remove("hidden");
      else block.classList.add("hidden");
    });

    menuDropdown.classList.add("hidden");
  });
});

// ================== Календарь записи ==================
const scheduleBody = document.querySelector("#schedule tbody");

const times = ["10:00", "12:00", "14:00", "16:00"];
const initialSlots = {
  "10:00": ["occupied","available","occupied","available","available","available","available"],
  "12:00": ["occupied","available","occupied","available","available","available","available"],
  "14:00": ["available","available","occupied","available","available","available","available"],
  "16:00": ["available","available","available","available","occupied","available","available"]
};

function renderSchedule() {
  scheduleBody.innerHTML = "";
  times.forEach(time => {
    const tr = document.createElement("tr");
    const timeTd = document.createElement("td");
    timeTd.textContent = time;
    tr.appendChild(timeTd);

    initialSlots[time].forEach((status) => {
      const td = document.createElement("td");
      td.textContent = status === "available" ? "записаться" : "занято";
      td.className = status;
      if(status === "available") {
        td.addEventListener("click", () => {
          document.querySelectorAll("td.selected").forEach(el => {
            el.classList.remove("selected");
            el.textContent = "записаться";
          });
          td.classList.add("selected");
          td.textContent = "выбрано";
        });
      }
      tr.appendChild(td);
    });

    scheduleBody.appendChild(tr);
  });
}

renderSchedule();

// ================== Отзывы ==================
const reviewForm = document.getElementById("review-form");
const reviewsSection = document.getElementById("reviews-section");
let reviews = [];

reviewForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("reviewer").value;
  const text = document.getElementById("review-text").value;

  const review = {name, text};
  reviews.push(review);
  renderReviews();
  reviewForm.reset();
});

function renderReviews() {
  reviewsSection.innerHTML = "";
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `<strong>${r.name}:</strong> <p>${r.text}</p>`;
    reviewsSection.appendChild(div);
  });
}
