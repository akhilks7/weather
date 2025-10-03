
import './App.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
function App() {

  const [city, setCity] = React.useState('');
  const [weather, setWeather] = React.useState(null);
   const [searched, setSearched] = React.useState(false); 

  const datasearch = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d50abf2670f299b31619ab579f3d4eaf`);
      const weatherData = await res.json();
      console.log(weatherData);
      setWeather(weatherData);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setSearched(true);
    }
  };



  return (
    <>
    
      <div style={{ backgroundImage: "url('https://images.wallpaperscraft.com/image/single/clouds_sunset_sky_188020_3648x5472.jpg')", backgroundSize: 'cover', height: '100vh' }}>
        <div>

          <div className='d-flex justify-content-center gap-4 p-5 '>

            <TextField label="city name" variant='outlined' className='bg-white rounded shadow-lg' value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={datasearch} className='btn text-light' style={{background: 'linear-gradient(to right, #7c6b8f, #7c6b8f)'}}>search</button>

          </div>
        </div>

        {searched && weather &&  weather.cod === 200 &&  <div className='container-fluid d-flex align-items-center justify-content-center' >

          <div className='container p-3 w-50' style={{ background: 'transparent', borderRadius: '45px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
            <div className=' p-3 ' style={{ background: 'linear-gradient(to right, #bda2c1, #bda2c1)', color: 'white', borderRadius: '35px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
              <div className="row">
                <div className="col-md-3">
                  <img src="https://raw.githubusercontent.com/breezy-weather/pixel-icon-provider/main/fastlane/metadata/android/en-US/images/icon.png" width={130} alt="" />
                </div>
                {weather && (
                  <div className="col-md-9">
                    <p className='text-white pt-2 ' style={{ fontFamily: 'Merriweather, serif', fontWeight: '500' }}>{weather.sys.country} {weather.name},{weather.weather[0].description}</p>
                    <h1 className='text-white' style={{ fontFamily: 'Merriweather, serif', fontWeight: '700', marginTop: '-7px' }}>{(weather.main.temp - 273.15).toFixed(2)}°C</h1>
                    <p className='text-white pt-1' style={{ fontFamily: 'Merriweather, serif', fontWeight: '500' }}>min: {(weather.main.temp_min - 273.15).toFixed(2)}°C   &   max: {(weather.main.temp_max - 273.15).toFixed(2)}°C</p>
                  </div>
                )}
                {weather && <div className="col-md-12 mt-3">
                  <div className=' px-3 p-2 text-white' style={{ background: 'linear-gradient(to right, #7c6b8f, #7c6b8f)', borderRadius: '40px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <div className="row text-center ">
                      <div className='col-md-4'>visibility:{(weather.visibility / 1000).toFixed(2)} km</div>
                      <div className='col-md-4'>sunrise: {weather.sys.sunrise}</div>
                      <div className='col-md-4'>sunset: {weather.sys.sunset}</div>

                    </div>

                  </div>
                </div>}

              </div>
              {/*  */}

            </div>


            <div className="row text-center text-white p-3 mt-4 mx-2 mb-1" style={{ background: 'linear-gradient(to right, #7c6b8f, #7c6b8f)', borderRadius: '40px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
              <div className='col-md-4'>pressure:{weather.main.pressure} hPa</div>
              <div className='col-md-4'>wind speed: {weather.wind.speed} m/s</div>
              <div className='col-md-4'>humidity: {weather.main.humidity} %</div>

            </div>
          </div>
        </div>}
        {searched && (!weather || weather.cod !== 200) && (
          <h1 className="text-center text-white">No Data Found</h1>
        )}

      </div>




    </>
  );
}

export default App
