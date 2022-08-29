import React from 'react';
import plus from '../../assets/icons/plus.svg';
import cart_check from '../../assets/icons/cart-check.svg';
import heart_active from '../../assets/icons/heart-active.svg';
import heart from '../../assets/icons/favorites.svg';
import { IContext, ObjType } from '../types/types';
import AppContext from '../../context';

export const CartItem: React.FC<PropsType> = ({
  id,
  image,
  name,
  price,
  onClickForPlus,
  onClickFavorite,
  favorite = false,
}) => {
  const { checkItemCartAdded }: IContext =
    React.useContext<React.ContextType<typeof AppContext>>(AppContext);

  const [isFavorite, setIsFavorite] = React.useState<boolean>(favorite);

  const handleCheckCart = () => {
    onClickForPlus({ id, parentId: id, image, name, price });
  };

  const handleIsFavorite = () => {
    setIsFavorite(!isFavorite);
    onClickFavorite({ id, image, name, price });
  };

  return (
    <div className="shop-row__columns">
      <div className="shop-row__item">
        <div className="shop-row__item-img">
          <img src={image} alt="" />

          <div className="shop-row__item-img-favorite" onClick={handleIsFavorite}>
            <img src={isFavorite ? heart_active : heart} alt="" />
          </div>
        </div>

        <div className="shop-row__item-name">
          <span>{name}</span>
        </div>
        <div className="shop-row__item-info">
          <div className="shop-row__item-price">
            <p>Цена</p>
            <span>{price} &#8381;</span>
          </div>
          <button className="shop-row__item-add">
            <img
              onClick={handleCheckCart}
              // src={plus}
              src={checkItemCartAdded(id) ? cart_check : plus}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

type PropsType = {
  id: number;
  image: string;
  name: string;
  price: number;
  onClickForPlus: (obj: ObjType) => void;
  onClickFavorite: (obj: ObjType) => void;
  favorite: boolean;
  parentId?: number;
};
