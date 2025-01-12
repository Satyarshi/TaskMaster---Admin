import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#FF4560"], // Blue for on-time, Red for late
  labels: ["Tasks Done on Time", "Tasks Done Late"],
  legend: {
    show: true,
    position: "bottom",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
        labels: {
          show: true,
          name: {
            show: true,
          },
          value: {
            show: true,
            formatter: function (val) {
              return val.toString() + " tasks";
            },
          },
          total: {
            show: true,
            label: "Total Tasks",
            formatter: function (w) {
              const total = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0,
              );
              return total.toString() + " tasks";
            },
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const EmployeeWeekPieChart: React.FC<{ employeeName: string }> = ({
  employeeName,
}) => {
  const weeklyData = {
    onTime: 22, // Tasks completed on time
    late: 6, // Tasks completed late
  };

  const series = [weeklyData.onTime, weeklyData.late];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {employeeName}'s Weekly Task Distribution
          </h5>
        </div>
        <div className="relative z-20 inline-block">
          <select
            name=""
            id=""
            className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
          >
            <option value="" className="dark:bg-boxdark">
              This Week
            </option>
            <option value="" className="dark:bg-boxdark">
              Last Week
            </option>
          </select>
          <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                fill="#637381"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full bg-primary"></span>
            <span className="text-sm font-medium text-black dark:text-white">
              On Time Tasks
            </span>
          </div>
          <span className="text-sm font-medium text-black dark:text-white">
            {Math.round(
              (weeklyData.onTime / (weeklyData.onTime + weeklyData.late)) * 100,
            )}
            %
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full bg-[#FF4560]"></span>
            <span className="text-sm font-medium text-black dark:text-white">
              Late Tasks
            </span>
          </div>
          <span className="text-sm font-medium text-black dark:text-white">
            {Math.round(
              (weeklyData.late / (weeklyData.onTime + weeklyData.late)) * 100,
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWeekPieChart;
