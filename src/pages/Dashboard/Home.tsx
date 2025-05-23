import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import { useEffect, useState } from 'react';
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import NumWidget from "../../components/ecommerce/NumWidget";
import RoundWidget from "../../components/ecommerce/RoundWidget";
import LargeRoundWidget from "../../components/ecommerce/LargeRoundWidget";
import SingleForm from "../../components/ecommerce/SingelForm";
import MonthlyCostChart from "../../components/ecommerce/MonthlyCostChart";
import { getLatestData, latestAntares } from "./GetLatestData";

const initialData: latestAntares = {
  con: {
    devUI: "08:D1:F9:35:B5:48",
    time_at_device: "2025-05-23 14:45:32",
    time_received_at_gateway: "2025-05-23 14:45:48",
    time_send_from_gateway: "2025-05-23 14:45:48.345",
    RSSI: -50,
    protocol: "http",
    voltage: 233.00,
    current: 0.03,
    power: 0.40,
    energy: 18.60,
    frequency: 915000000.0,
    power_factor: 0.05
  },
  ri: "",
  lt: "",
};

export default function Home() {
  const [data, setData] = useState<latestAntares | null>(initialData);

  useEffect(() => {
    // Fungsi untuk mengambil data
    const fetchData = async () => {
      try {
        const latestData = await getLatestData();
        setData(latestData);
        console.log(data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    fetchData();
    // Set interval setiap 2 detik
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval); // Bersihkan interval saat unmount
  }, []);

  const [costPerKwh, setCostPerKwh] = useState<number>(() => {
  const stored = localStorage.getItem('cost/kwh');
  return stored ? parseFloat(stored) : 1300;
  });

  if (!data) {
    console.error("babi");
    return <p>Loading...</p>; // <-- penting! return sesuatu jika null
  }

  const { con } = data;
  console.log(con)  

  return (
    <>
      <PageMeta
        title="AMI Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-13 gap-4 md:gap-6">
        <div className="col-span-13 space-y-3 sm:space-y-6 lg:col-span-9 xl:col-span-8">
          {/* <EcommerceMetrics /> */}
          <div className="hidden md:grid grid-cols-4 gap-2 md:gap-6">
            <NumWidget title="Energy" value={con.energy} units="kWh"/>
            <NumWidget title="Power" value={con.power} units="Watt"/>
            
            <NumWidget title="Frequency" value={50} units="Hz"/>
            <NumWidget title="Power Factor" value={con.power_factor} units=""/>
            
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-6 md:hidden">
            <NumWidget title="Energy" value={con.energy} units="kWh"/>
            <NumWidget title="Power" value={con.power} units="Watt"/>
          </div>

           <div className="grid grid-cols-2 gap-2 md:gap-6">
            <SingleForm title="Cost/kWh" value={1300} units="IDR" storageKey="cost/kwh" onValueChange={(val) => setCostPerKwh(val)}/>
            <NumWidget title="Total Cost" units="IDR" value={Math.round(costPerKwh * con.energy)}/>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-6 md:hidden">
            <div className="col-span-2">
              <RoundWidget title="Voltage" value={con.voltage} units="Volt" maxValue={300}/>
            </div>
            <div className="col-span-2">
              <RoundWidget title="Current" value={con.current} units="Ampere" maxValue={50}/>
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-2 md:gap-6 hidden lg:hidden">
            <div className="col-span-2">
              <LargeRoundWidget title="Voltage" value={con.voltage} units="Volt" maxValue={300}/>
            </div>
            <div className="col-span-2">
              <LargeRoundWidget title="Current" value={con.current} units="Ampere" maxValue={50}/>
            </div>
          </div>
          <MonthlyCostChart />
        </div>
        
        <div className="hidden lg:block col-span-13 lg:col-span-4 xl:col-span-5">
          {/* <MonthlyTarget /> */}
          <div className="space-y-6">
            <LargeRoundWidget title="Voltage" value={con.voltage} units="Volt" maxValue={300}/>
            <LargeRoundWidget title="Current" value={con.current} units="Ampere" maxValue={50}/>
          </div>
        </div>

        <div className="col-span-13">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
