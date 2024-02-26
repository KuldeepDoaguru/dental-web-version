import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MostTakenTreat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  // console.log(`User Name: ${branch.name}`);
  const [appointmentList, setAppointmentList] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const getAppointList = async () => {
    console.log(branch.name);
    try {
      const response = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAppointmentData/${branch.name}`
      );
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, [branch.name]);

  // console.log(appointmentList);
  useEffect(() => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = String(getDate.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;

    // const formatByBranch = appointmentList?.filter(
    //   (item) => item.branch_name === branch.name // Additional filter by some other property
    // );

    // console.log(formatByBranch);
    const filterForMonthlyAppointments = appointmentList?.filter((item) =>
      item.apointment_date_time?.split("T")[0]?.includes(formattedDate)
    );

    if (filterForMonthlyAppointments.length > 0) {
      const treatments = filterForMonthlyAppointments.map(
        (item) => item.treatment_provided
      );
      const series = treatments.reduce((acc, val) => acc.concat(val), []);
      const uniqueTreatments = [...new Set(series)];

      const treatmentCounts = uniqueTreatments.map(
        (treatment) => series.filter((t) => t === treatment).length
      );

      setChartData({
        series: treatmentCounts,
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: uniqueTreatments,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  }, [appointmentList, branch.name]); // Added branch as a dependency

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div id="chart">
          {appointmentList.length !== 0 ? (
            <>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                width={380}
              />
            </>
          ) : (
            <>
              <ReactApexChart
                options={{
                  // Define options for the blank chart
                  chart: {
                    width: 380,
                    type: "pie",
                    foreColor: "#000000",
                  },
                }}
                series={[0]}
                type="pie"
                width={380}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MostTakenTreat;
const Container = styled.div``;
