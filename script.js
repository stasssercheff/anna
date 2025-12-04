// ================== Календарь записи ==================
const scheduleBody = document.querySelector("#schedule tbody");

const times = ["10:00", "12:00", "14:00", "16:00"];
const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Пример статуса: 'available' или 'occupied'
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

    initialSlots[time].forEach((status, dayIndex) => {
      const td = document.createElement("td");
      td.textContent = status === "available" ? "записаться" : "занято";
      td.className = status;
      if(status === "available") {
        td.addEventListener("click", () => {
          // Снять выделение с других
          document.querySelectorAll("td.selected").forEach(el => el.classList.remove("selected"));
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
