import React from 'react';

const WeatherBtn = ({cities, setCity, selectedCity}) => {
  // console.log(cities);
  // console.log(selectedCity);
  return (
    <div className="btn-box grid grid-cols-5 gap-4">
      <button
        className={`p-2 rounded-lg border border-zinc-600 drop-shadow-lg ${
          !selectedCity ? 'bg-blue-400/100' : 'bg-blue-400/40'
        } hover:bg-blue-400/100`}
        onClick={() => setCity('')}>
        Current Location
      </button>
      {cities.map((item) => (
        <button
          className={`p-2 rounded-lg border border-zinc-600 drop-shadow-lg ${
            selectedCity === item ? 'bg-blue-400/100' : 'bg-blue-400/40'
          } hover:bg-blue-400/100`}
          key={item}
          onClick={() => setCity(item)}>
          {/* 도시 이름 단어 첫 글자 대문자 */}
          {item
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </button>
      ))}
    </div>
  );
};

export default WeatherBtn;
