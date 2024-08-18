import {useCallback, useEffect, useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
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
  // let latitude = 0;
  // let longitude = 0;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['seoul', 'tokyo', 'bangkok', 'taipei', 'new york', 'buenos aires', 'paris', 'vancouver', 'london'];

  const getCurrentLocation = useCallback(() => {
    // console.log('getCurrentLocation');
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      // console.log(latitude, longitude);
      getWeatherByCurrentLocation(latitude, longitude);
    });
  }, []);
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (response.status === 200) {
        setWeather(data);
        setLoading(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  const getWeatherByCity = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (response.status === 200) {
        setWeather(data);
        setLoading(false);
      }
    } catch (error) {
      console.log('error:', error);
    }
  }, [city]);
  useEffect(() => {
    if (city) {
      // console.log('City: ', city);
      getWeatherByCity();
    } else {
      getCurrentLocation();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);
  return (
    <div id="wrap" className="w-dvw h-dvh pt-20">
      {/* {console.log('render')} */}
      <div className="container w-4/5 max-w-fit mx-auto p-8 rounded-2xl bg-slate-200/60 flex items-center flex-col gap-4 drop-shadow-2xl">
        {loading ? (
          <ClipLoader color="#007ECD" loading={loading} size={148} aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <WeatherBox weather={weather}></WeatherBox>
        )}
        <WeatherBtn cities={cities} setCity={setCity} selectedCity={city}></WeatherBtn>
      </div>
    </div>
  );
}

export default App;
