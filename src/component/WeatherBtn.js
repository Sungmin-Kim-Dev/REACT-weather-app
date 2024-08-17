import React from 'react'

const WeatherBtn = (props) => {
  return (
    <button className='p-2 rounded-lg border border-zinc-600 drop-shadow-lg bg-blue-400/40 hover:bg-blue-400/80'>{props.name}</button>
  )
}

export default WeatherBtn