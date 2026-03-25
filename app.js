const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
});

async function uploadCSV() {
  const file = fileInput.files[0];

  if (!file) {
    alert("Upload CSV");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const progress = document.getElementById("progress");
  progress.style.width = "30%";

  document.getElementById("status").innerText = "Processing...";

  const res = await fetch(
    "https://identity-backend-5jax.onrender.com/bulk-enrich",
    {
      method: "POST",
      body: formData
    }
  );

  progress.style.width = "70%";

  const blob = await res.blob();
  const text = await blob.text();

  const rows = text.split("\n").slice(1);

  const table = document.querySelector("#resultsTable tbody");
  table.innerHTML = "";

  rows.forEach(row => {
    if (!row) return;

    const cols = row.split(",");

    const tr = document.createElement("tr");

    cols.slice(0,6).forEach(c => {
      const td = document.createElement("td");
      td.innerText = c;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.getElementById("downloadLink");
  link.href = url;
  link.style.display = "block";

  progress.style.width = "100%";
  document.getElementById("status").innerText = "Done!";
}
