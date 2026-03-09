import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Activity, Clock, MessageCircle, Quote, Calendar, Send } from 'lucide-react';

// Imported from figma assets
import img1 from "@/assets/f40646b7356f60b39ba7038773619f177eb82c88.png";
import img2 from "@/assets/4b3bdfa654b69df351a386309813a36254c70a90.png";
import img3 from "@/assets/854f4e8eb57d8e4922376ed47eacaa628abc3a68.png";

const nodesData = [
  {
    id: 0,
    shortLabel: '1960s | Silence',
    title: '1960s | A Life Branded by a Name',
    content: 'I was born in an era where "women hold up half the sky," taught to labor just like men. Angry that they couldn\'t have a son, my parents took it out on me and changed my beautiful name to "Xu Zhaodi" (meaning "beckoning a brother"). I once wanted to stitch a map of the world, but when I pushed the door open, I was forced to accept a strange man. My husband stopped me from taking the college entrance exam because "the family couldn\'t do without me." Though I hate this name, it is my only mark: Xu Zhaodi is who I am.',
    position: { top: '35%', left: '70%' },
    orbColor: 'rgba(255, 60, 60, 0.8)'
  },
  {
    id: 1,
    shortLabel: '1980s | Predicament',
    title: '1980s | The Xiuyings Under the Barrier',
    content: 'I caught up with the good times of the reform and opening up, the beloved only daughter. But no matter which path I took, the destination always had a man waiting for me; I couldn\'t step over it. The "male only" tags on job advertisements held back my steps. At the age of 30, I was labeled a "leftover woman" by my parents. After having a child, I became an ignorant housewife, exhausting my life in the wrestling matches of the vegetable market.',
    position: { top: '55%', left: '30%' },
    orbColor: 'rgba(255, 100, 100, 0.8)'
  },
  {
    id: 2,
    shortLabel: 'Now | Awakening',
    title: 'Now | Surge of Consciousness',
    content: 'I was born in an era of rapidly updating information, yet I felt like I was drowning in a deep sea of homework. The world once pressed the pause button due to the pandemic; I lost the freedom to breathe and witnessed the cries of countless people. I once walked onto the streets holding a blank sheet of paper with no words on it—it was a pure blankness. I began to distinguish between "expected choices" and true freedom. I no longer endure malicious gazes; I am learning to use my own voice to speak out for everything I want.',
    position: { top: '75%', left: '65%' },
    orbColor: 'rgba(255, 150, 150, 0.8)'
  }
];

const initialComments = [
  {
    id: '1',
    text: "This project reminds me that even when names are erased and careers halted, an undefined freedom still flows in our blood, waiting to break through.",
    x: '25%', y: '25%',
    isNew: false
  },
  {
    id: '2',
    text: "If every definition given by the world is wrong, I’d rather start from a clean slate.",
    x: '75%', y: '45%',
    isNew: false
  },
  {
    id: '3',
    text: "Women's dreams are often drafted into grand narratives, only to be folded away within the confines of domestic life.",
    x: '20%', y: '65%',
    isNew: false
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'tree' | 'timeline' | 'community'>('tree');
  const [introDone, setIntroDone] = useState(false);
  
  const [isViewingNode, setIsViewingNode] = useState(false);

  const showNav = introDone && !isViewingNode;

  return (
    <div className="w-full h-screen bg-[#1A1A1A] flex justify-center items-center overflow-hidden font-sans selection:bg-red-900/20">
      <div 
        className="relative w-full max-w-[393px] h-full sm:h-[852px] sm:max-h-[95vh] bg-[#EAECEF] sm:rounded-[40px] sm:shadow-2xl overflow-hidden" 
        style={{ fontFamily: '"Noto Sans SC", sans-serif' }}
      >
        
        {!introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}

        <AnimatePresence>
          {showNav && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-8 right-6 z-50 flex items-center gap-1.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] mix-blend-luminosity"
            >
              <button 
                onClick={() => setActiveTab('tree')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'tree' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
              >
                <Activity size={14} strokeWidth={activeTab === 'tree' ? 2.5 : 2} />
              </button>
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
              >
                <Clock size={14} strokeWidth={activeTab === 'timeline' ? 2.5 : 2} />
              </button>
              <button 
                onClick={() => setActiveTab('community')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === 'community' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
              >
                <MessageCircle size={14} strokeWidth={activeTab === 'community' ? 2.5 : 2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: introDone ? 'auto' : 'none' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'tree' && (
              <TreeTab 
                key="tree" 
                introDone={introDone} 
                onNodeViewStateChange={setIsViewingNode}
                onNavigate={setActiveTab}
              />
            )}
            {activeTab === 'timeline' && <TimelineTab key="timeline" />}
            {activeTab === 'community' && <CommunityTab key="community" />}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 4500);
    const t3 = setTimeout(() => {
      setStage(3);
      onComplete();
    }, 6000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (stage === 3) return null;

  return (
    <div className="absolute inset-0 z-[100] pointer-events-none">
      <motion.div 
        className="absolute inset-0 bg-[#EAECEF]"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage >= 1 ? 0 : 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute top-[28%] left-0 w-full flex justify-center z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: stage >= 2 ? 0 : 1, y: stage >= 2 ? -10 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <h1 className="text-[44px] tracking-[0.15em] text-gray-900 font-normal" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          Unnamed
        </h1>
      </motion.div>

      <motion.div 
        className="absolute bottom-[20%] left-0 w-full flex justify-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: stage >= 2 ? 0 : 1, y: stage >= 2 ? 10 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: stage === 0 ? 0.8 : 0 }}
      >
        <p className="text-[11px] tracking-[0.4em] text-gray-800 uppercase font-light text-center px-6">
          In silence, hear the bloodlines grow
        </p>
      </motion.div>
    </div>
  );
}

function TreeTab({ 
  introDone, 
  onNodeViewStateChange,
  onNavigate
}: { 
  introDone: boolean, 
  onNodeViewStateChange: (isViewing: boolean) => void,
  onNavigate: (tab: any) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    onNodeViewStateChange(activeNode !== null);
  }, [activeNode, onNodeViewStateChange]);

  useEffect(() => {
    return () => onNodeViewStateChange(false);
  }, [onNodeViewStateChange]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.95 && !isExplorationMode) {
        setIsExplorationMode(true);
      } else if (latest < 0.9 && isExplorationMode) {
        setIsExplorationMode(false);
        if (activeNode !== null) setActiveNode(null);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isExplorationMode, activeNode]);

  const img1Scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const img2Scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const img2Opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full origin-left transform-gpu"
        initial={false}
        animate={{
          x: activeNode !== null ? '-40%' : '0%',
          opacity: activeNode !== null ? 0.3 : 1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${img1})`,
            scale: img1Scale,
            opacity: img1Opacity
          }}
        />
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${img2})`,
            scale: img2Scale,
            opacity: img2Opacity
          }}
        />
      </motion.div>

      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-y-scroll z-10 [&::-webkit-scrollbar]:hidden"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          pointerEvents: activeNode !== null ? 'none' : 'auto' 
        }}
      >
        <div className="h-[200vh] w-full" />
      </div>

      <AnimatePresence>
        {isExplorationMode && activeNode === null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {nodesData.map((node) => (
              <Orb 
                key={node.id} 
                node={node} 
                onClick={() => setActiveNode(node.id)} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeNode !== null && (
          <Modal 
            node={nodesData.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNavigate={onNavigate} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isExplorationMode && introDone && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20 mix-blend-difference text-white/90"
          >
            <span className="text-[10px] tracking-[0.2em] font-light uppercase font-serif">
              Swipe up to explore
            </span>
            <motion.div 
              className="w-[1px] h-10 bg-gradient-to-t from-white/90 to-transparent origin-bottom"
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full bg-[#EAECEF] overflow-y-auto [&::-webkit-scrollbar]:hidden relative"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-40 blur-[40px] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url(${img1})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      <div className="px-6 py-20 flex flex-col gap-12 pb-32 relative z-10">
        <div className="flex flex-col gap-3 ml-2 mt-4">
          <h2 className="text-[28px] font-normal tracking-wider text-gray-900" style={{ fontFamily: '"Noto Serif SC", serif' }}>
            Marks of the Era
          </h2>
          <div className="w-10 h-[2px] bg-red-900/40" />
        </div>

        <div className="relative border-l-[1px] border-red-900/10 ml-6 space-y-20">
          <div className="absolute top-0 -left-[1px] w-[2px] h-full bg-gradient-to-b from-red-900/30 via-red-900/10 to-transparent" />

          {nodesData.map((node, index) => {
            const parts = node.title.split(' | ');
            const year = parts[0];
            const mainTitle = parts.slice(1).join(' | ');

            return (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative pl-10 pr-2"
              >
                <div className="absolute top-2 -left-[6px] w-[11px] h-[11px] rounded-full bg-[#EAECEF] border-[2px] border-red-900/40 flex items-center justify-center shadow-[0_0_10px_rgba(150,0,0,0.2)]">
                  <div className="w-[3px] h-[3px] rounded-full bg-red-900/80" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#8e3838]">
                    <Calendar size={12} className="opacity-80" />
                    <span className="text-[10px] tracking-[0.2em] font-semibold uppercase">
                      {year}
                    </span>
                  </div>
                  
                  <h3 className="text-[19px] leading-tight text-gray-900 tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    {mainTitle}
                  </h3>
                  
                  <div className="relative bg-white/40 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mt-2 group hover:bg-white/50 transition-colors duration-500">
                    <Quote size={24} className="absolute top-4 right-4 text-red-900/5 rotate-180" />
                    <p className="text-[13px] leading-[2.2] text-gray-800 font-light tracking-wide text-justify relative z-10">
                      {node.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function CommunityTab() {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      text: input,
      x: `${20 + Math.random() * 60}%`, // Random x between 20% and 80%
      y: `${20 + Math.random() * 50}%`, // Random y between 20% and 70%
      isNew: true
    };
    
    setComments([...comments, newComment]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${img3})` }}
      />
      
      {/* Subtle overlay to ensure UI elements remain visible */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

      {/* Title */}
      <div className="absolute top-12 left-6 z-10 pointer-events-none mix-blend-luminosity opacity-80">
        <h2 className="text-xl font-normal tracking-widest text-gray-900" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          Resonance
        </h2>
        <p className="text-[10px] tracking-[0.3em] text-gray-800 uppercase font-medium mt-1">
          Echoes of the unseen
        </p>
      </div>

      {/* Orbs */}
      {comments.map(c => <CommentOrb key={c.id} data={c} />)}

      {/* Input Form */}
      <div className="absolute bottom-8 left-6 right-6 z-20">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white/40 backdrop-blur-2xl p-2 pl-4 rounded-full border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add your echo..."
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-900 placeholder:text-gray-600/70 tracking-wide font-light"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center text-white disabled:opacity-50 transition-all active:scale-95 shadow-md shrink-0"
          >
            <Send size={14} className="-ml-0.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function CommentOrb({ data }: { data: any }) {
  const [showBubble, setShowBubble] = useState(data.isNew);
  
  useEffect(() => {
    if (data.isNew) {
      const timer = setTimeout(() => setShowBubble(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [data.isNew]);

  return (
    <motion.div
      initial={data.isNew ? { top: '85%', left: '50%', scale: 0.5, opacity: 0 } : { top: data.y, left: data.x, scale: 1, opacity: 1 }}
      animate={{ top: data.y, left: data.x, scale: 1, opacity: 1 }}
      transition={{ duration: data.isNew ? 3.5 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute flex flex-col items-center justify-center z-10 w-10 h-10"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {/* Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.4 } }}
            className="absolute bottom-full mb-4 w-48 p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.1)] pointer-events-none"
          >
            <p className="text-[12px] leading-relaxed text-gray-800 font-light tracking-wide italic text-center">
              "{data.text}"
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass Sphere */}
      <motion.div 
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        onClick={() => setShowBubble(!showBubble)}
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }}
        className="relative w-8 h-8 rounded-full backdrop-blur-md cursor-pointer flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.15)] group"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.4) 100%)',
          boxShadow: 'inset -2px -2px 8px rgba(255,255,255,0.3), inset 2px 2px 8px rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.5)'
        }}
      >
        <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-white/90 blur-[1px]" />
        <div className="w-1.5 h-1.5 rounded-full bg-red-900/30 group-hover:bg-red-900/50 transition-colors duration-300 blur-[0.5px]" />
      </motion.div>
    </motion.div>
  );
}

function Orb({ node, onClick }: { node: any, onClick: () => void }) {
  return (
    <div 
      className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style={{ top: node.position.top, left: node.position.left }}
    >
      <div 
        className="relative group cursor-pointer w-14 h-14 flex items-center justify-center"
        onClick={onClick}
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + node.id * 0.4,
            ease: "easeInOut"
          }}
          className="absolute w-5 h-5 rounded-full blur-[2px]"
          style={{ backgroundColor: node.orbColor }}
        />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] z-20" />
        <motion.div 
          className="absolute left-6 whitespace-nowrap z-10"
          initial={{ opacity: 0.7, x: 0 }}
          whileHover={{ opacity: 1, x: 2 }}
        >
          <span className="text-[10px] tracking-widest text-white/95 bg-black/10 px-2.5 py-1 rounded-sm backdrop-blur-md border border-white/20 shadow-sm mix-blend-luminosity">
            {node.shortLabel}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function Modal({ node, onClose, onNavigate }: { node: any, onClose: () => void, onNavigate: (tab: any) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const parts = node.title.split(' | ');
  const year = parts[0];
  const mainTitle = parts.slice(1).join(' | ');

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 right-0 w-[80%] h-full z-30 flex flex-col justify-end pointer-events-none"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-[24px] border-l border-white/40 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] pointer-events-auto flex flex-col px-6 py-8 pb-10 pt-24">
        
        <div className="absolute top-8 right-6">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-gray-600 hover:bg-black/10 transition-colors"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="block text-[10px] text-[#8e3838] tracking-[0.2em] mb-3 font-semibold uppercase">
              {year}
            </span>
            <h2 className="text-[22px] leading-snug text-gray-900 tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
              {mainTitle}
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-xl shrink-0"
          >
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="flex-1 flex items-center h-6 gap-[3px] overflow-hidden px-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const baseHeight = 20 + Math.random() * 30;
                return (
                  <motion.div 
                    key={i}
                    animate={isPlaying ? {
                      height: [`${baseHeight}%`, `${Math.random() * 60 + 40}%`, `${baseHeight}%`]
                    } : { height: '15%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.4 + Math.random() * 0.4,
                      ease: "easeInOut"
                    }}
                    className="w-[2px] bg-gray-800/80 rounded-full"
                  />
                )
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-h-[30vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <p className="text-[14px] leading-[1.8] text-gray-800 font-light tracking-wide text-justify selection:bg-red-900/20">
              {node.content}
            </p>
          </motion.div>

          {/* Navigate to Community Action */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={() => {
              onClose();
              onNavigate('community');
            }}
            className="mt-2 flex items-center justify-center gap-2 py-3.5 bg-gray-900/5 hover:bg-gray-900/10 rounded-2xl text-gray-800 text-[11px] uppercase tracking-widest font-medium transition-colors border border-gray-900/10 shrink-0"
          >
            <MessageCircle size={14} className="opacity-80" />
            Join the Resonance
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
