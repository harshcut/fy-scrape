import puppeteer from 'puppeteer';

export type CountryList = {
  code: string;
  country: string;
}[];

interface OptionalProps {
  code?: string;
}

const getCountries = async (option?: OptionalProps): Promise<CountryList> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://spotifycharts.com/regional', {
    waitUntil: 'domcontentloaded',
  });
  const countries = await page.$$eval(
    '.chart-filters-list [data-type|=country] ul li',
    (rows) =>
      rows.map((li) => ({
        code: li.getAttribute('data-value') as string,
        country: li.innerHTML,
      }))
  );
  await browser.close();
  return countries.filter(({ code }) => {
    if (option?.code) return option?.code?.split(',').includes(code);
    return true;
  });
};

export default getCountries;
