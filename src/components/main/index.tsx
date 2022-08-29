import React from 'react';
import bookBackground from '../../assets/book-main.jpg';

export const Main: React.FC = React.memo(() => {
  return (
    <div className="main">
      <div className="main-title">
        <p>Добро пожаловать</p>
        на <span className="main-title-span1">BOOK</span>
        <span className="main-title-span2">Shop</span>
      </div>
      <div className="main-img ibg">
        <img src={bookBackground} alt="" />
      </div>
    </div>
  );
});
