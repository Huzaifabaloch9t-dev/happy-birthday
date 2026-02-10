"use client";

import { useEffect, useRef, useState } from "react";

export default function BirthdaySurpriseMahi() {
  const [mounted, setMounted] = useState(false);
  const [openCurtain, setOpenCurtain] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [celebrate, setCelebrate] = useState(false);
  const [showDua, setShowDua] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  
  const startCelebration = () => {
    setCelebrate(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setTimeout(() => {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
      }, 30000);
    }

    setTimeout(() => {
      setShowDua(true);
    }, 6000);
  };

  useEffect(() => {
    setMounted(true);
    const curtainTimer = setTimeout(() => setOpenCurtain(true), 1500);
    return () => clearTimeout(curtainTimer);
  }, []);

  useEffect(() => {
    if (!openCurtain) return;

    if (countdown === 0) {
      startCelebration();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, openCurtain]);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">
     
      <img
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        alt=""
      />      
      <audio ref={audioRef}>
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>      
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-pink-500 ${
          openCurtain ? "animate-curtainLeft" : ""
        }`}
      />
      <div
        className={`absolute top-0 right-0 h-full w-1/2 bg-pink-500 ${
          openCurtain ? "animate-curtainRight" : ""
        }`}
      />

      {!celebrate && openCurtain && (
        <div className="relative z-20 text-center animate-zoomIn">
          <h1 className="text-[120px] font-extrabold text-white drop-shadow-lg animate-heartbeat">
            {countdown}
          </h1>
          <p className="text-pink-200 text-xl mt-2">Get Ready… 🎉</p>
        </div>
      )}

      {celebrate && mounted && (
        <div className="absolute inset-0 pointer-events-none z-10">
         
          <div className="absolute left-0 top-0 h-full w-32">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={`lf-${i}`}
                className="absolute text-3xl animate-sideFirework z-30"
                style={{
                  left: "20%",
                  bottom: "-10%",
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                🎇
              </span>
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={`lb-${i}`}
                className="absolute text-5xl animate-sideBalloon"
                style={{
                  left: "15%",
                  bottom: "-20%",
                  animationDelay: `${i * 1.6}s`,
                }}
              >
                🎈
              </span>
            ))}
          </div>

          {/* RIGHT */}
          <div className="absolute right-0 top-0 h-full w-32">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={`rf-${i}`}
                className="absolute text-3xl animate-sideFirework z-30"
                style={{
                  right: "20%",
                  bottom: "-10%",
                  animationDelay: `${i * 0.9}s`,
                }}
              >
                🎆
              </span>
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={`rb-${i}`}
                className="absolute text-5xl animate-sideBalloon"
                style={{
                  right: "15%",
                  bottom: "-20%",
                  animationDelay: `${i * 1.4}s`,
                }}
              >
                🎈
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🎈 CENTER BALLOONS */}
      {celebrate && mounted && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`cb-${i}`}
              className="absolute text-[120px] animate-bigBalloon"
              style={{
                left: `${(i * 100) / 6}%`,
                bottom: "-20%",
                animationDelay: `${i * 1.2}s`,
              }}
            >
              🎈
            </span>
          ))}
        </div>
      )}

      {/* 🎂 MAIN MESSAGE */}
      {celebrate && !showDua && (
        <div className="relative z-20 text-center bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl animate-zoomIn">
          <h1 className="text-5xl font-extrabold text-pink-700 animate-heartbeat">
            🎂 HAPPY BIRTHDAY
          </h1>
          <h2 className="mt-4 text-6xl font-black text-white">
             💖
          </h2>
          <p className="mt-4 text-pink-200 text-xl">
            👑  👑
          </p>
        </div>
      )}

      {/* 🤲 DUA (ABOUT YOU) */}
      {showDua && (
        <>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
          <div className="relative z-20 text-center bg-white/20 backdrop-blur-xl p-8 rounded-3xl max-w-xl animate-fadeInSlow">
            <p className="text-lg text-white leading-relaxed">
              یا اللہ 🤲<br />
              مجھے ہمیشہ سلامت رکھ،<br />
              مجھے دنیا و آخرت کی ہر خوشی عطا فرما،<br />
              اور مجھے نیک، کامیاب اور شکر گزار بندہ بنا۔<br />
              <br />
              آمین ❤️
            </p>
            <p className="mt-4 text-white text-sm opacity-80">
              — Made with ❤️ Chatgpt
            </p>
          </div>
        </>
      )}

      {/* 🎨 CSS */}
      <style jsx>{`
        .animate-curtainLeft {
          animation: curtainLeft 1.2s forwards;
        }
        .animate-curtainRight {
          animation: curtainRight 1.2s forwards;
        }
        @keyframes curtainLeft {
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes curtainRight {
          to {
            transform: translateX(100%);
          }
        }

        .animate-sideFirework {
          animation: sideFireworkUp 4s ease-out infinite, shake 0.6s infinite;
        }
        @keyframes sideFireworkUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 1;
          }
          60% {
            transform: translateY(-70vh) scale(1.3);
          }
          100% {
            transform: translateY(-110vh) scale(1.6);
            opacity: 0;
          }
        }
        @keyframes shake {
          50% {
            transform: translateX(6px);
          }
        }

        .animate-sideBalloon {
          animation: sideBalloonFloat 9s ease-in-out infinite;
        }
        @keyframes sideBalloonFloat {
          50% {
            transform: translateY(-60vh);
          }
          100% {
            transform: translateY(-120vh);
          }
        }

        .animate-bigBalloon {
          animation: balloonUp 10s linear infinite;
        }
        @keyframes balloonUp {
          to {
            transform: translateY(-140vh);
          }
        }

        .animate-heartbeat {
          animation: heartbeat 1.6s infinite;
        }
        @keyframes heartbeat {
          50% {
            transform: scale(1.08);
          }
        }

        .animate-zoomIn {
          animation: zoomIn 1s forwards;
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInSlow {
          animation: fadeIn 2s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
