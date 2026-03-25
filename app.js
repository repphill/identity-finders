async function search() {
  const email = document.getElementById("email").value;

  document.getElementById("results").innerHTML = `
    <p>Searching for: ${email}</p>
    <p>(Backend not connected yet)</p>
  `;
}