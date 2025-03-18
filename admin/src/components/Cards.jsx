import React from 'react';

const Cards = ({ title, value }) => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      minWidth: '30%',
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{title}</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginTop: '10px' }}>{value}</p>
    </div>
  );
};

export default Cards;
