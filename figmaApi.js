import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const FIGMA_FILE_ID = "TcSrVII2As0sN5t0UU9ato"; // Replace with your actual Figma file ID
const FIGMA_API_KEY = "YOUR_FIGMA_API_KEY"; // Replace with your actual Figma API key
const EXPORT_DIR = "./FigmaExport";

// 🛠️ UPDATE THESE BEFORE EACH RUN
const NODE_ID = "219-2617"; // Manually update this for each component
const FILE_NAME = "Accordion"; // Manually update this for each component

// Ensure the export directory exists
if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

async function fetchNodeData() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/nodes?ids=${NODE_ID}`;
  const response = await fetch(url, {
    headers: { "X-Figma-Token": FIGMA_API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Figma API request failed for node ${NODE_ID}: ${response.statusText}`);
  }

  return response.json();
}

async function saveExport() {
  try {
    console.log(`⏳ Fetching Figma node data for ${FILE_NAME}...`);

    const data = await fetchNodeData();
    const filePath = path.join(EXPORT_DIR, `${FILE_NAME}.json`);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved: ${filePath}`);
  } catch (error) {
    console.error("❌ Error exporting Figma data:", error);
  }
}

saveExport();
