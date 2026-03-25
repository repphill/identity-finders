// 🔥 ELEMENTS
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progress");
const statusText = document.getElementById("status");
const tableBody = document.querySelector("#resultsTable tbody");
const downloadLink = document.getElementById("downloadLink");

// 📁 FILE INTERACTIONS
dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "#1e293b";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
});

// 🚀 MAIN FUNCTION
window.uploadCSV = async function () {
  const file = fileInput.files[0];

  if (!file) {
    alert("Upload a CSV file first");
    return;
  }

  if (!window.userToken) {
    alert("You must be logged in");
    return;
  }

  // Reset UI
  progressBar.style.width = "0%";
  statusText.innerText = "Starting...";
  tableBody.innerHTML = "";
  downloadLink.style.display = "none";

  const formData = new FormData();
  formData.append("file", file);

  try {
    // 🔄 Progress
    progressBar.style.width = "20%";
    statusText.innerText = "Uploading...";

    const response = await fetch(
      "https://identity-backend-5jax.onrender.com/bulk-enrich",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + window.userToken
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("API error: " + response.status);
    }

    progressBar.style.width = "60%";
    statusText.innerText = "Processing...";

    const blob = await response.blob();
    const text = await blob.text();

    progressBar.style.width = "80%";

    // 📊 Parse CSV
    const rows = text.split("\n");
    const headers = rows[0].split(",");

    rows.slice(1).forEach((row) => {
      if (!row.trim()) return;

      const cols = row.split(",");

      const tr = document.createElement("tr");

      headers.forEach((_, index) => {
        const td = document.createElement("td");
        td.innerText = cols[index] || "";
        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });

    // 📥 Download
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.style.display = "block";
    downloadLink.innerText = "Download CSV";

    progressBar.style.width = "100%";
    statusText.innerText = "✅ Done";

  } catch (err) {
    console.error(err);
    statusText.innerText = "❌ Error";
    progressBar.style.width = "0%";
  }
};
