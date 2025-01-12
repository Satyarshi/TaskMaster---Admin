"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#FF4560"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: [
      "John",
      "Sarah",
      "Mike",
      "Emma",
      "David",
      "Lisa",
      "Alex",
      "Maria",
      "James",
      "Anna",
      "Peter",
      "Linda",
      "Robert",
      "Sofia",
      "Thomas",
      "Emily",
      "Daniel",
      "Laura",
      "Chris",
      "Rachel",
    ].slice(0, 10),
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const employeesPerPage = 10;

  const allEmployees = [
    "John",
    "Sarah",
    "Mike",
    "Emma",
    "David",
    "Lisa",
    "Alex",
    "Maria",
    "James",
    "Anna",
    "Peter",
    "Linda",
    "Robert",
    "Sofia",
    "Thomas",
    "Emily",
    "Daniel",
    "Laura",
    "Chris",
    "Rachel",
  ];

  const allData = {
    onTime: [
      15, 12, 18, 10, 14, 13, 16, 11, 19, 15, 17, 13, 16, 12, 14, 18, 11, 15,
      13, 16,
    ],
    late: [3, 5, 2, 4, 1, 6, 2, 4, 3, 5, 2, 4, 6, 3, 2, 4, 5, 3, 4, 2],
  };

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const currentOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: allEmployees.slice(startIndex, endIndex),
    },
  };

  const series = [
    {
      name: "Tasks Done on Time",
      data: allData.onTime.slice(startIndex, endIndex),
    },
    {
      name: "Tasks Done Late",
      data: allData.late.slice(startIndex, endIndex),
    },
  ];

  const totalPages = Math.ceil(allEmployees.length / employeesPerPage);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Employee Task Performance
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={currentOptions}
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
