// Change YOUR_API_KEY_HERE to your apiKey
const url =
    "https://newsapi.org/v2/everything?q=wages&apiKey=6fdd83bcd38b4415bb56b3eb34787a22";

export async function getNews() {
    let result = await fetch(url).then(response => response.json());
    return result.articles;
}