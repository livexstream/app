export async function fetchJsonData() {
    try {
      const jsonPath = "data/series.json";
      const response = await fetch(jsonPath);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }