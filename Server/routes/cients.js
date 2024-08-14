const fs = require("fs");
const path = "unique_ids.json";

let generatedIds = new Set();

// Load generated IDs from file on startup
function loadIds() {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, "utf8");
    const idsArray = JSON.parse(data);
    generatedIds = new Set(idsArray);
  }
}

// Save generated IDs to file
function saveIds() {
  fs.writeFileSync(path, JSON.stringify([...generatedIds]));
}

function generateUniqueRandomId() {
  let randomId;

  do {
    // Generate a random 8-character long number ID
    const randomNumber = Math.floor(Math.random() * 100000000);
    randomId = String(randomNumber).padStart(8, "0");
  } while (generatedIds.has(randomId));

  // Add the new ID to the set
  generatedIds.add(randomId);

  // Save the updated set to the file
  saveIds();

  return randomId;
}

// Load IDs when starting the program
loadIds();

// Example usage
const id = generateUniqueRandomId();
console.log("Generated ID:", id);
