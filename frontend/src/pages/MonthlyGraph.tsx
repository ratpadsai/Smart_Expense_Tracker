import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  transactions: any[];
}

function MonthlyGraph({ transactions }: Props) {
  const monthlyData: { [key: string]: number } = {};

  transactions.forEach((t) => {
    const month = new Date(t.createdAt).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += Number(t.amount);
  });

  const data = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(monthlyData),
        borderColor: "blue",
        backgroundColor: "rgba(59,130,246,0.5)"
      },
    ],
  };

  return <Line data={data} />;
}

export default MonthlyGraph;
