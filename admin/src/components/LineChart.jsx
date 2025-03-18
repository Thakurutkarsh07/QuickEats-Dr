import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ data }) => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Handling Queries Over Time',
        data: data,
        fill: false,
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      height: '400px'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
        Handling Queries Over Time
      </h2>
      <Line data={lineData} />
    </div>
  );
};

export default LineChart;
