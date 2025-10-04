document.addEventListener("DOMContentLoaded", async () => {
  const eventsList = document.getElementById("events-list");
  const subscribeForm = document.getElementById("subscribe-form");
  const eventForm = document.getElementById("event-form");
  const subscribeMessage = document.getElementById("subscribe-message");
  const eventMessage = document.getElementById("event-message");

  // --- Mostrar eventos ---
  try {
    const res = await fetch("events.json");
    const events = await res.json();

    eventsList.innerHTML = events
      .map(
        (event) => `
        <div class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-blue-700">${event.title}</h3>
          <p class="text-gray-600">${event.description}</p>
          <p class="text-sm text-gray-500 mt-2">📅 ${event.date}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    eventsList.innerHTML = `<p class="text-red-600">Error loading events.</p>`;
  }

  // --- Simular suscripción ---
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("subscribe-email").value;
    subscribeMessage.textContent = `✅ Subscription successful for ${email}!`;
    subscribeForm.reset();
  });

  // --- Simular creación de evento ---
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("event-title").value;
    const desc = document.getElementById("event-description").value;
    const date = document.getElementById("event-date").value;
    eventMessage.textContent = `✅ Event "${title}" created successfully!`;
    eventForm.reset();
  });
});
