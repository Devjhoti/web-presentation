import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

const Slide1 = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothDamping = { damping: 50, stiffness: 100 };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const slowSpringX = useSpring(mouseX, smoothDamping);
  const slowSpringY = useSpring(mouseY, smoothDamping);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateXText = useTransform(springY, [-1, 1], [15, -15]);
  const rotateYText = useTransform(springX, [-1, 1], [-15, 15]);

  const bgX = useTransform(slowSpringX, [-1, 1], [50, -50]);
  const bgY = useTransform(slowSpringY, [-1, 1], [50, -50]);
  const particlesBgX = useTransform(slowSpringX, [-1, 1], [100, -100]);
  const particlesBgY = useTransform(slowSpringY, [-1, 1], [100, -100]);

  const ring1RotateX = useTransform(springY, [-1, 1], [50, 70]);
  const ring1RotateZ = useTransform(springX, [-1, 1], [40, 50]);

  const ring2RotateX = useTransform(springY, [-1, 1], [50, 70]);
  const ring2RotateZ = useTransform(springX, [-1, 1], [-40, -50]);

  const particles = React.useMemo(() => {
    return [...Array(40)].map(() => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      scale: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="h-full w-full flex flex-col items-center justify-center text-center relative overflow-hidden bg-premium-black"
    >
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-[-100px] z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute w-[60vw] h-[60vw] bg-premium-gold/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute w-[40vw] h-[40vw] bg-premium-copper/20 rounded-full blur-[80px] top-1/3 left-[20%] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_reverse]" />
      </motion.div>

      <div className="absolute inset-0 z-0 perspective-[1000px] pointer-events-none flex items-center justify-center">
        <div className="absolute inset-[-100%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:rotateX(60deg)_translateY(-100px)_translateZ(-200px)] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

        <motion.div
          style={{ rotateX: ring1RotateX, rotateZ: ring1RotateZ }}
          className="w-[80vw] sm:w-[800px] h-[80vw] sm:h-[800px] border-[1px] border-premium-gold/30 rounded-full absolute shadow-[0_0_50px_rgba(212,175,55,0.15)]"
        >
          <div className="w-4 h-4 rounded-full bg-premium-gold absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#D4AF37] animate-ping" />
        </motion.div>

        <motion.div
          style={{ rotateX: ring2RotateX, rotateZ: ring2RotateZ }}
          className="w-[100vw] sm:w-[1000px] h-[100vw] sm:h-[1000px] border-[1px] border-white/5 rounded-full absolute"
        />

        <motion.div style={{ x: particlesBgX, y: particlesBgY }} className="absolute inset-0">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                top: `${50 + p.y}%`,
                left: `${50 + p.x}%`,
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, p.scale, 0],
                y: [0, -150]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-premium-gold rounded-full shadow-[0_0_15px_#D4AF37]"
            />
          ))}
        </motion.div>
      </div>

      <div className="z-10 relative flex flex-col items-center perspective-[1000px]">
        <motion.div
          style={{ rotateX: rotateXText, rotateY: rotateYText }}
          className="flex flex-col items-center [transform-style:preserve-3d]"
        >
          {/* Floating Premium Client Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50, z: -50, rotateX: 180 }}
            animate={{ opacity: 1, y: 0, z: 80, rotateX: 0 }}
            transition={{ duration: 1.5, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="mb-10 relative [transform:translateZ(80px)]"
          >
            <div className="absolute inset-0 bg-premium-gold/30 blur-2xl rounded-full animate-pulse" />
            <div className="relative p-2 md:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <img src="/Client_LOGO.jpeg" alt="Client Logo" className="h-16 md:h-24 object-contain rounded-xl" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 30 }}
            transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
            className="mb-8 relative [transform:translateZ(40px)]"
          >
            <div className="absolute inset-0 bg-premium-gold/20 blur-xl rounded-full" />
            <div className="relative px-6 py-2 border border-premium-gold/30 rounded-full bg-black/40 backdrop-blur-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <p className="text-premium-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-bold">
                Redefining the Digital Home
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 60 }}
            transition={{ duration: 1.5, delay: 0.8, type: 'spring', bounce: 0.4 }}
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-6 tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 [text-shadow:0_20px_40px_rgba(0,0,0,0.8)] [transform:translateZ(80px)] text-center relative pointer-events-none"
          >
            A Strategic <br />
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.4, duration: 1 }}
              className="gold-gradient inline-block"
            >
              Roadmap
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20, z: -20 }}
            animate={{ opacity: 1, y: 0, z: 40 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="mt-6 [transform:translateZ(50px)] flex flex-col items-center text-center max-w-2xl px-4 pointer-events-none"
          >
            <h2 className="text-2xl sm:text-4xl font-light text-white mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
              For Hatim Furniture
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-premium-gold to-transparent mb-6" />
            <p className="text-sm sm:text-base md:text-lg text-gray-400 tracking-[0.2em] uppercase font-medium leading-relaxed max-w-xl mx-auto">
              Elevating Brand Perception Through Storytelling, AI, and Premium Digital Experiences
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute -bottom-32 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Begin Journey</span>
          <motion.div
            animate={{ height: [0, 40, 0], opacity: [0, 1, 0], y: [0, 20, 40] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-premium-gold to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Slide2 = () => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="h-full w-full flex flex-col px-20 relative pt-32"
  >
    <div className="flex justify-between items-start z-10">
      <div className="max-w-xl">
        <h2 className="text-5xl font-bold mb-6">The Digital Audit</h2>
        <h3 className="text-2xl text-premium-gold mb-8">A Legacy Brand with Untapped Digital Potential</h3>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          <strong className="text-white">The Website:</strong> Currently functions as a static, catalog-style page. Lacks premium visual hooks necessary to immerse the customer.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          <strong className="text-white">Social Media:</strong> Content is transactional rather than transformational. The lack of premium visuals reduces engagement.
        </p>
      </div>

      <div className="relative w-1/2 h-[600px] flex items-center justify-center">
        {/* Boring Grid Representation */}
        <motion.div
          initial={{ rotateY: 45, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="grid grid-cols-2 gap-4 perspective-1000"
        >
          <img src="/product 1.png" className="w-[200px] h-[200px] object-cover border border-gray-800 rounded-lg grayscale hover:grayscale-0 transition-all duration-500" />
          <img src="/product 2.jpg" className="w-[200px] h-[200px] object-cover border border-gray-800 rounded-lg grayscale hover:grayscale-0 transition-all duration-500" />
          <img src="/product 3.jpg" className="w-[200px] h-[200px] object-cover border border-gray-800 rounded-lg grayscale col-span-2 place-self-center hover:grayscale-0 transition-all duration-500" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Slide3 = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2 }}
    className="h-full w-full flex flex-col items-center justify-center text-center px-10 relative bg-[#050505]"
  >
    <div className="absolute content-[''] bg-[url('/product%201.png')] bg-cover bg-center inset-0 opacity-10 mix-blend-overlay scale-110 animate-pulse transition-all duration-10000" />
    <motion.div
      initial={{ scale: 0.8, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="glass-panel p-16 rounded-3xl max-w-4xl z-10"
    >
      <h2 className="text-4xl text-premium-gold font-bold mb-6 tracking-widest uppercase text-sm">The Missing Link</h2>
      <h3 className="text-5xl font-bold mb-10">Visual Storytelling</h3>

      <p className="text-2xl text-gray-300 mb-8 font-light">
        "Without storytelling, customers compare products based on price alone. With storytelling, they buy into the brand's value and lifestyle."
      </p>

      <div className="h-[1px] w-1/3 bg-premium-gold/30 mx-auto my-8"></div>

      <p className="text-xl text-white font-medium">
        We transform simple product images into highly engaging, converting premium content.
      </p>
    </motion.div>
  </motion.div>
);

const Slide4 = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex flex-col items-center justify-center relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black via-premium-dark to-black" />

    <motion.h2
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl text-premium-gold font-bold mb-20 z-10"
    >
      Vision X Architecture
    </motion.h2>

    <div className="flex items-center justify-center space-x-20 z-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="w-[300px]"
      >
        <img src="/VMS-Logo-black_bg.png" alt="VMS" className="w-full mix-blend-screen" />
        <p className="text-center mt-4 text-gray-400 font-light">Creative Generation</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="text-5xl text-premium-gold"
      >
        ×
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="w-[300px]"
      >
        <img src="/PKG_IT-LOGO.png" alt="PKG IT" className="w-full" />
        <p className="text-center mt-4 text-gray-400 font-light">Technical Execution</p>
      </motion.div>
    </div>
  </motion.div>
);

const Slide5 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log(e));
    }
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-full w-full relative group"
    >
      <video
        ref={videoRef}
        src="/Hatim-Furniture_Demo_Video.mp4"
        className="w-full h-full object-cover"
        loop playsInline
      />

      <div className="absolute bottom-20 left-20 glass-panel p-10 rounded-2xl max-w-2xl transform transition-transform group-hover:translate-y-[-10px]">
        <h2 className="text-4xl text-premium-gold font-bold mb-4">Creative Transformation</h2>
        <p className="text-xl text-gray-100">
          Cinematic Storytelling · 3D Product Animations · Multilingual AI Video
          <br /><br />
          From static models to living, breathing environments.
        </p>
      </div>
    </motion.div>
  );
};

const Slide6 = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex flex-col justify-center px-24 relative overflow-hidden"
  >
    {/* 3D Web Engineering Graphics - Right Side */}
    <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center pointer-events-none z-0 perspective-[1000px]">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center [transform-style:preserve-3d]">
        {/* Background glow */}
        <div className="absolute w-[400px] h-[400px] bg-premium-gold/10 rounded-full blur-[80px] animate-pulse" />

        {/* Orbital Rings */}
        <motion.div
          animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] border-[1px] border-premium-gold/30 rounded-full"
        >
          <div className="w-3 h-3 rounded-full bg-premium-gold shadow-[0_0_20px_#D4AF37] absolute top-0 left-1/2 -translate-x-1/2" />
        </motion.div>

        <motion.div
          animate={{ rotateX: [70, 70], rotateZ: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[350px] h-[350px] border-[1px] border-white/20 rounded-full"
        >
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_#fff] absolute bottom-0 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* Center 3D Cube Core */}
        <motion.div
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 [transform-style:preserve-3d] shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateZ(64px)] flex items-center justify-center font-mono text-sm font-bold text-premium-gold">{'<UI />'}</div>
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateZ(-64px)_rotateY(180deg)] flex items-center justify-center font-mono text-sm font-bold text-premium-gold">{'<API />'}</div>
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateX(64px)_rotateY(90deg)] flex items-center justify-center font-mono text-sm font-bold text-premium-gold">{'<DB />'}</div>
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateX(-64px)_rotateY(-90deg)] flex items-center justify-center font-mono text-sm font-bold text-premium-gold">{'<UX />'}</div>
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateY(64px)_rotateX(-90deg)]"></div>
          <div className="absolute inset-0 border border-premium-gold/40 bg-premium-gold/5 backdrop-blur-sm [transform:translateY(-64px)_rotateX(90deg)]"></div>
        </motion.div>

        {/* Floating lines / data streams */}
        <div className="absolute inset-0 rotate-45 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: [0, 1, 0], x: 200 }}
              transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "linear" }}
              className="absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-premium-gold to-transparent"
              style={{ top: `${15 + i * 15}%`, left: '20%' }}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-3xl z-10 w-full relative">
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold mb-10 text-premium-gold glow-text"
      >
        Digital & Web Engineering
      </motion.h2>

      <div className="space-y-8">
        {[
          { title: "UI/UX Redesign", desc: "Transforming the website to reflect the premium quality of the physical products." },
          { title: "Corporate Immersive Hub", desc: "Upgrading the platform to be fully dynamic, responsive, and engaging." },
          { title: "Zero Downtime Architecture", desc: "Ongoing maintenance and robust technical support." }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0, x: -20 }}
            animate={{ y: 0, opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (i * 0.2), type: "spring", stiffness: 100 }}
            className="glass-panel p-6 rounded-xl border-l-4 border-l-premium-gold relative overflow-hidden group hover:bg-white/5 transition-colors"
          >
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-r from-transparent to-premium-gold/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Slide7 = () => (
  <Slide6Layout
    title="Data-Driven Digital Dominance"
    items={[
      { title: "Targeted Reach", desc: "Deploying Facebook, Instagram, Google, and YouTube Ads." },
      { title: "Customer Acquisition", desc: "Lead generation driving high-quality traffic to the showroom." },
      { title: "Continuous Optimization", desc: "AI-based insights & rigorous performance tracking." }
    ]}
  />
);

const Slide6Layout = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex flex-col justify-center px-24 relative items-end text-right overflow-hidden"
  >
    {/* Animated Data Visualization - Left Side */}
    <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Central data glow */}
        <div className="absolute w-[400px] h-[400px] bg-premium-copper/10 rounded-full blur-[100px] animate-pulse" />

        {/* Abstract Data Charts */}
        <div className="relative w-[80%] h-[60%] flex items-end justify-center pb-10 gap-4 border-b border-premium-gold/30">
          {[35, 60, 45, 80, 55, 100].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1.5, delay: i * 0.15, type: "spring", damping: 12 }}
              className="w-12 sm:w-16 bg-gradient-to-t from-premium-black via-premium-gold/30 to-premium-gold/80 rounded-t-sm relative group overflow-hidden"
            >
              {/* Top Glow on Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-premium-gold shadow-[0_0_15px_#D4AF37]" />

              {/* Percentage Metric */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono font-bold text-premium-gold"
              >
                +{Math.floor(height * 1.5)}%
              </motion.div>

              {/* Scanning laser effect */}
              <motion.div
                animate={{ y: ['100%', '-50%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
                className="w-full h-1/2 bg-white/20 blur-[2px] absolute bottom-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Orbiting data nodes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[10%] border border-white/5 rounded-full border-dashed"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 border border-premium-gold bg-premium-black/80 backdrop-blur-sm rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center text-[8px] font-bold text-premium-gold tracking-widest uppercase">KPI</div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 border border-premium-copper bg-premium-black/80 backdrop-blur-sm rounded-full shadow-[0_0_20px_rgba(184,115,51,0.4)] flex items-center justify-center text-[8px] font-bold text-premium-copper tracking-widest uppercase">ROI</div>
        </motion.div>

      </div>
    </div>

    <div className="max-w-3xl z-10 w-full relative">
      <motion.h2
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold mb-10 text-premium-gold glow-text"
      >
        {title}
      </motion.h2>

      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0, x: 20 }}
            animate={{ y: 0, opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (i * 0.2), type: "spring", stiffness: 100 }}
            className="glass-panel p-6 rounded-xl border-r-4 border-r-premium-gold flex flex-col items-end relative overflow-hidden group hover:bg-white/5 transition-colors"
          >
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-l from-transparent to-premium-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400 max-w-xl">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Slide8 = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex flex-col items-center justify-center p-20"
  >
    <h2 className="text-5xl font-bold mb-20 text-premium-gold">The Roadmap</h2>
    <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
      {['Brand Strategy & Positioning', 'Content Generation (OVCs, Reels)', 'Funnel Design (Awareness to Conv.)', 'Scaling & Optimization (ROI)'].map((phase, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.3, type: "spring" }}
          className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-premium-gold transition-colors"
        >
          <div className="absolute top-0 right-0 p-4 font-bold text-6xl text-white/5 group-hover:text-premium-gold/20 transition-colors">0{i + 1}</div>
          <h3 className="text-2xl font-bold text-white relative z-10 mt-10">{phase}</h3>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Slide9 = () => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -100 }}
    className="h-full w-full flex flex-col items-center py-20 px-10 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-premium-dark to-premium-black z-0"></div>
    <div className="z-10 text-center w-full max-w-5xl">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">Ready to Generate <span className="gold-gradient">Reality?</span></h1>
      <p className="text-3xl text-gray-400 mb-20">We offer end-to-end execution, backed by a dedicated team.</p>

      <div className="flex justify-center gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center"
        >
          <img src="/VMS-CEO.jpg" className="w-48 h-48 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-6" />
          <h3 className="text-2xl font-bold text-white">Dev Jhoti Sutradhar</h3>
          <p className="text-premium-gold uppercase tracking-widest text-sm mb-2">CEO, VMS</p>
          <p className="text-gray-400">virtualmodelstudiobd@gmail.com</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <img src="/PKG_IT-CEO.jpeg" className="w-48 h-48 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-6" />
          <h3 className="text-2xl font-bold text-white">Pranab Kumar</h3>
          <p className="text-premium-gold uppercase tracking-widest text-sm mb-2">CEO, PKG IT</p>
          <p className="text-gray-400">Pranabprg@gmail.com</p>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Slide10 = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-premium-black"
  >
    {/* Abstract Premium Background */}
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div className="absolute w-[80vw] h-[80vw] bg-premium-gold/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute w-[60vw] h-[60vw] border-[1px] border-premium-gold/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[40vw] h-[40vw] border-[1px] border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating particles for depth */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: (Math.random() - 0.5) * window.innerWidth, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          className="absolute w-1 h-1 bg-premium-gold rounded-full shadow-[0_0_10px_#D4AF37]"
        />
      ))}
    </div>

    <div className="z-10 relative flex flex-col items-center perspective-[1000px]">
      <motion.div
        initial={{ rotateX: 30, opacity: 0, y: 50, scale: 0.8 }}
        animate={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
        className="flex flex-col items-center [transform-style:preserve-3d]"
      >
        <h1 className="text-8xl md:text-[150px] font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 [text-shadow:0_20px_40px_rgba(0,0,0,0.8)] [transform:translateZ(80px)] text-center relative">
          Thank <span className="gold-gradient">You</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 flex flex-col items-center text-center"
      >
        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed mb-6">
          Let's build the future of
        </p>
        <div className="flex items-center gap-4 sm:gap-6 mb-6">
          <div className="w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-premium-gold" />
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex items-center justify-center gap-4">
            <img src="/Client_LOGO.jpeg" alt="Hatim Furniture Logo" className="h-10 sm:h-14 object-contain rounded-lg" />
            <strong className="text-white text-xl md:text-3xl tracking-widest font-bold pr-2 sm:pr-4">Hatim Furniture</strong>
          </div>
          <div className="w-10 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-premium-gold" />
        </div>
        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed">
          together.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        className="mt-16"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-premium-gold to-transparent mx-auto" />
      </motion.div>
    </div>
  </motion.div>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="w-screen h-screen bg-premium-black overflow-hidden relative cursor-none">
      <AnimatePresence mode="wait">
        <CurrentSlideComponent key={currentSlide} />
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-premium-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>

      {/* Click controls */}
      <div className="absolute inset-y-0 left-0 w-1/4 z-40 cursor-w-resize" onClick={prevSlide}></div>
      <div className="absolute inset-y-0 right-0 w-3/4 z-40 cursor-e-resize" onClick={nextSlide}></div>
    </div>
  );
}
