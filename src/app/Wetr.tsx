'use client'
import { ScatterChart, Scatter,XAxis,YAxis, LineChart, Line,Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

export default function Wetr(
    { data }:{
        data: {
            pressure_KPa: number;
            time: number;
        }[]
    })  {
        const [getData, setData] = useState(data)
        const [isClient, setIsClient] = useState(false);
        const [userLocation, setUserLocation] = useState<GeolocationPosition|null>(null);
        useEffect(() => {
            setIsClient(true)
            if(navigator.geolocation && !userLocation && !isClient){
                navigator.geolocation.getCurrentPosition(async (geolocationPosition)=>{
                    setUserLocation(geolocationPosition)
                })
            }
          }, [])
        useEffect(()=>{
            if(userLocation){
                fetch('/api/pressure?q='+String(userLocation.coords.latitude).slice(0,6)+','+String(userLocation.coords.longitude).slice(0,6)).then((value)=>{
                    return value.json()
                }).then((value)=>{
                    setData(value);
                }).catch()
            }
        },[userLocation]);
        return(
            isClient?
            <div className='flex justify-center h-full w-full p-10'>
            {/* {userLocation?<div>{userLocation.coords.latitude},{userLocation.coords.longitude}</div>:<div>'not loaded'</div>} */}
            <LineChart width={800} height={400} margin={{left:20,right:20,top:20,bottom:20,}}>
                <Tooltip labelFormatter={(label)=>{return ''}} formatter={(value, name, props) => [value+' hPa','Tlak', ]} />
                <XAxis dataKey="time" domain={[-24,0]} includeHidden interval={'preserveEnd'} type="number" name="Čas" unit="h" />
                <YAxis dataKey="pressure_KPa" domain={[1010,1030]} type="number" name="Tlak" unit="hPa" />
                <Line dot={false} isAnimationActive={false} dataKey={'pressure_KPa'} type="basis" name="" data={getData} fill="#8884d8" />
            </LineChart>
            </div>
            :<div/>
    )
}