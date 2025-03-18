export const fetchDummyData = async (timeRange) => {
  const hardcodedData = {
    '1 Day': { totalQueries: 150, queryResolved: 120, pendingQueries: 30, pieData: [120, 30], lineData: [50, 70, 90, 110, 120] },
    '1 Week': { totalQueries: 800, queryResolved: 650, pendingQueries: 150, pieData: [650, 150], lineData: [200, 400, 500, 700, 800] },
    '1 Month': { totalQueries: 3000, queryResolved: 2500, pendingQueries: 500, pieData: [2500, 500], lineData: [600, 1200, 1800, 2400, 3000] },
    '1 Year': { totalQueries: 36000, queryResolved: 30000, pendingQueries: 6000, pieData: [30000, 6000], lineData: [9000, 18000, 27000, 33000, 36000] },
  };

  return hardcodedData[timeRange] || hardcodedData['1 Week'];
};