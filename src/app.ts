namespace StationeryInventoryApp {
  interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    tags?: string[];
  }

  interface DiscountedProduct extends Product {
    discountPercent: number;
  }

  function createInitialProducts(): Product[] {
    return [
      { id: 1, name: "A4 Notebook",     price: 120, inStock: true,  tags: ["paper", "school"] },
      { id: 2, name: "Gel Pen (Blue)",  price: 25,  inStock: true,  tags: ["pen", "writing"] },
      { id: 3, name: "Geometry Box",    price: 320, inStock: false, tags: ["maths", "school"] },
      { id: 4, name: "Highlighter Set", price: 210, inStock: true,  tags: ["marker", "color"] }
    ];
  }

  let products: Product[] = createInitialProducts();
  let nextId = 5;
  let showOnlyInStock = false;
  let searchQuery = "";

  const productForm  = document.getElementById("product-form")   as HTMLFormElement;
  const nameInput    = document.getElementById("name")           as HTMLInputElement;
  const priceInput   = document.getElementById("price")          as HTMLInputElement;
  const inStockInput = document.getElementById("in-stock")       as HTMLInputElement;
  const tagsInput    = document.getElementById("tags")           as HTMLInputElement;
  const searchInput  = document.getElementById("search")         as HTMLInputElement;
  const tableBody    = document.getElementById("product-table-body") as HTMLTableSectionElement;
  const message      = document.getElementById("message")        as HTMLParagraphElement;
  const filterBtn    = document.getElementById("filter-btn")     as HTMLButtonElement;
  const discountBtn  = document.getElementById("discount-btn")   as HTMLButtonElement;
  const resetBtn     = document.getElementById("reset-btn")      as HTMLButtonElement;

  function escapeHtml(v: string): string {
    return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function getAvailableProducts(products: Product[]): Product[] {
    return products.filter((p) => p.inStock);
  }

  function applyDiscountToProducts(products: Product[], discountPercent: number): DiscountedProduct[] {
    return products.map((p) => ({
      ...p,
      price: Number((p.price - (p.price * discountPercent) / 100).toFixed(2)),
      discountPercent
    }));
  }

  function renderProducts(): void {
    let visible = showOnlyInStock ? getAvailableProducts(products) : products;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      visible = visible.filter((p) => p.name.toLowerCase().includes(q));
    }
    tableBody.innerHTML = "";
    if (visible.length === 0) {
      const r = document.createElement("tr");
      r.innerHTML = `<td colspan="5" style="text-align:center;color:#94a3b8;">No products found.</td>`;
      tableBody.appendChild(r);
      return;
    }
    visible.forEach((p) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${p.id}</td><td>${escapeHtml(p.name)}</td><td>Rs.${p.price.toFixed(2)}</td><td>${p.inStock ? "Yes" : "No"}</td><td>${p.tags && p.tags.length > 0 ? escapeHtml(p.tags.join(", ")) : "-"}</td>`;
      tableBody.appendChild(row);
    });
  }

  productForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const tags = tagsInput.value.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    if (name.length === 0 || Number.isNaN(price) || price < 0) {
      message.style.color = "#dc2626";
      message.textContent = "Please enter a valid product name and non-negative price.";
      return;
    }
    products.push({ id: nextId, name, price, inStock: inStockInput.checked, tags: tags.length > 0 ? tags : undefined });
    nextId += 1;
    productForm.reset();
    inStockInput.checked = true;
    message.style.color = "#059669";
    message.textContent = `Added "${name}".`;
    renderProducts();
  });

  filterBtn.addEventListener("click", () => {
    showOnlyInStock = !showOnlyInStock;
    filterBtn.textContent = showOnlyInStock ? "Show All Products" : "Show In Stock Only";
    message.style.color = "#059669";
    message.textContent = showOnlyInStock ? "Showing in-stock products only." : "Showing all products.";
    renderProducts();
  });

  discountBtn.addEventListener("click", () => {
    products = applyDiscountToProducts(products, 10);
    message.style.color = "#059669";
    message.textContent = "Applied a 10% discount to all products.";
    renderProducts();
  });

  resetBtn.addEventListener("click", () => {
    products = createInitialProducts();
    nextId = 5;
    showOnlyInStock = false;
    searchQuery = "";
    searchInput.value = "";
    filterBtn.textContent = "Show In Stock Only";
    message.style.color = "#059669";
    message.textContent = "Reset to initial product list.";
    renderProducts();
  });

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    renderProducts();
  });

  renderProducts();
}
