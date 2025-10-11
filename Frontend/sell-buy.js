document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Script Loaded"); // Debug log to confirm it runs

  const farmerForm = document.getElementById("farmerForm");
  const traderForm = document.getElementById("traderForm");

  // === FARMER FORM ===
  if (farmerForm) {
    farmerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const veg = {
        id: Date.now(),
        name: document.getElementById("vegName").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        location: document.getElementById("location").value,
        status: "Available"
      };

      const listings = JSON.parse(localStorage.getItem("farmerListings")) || [];
      listings.push(veg);
      localStorage.setItem("farmerListings", JSON.stringify(listings));

      alert("✅ Listing added successfully!");
      farmerForm.reset();
      displayTraderRequirements(); // Refresh view
    });
  }

  // === TRADER FORM ===
  if (traderForm) {
    traderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const req = {
        id: Date.now(),
        name: document.getElementById("reqVegName").value,
        quantity: document.getElementById("reqQuantity").value,
        budget: document.getElementById("budget").value,
        location: document.getElementById("reqLocation").value
      };

      const requirements = JSON.parse(localStorage.getItem("traderRequirements")) || [];
      requirements.push(req);
      localStorage.setItem("traderRequirements", JSON.stringify(requirements));

      alert("✅ Requirement added successfully!");
      traderForm.reset();
      displayFarmerListings(); // Refresh view
    });
  }

  // === DISPLAY FARMER LISTINGS (Trader page) ===
  function displayFarmerListings() {
    const container = document.getElementById("farmerListings");
    if (!container) return;

    const listings = JSON.parse(localStorage.getItem("farmerListings")) || [];
    container.innerHTML = "";

    if (listings.length === 0) {
      container.innerHTML = "<p>No vegetables available right now.</p>";
      return;
    }

    listings.forEach((veg) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <h3>${veg.name}</h3>
        <p><strong>Quantity:</strong> ${veg.quantity} kg</p>
        <p><strong>Price:</strong> ₹${veg.price}/kg</p>
        <p><strong>Location:</strong> ${veg.location}</p>
        <p><strong>Status:</strong> ${veg.status}</p>
      `;

      if (veg.status === "Available") {
        const btn = document.createElement("button");
        btn.textContent = "📩 Send Request";
        btn.className = "btn";
        btn.onclick = () => sendRequest(veg.id);
        div.appendChild(btn);
      }

      container.appendChild(div);
    });
  }

  // === SEND REQUEST ===
  function sendRequest(id) {
    const listings = JSON.parse(localStorage.getItem("farmerListings")) || [];
    const updated = listings.map(veg =>
      veg.id === id && veg.status === "Available" ? { ...veg, status: "Requested" } : veg
    );
    localStorage.setItem("farmerListings", JSON.stringify(updated));
    alert("📨 Request sent to farmer!");
    displayFarmerListings();
  }

  // === DISPLAY TRADER REQUIREMENTS (Farmer page) ===
  function displayTraderRequirements() {
    const container = document.getElementById("traderRequirements");
    if (!container) return;

    const requirements = JSON.parse(localStorage.getItem("traderRequirements")) || [];
    const listings = JSON.parse(localStorage.getItem("farmerListings")) || [];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; gap: 20px;">
        <div style="flex: 1;">
          <h3>Trader Requirements</h3>
          ${requirements.length === 0 ? "<p>No trader requirements yet.</p>" : ""}
          ${requirements.map(req => `
            <div class="item">
              <h4>${req.name}</h4>
              <p><strong>Quantity:</strong> ${req.quantity} kg</p>
              <p><strong>Budget:</strong> ₹${req.budget}/kg</p>
              <p><strong>Location:</strong> ${req.location}</p>
            </div>
          `).join('')}
        </div>

        <div style="flex: 1;">
          <h3>Your Listings</h3>
          ${listings.length === 0 ? "<p>No listings yet.</p>" : ""}
          ${listings.map(veg => `
            <div class="item">
              <h4>${veg.name}</h4>
              <p><strong>Quantity:</strong> ${veg.quantity} kg</p>
              <p><strong>Price:</strong> ₹${veg.price}/kg</p>
              <p><strong>Location:</strong> ${veg.location}</p>
              <p><strong>Status:</strong> ${veg.status}</p>
              ${veg.status === "Requested" ? `<button class="btn" onclick="confirmOrder(${veg.id})">✅ Confirm Order</button>` : ""}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // === CONFIRM ORDER (Farmer approves the request) ===
window.confirmOrder = function (id) {
  const listings = JSON.parse(localStorage.getItem("farmerListings")) || [];
  const updatedListings = listings.map(veg =>
    veg.id === id && veg.status === "Requested"
      ? { ...veg, status: "Sold" }
      : veg
  );
  localStorage.setItem("farmerListings", JSON.stringify(updatedListings));

  // === Farmer details (simulate logged-in farmer) ===
  const farmerDetails = {
    farmerName: "Suresh Patel",
    farmerMobile: "9998877766",
  };

  // === Trader details (simulate known trader) ===
  const traderDetails = {
    traderName: "Ravi Kumar",
    traderMobile: "9876543210",
  };

  // Save to localStorage for trader page to pick up notification
  localStorage.setItem("approvedRequest", JSON.stringify(farmerDetails));

  // Notify the Farmer immediately
  alert(
    `✅ Order confirmed!\nTrader ${traderDetails.traderName} will contact you soon at ${traderDetails.traderMobile}.`
  );

  displayTraderRequirements();
};
  // === INITIAL LOAD ===
  displayFarmerListings();
  displayTraderRequirements();

  console.log("🌾 Farmer & Trader data displayed.");
});
//Clear demo data button functionality
const resetBtn = document.getElementById("resetDataBtn");

resetBtn?.addEventListener("click", () => {
  if (confirm("⚠️ This will clear all demo data. Continue?")) {
    localStorage.removeItem("farmerListings");
    localStorage.removeItem("traderRequirements");
    alert("🗑️ Demo data cleared!");
    displayFarmerListings();
    displayTraderRequirements();
  }
});
