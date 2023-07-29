import React, { useState } from "react";
import { Paper, Typography, ButtonGroup, Button } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

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
          value,
        }))
      );
    }

    return data;
  };

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40", "#9966FF"];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Your Own Clothesionary
      </Typography>
      <ButtonGroup variant="contained" color="primary" size="small">
        <Button onClick={() => setChartType("company")}>By Company</Button>
        <Button onClick={() => setChartType("type")}>By Type</Button>
      </ButtonGroup>
      <div style={{ marginTop: "1em" }}>
        <PieChart width={400} height={400}>
          <Pie
            data={getData()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
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
        </PieChart>
      </div>
    </Paper>
  );
};

export default Statistics;
