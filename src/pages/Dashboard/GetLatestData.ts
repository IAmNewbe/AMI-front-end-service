import axios from 'axios';

const PROXY_URL = 'http://localhost:3001/api/latestData';

export interface latestData {
  devUI: string;
  time_at_device: string;
  time_received_at_gateway: string;
  time_send_from_gateway: string;
  RSSI: number;
  protocol: string;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  frequency: number;
  power_factor: number;
}

export interface latestAntares {
  con: latestData;
  ri: string;
  lt: string;
}

export const getLatestData = async (): Promise<latestAntares> => {
  const response = await axios.get(PROXY_URL);
  const rawData = response.data;

  // Parse string JSON di dalam field "con"
  const latestData: latestData = JSON.parse(rawData['m2m:cin'].con);

  const latestAntares: latestAntares = {
    con: latestData,
    ri: rawData['m2m:cin'].ri,
    lt: rawData['m2m:cin'].lt,
  };

  return latestAntares;
};
