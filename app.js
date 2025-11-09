const { useState, useRef, useEffect } = React;

/* Pixel icons */
const PixelHeart=({className=''})=>{const d=[[5,3],[6,3],[9,3],[10,3],[4,4],[5,4],[6,4],[9,4],[10,4],[11,4],[3,5],[4,5],[5,5],[6,5],[9,5],[10,5],[11,5],[12,5],[3,6],[4,6],[5,6],[6,6],[9,6],[10,6],[11,6],[12,6],[4,7],[5,7],[6,7],[9,7],[10,7],[11,7],[5,8],[6,8],[9,8],[10,8],[6,9],[9,9],[7,10],[8,10]];return(<svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges"><rect width="16" height="16" fill="none"/>{d.map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1"/>))}</svg>)};
const PixelStar=({className=''})=>{const d=[[7,2],[8,2],[7,3],[8,3],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[6,7],[7,7],[8,7],[9,7],[7,8],[8,8],[6,9],[7,9],[8,9],[9,9],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10]];return(<svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges"><rect width="16" height="16" fill="none"/>{d.map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1"/>))}</svg>)};
const PixelFlower=({className=''})=>{const d=[[7,3],[8,3],[6,4],[7,4],[8,4],[9,4],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[7,7],[8,7],[7,8],[8,8],[7,9],[8,9],[7,10],[8,10]];return(<svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges"><rect width="16" height="16" fill="none"/>{d.map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1"/>))}</svg>)};
const PixelTea=({className=''})=>{const d=[[7,2],[8,2],[6,3],[7,3],[8,3],[9,3],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[6,5],[7,5],[8,5],[9,5]];return(<svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges"><rect width="16" height="16" fill="none"/>{d.map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1"/>))}</svg>)};
const PixelMushroom=({className=''})=>{const d=[[6,2],[7,2],[8,2],[9,2],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[6,4],[7,4],[8,4],[7,5],[7,6]];return(<svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges"><rect width="16" height="16" fill="none"/>{d.map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1"/>))}</svg>)};

/* App */
function HobbyBlog(){
  const [page,setPage]=useState(localStorage.getItem('page')||'journal');
  useEffect(()=>localStorage.setItem('page',page),[page]);

  const [posts,setPosts]=useState(()=>{try{return JSON.parse(localStorage.getItem('posts')||'[]')}catch{return []}});
  useEffect(()=>localStorage.setItem('posts',JSON.stringify(posts)),[posts]);
  const [input,setInput]=useState("");

  const canvasRef=useRef(null);
  const [isDrawing,setIsDrawing]=useState(false);
  const [brushColor,setBrushColor]=useState('#ef9aa9');
  const [brushSize,setBrushSize]=useState(3);

  useEffect(()=>{const c=canvasRef.current;if(!c)return;const ctx=c.getContext('2d');ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=brushColor;ctx.lineWidth=brushSize;},[brushColor,brushSize]);
  useEffect(()=>{const c=canvasRef.current;if(!c)return;const saved=localStorage.getItem('drawing');if(saved){const img=new Image();img.onload=()=>c.getContext('2d').drawImage(img,0,0);img.src=saved;}},[]);
  const pos=(e)=>{const r=canvasRef.current.getBoundingClientRect();const x=(e.clientX??e.touches?.[0]?.clientX)-r.left;const y=(e.clientY??e.touches?.[0]?.clientY)-r.top;return {x,y}};
  const start=(e)=>{e.preventDefault();setIsDrawing(true);const {x,y}=pos(e);const ctx=canvasRef.current.getContext('2d');ctx.beginPath();ctx.moveTo(x,y);};
  const end=(e)=>{e?.preventDefault?.();setIsDrawing(false);try{localStorage.setItem('drawing',canvasRef.current.toDataURL('image/png'));}catch{}};
  const move=(e)=>{if(!isDrawing)return;e.preventDefault();const {x,y}=pos(e);const ctx=canvasRef.current.getContext('2d');ctx.lineTo(x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);};
  const clear=()=>{const c=canvasRef.current;c.getContext('2d').clearRect(0,0,c.width,c.height);localStorage.removeItem('drawing');};

  const addPost=()=>{if(!input.trim())return;setPosts(p=>[...p,{id:Date.now(),text:input}]);setInput('');};

  const pastel=['#ef9aa9','#f6c1cf','#ffd9e2','#c2e6f4','#bfe8d9','#f7e8a4','#d7c9ff','#ffc9a9'];

  const [deferredPrompt,setDeferredPrompt]=useState(null);
  const [showInstall,setShowInstall]=useState(false);
  useEffect(()=>{window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();setDeferredPrompt(e);setShowInstall(true);});},[]);
  const install=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;setDeferredPrompt(null);setShowInstall(false);};

  const NavBtn=({icon,label,to})=>(
    <button onClick={()=>setPage(to)} className={"flex flex-col items-center text-xs transition "+(page===to?"text-pink-800":"text-pink-600 hover:text-pink-800")}>
      <div className="w-6 h-6 mb-1 pixel">{icon}</div>{label}
    </button>
  );

  const Home = ()=> <div className="text-center p-6 text-pink-700 text-lg">Welcome to your cozy pixel world 🌷✨</div>;
  const Journal = ()=>(
    <div className="bg-white/70 backdrop-blur rounded-2xl border border-pink-200 p-4 mb-5 shadow-sm">
      <div className="flex gap-2 mb-3">
        <input className="flex-1 border border-pink-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-pink-200" placeholder="Write a cozy update… ✿" value={input} onChange={(e)=>setInput(e.target.value)} />
        <button onClick={addPost} className="px-4 py-2 bg-pink-400 text-white rounded-xl shadow">Post</button>
      </div>
      <div className="text-xs text-pink-500 mb-3">Auto-saves ✨</div>
      <div className="grid gap-3">
        {posts.map(p=>(
          <div key={p.id} className="relative p-4 rounded-2xl border border-pink-200 bg-white/80 shadow floaty">
            <div className="absolute -top-2 -left-2 -rotate-6 opacity-80"><PixelStar className="w-5 h-5"/></div>
            <div className="absolute -top-2 right-2 rotate-8 opacity-80"><PixelHeart className="w-5 h-5"/></div>
            <div className="text-sm">✧ {p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
  const Draw = ()=>(
    <div className="bg-white/70 backdrop-blur rounded-2xl border border-pink-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3 gap-3">
        <h2 className="text-lg font-semibold text-pink-600">Draw Corner 🎨</h2>
        <div className="flex items-center gap-2">
          {pastel.map(c=>(
