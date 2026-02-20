import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  transactions: any[];
}

const ExpenseChart = ({ transactions }: Props) => {
  const monthlyData: { [key: string]: number } = {};

  transactions.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += t.amount;
  });

  const data = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyData),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return <Bar data={data} />;
};

export default ExpenseChart;
