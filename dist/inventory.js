"use strict";
let productName = "A4 Notebook";
let price = 120.00;
let inStock = true;
let tags = ["paper", "school", "stationery"];
let productId = "NB101";
function printProductInfo() {
    console.log(`Product: ${productName} | ID: ${productId} | Price: Rs.${price.toFixed(2)} | In Stock: ${inStock} | Tags: ${tags.join(", ")}`);
}
printProductInfo();
let tempValue = "ABC123";
tempValue = 123;
let productCode = "ABC123";
function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent) / 100;
}
console.log("Default discount:", calculateDiscount(1000));
console.log("20% discount:", calculateDiscount(1000, 20));
function applyBulkDiscount(prices, discountRate) {
    return prices.map((p) => p - (p * discountRate) / 100);
}
console.log("Bulk discounted prices:", applyBulkDiscount([100, 200, 300], 10));
function scopeDemo() {
    for (let i = 0; i < 3; i++) {
        console.log("Inside loop:", i);
    }
}
function functionScopeDemo() {
    for (var j = 0; j < 3; j++) { }
    console.log("Outside loop but inside function:", j);
}
scopeDemo();
functionScopeDemo();
const products = [
    { id: 1, name: "A4 Notebook", price: 120, inStock: true, tags: ["paper", "school"] },
    { id: 2, name: "Gel Pen (Blue)", price: 25, inStock: true, tags: ["pen", "writing"] },
    { id: 3, name: "Geometry Box", price: 320, inStock: false, tags: ["maths", "school"] },
    { id: 4, name: "Highlighter Set", price: 210, inStock: true, tags: ["marker", "color"] }
];
function getAvailableProducts(products) {
    return products.filter((p) => p.inStock);
}
console.log("Available products:", getAvailableProducts(products));
function applyDiscountToProducts(products, discountPercent) {
    return products.map((p) => (Object.assign(Object.assign({}, p), { price: Number((p.price - (p.price * discountPercent) / 100).toFixed(2)), discountPercent })));
}
console.log("Discounted products:", applyDiscountToProducts(products, 15));
//# sourceMappingURL=inventory.js.map