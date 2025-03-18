import React, { useState } from 'react';

const TimeSelector = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState('1 Week');

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      {/* Dropdown on the left */}
      <select
        value={selectedTime}
        onChange={(e) => handleTimeChange(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#E5E7EB',
          width: '200px',
          border: '1px solid #ccc',
        }}
      >
        {['1 Day', '1 Week', '1 Month', '1 Year'].map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      {/* Buttons on the right */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['1 Day', '1 Week', '1 Month', '1 Year'].map((time) => (
          <button
            key={time}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: selectedTime === time ? '#2563EB' : '#E5E7EB',
              color: selectedTime === time ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => handleTimeChange(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
