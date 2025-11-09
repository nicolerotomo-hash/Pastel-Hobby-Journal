import { useState, useRef, useEffect } from 'react';

// --- Tiny Pixel Icons (SVG with crisp edges) ---
function PixelHeart({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect width="16" height="16" fill="none" />
      {[
        [5,3],[6,3],[9,3],[10,3],
        [4,4],[5,4],[6,4],[9,4],[10,4],[11,4],
        [3,5],[4,5],[5,5],[6,5],[9,5],[10,5],[11,5],[12,5],
        [3,6],[4,6],[5,6],[6,6],[9,6],[10,6],[11,6],[12,6],
        [4,7],[5,7],[6,7],[9,7],[10,7],[11,7],
        [5,8],[6,8],[9,8],[10,8],
        [6,9],[9,9],
        [7,10],[8,10]
      ].map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1" />))}
    </svg>
  );
}
function PixelStar({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect width="16" height="16" fill="none" />
      {[
        [7,2],[8,2],
        [7,3],[8,3],
        [4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],
        [6,7],[7,7],[8,7],[9,7],
        [7,8],[8,8],
        [6,9],[7,9],[8,9],[9,9],
        [4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10]
      ].map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1" />))}
    </svg>
  );
}
function PixelFlower({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect width="16" height="16" fill="none" />
      {[
        [7,3],[8,3],
        [6,4],[7,4],[8,4],[9,4],
        [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
        [6,6],[7,6],[8,6],[9,6],
        [7,7],[8,7],
        [7,8],[8,8],
        [7,9],[8,9],
        [7,10],[8,10],
      ].map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1" height="1" />))}
    </svg>
  );
}

export default function HobbyBlog() {
  const [posts, setPosts] = useState([
    { id: 1, text: "Hello 🌸 This is my first hobby journal entry!" }
  ]);
  const [input, setInput] = useState("");

  // Canvas state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ef9aa9'); // pastel pink default
  const [brushSize, setBrushSize] = useState(3);

  // setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
  }, [brushColor, brushSize]);

  const pointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = pointerPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const endDrawing = (e) => {
    e?.preventDefault?.();
    setIsDrawing(false);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = pointerPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const addPost = () => {
    if (input.trim() === "") return;
    setPosts([...posts, { id: Date.now(), text: input }]);
    setInput("");
  };

  const pastelPalette = ['#ef9aa9','#f6c1cf','#ffd9e2','#c2e6f4','#bfe8d9','#f7e8a4','#d7c9ff','#ffc9a9'];

  return (
    <div className="min-h-screen bg-pink-50 p-6 font-sans">
      <style>{`
        @keyframes floaty { 0%{transform:translateY(0)} 50%{transform:translateY(-4px)} 100%{transform:translateY(0)} }
        .floaty { animation: floaty 5s ease-in-out infinite; }
        .notebook-paper {
          background-image:
            linear-gradient(to right, transparent 64px, rgba(255,99,99,.25) 64px, rgba(255,99,99,.25) 66px, transparent 66px),
            repeating-linear-gradient(to bottom, rgba(255,182,193,.25) 0px, rgba(255,182,193,.25) 1px, transparent 1px, transparent 28px);
          background-size: cover;
        }
        .pixel { image-rendering: pixelated; }
      `}</style>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl border border-pink-200 overflow-hidden">
        {/* Header with pixel icons */}
        <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 p-5 flex items-center gap-3 border-b border-pink-200">
          <PixelHeart className="w-6 h-6 pixel" />
          <PixelStar className="w-6 h-6 pixel" />
          <PixelFlower className="w-6 h-6 pixel" />
          <h1 className="text-2xl font-bold text-pink-600 ml-2">My Hobby Journal (Pastel ✧ Pixel)</h1>
        </div>

        {/* Notebook body */}
        <div className="p-6 notebook-paper">
          {/* Post composer */}
          <div className="bg-white/70 backdrop-blur rounded-2xl border border-pink-200 p-4 mb-5 shadow-sm">
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 border border-pink-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Write a cozy update… ✿"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={addPost} className="px-4 py-2 bg-pink-400 text-white rounded-xl shadow">Post</button>
            </div>
            <div className="text-xs text-pink-500">Tip: share your reading, sketches, baking, language progress 💗</div>
          </div>

          {/* Posts */}
          <div className="mb-6 grid gap-3">
            {posts.map((post, idx) => (
              <div key={post.id} className={`relative p-4 rounded-2xl border border-pink-200 bg-white/80 shadow floaty`} style={{animationDelay: `${idx*0.3}s`}}>
                <div className="absolute -top-2 -left-2 rotate-[-6deg] opacity-80">
                  <PixelStar className="w-5 h-5"/>
                </div>
                <div className="absolute -top-2 right-2 rotate-[8deg] opacity-80">
                  <PixelHeart className="w-5 h-5"/>
                </div>
                <div className="text-sm">✧ {post.text}</div>
              </div>
            ))}
          </div>

          {/* Draw Corner */}
          <div className="bg-white/70 backdrop-blur rounded-2xl border border-pink-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 gap-3">
              <h2 className="text-lg font-semibold text-pink-600">Draw Corner 🎨</h2>
              {/* Toolbar */}
              <div className="flex items-center gap-2">
                {pastelPalette.map(c => (
                  <button
                    key={c}
                    title={c}
                    onClick={() => setBrushColor(c)}
                    className="w-6 h-6 rounded-md border border-pink-200"
                    style={{ backgroundColor: c, boxShadow: brushColor===c? '0 0 0 2px rgba(236,72,153,.6) inset':'' }}
                  />
                ))}
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={brushSize}
                  onChange={(e)=>setBrushSize(parseInt(e.target.value))}
                  className="w-24"
                />
                <button onClick={clearCanvas} className="px-3 py-1 text-xs bg-rose-200 rounded-lg border border-pink-300">Clear</button>
              </div>
            </div>

            <div className="rounded-xl border border-pink-300 bg-white shadow cursor-crosshair overflow-hidden">
              <canvas
                ref={canvasRef}
                width={560}
                height={260}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onMouseLeave={endDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={endDrawing}
                onTouchMove={draw}
              />
            </div>
            <div className="mt-2 text-xs text-pink-500">Tap a pastel swatch • Slide to change brush size • Works with touch 💞</div>
          </div>
        </div>
      </div>
    </div>
  );
}
