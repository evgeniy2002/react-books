import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/book-logo.svg';
import cart from '../../assets/icons/cart.svg';
import favorites from '../../assets/icons/favorites.svg';
import { ObjType } from '../types/types';

export const Header: React.FC<PropsType> = React.memo(
  ({ onClickCart, search, setSearch, cartItems, favoriteItems }) => {
    React.useEffect(() => {
      ibg();
    }, []);

    const ibg = React.useCallback(() => {
      let ibg = document.querySelectorAll<HTMLElement>('.ibg');
      for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector<HTMLElement>('img')) {
          ibg[i].style.backgroundImage =
            'url(' + ibg[i].querySelector<HTMLElement>('img')?.getAttribute('src') + ')';
        }
      }
    }, []);
    return (
      <div className="header">
        <div className="header-row">
          <Link to="/" className="header-logo">
            <img src={logo} alt="" />
          </Link>
          <input
            type="search"
            className="header-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Я ищу..."
            autoCapitalize={'off'}
            autoComplete={'off'}
          />
          <div className="header-info">
            <Link to={'/favorites'} className="header-favorites">
              {favoriteItems.length ? (
                <span className="header-cart__count">{favoriteItems.length}</span>
              ) : null}
              <img src={favorites} alt="" />
            </Link>
            <div className="header-cart" onClick={onClickCart}>
              {cartItems.length ? (
                <span className="header-cart__count">{cartItems.length}</span>
              ) : null}

              <img src={cart} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

type PropsType = {
  onClickCart: () => void;
  search: string;
  setSearch: (str: string) => void;
  cartItems: ObjType[];
  favoriteItems: ObjType[];
};
