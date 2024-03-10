const puppeteer = require('puppeteer');

const getConferences = async () => {
  try {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "https://www.lix.polytechnique.fr/~hermann/conf.php/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto('https://www.lix.polytechnique.fr/~hermann/conf.php/', {
      waitUntil: 'domcontentloaded',
    });

    const conferences = await page.evaluate(() => {
      const table = document.querySelector('#future + nav + table.conference');
      const elements = table.querySelectorAll('tbody > tr');
      return Array.from(elements).map((conf) => {
        const name = conf.querySelector('.confname a').innerText.trim();
        const href = conf.querySelector('.confname a').href;
        const location = conf.querySelector('.location').innerText;
        const date = conf.querySelector('.date').innerText;
        const deadline =
          conf.querySelector('.deadline')?.innerText ||
          conf.querySelector('.now-deadline')?.innerText;

        return {
          name,
          location,
          date,
          deadline,
          href,
        };
      });
    });

    await browser.close();

    return conferences;
  } catch (error) {
    console.error('getConferences', error);
    return [];
  }
};

module.exports = {
  getConferences,
};
