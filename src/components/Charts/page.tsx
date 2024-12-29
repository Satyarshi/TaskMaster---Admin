"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import EmployeeTasksChart1 from "@/components/Charts/EmployeeTasksChart1";
import EmployeeWeekPieChart from "./EmployeeWeekPieChart";
import dynamic from "next/dynamic";
import React from "react";
import EmployeeWeekChart from "./EmployeeWeekChart";
import EmployeeTotalPieChart from "./EmployeeTotalPieChart";

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      {/* <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5"> */}
      {/* <ChartTwo /> */}
      <br />
      <EmployeeTasksChart1 />
      <br />
      <EmployeeWeekChart employeeName="John" />
      <br />
      <EmployeeWeekPieChart employeeName="John" />
      <br />
      <EmployeeTotalPieChart employeeName="John" />
      <br />
      <ChartOne />
      <ChartThree />
      {/* </div> */}
    </>
  );
};

export default Chart;
