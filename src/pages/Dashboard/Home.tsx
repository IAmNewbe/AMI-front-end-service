import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import NumWidget from "../../components/ecommerce/NumWidget";
import RoundWidget from "../../components/ecommerce/RoundWidget";
import LargeRoundWidget from "../../components/ecommerce/LargeRoundWidget";
import SingleForm from "../../components/ecommerce/SingelForm";
import MonthlyCostChart from "../../components/ecommerce/MonthlyCostChart";

export default function Home() {
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
            <NumWidget title="Energy" value={40.29} units="kWh"/>
            <NumWidget title="Power" value={40.29} units="Watt"/>
            
            <NumWidget title="Frequency" value={50} units="Hz"/>
            <NumWidget title="Power Factor" value={0.87} units=""/>
            
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-6 md:hidden">
            <NumWidget title="Energy" value={40.29} units="kWh"/>
            <NumWidget title="Power" value={40.29} units="Watt"/>
          </div>

           <div className="grid grid-cols-2 gap-2 md:gap-6">
            <SingleForm title="Cost/kWh" value={1300} units="IDR" storageKey="cost/kwh"/>
            <NumWidget title="Total Cost" value={1300*40.29} units="IDR"/>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-6 md:hidden">
            <div className="col-span-2">
              <RoundWidget title="Voltage" value={220.30} units="Volt"/>
            </div>
            <div className="col-span-2">
              <RoundWidget title="Current" value={2.33} units="Ampere"/>
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-2 md:gap-6 hidden lg:hidden">
            <div className="col-span-2">
              <LargeRoundWidget title="Voltage" value={220.30} units="Volt"/>
            </div>
            <div className="col-span-2">
              <LargeRoundWidget title="Current" value={2.33} units="Ampere"/>
            </div>
          </div>
          <MonthlyCostChart />
        </div>
        
        <div className="hidden lg:block col-span-13 lg:col-span-4 xl:col-span-5">
          {/* <MonthlyTarget /> */}
          <div className="space-y-6">
            <LargeRoundWidget title="Voltage" value={220.30} units="Volt"/>
            <LargeRoundWidget title="Current" value={1.30} units="Ampere"/>
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
