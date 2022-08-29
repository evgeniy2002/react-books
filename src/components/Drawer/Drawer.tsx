import React from 'react';
import crest from '../../assets/icons/crest.svg';
import exit from '../../assets/icons/exit.svg';
import { ObjType } from '../types/types';

export const Drawer: React.FC<PropsType> = ({ onClickCart, items, onRemoveItem, cartOpened }) => {
  return (
    <div className={cartOpened ? 'overlay active' : 'overlay'}>
      <div className="cart__goods">
        <div className="cart__goods-header">
          <h2>Корзина</h2>
          <img src={exit} alt="" className="cart__goods-exit" onClick={onClickCart} />
        </div>
        {items.map((obj, index) => (
          <div className="cartItem" key={index}>
            <div className="cartItem__img">
              <img src={obj.image} alt="" />
            </div>
            <div className="cartItem__info">
              <p>{obj.name}</p>
              <b>{obj.price} &#8381;</b>
            </div>
            <img
              src={crest}
              alt=""
              className="cartItem__crest"
              onClick={() => onRemoveItem(obj.id)}
            />
          </div>
        ))}

        <a href="#" className="cartItem__pay">
          <span>Оформить заказ</span>
        </a>
      </div>
    </div>
  );
};

type PropsType = {
  onClickCart: () => void;
  items: ObjType[];
  onRemoveItem: (id: number) => void;
  cartOpened: boolean;
};
