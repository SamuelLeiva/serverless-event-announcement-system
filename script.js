const API_BASE_URL = "https://sfyysdb8di.execute-api.us-east-1.amazonaws.com"; // sitio público

// Subscribe form
document.getElementById("subscribeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    const res = await fetch(`${API_BASE_URL}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("✅ Subscription request sent! Check your email to confirm.");
      document.getElementById("email").value = "";
    } else {
      alert("⚠️ Subscription failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Network error.");
  }
});

// Create Event form
document.getElementById("eventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  try {
    const res = await fetch(`${API_BASE_URL}/create-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, location, description }),
    });

    if (res.ok) {
      alert("🎉 Event created successfully!");
      e.target.reset();
      loadEvents();
    } else {
      alert("⚠️ Failed to create event.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Network error.");
  }
});

// Fetch and display events
async function loadEvents() {
  try {
    const res = await fetch(`${API_BASE_URL}/events`);
    console.log("res: ", res)
    if (!res.ok) throw new Error("Failed to fetch events");

    const data = await res.json();

    const list = document.getElementById("eventList");
    list.innerHTML = "";

    data.forEach((event) => {
      const li = document.createElement("li");
      li.className = "border border-gray-200 rounded-lg p-3";
      li.innerHTML = `
        <h3 class="font-semibold text-lg">${event.title}</h3>
        <p class="text-sm text-gray-600">${event.date} • ${event.location}</p>
        <p>${event.description}</p>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// Load events on startup
loadEvents();
