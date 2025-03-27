import React from 'react';

const Loader = () => {
  const loaderStyle = {
    '--r1': '154%',
    '--r2': '68.5%',
    width: '60px',
    aspectRatio: '1',
    borderRadius: '50%',
    background: `
      radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, #269af2 80%),
      radial-gradient(var(--r1) var(--r2) at bottom, #269af2 79.5%, #0000 80%),
      radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, #269af2 80%),
      #ccc
    `,
    backgroundSize: '50.5% 220%',
    backgroundPosition: '-100% 0%, 0% 0%, 100% 0%',
    backgroundRepeat: 'no-repeat',
    animation: 'l9 2s infinite linear'
  };

  const keyframes = `
    @keyframes l9 {
      33%  {background-position: 0% 33%, 100% 33%, 200% 33%}
      66%  {background-position: -100% 66%, 0% 66%, 100% 66%}
      100% {background-position: 0% 100%, 100% 100%, 200% 100%}
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div className="loader" style={loaderStyle}></div>
    </>
  );
};

export default Loader;