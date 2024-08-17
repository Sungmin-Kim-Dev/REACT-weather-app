import {useEffect, useState} from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';

// 1. 앱이 실행되면 현재 위치 가져오기
// 2. 현재 위치 기반 날씨 정보 표시
// 3. 날씨 정보에는 도시, 섭씨와 화씨 온도, 상태
// 4. 현재 위치 버튼 + 도시 선택 버튼
// 5. 버튼을 클릭하면 해당 도시의 날씨
// 6. 현재 위치 버튼을 누르면 현재 위치 날씨
// 6. 로딩 스피너 표시
function App() {
  const APIkey = '8e113361b514112ac907a7df54dafd6e';
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    console.log('getCurrentLocation');
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(latitude, longitude);
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };
  useEffect(() => {
    getCurrentLocation();
    console.log('useEffect');
  }, []);
  return (
    <div id="wrap" className="w-dvw h-dvh pt-20">
      {console.log('render')}
      <div className="container w-fit mx-auto p-8 rounded-2xl bg-slate-200/60 flex items-center flex-col gap-4 drop-shadow-2xl">
        <WeatherBox weather={weather}></WeatherBox>
        <div className="btn-box flex gap-4">
          <WeatherBtn name="Current Location"></WeatherBtn>
          <WeatherBtn name="Seoul"></WeatherBtn>
          <WeatherBtn name="ToKyo"></WeatherBtn>
          <WeatherBtn name="BangKok"></WeatherBtn>
          <WeatherBtn name="Taipei"></WeatherBtn>
        </div>
      </div>
    </div>
  );
}

export default App;
