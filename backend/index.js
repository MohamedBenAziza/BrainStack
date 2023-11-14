const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/api/locations/:searchTerm", async (req, res) => {
  try {
    const data = await fetchData(req);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

async function fetchData(req) {
  try {
    if (!req.params.searchTerm) {
      return res.status(400).json({
        code: 126,
        error: "searchTerm cannot be empty",
      });
    }

    const searchTerm = req.params.searchTerm;

    const response = await axios.get(
      `https://mvvvip1.defas-fgi.de/mvv/XML_STOPFINDER_REQUEST?%20language=en&outputFormat=RapidJSON&type_sf=any&name_sf=${searchTerm}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from API");
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
