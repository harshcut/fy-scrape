import type { ChartData } from './getChartData';
import fs from 'fs';

export type ExportData = {
  [key: string]: ChartData;
};

const fileHandler = (data: ExportData): void => {
  fs.writeFile('./chart-data.json', JSON.stringify(data), (err) => {
    if (err) return console.error(err);
  });
};

export default fileHandler;
