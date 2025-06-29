const response = await fetch('/api/context');
const result = await response.json();
const context = result?.data;
console.log(context);