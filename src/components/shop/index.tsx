import React from 'react';

import { CartItem } from '../CartItem/CartItem';
import { ObjType } from '../types/types';

const arr = ['Все книги', 'Для детей', 'Романтические', 'Сказки', 'Научные', 'Комиксы'];

type PropsType = {
  books: ObjType[];
  onClickForItem: (obj: ObjType) => void;
  onClickForFavorite: (obj: ObjType) => void;
  categoryId: number;
  isLoading: boolean;
  page: number;
  setCategoryId: (idx: number) => void;
  setPage: (idx: number) => void;
  search: string;
};

export const Shop: React.FC<PropsType> = ({
  onClickForItem,
  onClickForFavorite,
  categoryId,
  books,
  page,
  isLoading,
  setCategoryId,
  setPage,
  search,
}) => {
  return (
    <div className="shop">
      <ul className="shop-tags">
        {arr.map((item, index) => (
          <li
            key={index}
            className={categoryId === index ? 'active' : ''}
            onClick={() => setCategoryId(index)}>
            {item}
          </li>
        ))}
      </ul>
      <div className="shop-row">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          books
            .filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
            .map((obj) => (
              <CartItem
                onClickForPlus={onClickForItem}
                onClickFavorite={onClickForFavorite}
                {...obj}
                key={obj.id}
                favorite={false}
              />
            ))
        )}
      </div>

      <ul className="pagination">
        {[
          ...new Array(4).fill(0).map((_, i) => (
            <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
              {i + 1}
            </li>
          )),
        ]}
      </ul>
    </div>
  );
};
