import React from 'react';
import { CartItem } from '../components/CartItem/CartItem';
import { IContext, ObjType } from '../components/types/types';
import AppContext from '../context';

export const Favorites: React.FC<PropsType> = ({ onClickForItem, onClickForFavorite, search }) => {
  const { favoriteItems }: IContext =
    React.useContext<React.ContextType<typeof AppContext>>(AppContext);

  return (
    <div className="favorite">
      <h1>Мои закладки</h1>
      <div className="favorite__row">
        {favoriteItems &&
          favoriteItems
            .filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <CartItem
                {...item}
                onClickForPlus={onClickForItem}
                onClickFavorite={onClickForFavorite}
                favorite={true}
              />
            ))}
      </div>
    </div>
  );
};

type PropsType = {
  onClickForItem: (obj: ObjType) => void;
  onClickForFavorite: (obj: ObjType) => void;
  search: string;
};
