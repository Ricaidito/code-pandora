/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const HEARTS_DATA = [...Array(15)].map((_, i) => ({
  id: i,
  left: `${(i * 7) % 100}vw`,
  duration: 6 + (i % 5),
  delay: i * 0.8,
}));

const App = () => {
  const [step, setStep] = useState("password");
  const [password, setPassword] = useState("");
  const [noCount, setNoCount] = useState(0);

  const handlePassword = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "android") {
      setStep("question");
    } else {
      alert("Contraseña incorrecta. Intenta de nuevo.");
    }
  };

  const handleYes = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#B76E79", "#FFB7C5", "#E2C1C0"],
      });
    }, 250);
    setStep("success");
  };

  const phrases = [
    "No",
    "¿Segura?",
    "Piénsalo...",
    "Habrá postre!",
    "Porfa! 🙏",
    "💔",
    "Di que sí...",
  ];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FFF5F5] font-sans text-gray-800">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {HEARTS_DATA.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "105vh", x: heart.left }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear",
              delay: heart.delay,
            }}
            className="absolute text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <div className="border-rose-gold/5 overflow-hidden rounded-[3rem] border bg-white p-10 text-center shadow-[0_30px_60px_rgba(183,110,121,0.2)]">
          <AnimatePresence mode="wait">
            {step === "password" && (
              <motion.div
                key="pass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6 text-6xl">🔒</div>
                <h1 className="font-romantic text-rose-gold mb-2 text-5xl">
                  Se necesita contraseña
                </h1>
                <p className="mb-8 text-sm text-balance text-gray-400 italic">
                  Solo reservado para mi persona favorita...
                </p>

                <form onSubmit={handlePassword} className="space-y-6">
                  <input
                    type="password"
                    autoFocus
                    className="border-rose-gold-light text-rose-gold focus:border-rose-gold w-full border-b-2 bg-transparent py-2 text-center text-3xl font-light tracking-[0.3em] transition-all focus:outline-none"
                    placeholder="****"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="w-full rounded-2xl bg-red-300 py-4 font-bold shadow-lg transition-all hover:brightness-110 active:scale-95">
                    Entrar ✨
                  </button>
                </form>
              </motion.div>
            )}

            {step === "question" && (
              <motion.div
                key="quest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-6 animate-bounce text-6xl">💝</div>
                <h2 className="font-romantic text-rose-gold mb-10 text-5xl leading-tight">
                  Quieres ser mi San Valentín?
                </h2>

                <div className="flex flex-col gap-4">
                  <motion.button
                    onClick={handleYes}
                    animate={{ scale: 1 + noCount * 0.1 }}
                    className="rounded-full bg-red-300 py-5 text-xl font-bold text-white shadow-xl transition-all hover:brightness-110"
                  >
                    ACEPTO ❤️
                  </motion.button>
                  <button
                    onClick={() => setNoCount(noCount + 1)}
                    className="hover:text-rose-gold text-sm font-medium text-gray-400 transition-colors"
                  >
                    {phrases[Math.min(noCount, phrases.length - 1)]}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mb-4 text-6xl">🎉</div>
                <h2 className="font-romantic text-rose-gold mb-8 text-6xl leading-tight">
                  Tenemos una cita
                </h2>

                <div className="border-rose-gold/10 mx-auto max-w-65 space-y-6 border-t pt-8 text-left">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📅</span>
                    <div>
                      <p className="text-rose-gold text-[10px] font-bold tracking-widest uppercase opacity-60">
                        CUÁNDO
                      </p>
                      <p className="font-semibold text-gray-700">
                        14 de Febrero, 8 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📍</span>
                    <div>
                      <p className="text-rose-gold text-[10px] font-bold tracking-widest uppercase opacity-60">
                        DÓNDE
                      </p>
                      <p className="font-semibold text-gray-700">Casa Luca</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">👗</span>
                    <div>
                      <p className="text-rose-gold text-[10px] font-bold tracking-widest uppercase opacity-60">
                        ESTILO
                      </p>
                      <p className="font-semibold text-gray-700">
                        Elegante y radiante (igual que tú)
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-romantic text-rose-gold mt-12 animate-pulse text-3xl">
                  Te amo ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
