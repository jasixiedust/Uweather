import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "خوش آمدید"


  return (
    <>
      <div className="container" style={{backgroundColor:"black"}}>
        <div className="header">
          <div className="left-content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2903/2903914.png"
              alt="logo"
              className="logo"
            />
          </div>
          <div className="right-content">
            <div className="clock">Time: {props.time.time}</div>
          </div>
        </div>

        <div className="ww">
          <div className="loc">Iran | {props.city}</div>

          <div className="main-weather">
            <img
              src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
              alt="weather icon"
              className="weather-icon"
            />
            <div className="temp">{props.weather.temp_C}°C</div>
            <div className="fl">you might feel: {props.weather.FeelsLikeC} °C</div>
          </div>

          <div className="details">
            <div className="mainDetails">🌞 Sunny</div>
            <div className="mainDetails">UV: {props.weather.uvIndex}</div>
            <div className="mainDetails">💧 humidity: {props.weather.humidity}% (inaccurate)</div>
            <div className="mainDetails">💨  Pressure: {props.weather.pressure}</div>
          </div>
        </div>

        <div className="footer">
          <div>phoenix team</div>
        </div>
      </div>

      <style jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Tahoma, sans-serif;
          background: #242A56;
          color: white;
          direction: rtl;
        }
        
        .container {
          width: 100%;
          margin: 0 auto;
          text-align: center;
          padding-top: 20px;
          height: 100%;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #6A6BC5;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        
        .left-content .logo {
          width: 80px;
          height: 80px;
        }
        
        .right-content .clock, .right-content .date {
          font-size: 16px;
        }
        
        .ww {
          background: #35428B;
          border-radius: 15px;
          padding: 30px;
          position: relative;
        }
        
        .ww .loc {
          font-size: 22px;
          margin-bottom: 5px;
        }
        
        .main-weather {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .main-weather .weather-icon {
          width: 100px;
          margin-right: 20px;
        }
        
        .main-weather .temp {
          font-size: 50px;
          margin-right: 20px;
        }
        
        .main-weather .fl {
          font-size: 20px;
          margin-top: 10px;
        }
        
        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          text-align: left;
        }
        
        .mainDetails {
          background: rgba(0, 0, 0, 0.1);
          padding: 15px;
          border-radius: 10px;
        }
        
        .footer {
          display: flex;
          align-items: end;
          justify-content: center;
          font-size: 14px;
          color: #BBBBBB;
          height: 160px;
        }
      `}</style>
    </>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("https://cdn.turing.team/research/api/weather/");
    let data = await res.json();
  
    let Date = await fetch(
      "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Tehran"
    );
    let time = await Date.json();
  
    let weather = await data.current_condition[0];
    let city = await data.nearest_area[0].areaName[0].value;


  return {
    props: {
      data: global.QSON.stringify({
        weather,
        city,
        time,
        session,
        // nlangs,
      })
    },
  }
}