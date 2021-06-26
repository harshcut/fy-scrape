import type { ChartData } from './getChartData';
import fs from 'fs';

export type ExportData = {
  [key: string]: ChartData;
};

interface OptionalProps {
  path?: string;
  space?: number;
}

const fileHandler = async (
  data: ExportData,
  option?: OptionalProps
): Promise<void> => {
  fs.writeFile(
    option?.path ?? './chart-data.json',
    JSON.stringify(data, null, option?.space),
    (err) => {
      if (err) return console.error(err);
    }
  );
};

export default fileHandler;
