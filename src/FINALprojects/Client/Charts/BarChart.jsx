import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {

  const labels = data.map(item => item.name);
  const values = data.map(item => item.qty);
 

  const chartData = {
    labels,
    datasets: [
      {
        label: "Quantity Sold",
        data: values,
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  
 
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Bar data={chartData} options={options} />
    </Box>
  );
}

export default BarChart;







