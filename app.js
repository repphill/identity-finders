async function search() {
  const email = document.getElementById("email").value;

  document.getElementById("results").innerHTML = `<p>Loading...</p>`;

  try {
    const res = await fetch("https://identity-backend-5jax.onrender.com/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    document.getElementById("results").innerHTML = `
      <h2>${data.email}</h2>
      <p><b>Domain:</b> ${data.domain}</p>
      <p><b>Confidence:</b> ${data.confidence}</p>
    `;
  } catch (error) {
    document.getElementById("results").innerHTML = `
      <p style="color:red;">Error connecting to backend</p>
    `;
    console.error(error);
  }
}
