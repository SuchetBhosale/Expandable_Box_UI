const bundles = [
  { 
    units: 1, 
    discount: "10% Off", 
    currentPrice: 10.0, 
    oldPrice: 24.0, 
    description: "Standard Price" 
  },
  { 
    units: 2, 
    discount: "20% Off", 
    currentPrice: 18.0, 
    oldPrice: 24.0, 
    mostPopular: true 
  },
  { 
    units: 3, 
    discount: "30% Off", 
    currentPrice: 24.0, 
    oldPrice: 24.0 
  }
];

const sizes = ["S", "M", "L"];
const colors = ["Black", "White", "Pink", "Lavender"];

const bundleContainer = document.getElementById("bundle-options");
const totalPrice = document.getElementById("total-price");
const addToCartBtn = document.getElementById("add-to-cart");

bundles.forEach((bundle, index) => {
  const option = document.createElement("div");
  option.classList.add("bundle-option");
  if (index === 0) option.classList.add("active");

  option.dataset.units = bundle.units;
  option.dataset.price = bundle.currentPrice;

  option.innerHTML = `
    ${bundle.mostPopular ? '<div class="most-popular">MOST POPULAR</div>' : ""}
    <div class="bundle-header">
      <div class="unit-info">
        <input type="radio" name="bundle" value="${bundle.units}" ${index === 0 ? "checked" : ""}>
        <span>${bundle.units} Unit${bundle.units > 1 ? "s" : ""}</span>
        <span class="discount-tag">${bundle.discount}</span>
      </div>
      <div class="price-section">
        <div class="current-price">$${bundle.currentPrice.toFixed(2)} USD</div>
        <div class="old-price">$${bundle.oldPrice.toFixed(2)} USD</div>
      </div>
    </div>
    ${bundle.description ? `<div class="standard-price">${bundle.description}</div>` : ""}
    <div class="bundle-details"></div>
  `;

  bundleContainer.appendChild(option);
});

const bundleOptions = document.querySelectorAll(".bundle-option");
totalPrice.textContent = `$${bundles[0].currentPrice.toFixed(2)} USD`;

function generateDropdowns(option, units) {
  const detailsDiv = option.querySelector(".bundle-details");
  detailsDiv.innerHTML = `
    <div class="detail-header">
      <span>Size</span>
      <span>Colour</span>
    </div>
  `;

  for (let i = 1; i <= 2; i++) {
    const row = document.createElement("div");
    row.classList.add("detail-row");

    const label = document.createElement("span");
    label.textContent = `#${i}`;

    const sizeSelect = document.createElement("select");
    sizes.forEach(size => {
      const opt = document.createElement("option");
      opt.value = size;
      opt.textContent = size;
      sizeSelect.appendChild(opt);
    });

    const colorSelect = document.createElement("select");
    colors.forEach(color => {
      const opt = document.createElement("option");
      opt.value = color;
      opt.textContent = color;
      colorSelect.appendChild(opt);
    });

    row.append(label, sizeSelect, colorSelect);
    detailsDiv.appendChild(row);
  }
}

generateDropdowns(bundleOptions[0], bundles[0].units);

bundleOptions.forEach(option => {
  option.addEventListener("click", e => {
    if (e.target.tagName === "SELECT") return;

    bundleOptions.forEach(o => o.classList.remove("active"));
    option.classList.add("active");
    option.querySelector("input").checked = true;

    const units = option.dataset.units;
    const price = option.dataset.price;
    totalPrice.textContent = `$${parseFloat(price).toFixed(2)} USD`;

    generateDropdowns(option, units);
  });
});

addToCartBtn.addEventListener("click", () => {
  const selected = document.querySelector(".bundle-option.active");
  const units = selected.dataset.units;
  const price = selected.dataset.price;

  const selectedDetails = [...selected.querySelectorAll(".detail-row")].map(row => {
    const size = row.querySelector("select:nth-of-type(1)").value;
    const color = row.querySelector("select:nth-of-type(2)").value;
    return { size, color };
  });

  console.log("🛒 Added to Cart:", {
    units,
    price,
    selectedDetails
  });

  alert(` Added ${units} Unit(s) to cart for $${price} USD!`);
});
