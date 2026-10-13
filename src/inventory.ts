let productName: string = "A4 Notebook";
let price: number = 120.00;
let inStock: boolean = true;
let tags: string[] = ["paper", "school", "stationery"];
let productId: number | string = "NB101";

function printProductInfo(): void {
  console.log(`Product: ${productName} | ID: ${productId} | Price: Rs.${price.toFixed(2)} | In Stock: ${inStock} | Tags: ${tags.join(", ")}`);
}
printProductInfo();

let tempValue: any = "ABC123";
tempValue = 123;
let productCode: string = "ABC123";

function calculateDiscount(price: number, discountPercent: number = 10): number {
  return price - (price * discountPercent) / 100;
}
console.log("Default discount:", calculateDiscount(1000));
console.log("20% discount:", calculateDiscount(1000, 20));

function applyBulkDiscount(prices: number[], discountRate: number): number[] {
  return prices.map((p) => p - (p * discountRate) / 100);
}
console.log("Bulk discounted prices:", applyBulkDiscount([100, 200, 300], 10));

function scopeDemo(): void {
  for (let i = 0; i < 3; i++) { console.log("Inside loop:", i); }
}
function functionScopeDemo(): void {
  for (var j = 0; j < 3; j++) {}
  console.log("Outside loop but inside function:", j);
}
scopeDemo();
functionScopeDemo();

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags?: string[];
}

const products: Product[] = [
  { id: 1, name: "A4 Notebook",     price: 120, inStock: true,  tags: ["paper", "school"] },
  { id: 2, name: "Gel Pen (Blue)",  price: 25,  inStock: true,  tags: ["pen", "writing"] },
  { id: 3, name: "Geometry Box",    price: 320, inStock: false, tags: ["maths", "school"] },
  { id: 4, name: "Highlighter Set", price: 210, inStock: true,  tags: ["marker", "color"] }
];

function getAvailableProducts(products: Product[]): Product[] {
  return products.filter((p) => p.inStock);
}
console.log("Available products:", getAvailableProducts(products));

interface DiscountedProduct extends Product {
  discountPercent: number;
}
function applyDiscountToProducts(products: Product[], discountPercent: number): DiscountedProduct[] {
  return products.map((p) => ({
    ...p,
    price: Number((p.price - (p.price * discountPercent) / 100).toFixed(2)),
    discountPercent
  }));
}
console.log("Discounted products:", applyDiscountToProducts(products, 15));
