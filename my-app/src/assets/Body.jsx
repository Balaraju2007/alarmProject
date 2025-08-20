import React, { useState, useRef, useEffect } from "react"; 

const Body = () => {
  const hours = Array.from({ length: 30}, (_, i) => i); // 0 - 23
  const minutes = Array.from({ length: 80 }, (_, i) => i); // 0 - 59

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [result, setResult] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const audioRef = useRef(null);

  const ITEM_HEIGHT = 32;

  const handleHourScroll = () => {
    const scrollTop = hourRef.current.scrollTop;
    console.log("Hour scrollTop:", scrollTop);
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    setSelectedHour(hours[index] || 0);
  };

  const handleMinuteScroll = () => {
    const scrollTop = minuteRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    setSelectedMinute(minutes[index] || 0);
  };

  // ⏰ Keep checking every second but only if alarm is set
  useEffect(() => {
    if (!alarmSet) return;

    const interval = setInterval(() => {
      const now = new Date();
      const systemHour = now.getHours();   // 0-23
      const systemMinute = now.getMinutes();
      if (selectedHour > 12) {
        // Convert to 12-hour format  
        selectedHour -= 12;
      }
      if (selectedHour === systemHour && selectedMinute === systemMinute) {
        setResult(`⏰ Alarm! ${selectedHour}:${selectedMinute}`);
        audioRef.current.play().catch(err => console.log("Play blocked:", err));
        setAlarmSet(false); // Stop checking after alarm rings
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmSet, selectedHour, selectedMinute]);

  const handleSetAlarm = () => {
    setAlarmSet(true);
    setResult(`✅ Alarm set for ${selectedHour}:${selectedMinute}`);

    // 👇 Unlock audio on button click (required for browsers)
  };
  const handleStopAlarm = () => {
    setAlarmSet(false);
    setResult("⏹️ Alarm stopped");
    audioRef.current.pause();   
  }
  return (
    <div className="text-center w-[50%] m-auto mt-4 p-4 rounded-2xl border border-red-500 h-[22rem] bg-red-100 flex flex-col gap-3">
      <div className="flex justify-around px-8 flex-1 text-blue-600 font-light">
        {/* Hours */}
        <section
          ref={hourRef}
          onScroll={handleHourScroll}
          className="overflow-y-scroll h-[10rem] w-[4rem] border border-blue-500 rounded-lg snap-y snap-mandatory scrollbar-hide"
        >
          {hours.map((h) => (
            <p
              key={h}
              className={`text-lg h-[35px] flex items-center justify-center snap-start ${
                selectedHour === h ? "bg-blue-300 font-bold" : ""
              }`}
            >
              {h}
            </p>
          ))}
        </section>

        {/* Colon */}
        <section className="flex items-center justify-center">
          <p className="text-3xl">:</p>
        </section>

        {/* Minutes */}
        <section
          ref={minuteRef}
          onScroll={handleMinuteScroll}
          className="overflow-y-scroll h-[10rem] w-[4rem] border border-green-500 rounded-lg snap-y snap-mandatory scrollbar-hide"
        >
          {minutes.map((m) => (
            <p
              key={m}
              className={`text-lg h-[32px] flex items-center justify-center snap-start ${
                selectedMinute === m ? "bg-green-300 font-bold" : ""
              }`}
            >
              {m}
            </p>
          ))}
        </section>
      </div>

      {/* Set Alarm Button */}
      <button
        onClick={handleSetAlarm}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Set Alarm
      </button>
      <button
        onClick={handleStopAlarm}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        STop Alarm
      </button>
      {/* Show result */}
      {result && (
        <div className="text-xl font-semibold text-green-700">
          {result}
        </div>
      )}

      {/* Hidden Audio */}
      <audio ref={audioRef} src="/badboy.mp3" preload="auto" />
    </div>
  );
};

export default Body;
