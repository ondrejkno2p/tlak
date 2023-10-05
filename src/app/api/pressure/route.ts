import { NextResponse } from "next/server";

export async function getData({q,}:{q?:string}) {
  const now=new Date(Date.now());
  const params={
    key:process.env.WEATHER_API_KEY as string,
    q:q?q:'Prague',
    dt:now.getUTCFullYear()+'-'+String(now.getUTCMonth()+1).padStart(2,'0')+'-'+String(now.getUTCDay()).padStart(2,'0'),
    end_dt:now.getUTCFullYear()+'-'+String(now.getUTCMonth()+1).padStart(2,'0')+'-'+String(now.getUTCDay()+1).padStart(2,'0')
  }
  const res=await fetch('http://api.weatherapi.com/v1/history.json?'+new URLSearchParams(params).toString())
  const body = await res.json()
  const pressures:{pressure_KPa:number,time:number}[] = []
  body.forecast.forecastday.forEach((day:{hour:any[]}) => {
    day.hour.forEach((element:any) => {
      const dt =(new Date(element.time).getTime()-Date.now())/3600000;
      if( dt>= -24 && dt <= 0){
        pressures.push({pressure_KPa:element.pressure_mb,time:dt})
      }
    });
  })
  const paramsCurrent = {
    q:q?q:'Prague',
    key:process.env.WEATHER_API_KEY as string,
  }
  const resCurrent = await fetch('http://api.weatherapi.com/v1/current.json?'+new URLSearchParams(paramsCurrent).toString())
  const bodyCurrent = await resCurrent.json()
  pressures.push({pressure_KPa:bodyCurrent.current.pressure_mb,time:0})

  params.dt=now.getFullYear()+'-'+String(now.getUTCMonth()+1).padStart(2,'0')+'-'+String(now.getDay()+1).padStart(2,'0')
  return pressures;
}

export async function GET(request: Request,) {
  const q = new URL(request.url).searchParams.get('q')
  const pressures = await getData({q:q?q:undefined});
  return NextResponse.json(pressures,{headers:{'cache-control':'max-age=1800'}}) 
} 