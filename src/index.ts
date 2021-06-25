import ora from 'ora';
import getCountries from './getCountries';
import getChartData from './getChartData';
import fileHandler, { ExportData } from './fileHandler';

const spinner = ora();
const data: ExportData = {};

export const fyScrape = async (): Promise<void> => {
  spinner.start('Get list of countries supported by Spotify');
  const countries = await getCountries();
  spinner.succeed();
  for (const { code, country } of countries) {
    spinner.start(
      `Get top 200 chart data for ${country} [${Object.keys(data).length + 1}/${
        countries.length
      }]`
    );
    data[code] = await getChartData(code);
  }
  spinner.succeed('Get top 200 chart data for each country');
  spinner.start('Save data to root of the project repository');
  fileHandler(data);
  spinner.succeed();
};

void fyScrape();
