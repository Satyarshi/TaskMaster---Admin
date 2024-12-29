import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const EmployeeTotalPieChart: React.FC<{ employeeName: string }> = ({
  employeeName,
}) => {
  const data = {
    onTime: 156, // Total tasks completed on time
    late: 24, // Total tasks completed late
  };

  const series = [data.onTime, data.late];

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#3C50E0", "#FF4560"],
    labels: ["Tasks Done on Time", "Tasks Done Late"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
      markers: {
        radius: 99,
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          {employeeName}'s Total Task Distribution
        </h5>
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
            {Math.round((data.onTime / (data.onTime + data.late)) * 100)}%
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
            {Math.round((data.late / (data.onTime + data.late)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTotalPieChart;
