'use client';

import { useRef, useState } from 'react';

export default function Home() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noMoved, setNoMoved] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const padding = 16;

  const handleNoHover = () => {
    if (!noClicked) return;

    const card = cardRef.current;
    const button = noButtonRef.current;
    if (!button || !card) return;

    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;
    const buttonW = button.offsetWidth || 100;
    const buttonH = button.offsetHeight || 44;
    const maxX = Math.max(padding, cardWidth - buttonW - padding);
    const maxY = Math.max(padding, cardHeight - buttonH - padding);

    const nextX = padding + Math.random() * (maxX - padding);
    const nextY = padding + Math.random() * (maxY - padding);

    if (!noMoved) {
      const currentX = Math.min(maxX, Math.max(padding, button.offsetLeft));
      const currentY = Math.min(maxY, Math.max(padding, button.offsetTop));
      setNoPosition({ x: currentX, y: currentY });
      setNoMoved(true);

      requestAnimationFrame(() => {
        setNoPosition({ x: nextX, y: nextY });
      });
      return;
    }

    setNoPosition({ x: nextX, y: nextY });
  };

  const handleNoClick = () => {
    setNoClicked(true);
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>💜</div>
      <div className="absolute top-32 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</div>
      <div className="absolute bottom-32 left-20 text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
      <div className="absolute bottom-20 right-10 text-6xl animate-bounce" style={{ animationDelay: '0.6s' }}>💖</div>

      <div className="flex justify-center items-center h-screen p-4">
        <div
          ref={cardRef}
          className={`relative bg-white rounded-3xl shadow-2xl p-24 max-w-2xl w-full transform transition-all duration-500 ${yesClicked ? 'scale-105' : 'hover:scale-105'}`}
        >

          <div className="flex justify-center gap-2 mb-6 text-3xl">
            <span className="animate-pulse">💗</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>💖</span>
          </div>


          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-4 animate-in fade-in duration-1000 whitespace-nowrap">
            Moja milovaná Tereska
          </div>

          {!yesClicked && (
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent font-semibold">
                Budeš mojou Valentínkou?
              </p>
            </div>
          )}
          {yesClicked ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 animate-bounce">🎉</div>
              <img src="https://i.pinimg.com/originals/6a/01/89/6a01896c58e0585369d0d4fd0e41fb6a.gif" alt="Heart Animation" className="mx-auto mb-4" />
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Ešte že! Milujem ťa, Teresička a teším sa na La Haciendu! 
              </p>
            </div>
          ) : (
            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={handleYesClick}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg text-lg"
              >
                Áno ❤️
              </button>
              <button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
                style={noMoved ? {
                  position: 'absolute',
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  zIndex: 50,
                } : undefined}
                className={`${noMoved ? '' : 'flex-1'} bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg text-lg`}
              >
                {noClicked ? 'Prečo to vôbec skúšaš?' : 'Nie'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
