# Getting Started

This is a Node.js package to scrape regional track data from [Spotify Charts](https://spotifycharts.com/regional). This project was built as a result of the Cloudflare DDoS Protection, which was added to the download links.

The project automates the Chromium API to scrape the resources from Spotify. The data includes _track names_, _artists_, _streams_, and _track url_ which hold position on the top 200 spot on the country charts.

> The following is not permitted for any reason whatsoever:
>
> 12. "crawling" the Spotify Service or otherwise using any automated means (including bots, scrapers, and spiders) to view, access or collect information from Spotify or the Spotify Service;
>
> Source: Spotify Terms and Conditions of Use

## Developing

Fork the repository using [this](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) guide, then clone it locally.

```shell
git clone https://github.com/harshcut/fy-scrape
cd fy-scrape
yarn install
```

You can now directly run the TypeScript source files with `dev` command. To build the source files use `build`.

## Usage

Import `fyScrape` from the compiled distribution. Both CommonJS and ES Module imports are supported.

```js
const { fyScrape } = require('./dist/cjs');

void fyScrape();
```

This will create a JSON file with all scraped data at the root of the project.

## Examples

This is an example on how to use optional props to get customized data. Get the list of countries with the function `getCountries`. For each country we scrape the chart list with optional props. We use `start` and `end` to slice the list of track data. The acquired data is then pretty printed with `space` which is a optional prop.

```js
const { getCountries, getChartData, fileHandler } = require('./dist/cjs');

(async () => {
  const data = {};
  const countries = await getCountries();
  for (const { code } of countries) {
    data[code] = await getChartData(code, { start: 0, end: 1 });
  }
  await fileHandler(data, { space: 2 });
})();
```

In this example, we only scrape data for two countries. To get data for a specific country we need it's _ISO Alpha-2_ country code. Here we use `gb` and `us` separated by a comma. Now, by using `end` we can get `50` entries. Finally, we add a custom file name using `path`.

```js
import { getCountries, getChartData, fileHandler } from './dist/mjs';

(async () => {
  const data = {};
  const countries = await getCountries({ code: 'us,gb' });
  for (const { code } of countries) {
    data[code] = await getChartData(code, { start: 0, end: 50 });
  }
  await fileHandler(data, { path: 'us-gb.json', space: 2 });
})();
```

## License

This project is licensed under the [MIT License](https://github.com/harshcut/fy-scrape/blob/main/LICENSE).
