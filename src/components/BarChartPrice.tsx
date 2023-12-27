// BarChartComponent.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';


interface ChartData {
  Part_Name: number;
  'AVG(Price)': number;
}

const BarChartPrice: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for testing
        const response = await axios.get('http://localhost:8081/getavgpartprice');
        const result: ChartData[] = response.data
        console.log(result);
        
        //  [
        //   { "COUNT(*)": 3, "Team_ID": 1 },
        //   { "COUNT(*)": 1, "Team_ID": 2 },
        //   { "COUNT(*)": 2, "Team_ID": 3 },
        //   { "COUNT(*)": 2, "Team_ID": 4 },
        //   { "COUNT(*)": 2, "Team_ID": 5 },
        //   { "COUNT(*)": 2, "Team_ID": 6 },
        //   { "COUNT(*)": 2, "Team_ID": 7 },
        //   { "COUNT(*)": 1, "Team_ID": 8 },
        // ];

        // Check if the data has the expected structure
        if (Array.isArray(result) && result.length > 0) {
          const labels = result.map(row => `${row.Part_Name}`);
          const data = result.map(row => row['AVG(Price)']);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Average Part Prices',
                data: data,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          // Log an error message and set an empty chartData object
          console.error('Invalid data structure:', result);
          setChartData({
            labels: [],
            datasets: [],
          });
        }
      } catch (error) {
        // Log an error message and set an empty chartData object
        console.error('Error fetching data:', error);
        setChartData({
          labels: [],
          datasets: [],
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Average Part Price Bar Chart</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChartPrice;
