export default function Frame() {
  return (
    <div className="bg-gray-200 flex items-center p-2 rounded-t-lg shadow-md frame">
      {/* Mac Window Buttons */}
      <div className="flex space-x-2">
        <button onClick={() => { window.electron.sendFrameAction("CLOSE"); console.log("Working") }} className="w-3 h-3 bg-red-500 rounded-full"></button>
        <button onClick={() => window.electron.sendFrameAction("MINIMIZE")} className="w-3 h-3 bg-yellow-500 rounded-full"></button>
        <button onClick={() => window.electron.sendFrameAction("MAXIMIZE")} className="w-3 h-3 bg-green-500 rounded-full"></button>
      </div>

      {/* Window Title */}
      <div className="flex-1 text-center text-gray-700 font-semibold text-sm select-none">
        Production - INTERCOCINA
      </div>
    </div>
  );
}
