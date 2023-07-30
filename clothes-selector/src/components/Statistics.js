import React, { useState } from "react";
import { Paper, Typography, ButtonGroup, Button, Stack } from "@mui/material";
import { PieChart, Pie, Cell, Label, Legend } from "recharts";

const Statistics = ({ clothes }) => {
  const [chartType, setChartType] = useState("company");

  const getData = () => {
    const data = []; // Define the data array here

    if (chartType === "company") {
      // Count clothes by company
      const clothesByCompany = {};
      clothes.forEach((cloth) => {
        clothesByCompany[cloth.company] =
          (clothesByCompany[cloth.company] || 0) + 1;
      });

      data.push(
        ...Object.entries(clothesByCompany).map(([label, value]) => ({
          name: label,
          value,
        }))
      );
    } else if (chartType === "type") {
      // Count clothes by type
      const clothesByType = {};
      clothes.forEach((cloth) => {
        clothesByType[cloth.type] = (clothesByType[cloth.type] || 0) + 1;
      });

      data.push(
        ...Object.entries(clothesByType).map(([label, value]) => ({
          name: label,
          value: value,
        }))
      );
    }
    console.log(data);
    return data;
  };

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#9966FF"];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Let's take a look at your stats!
      </Typography>
      <ButtonGroup
        variant="contained"
        color="primary"
        size="small"
        sx={{ justifyContent: "center", mb: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <Button onClick={() => setChartType("company")}>By Company</Button>
          <Button onClick={() => setChartType("type")}>By Type</Button>
        </Stack>
      </ButtonGroup>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={400} height={400}>
          <Pie
            data={getData()}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={160}
            fill="#8884d8"
            label
          >
            {getData().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </div>
    </Paper>
  );
};

export default Statistics;
