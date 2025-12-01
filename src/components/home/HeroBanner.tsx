'use client';

import { useState, useEffect } from 'react';

const bannerImages = [
  {
    id: 1,
    src: '/images/banner/shengmingshubanner.jpg',
    title: 'BORN TO BE ALIVE',
    subtitle: '生命树',
    tag: 'UPCOMING',
    desc: '在青海高原的生命之树下，谱写一段关于信仰与爱的传奇故事',
  },
  {
    id: 2,
    src: '/images/brands/valentino.jpg',
    title: 'VALENTINO AMBASSADOR',
    subtitle: '品牌代言人 · 时尚',
    tag: 'FASHION',
    desc: '诠释现代女性力量与优雅，展现多面时尚表现力',
  },
  {
    id: 3,
    src: '/images/works/guosefanghua.jpg',
    title: 'FLOURISHED PEONY',
    subtitle: '国色芳华',
    tag: 'TOP DRAMA',
    desc: '百花齐放，盛世牡丹。何惟芳以花为媒，谱写传奇商业史',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid z-20 opacity-30 pointer-events-none" />

      {/* Images */}
      {bannerImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentIndex 
              ? 'opacity-100 scale-105' 
              : 'opacity-0 scale-100'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${image.src})`,
              filter: 'brightness(0.8) contrast(1.1)',
            }}
          />
        </div>
      ))}

      {/* Content Layer */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end pb-32 md:pb-20 px-4 sm:px-6 lg:px-16 pointer-events-none">
        <div className="max-w-5xl w-full mx-auto md:mx-0">
          {bannerImages.map((image, index) => (
            <div
              key={image.id}
              className={`transition-all duration-700 absolute bottom-32 md:bottom-40 left-4 md:left-16 right-4 md:right-16 ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple text-xs font-bold tracking-widest rounded backdrop-blur-md">
                  {image.tag}
                </span>
                <div className="h-[1px] w-20 bg-gradient-to-r from-neon-purple to-transparent" />
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 mb-2 tracking-tighter leading-none font-mono">
                {image.title}
              </h1>
              
              <h2 className="text-2xl md:text-4xl font-light text-white/90 mb-6 tracking-widest">
                {image.subtitle}
              </h2>
              
              <p className="max-w-xl text-base md:text-lg text-gray-400 leading-relaxed border-l-2 border-neon-purple pl-4 backdrop-blur-sm bg-black/30 p-2 rounded-r">
                {image.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-32 md:bottom-40 right-4 md:right-16 z-40 flex items-center space-x-6">
        {/* Slide Indicators */}
        <div className="flex items-center space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`group relative h-1 transition-all duration-300 ${
                index === currentIndex ? 'w-16 bg-neon-purple' : 'w-8 bg-gray-600 hover:bg-gray-400'
              }`}
            >
              <span className="absolute -top-4 left-0 opacity-0 group-hover:opacity-100 text-[10px] text-white transition-opacity">
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
        
        {/* Current Index Display */}
        <div className="hidden md:flex items-baseline space-x-1 font-mono text-white">
          <span className="text-4xl font-bold">0{currentIndex + 1}</span>
          <span className="text-xl text-gray-500">/ 0{bannerImages.length}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 animate-bounce hidden md:block">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-neon-purple to-transparent" />
      </div>
    </div>
  );
}
