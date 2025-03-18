import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const pieData = {
    labels: ['Query Resolved', 'Pending Queries'],
    datasets: [
      {
        label: 'Query Status',
        data: data,
        backgroundColor: ['#10B981', '#F59E0B'],
      },
    ],
  };

  return (
    <div style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
        Query Resolution Status
      </h2>
      <Pie data={pieData} />
    </div>
  );
};

export default PieChart;
