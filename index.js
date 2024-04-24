import * as duckdb from "@duckdb/duckdb-wasm";

async function executeQuery() {
  const queryInput = document.getElementById("query");
  const queryString = queryInput.value;

  try {
    // Load the DuckDB WASM module
    await duckdb.init();

    // Open a new in-memory database
    const db = new duckdb.Database();

    // Execute the user-provided query
    const result = db.exec(queryString);

    // Display the result
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output
    const table = document.createElement("table");
    const headers = document.createElement("tr");

    // Display column headers
    result.getColumnNames().forEach((colName) => {
      const th = document.createElement("th");
      th.textContent = colName;
      headers.appendChild(th);
    });
    table.appendChild(headers);

    // Display result rows
    result.fetchAllAsObjects().forEach((row) => {
      const tr = document.createElement("tr");
      Object.values(row).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value.toString();
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    outputDiv.appendChild(table);
  } catch (error) {
    // If an error occurs, display it to the user
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

// Add event listener to execute query when button is clicked
document
  .getElementById("runQueryButton")
  .addEventListener("click", executeQuery);
