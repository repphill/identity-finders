const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");

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

async function uploadCSV() {
  const file = fileInput.files[0];

  if (!file) {
    alert("Upload a CSV first");
    return;
  }

  document.getElementById("status").innerText = "Processing...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "https://identity-backend-5jax.onrender.com/bulk-enrich",
      {
        method: "POST",
        body: formData,
      }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.getElementById("downloadLink");
    link.href = url;
    link.style.display = "block";

    document.getElementById("status").innerText = "Done!";
  } catch (err) {
    document.getElementById("status").innerText = "Error processing file";
  }
}
