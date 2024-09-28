const apiKey = '0fjovpveP6eGwWq0MsomPphDB6vQENK1'; 
const topArtsUrl = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${apiKey}`;
const topArtsContainer = document.querySelector('.article-card'); // Make sure this matches your HTML structure

// Function to fetch and display top arts stories
async function fetchTopArts() {
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Loading top arts stories...';
    topArtsContainer.appendChild(loadingMessage); // Append loading message

    try {
        const response = await fetch(topArtsUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();

        // Clear loading message
        topArtsContainer.removeChild(loadingMessage);

        // Check if results exist
        if (!data.results || data.results.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'No articles found.';
            topArtsContainer.appendChild(noResultsMessage);
            return;
        }

        // Display top arts stories
        data.results.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('card'); // Use .card styling

            // Create an image element if multimedia exists
            if (article.multimedia && article.multimedia.length > 0) {
                const img = document.createElement('img');
                img.src = article.multimedia[0].url; // Use the first image in the multimedia array
                img.alt = article.title; // Alt text for the image
                img.classList.add('article-image'); // Add a class for styling if needed
                articleDiv.appendChild(img); // Append the image to the articleDiv
            }

            const title = document.createElement('h3'); // Title for each card
            title.textContent = article.title;

            const abstract = document.createElement('p'); // Abstract/Description
            abstract.textContent = article.abstract;

            const link = document.createElement('a'); // Link to the full article
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank'; // Open link in a new tab

            articleDiv.appendChild(title);
            articleDiv.appendChild(abstract);
            articleDiv.appendChild(link);

            // Append the created article card to the article-card container
            topArtsContainer.appendChild(articleDiv);
        });

    } catch (error) {
        // Clear loading message in case of error
        if (topArtsContainer.contains(loadingMessage)) {
            topArtsContainer.removeChild(loadingMessage);
        }

        // Handle error message
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error loading articles: ' + error.message;
        topArtsContainer.appendChild(errorMessage);
    }
}

// Call the function to fetch and display articles
fetchTopArts();
