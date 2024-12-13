# LinkedIn Web Scraper

This project is a LinkedIn web scraper built using [Puppeteer](https://github.com/puppeteer/puppeteer) and [Cheerio](https://github.com/cheeriojs/cheerio). It automates the process of scraping user profiles based on specified keywords.

## Features

- Automates login to LinkedIn using credentials stored in a `.env` file.
- Scrapes user profile data including:
  - Name
  - Profile URL
  - Designation
- Handles pagination to retrieve results from multiple pages.

## Requirements

- [Node.js](https://nodejs.org/) (v14 or later)
- A LinkedIn account
- [Puppeteer](https://github.com/puppeteer/puppeteer)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [dotenv](https://github.com/motdotla/dotenv)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbubakarWebDev/linkedin-webscraper-nodejs
   cd https://github.com/AbubakarWebDev/linkedin-webscraper-nodejs
   ```

2. Install dependencies:

   ```bash
   npm install puppeteer cheerio dotenv
   ```

3. Create a `.env` file in the root directory and add your LinkedIn credentials:

   ```env
   username=your-email@example.com
   password=your-password
   ```

## Usage

1. Run the scraper with a keyword:

   ```bash
   node index.js "<keyword>"
   ```

   Replace `<keyword>` with the search term (e.g., `software engineer`).

2. The scraper will:
   - Log in to LinkedIn.
   - Search for people matching the keyword.
   - Scrape data from the first 10 pages of search results.
   - Output the results in the terminal.

## How It Works

1. **Login to LinkedIn**: Puppeteer automates the login process by using the credentials stored in the `.env` file.
2. **Search and Scrape**: The scraper searches for the specified keyword on LinkedIn, navigates through the first 10 pages, and scrapes profile data.
3. **Data Extraction**: Cheerio is used to parse the HTML content and extract relevant details (name, profile URL, and designation).

## Example Output

```json
[
  {
    "name": "John Doe",
    "profile": "https://www.linkedin.com/in/johndoe",
    "designation": "Software Engineer at TechCorp"
  },
  {
    "name": "Jane Smith",
    "profile": "https://www.linkedin.com/in/janesmith",
    "designation": "Data Scientist at DataWorks"
  }
]
```

## Notes

- This scraper is for educational purposes only. Scraping LinkedIn data may violate their terms of service, so use responsibly.
- The script runs in non-headless mode by default (`headless: false`) to allow debugging.
- Adjust the `sleep` duration if you encounter issues with LinkedIn's anti-bot measures.

## Disclaimer

This project is intended for educational purposes. Please ensure compliance with LinkedIn's terms of service and scraping guidelines.

## License

MIT License
