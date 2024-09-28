const apiKey = "0fjovpveP6eGwWq0MsomPphDB6vQENK1";
const topArtsUrl = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${apiKey}`;
const reviewApiUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
const topArtsContainer = document.querySelector(".article-card"); // Make sure this matches your HTML structure
const reviewArticle = document.getElementById("review-article"); // Container for bestseller books
// Function to fetch and display top arts stories
async function fetchTopArts() {
    const loadingMessage = document.createElement("div");
    loadingMessage.textContent = "Loading top arts stories...";
    topArtsContainer.appendChild(loadingMessage); // Append loading message
    try {
        const response = await fetch(topArtsUrl);
        if (!response.ok) throw new Error("Network response was not ok: " + response.statusText);
        const data = await response.json();
        // Clear loading message
        topArtsContainer.removeChild(loadingMessage);
        // Check if results exist
        if (!data.results || data.results.length === 0) {
            const noResultsMessage = document.createElement("div");
            noResultsMessage.textContent = "No articles found.";
            topArtsContainer.appendChild(noResultsMessage);
            return;
        }
        // Display top arts stories
        data.results.forEach((article)=>{
            const articleDiv = document.createElement("div");
            articleDiv.classList.add("card");
            // Create an image element if multimedia exists
            if (article.multimedia && article.multimedia.length > 0) {
                const img = document.createElement("img");
                img.src = article.multimedia[0].url; // Use the first image in the multimedia array
                img.alt = article.title; // Alt text for the image
                img.classList.add("article-image"); // Add a class for styling if needed
                articleDiv.appendChild(img); // Append the image to the articleDiv
            }
            const title = document.createElement("h3"); // Title for each card
            title.textContent = article.title;
            const abstract = document.createElement("p"); // Abstract/Description
            abstract.textContent = article.abstract;
            const link = document.createElement("a"); // Link to the full article
            link.href = article.url;
            link.textContent = "Read more";
            link.target = "_blank"; // Open link in a new tab
            articleDiv.appendChild(title);
            articleDiv.appendChild(abstract);
            articleDiv.appendChild(link);
            // Append the created article card to the article-card container
            topArtsContainer.appendChild(articleDiv);
        });
    } catch (error) {
        // Clear loading message in case of error
        if (topArtsContainer.contains(loadingMessage)) topArtsContainer.removeChild(loadingMessage);
        // Handle error message
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error loading articles: " + error.message;
        topArtsContainer.appendChild(errorMessage);
    }
}
// Function to fetch and display bestseller books
async function fetchBestsellerBooks() {
    const loadingMessage = document.createElement("div");
    loadingMessage.textContent = "Loading bestseller books...";
    reviewArticle.appendChild(loadingMessage); // Append loading message
    try {
        const response = await fetch(reviewApiUrl);
        if (!response.ok) throw new Error("Network response was not ok: " + response.statusText);
        const data = await response.json();
        reviewArticle.removeChild(loadingMessage); // Remove loading message after successful fetch
        const books = data.results.books; // Fetch the array of books from the response
        // Check if the books array is empty
        if (!books || books.length === 0) {
            reviewArticle.innerHTML = "<p>No books found.</p>";
            return;
        }
        // Clear previous content (if any)
        reviewArticle.innerHTML = "";
        // Iterate over the books and create cards for each one
        books.forEach((book)=>{
            const bookCard = document.createElement("div");
            bookCard.classList.add("card"); // Add card class for styling
            // Book cover image
            const bookImage = document.createElement("img");
            bookImage.src = book.book_image || "placeholder_image_url.jpg"; // Add a fallback image if none exists
            bookImage.alt = `${book.title} cover image`; // Set alt text with the book title
            bookCard.appendChild(bookImage);
            // Book title
            const bookTitle = document.createElement("div");
            bookTitle.classList.add("bookTitle");
            bookTitle.innerHTML = `<h3>${book.title || "Title not available"}</h3>`; // Display book title
            bookCard.appendChild(bookTitle);
            // Book author
            const bookAuthor = document.createElement("div");
            bookAuthor.classList.add("bookAuthor");
            bookAuthor.innerHTML = `<p>by ${book.author || "Author not available"}</p>`; // Display author name
            bookCard.appendChild(bookAuthor);
            // Book description
            const bookDescription = document.createElement("div");
            bookDescription.classList.add("bookDescription");
            bookDescription.innerHTML = `<p>${book.description || "Description not available."}</p>`; // Display description
            bookCard.appendChild(bookDescription);
            // Append the book card to the review article section
            reviewArticle.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        reviewArticle.innerHTML = `<p>Error loading books: ${error.message}</p>`; // Show error message if fetch fails
    }
}
// Call the functions to fetch and display articles and books
fetchTopArts();
fetchBestsellerBooks();

//# sourceMappingURL=index.44983732.js.map
