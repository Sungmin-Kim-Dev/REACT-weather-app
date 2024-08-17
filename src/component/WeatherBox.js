import React from 'react';

const WeatherBox = ({weather}) => {
  console.log('weather', weather);
  const fDegree = weather?.main.temp * (9 / 5) + 32;
  return (
    <div>
      <p className="text-center text-3xl font-bold">{weather?.name}</p>
      <div className="flex gap-6 text-xl py-4">
        <span>{weather?.main.temp.toFixed(1)}℃</span>
        <span>{fDegree.toFixed(1)}℉</span>
        <span>{weather?.main.humidity}%</span>
      </div>
      <p className="text-xl text-center mb-6">{weather?.weather[0].description.toUpperCase()}</p>
    </div>
  );
};

export default WeatherBox;
