export const content = `
<!--
Health Monitoring Dashboard
Single-file HTML/CSS/JS demo for ESP32-based health project
Features:
- Live socket connection (socket.io) to receive sensor data (configure SERVER_URL below)
- Simulate mode if you don't have server/ESP32 yet
- Separate "meter" cards per sensor and a FINAL REPORT view (print-friendly)
- Leaflet (OpenStreetMap) map for GPS (free API, no key required)
- Watermark with project name
- Print button prints only the final report area

How to use:
1) Save this file as \`index.html\` and open in a modern browser.
2) To connect to your server change SERVER_URL variable in the script section to your Node server (example: http://192.168.1.10:3000)
3) If you have no server yet, use 'Start Simulation' to produce demo sensor values.
4) Click 'FINAL REPORT' to view consolidated report. Click Print to print the report (watermark included).

Free APIs/Libraries used:
- Leaflet (maps) - OpenStreetMap tiles (free, no API key)
- Socket.IO client CDN (for real-time updates) - requires a socket.io server

Notes:
- For production: host frontend on Vercel/Netlify and backend (Node.js) on Render/Heroku/DigitalOcean.
- Add authentication and HTTPS for security when deploying publicly.

Project name (shown as watermark & header): "SmartGuard Health Monitor"
-->
<!doctype html>
<html lang="bn">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>SmartGuard Health Monitor - Dashboard</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    :root{
      --bg:#071428; --card:#0e2a44; --accent:#2b6df6; --muted:#9db3d8; --glass: rgba(255,255,255,0.04);
    }
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;background:linear-gradient(180deg,var(--bg),#041326);color:#e7f0ff}
    header{display:flex;align-items:center;gap:12px;padding:18px 26px}
    .brand{display:flex;flex-direction:column}
    .brand h1{margin:0;font-size:20px;color:var(--accent)}
    .brand p{margin:0;color:var(--muted);font-size:13px}

    .app{max-width:1200px;margin:12px auto;padding:12px}
    .grid{display:grid;grid-template-columns:1fr 380px;gap:18px}
    .left{display:grid;grid-template-rows:auto auto;gap:18px}

    .card{background:linear-gradient(180deg,var(--card),#062033);border-radius:12px;padding:14px;box-shadow:0 8px 30px rgba(0,0,0,0.6)}
    .title{font-size:14px;color:var(--muted);margin-bottom:8px}

    .sensors{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    .sensor{padding:12px;border-radius:10px;background:var(--glass)}
    .sensor h3{margin:0 0 6px 0;font-size:15px}
    .val{font-size:28px;font-weight:700;color:#fff}
    .small{font-size:12px;color:var(--muted)}

    /* big meter style */
    .gauge{height:160px;display:flex;align-items:center;justify-content:center}
    .gauge svg{width:100%;max-width:320px}

    /* map */
    #map{height:220px;border-radius:8px;border:1px solid rgba(255,255,255,0.04)}

    /* controls */
    .controls{display:flex;gap:8px;margin-top:10px}
    button{border:0;padding:8px 12px;border-radius:8px;background:var(--accent);color:white;cursor:pointer}
    .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.06)}

    /* right column */
    .right .card{margin-bottom:12px}
    .final-report{min-height:200px}
    .report-row{display:flex;gap:12px;margin:10px 0}
    .report-item{flex:1;padding:8px;border-radius:8px;background:rgba(255,255,255,0.02)}

    /* watermark */
    .watermark{position:fixed;right:10px;bottom:10px;opacity:0.08;font-weight:900;color:#fff;font-size:30px;transform:rotate(-20deg);pointer-events:none}

    /* print styles: only print .print-area */
    @media print{
      body *{visibility:hidden}
      .print-area, .print-area *{visibility:visible}
      .print-area{position:fixed;left:0;top:0;width:100%}
    }

    /* responsive */
    @media (max-width:900px){.grid{grid-template-columns:1fr}.sensors{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header>
    <div style="width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,#2de1a9,#2b6df6);display:flex;align-items:center;justify-content:center;font-weight:800;color:#04233a">SG</div>
    <div class="brand">
      <h1>SmartGuard Health Monitor</h1>
      <p>Real-time personal health dashboard — prototype</p>
    </div>
  </header>

  <div class="app">
    <div class="grid">
      <div class="left">
        <div class="card">
          <div class="title">Live Sensors</div>
          <div class="sensors">
            <div class="sensor" id="card-hr">
              <h3>Heart Rate</h3>
              <div class="val" id="hrVal">-- bpm</div>
              <div class="small">Last updated: <span id="hrTime">-</span></div>
            </div>

            <div class="sensor" id="card-temp">
              <h3>Temperature</h3>
              <div class="val" id="tempVal">-- °C</div>
              <div class="small">Humidity: <span id="humVal">-- %</span></div>
            </div>

            <div class="sensor" id="card-spo2">
              <h3>SpO₂ (Pulse Ox)</h3>
              <div class="val" id="spo2Val">-- %</div>
              <div class="small">Pulse: <span id="pulseVal">--</span></div>
            </div>

            <div class="sensor" id="card-dust">
              <h3>Air Dust (PM2.5)</h3>
              <div class="val" id="dustVal">-- µg/m³</div>
              <div class="small">Air quality indicator</div>
            </div>
          </div>

          <div style="margin-top:12px;display:flex;gap:8px;align-items:center;justify-content:space-between">
            <div>
              <button id="btnConnect">Connect (Socket)</button>
              <button id="btnSim" class="btn-ghost">Start Simulation</button>
            </div>
            <div class="small">Status: <span id="connStatus">Disconnected</span></div>
          </div>
        </div>

        <div class="card">
          <div class="title">Gauge / Overall Meter</div>
          <div class="gauge"><svg id="gaugeSVG" viewBox="0 0 300 160"></svg></div>
          <div class="small">Meter shows combined health score (0–100). Customize mapping in the script.</div>
        </div>
      </div>

      <div class="right">
        <div class="card">
          <div class="title">GPS Location</div>
          <div id="map"></div>
          <div style="display:flex;gap:8px;margin-top:8px;align-items:center;justify-content:space-between">
            <div class="small">Lat: <span id="lat">--</span> Lng: <span id="lng">--</span></div>
            <div>
              <button id="btnReport">FINAL REPORT</button>
              <button id="btnPrint" class="btn-ghost">Print Report</button>
            </div>
          </div>
        </div>

        <div class="card final-report print-area" id="reportArea" style="display:none">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <h2 style="margin:0">SmartGuard Health Monitor - Final Report</h2>
              <div class="small">Generated: <span id="reportTime">-</span></div>
            </div>
            <div class="small">Patient: <span id="rPatient">Anonymous</span></div>
          </div>

          <div class="report-row">
            <div class="report-item">Heart Rate: <strong id="rHR">-- bpm</strong></div>
            <div class="report-item">SpO₂: <strong id="rSPO2">-- %</strong></div>
            <div class="report-item">Temp: <strong id="rTemp">-- °C</strong></div>
          </div>

          <div class="report-row">
            <div class="report-item">Humidity: <strong id="rHum">-- %</strong></div>
            <div class="report-item">PM2.5: <strong id="rDust">-- µg/m³</strong></div>
            <div class="report-item">Overall Score: <strong id="rScore">--</strong></div>
          </div>

          <div style="margin-top:12px">
            <div class="small">Location:</div>
            <div id="reportMapMini" style="height:160px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);margin-top:6px"></div>
          </div>

          <div style="margin-top:12px;font-size:13px;color:var(--muted)">Note: This prototype is not a medical device. For clinical diagnosis consult a professional.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="watermark">SmartGuard</div>

  <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    // CONFIG: change SERVER_URL to your node/socket server if you have one.
    const SERVER_URL = 'http://YOUR_SERVER_IP:3000'; // <-- replace or leave and use simulation

    // UI elements
    const hrVal = document.getElementById('hrVal');
    const tempVal = document.getElementById('tempVal');
    const humVal = document.getElementById('humVal');
    const spo2Val = document.getElementById('spo2Val');
    const dustVal = document.getElementById('dustVal');
    const pulseVal = document.getElementById('pulseVal');
    const connStatus = document.getElementById('connStatus');
    const btnConnect = document.getElementById('btnConnect');
    const btnSim = document.getElementById('btnSim');
    const btnReport = document.getElementById('btnReport');
    const btnPrint = document.getElementById('btnPrint');

    // Report fields
    const reportArea = document.getElementById('reportArea');
    const rHR = document.getElementById('rHR');
    const rSPO2 = document.getElementById('rSPO2');
    const rTemp = document.getElementById('rTemp');
    const rHum = document.getElementById('rHum');
    const rDust = document.getElementById('rDust');
    const rScore = document.getElementById('rScore');
    const reportTime = document.getElementById('reportTime');
    const rPatient = document.getElementById('rPatient');

    // small map
    const latEl = document.getElementById('lat');
    const lngEl = document.getElementById('lng');

    // Leaflet main map
    const map = L.map('map', {zoomControl:false}).setView([23.7808875,90.2792371],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
    const marker = L.marker([23.7808875,90.2792371]).addTo(map);

    // mini report map
    const rmap = L.map('reportMapMini', {zoomControl:false, attributionControl:false}).setView([23.7808875,90.2792371],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(rmap);
    const rmarker = L.marker([23.7808875,90.2792371]).addTo(rmap);

    // gauge drawing
    const gaugeSVG = document.getElementById('gaugeSVG');
    function drawGauge(score){
      const v = Math.max(0, Math.min(100, score));
      const start = -Math.PI;
      const end = start + (v/100)*Math.PI;
      gaugeSVG.innerHTML = \`
        <defs>
          <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#2de1a9"/><stop offset="1" stop-color="#2b6df6"/></linearGradient>
        </defs>
        <g transform="translate(150,140)">
          <path d="M-120,0 A120,120 0 0,1 120,0" fill="none" stroke="#153041" stroke-width="22"></path>
          <path d="\${arcPath(0,120,start,end)}" fill="none" stroke="url(#g1)" stroke-width="22" stroke-linecap="round"></path>
          <text x="0" y="-10" text-anchor="middle" font-size="16" fill="#9ec5ff">Overall</text>
          <text x="0" y="22" text-anchor="middle" font-size="28" fill="#fff">\${Math.round(v)}</text>
        </g>
      \`;
    }
    function arcPath(cx, r, start, end){
      const sx = cx + r*Math.cos(start);
      const sy = 0 + r*Math.sin(start);
      const ex = cx + r*Math.cos(end);
      const ey = 0 + r*Math.sin(end);
      const large = (end - start) > Math.PI ? 1:0;
      return \`M \${sx} \${sy} A \${r} \${r} 0 \${large} 1 \${ex} \${ey}\`;
    }
    drawGauge(0);

    // simulation fallback
    let simInterval = null;
    function startSimulation(){
      if(simInterval) return;
      connStatus.innerText = 'Simulation';
      simInterval = setInterval(()=>{
        const data = {
          hr: Math.floor(60 + Math.random()*40),
          temp: (24 + Math.random()*5).toFixed(1),
          hum: Math.floor(40 + Math.random()*40),
          spo2: Math.floor(94 + Math.random()*5),
          dust: Math.floor(Math.random()*120),
          lat: 23.7808875 + (Math.random()-0.5)*0.02,
          lng: 90.2792371 + (Math.random()-0.5)*0.02,
          score: Math.floor(Math.random()*100)
        };
        handleData(data);
      },1500);
    }
    function stopSimulation(){ if(simInterval){clearInterval(simInterval); simInterval=null;} }

    btnSim.addEventListener('click',()=>{
      if(simInterval){ stopSimulation(); btnSim.innerText='Start Simulation'; connStatus.innerText='Disconnected'; }
      else{ startSimulation(); btnSim.innerText='Stop Simulation'; }
    });

    // Socket connection
    let socket = null;
    btnConnect.addEventListener('click',()=>{
      if(socket && socket.connected){ socket.disconnect(); connStatus.innerText='Disconnected'; btnConnect.innerText='Connect (Socket)'; }
      else{
        try{
          socket = io(SERVER_URL, {transports:['websocket'], reconnectionAttempts:3});
          socket.on('connect',()=>{ connStatus.innerText='Connected'; btnConnect.innerText='Disconnect'; });
          socket.on('disconnect',()=>{ connStatus.innerText='Disconnected'; btnConnect.innerText='Connect (Socket)'; });
          socket.on('sensor-data', (d)=>{ handleData(d); });
        }catch(e){alert('Socket connection error: '+e.message)}
      }
    });

    // Data handler
    function handleData(d){
      // map fields to UI; support multiple naming styles
      const hr = d.hr ?? d.heartRate ?? d.heart_rate ?? null;
      const temp = d.temp ?? d.temperature ?? null;
      const hum = d.hum ?? d.humidity ?? null;
      const spo2 = d.spo2 ?? d.SPO2 ?? null;
      const dust = d.dust ?? d.pm25 ?? d.pm2_5 ?? null;
      const lat = d.lat ?? d.latitude ?? null;
      const lng = d.lng ?? d.longitude ?? null;
      const score = d.score ?? d.speedLike ?? d.overall ?? 0;

      if(hr!==null){ hrVal.innerText = hr + ' bpm'; document.getElementById('hrTime').innerText = new Date().toLocaleTimeString(); }
      if(temp!==null){ tempVal.innerText = temp + ' °C'; }
      if(hum!==null){ humVal.innerText = hum + ' %'; document.getElementById('humVal').innerText = hum + ' %'; }
      if(spo2!==null){ spo2Val.innerText = spo2 + ' %'; pulseVal.innerText = hr ?? '--'; }
      if(dust!==null){ dustVal.innerText = dust + ' µg/m³'; }
      if(lat && lng){ latEl.innerText = lat.toFixed(6); lngEl.innerText = lng.toFixed(6); marker.setLatLng([lat,lng]); rmarker.setLatLng([lat,lng]); map.setView([lat,lng],13); rmap.setView([lat,lng],13); }
      drawGauge(score);

      // update report fields live
      rHR.innerText = (hr!==null? hr + ' bpm' : '--');
      rSPO2.innerText = (spo2!==null? spo2 + ' %' : '--');
      rTemp.innerText = (temp!==null? temp + ' °C' : '--');
      rHum.innerText = (hum!==null? hum + ' %' : '--');
      rDust.innerText = (dust!==null? dust + ' µg/m³' : '--');
      rScore.innerText = Math.round(score);
      reportTime.innerText = new Date().toLocaleString();
    }

    btnReport.addEventListener('click',()=>{ reportArea.style.display='block'; window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}); });
    btnPrint.addEventListener('click',()=>{ if(reportArea.style.display==='none') btnReport.click(); setTimeout(()=>window.print(),400); });

    // default: start with simulation off. You can also auto-start if no server: 
    // startSimulation();
  </script>
</body>
</html>`