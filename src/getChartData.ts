import puppeteer from 'puppeteer';

export type ChartData = {
  track: string;
  artist: string;
  streams: string;
  url: string;
}[];

const getChartData = async (code: string): Promise<ChartData> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://spotifycharts.com/regional/${code}/daily/latest`, {
    waitUntil: 'domcontentloaded',
  });
  const data = await page.$$eval('table.chart-table tbody tr', (rows) =>
    rows.map((tr) => ({
      track: tr.querySelector('td.chart-table-track strong')
        ?.innerHTML as string,
      artist: tr
        .querySelector('td.chart-table-track span')
        ?.innerHTML.split(' ')
        .slice(1)
        .join(' ') as string,
      streams: tr.querySelector('td.chart-table-streams')?.innerHTML as string,
      url: tr
        .querySelector('td.chart-table-image a')
        ?.getAttribute('href') as string,
    }))
  );
  await browser.close();
  return data;
};

export default getChartData;
