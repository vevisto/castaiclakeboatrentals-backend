'use client'
import React, { useEffect, useState } from 'react'

const WeatherForecast = () => {
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
 
  const location = {
    city: 'Los Angeles ',
    lat: 34.5382,
    lon: 118.6102,
  }
  
  const API_KEY = '7ebf1f62344665cfd99741029d87a0f1'
  
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        )
        if (!res.ok) throw new Error('Failed to fetch weather data.')
        const data = await res.json()
        
        
        const groupedByDate = {}
        for (const entry of data?.list ?? []) {
          const date = new Date(entry.dt * 1000).toDateString()
          const hour = new Date(entry.dt * 1000).getHours()
          const current = groupedByDate[date]
          if (
            !current ||
            Math.abs(hour - 12) < Math.abs(new Date(current.dt * 1000).getHours() - 12)
          ) {
            groupedByDate[date] = entry
          }
        }
        
        const dailyData = Object.values(groupedByDate)
        setForecast(dailyData.slice(0, 6)) // Limit to next 6 days
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchForecast()
  }, [])
  
  const formatDate = (dt_txt, index) => {
    const date = new Date(dt_txt)
    return index === 0
      ? 'Today'
      : date.toLocaleDateString('en-US', { weekday: 'short' })
  }
  
  const formatDateSub = (dt_txt, index) => {
    const date = new Date(dt_txt)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
  
  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Rain':
        return (
<div className=' overflow-hidden '>
<svg width="123" height="129" viewBox="0 0 123 129" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="26.1715" y1="56.8008" x2="24.2374" y2="64.5635" stroke="#88907B" strokeWidth="2"/>
<line x1="22.3033" y1="72.3262" x2="20.3693" y2="80.0889" stroke="#88907B" strokeWidth="2"/>
<line x1="18.4352" y1="87.8511" x2="16.5011" y2="95.6138" stroke="#88907B" strokeWidth="2"/>
<line x1="14.567" y1="103.377" x2="12.6329" y2="111.139" stroke="#88907B" strokeWidth="2"/>
<line x1="59.9225" y1="65.21" x2="57.9884" y2="72.9727" stroke="#88907B" strokeWidth="2"/>
<line x1="56.0543" y1="80.7354" x2="54.1202" y2="88.4981" stroke="#88907B" strokeWidth="2"/>
<line x1="52.1862" y1="96.2603" x2="50.2521" y2="104.023" stroke="#88907B" strokeWidth="2"/>
<line x1="48.318" y1="111.786" x2="46.3839" y2="119.548" stroke="#88907B" strokeWidth="2"/>
<line x1="45.15" y1="52.5674" x2="43.2159" y2="60.3301" stroke="#88907B" strokeWidth="2"/>
<line x1="41.2819" y1="68.0928" x2="39.3478" y2="75.8555" stroke="#88907B" strokeWidth="2"/>
<line x1="37.4137" y1="83.6177" x2="35.4796" y2="91.3804" stroke="#88907B" strokeWidth="2"/>
<line x1="33.5455" y1="99.1431" x2="31.6114" y2="106.906" stroke="#88907B" strokeWidth="2"/>
<line x1="78.9" y1="60.9766" x2="76.9659" y2="68.7393" stroke="#88907B" strokeWidth="2"/>
<line x1="75.0319" y1="76.502" x2="73.0978" y2="84.2647" stroke="#88907B" strokeWidth="2"/>
<line x1="71.1637" y1="92.0269" x2="69.2296" y2="99.7896" stroke="#88907B" strokeWidth="2"/>
<line x1="67.2955" y1="107.552" x2="65.3614" y2="115.315" stroke="#88907B" strokeWidth="2"/>
<path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M17.5415 35.072C17.5374 26.9209 20.374 19.0232 25.5634 12.7374C30.7527 6.45155 37.9703 2.17064 45.9747 0.631046C53.9791 -0.908553 62.2698 0.389407 69.4207 4.30165C76.5716 8.21389 82.1356 14.4958 85.1555 22.0669C88.5072 21.682 91.9026 22.0765 95.0768 23.2194C98.251 24.3624 101.118 26.223 103.455 28.6561C105.792 31.0893 107.536 34.0293 108.55 37.247C109.564 40.4647 109.822 43.8732 109.302 47.2067C114.371 50.0551 118.353 54.5036 120.624 59.8559C122.895 65.2083 123.328 71.1627 121.855 76.7873C120.382 82.412 117.086 87.3897 112.483 90.9415C107.879 94.4934 102.228 96.419 96.4138 96.4171H30.6869C23.7091 96.4204 16.9388 94.0444 11.4934 89.6812C6.04795 85.3181 2.25297 79.2287 0.73481 72.418C-0.783353 65.6074 0.0660516 58.4827 3.14282 52.2199C6.2196 45.9571 11.3398 40.9305 17.6584 37.9699C17.5799 37.0059 17.541 36.0392 17.5415 35.072Z" fill="#C5C5C5"/>
</svg>


</div>
        )
      case 'Sunny':
        return (
    <div className=' overflow-hidden '>
<svg width="123" height="103" viewBox="0 0 123 103" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M17.5415 41.3543C17.5374 33.2031 20.374 25.3054 25.5634 19.0196C30.7527 12.7338 37.9703 8.45287 45.9747 6.91327C53.9791 5.37367 62.2698 6.67163 69.4207 10.5839C76.5716 14.4961 82.1356 20.7781 85.1555 28.3491C88.5072 27.9643 91.9026 28.3587 95.0768 29.5017C98.251 30.6446 101.118 32.5052 103.455 34.9384C105.792 37.3715 107.536 40.3116 108.55 43.5293C109.564 46.747 109.822 50.1554 109.302 53.4889C114.371 56.3374 118.353 60.7858 120.624 66.1382C122.895 71.4905 123.328 77.4449 121.855 83.0696C120.382 88.6942 117.086 93.6719 112.483 97.2237C107.879 100.776 102.228 102.701 96.4138 102.699H30.6869C23.7091 102.703 16.9388 100.327 11.4934 95.9635C6.04795 91.6003 2.25297 85.5109 0.73481 78.7003C-0.783353 71.8896 0.0660516 64.7649 3.14282 58.5021C6.2196 52.2393 11.3398 47.2127 17.6584 44.2521C17.5799 43.2881 17.541 42.3214 17.5415 41.3543Z" fill="#C5C5C5"/>
<circle cx="77.1208" cy="16.9997" r="16.3043" fill="#88907B"/>
</svg>


         </div>
        )
      case 'Clouds':
        return (
<div className=' overflow-hidden '>
<svg width="97" height="92" viewBox="0 0 97 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M17.856 35.3543C17.8519 27.2031 20.6885 19.3054 25.8778 13.0196C31.0671 6.73377 38.2848 2.45287 46.2892 0.913272C54.2936 -0.626326 62.5843 0.671634 69.7352 4.58388C76.886 8.49612 82.45 14.7781 85.47 22.3491C88.8217 21.9643 92.217 22.3587 95.3912 23.5017C98.5655 24.6446 101.433 26.5052 103.77 28.9384C106.107 31.3715 107.85 34.3116 108.865 37.5293C109.879 40.747 110.136 44.1554 109.617 47.4889C114.685 50.3374 118.667 54.7858 120.938 60.1382C123.21 65.4905 123.643 71.4449 122.17 77.0695C120.697 82.6942 117.4 87.6719 112.797 91.2237C108.194 94.7756 102.543 96.7012 96.7283 96.6994H31.0014C24.0236 96.7026 17.2532 94.3266 11.8078 89.9635C6.36241 85.6003 2.56743 79.5109 1.04926 72.7003C-0.4689 65.8896 0.380505 58.7649 3.45728 52.5021C6.53405 46.2393 11.6543 41.2127 17.9728 38.2521C17.8944 37.2881 17.8554 36.3214 17.856 35.3543Z" fill="#C5C5C5"/>
</svg>

</div>

        )
      case 'Snow':
        return (
          <div className="w-16 h-16  rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300"></div>
            <div className="relative">
              <div className="w-6 h-4 bg-white rounded-full"></div>
              <div className="w-8 h-4 bg-white rounded-full -mt-2 ml-1"></div>
              <div className="flex space-x-1 mt-1 ml-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        )
     
      default:
        return (

          <div className=' overflow-hidden '>
<svg width="106" height="114" viewBox="0 0 106 114" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="67.9569" cy="79.7391" r="46.7391" fill="#88907B"/>
</svg>

</div>


        )
    }
  }
  
  const getBackgroundColor = (main, index) => {
    if (index === 0) return 'bg-[#F2EFE9] border-2 border-[#076E9E]'
    
    switch (main) {
      case 'Sunny':
        return 'bg-yellow-50'
      case 'Rain':
        return 'bg-blue-50'
      case 'Clouds':
        return 'bg-gray-50'
      case 'Snow':
        return 'bg-blue-50'

      default:
        return 'bg-gray-50'
    }
  }
  
  return (
    <div className="flex flex-col pb-[56px] px-[2%] max-w-[1300px] mx-auto items-center space-y-6 p-6  min-h-screen/2">
      <h1 className="text-[32px]  font-semibold text-gray-800">Weather Forecast</h1>
      
      {loading ? (
        <p className="text-gray-500 text-lg">Loading forecast...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">Error: {error}</p>
      ) : forecast.length === 0 ? (
        <p className="text-gray-500 text-lg">No forecast available.</p>
      ) : (
        <div className="    grid  grid-cols-2 lg:grid-cols-6 w-full gap-9 pb-4">
          {forecast.map((day, idx) => {
            const weatherMain = day?.weather?.[0]?.main ?? 'N/A'
            const icon = getWeatherIcon(weatherMain)
            const label = formatDate(day?.dt_txt, idx)
            const dateStr = formatDateSub(day?.dt_txt, idx)
            const bgColor = getBackgroundColor(weatherMain, idx)
            
            return (
              <div
                key={idx}
                className={`flex flex-col items-center  w-full rounded-4xl pl-4 w min-w-[7rem] shadow-sm transition-all hover:shadow-md ${bgColor}`}
              >
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-500 mb-3">{dateStr}</p>
                
 
                
           <div className='  grid grid-cols-2 gap-2'>
                   <div >         <div className="text-3xl font-bold text-gray-800 mb-2">
                  {Math.round(day?.main?.temp ?? 0)}°
                </div>
                
                <div className="text-sm text-gray-600 mb-3 capitalize">
                  {weatherMain}
                </div> </div>     
             <div className="flex items-center justify-center">
                  {icon}
                </div></div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WeatherForecast