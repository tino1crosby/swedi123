document.getElementById('subscription-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        if (!validateEmail(email)) {
            throw new Error('Invalid email format.');
        }
        // Simulate a subscription process
        console.log(`Subscribing ${email}...`);
        alert('Subscription successful! Thank you for subscribing.');
    } catch (error) {
        console.error('Error during subscription:', error);
        alert('An error occurred: ' + error.message);
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Simulate fetching articles
async function fetchArticles() {
    try {
        const response = await fetch('https://api.example.com/articles');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const articles = await response.json();
        displayArticles(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        document.getElementById('article-list').innerHTML = 'Failed to load articles.';
    }
}

function displayArticles(articles) {
    const articleList = document.getElementById('article-list');
    articles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.innerHTML = `<h3>${article.title}</h3><p>${article.summary}</p>`;
        articleList.appendChild(articleItem);
    });
}

// Call fetchArticles on page load
window.onload = fetchArticles;

document.addEventListener('DOMContentLoaded', function() {
    fetchArticles();
});

function fetchArticles() {
    fetch('articles.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const articleList = document.getElementById('article-list');
            data.forEach(article => {
                const articleItem = document.createElement('div');
                articleItem.innerHTML = `<h3>${article.title}</h3><p>${article.summary}</p>`;
                articleList.appendChild(articleItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            const articleList = document.getElementById('article-list');
            articleList.innerHTML = '<p>Failed to load articles. Please try again later.</p>';
        });
}

document.getElementById('filter').addEventListener('click', function() {
    try {
        const searchQuery = document.getElementById('search').value.toLowerCase();
        const selectedTopic = document.getElementById('topic').value;
        const selectedAuthor = document.getElementById('author').value;
        const selectedDate = document.getElementById('date').value;

        const articles = [
            { title: "Tech Innovations", author: "John Doe", date: "2023-01-01", topic: "technology" },
            { title: "Health Tips", author: "Jane Smith", date: "2023-02-01", topic: "health" },
            { title: "Finance 101", author: "Alice Jones", date: "2023-03-01", topic: "finance" }
        ];

        const filteredArticles = articles.filter(article => {
            return (article.title.toLowerCase().includes(searchQuery) || searchQuery === "") &&
                   (article.topic === selectedTopic || selectedTopic === "") &&
                   (article.author === selectedAuthor || selectedAuthor === "") &&
                   (article.date === selectedDate || selectedDate === "");
        });

        const articleList = document.getElementById('articles');
        articleList.innerHTML = '';

        if (filteredArticles.length === 0) {
            articleList.innerHTML = '<li>No articles found.</li>';
        } else {
            filteredArticles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = `${article.title} by ${article.author} on ${article.date}`;
                articleList.appendChild(li);
            });
        }
    } catch (error) {
        console.error("An error occurred while filtering articles:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
});

document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const plan = document.getElementById('plan').value;
    const messageDiv = document.getElementById('message');

    // Simulate payment processing
    processPayment(email, plan)
        .then(response => {
            messageDiv.innerHTML = `<p>Subscription successful! Plan: ${plan}</p>`;
        })
        .catch(error => {
            messageDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

function processPayment(email, plan) {
    return new Promise((resolve, reject) => {
        // Simulating payment gateway integration
        setTimeout(() => {
            // Simulate a successful payment
            const success = Math.random() > 0.2; // 80% chance of success

            if (success) {
                resolve({ status: 'success' });
            } else {
                reject(new Error('Payment failed. Please try again.'));
            }
        }, 1000);
    });
}

document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    const cardNumber = document.getElementById('cardNumber').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simple validation for card number
    if (!/^\d{16}$/.test(cardNumber)) {
        event.preventDefault();
        errorMessage.textContent = 'Please enter a valid 16-digit card number.';
    } else {
        errorMessage.textContent = '';
    }
});

function purchaseAd(adName) {
    try {
        // Simulate a payment process
        let paymentSuccess = processPayment(adName);
        if (paymentSuccess) {
            alert(`Thank you for purchasing ${adName}!`);
        } else {
            throw new Error("Payment failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during purchase:", error);
        alert("An error occurred: " + error.message);
    }
}

function processPayment(adName) {
    // Simulate a payment processing logic
    // In a real application, this would involve API calls to a payment gateway
    return Math.random() > 0.2; // 80% chance of success
}

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const responseMessage = document.getElementById('responseMessage');

    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        responseMessage.innerHTML = `<p style="color: green;">${data}</p>`;
    })
    .catch(error => {
        responseMessage.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});
