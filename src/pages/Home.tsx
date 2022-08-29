import axios from 'axios';
import React from 'react';
import { Main } from '../components/main';
import { Shop } from '../components/shop';
import { ObjType } from '../components/types/types';

type PropsType = {
  setCartItems: (data: ObjType[]) => void;
  setFavoriteItems: (data: ObjType[]) => void;
  search: string;
  books: ObjType[];
  setBooks: (obj: ObjType[]) => void;
  onAddTofavorites: (data: ObjType) => void;
  addToCart: (data: ObjType) => void;
  cartItems: ObjType[];
};

export const Home: React.FC<PropsType> = ({
  search,
  onAddTofavorites,
  addToCart,
  books,
  setBooks,
}) => {
  const [categoryId, setCategoryId] = React.useState<number>(0);

  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    (async () => {
      try {
        let { data } = await axios.get(
          `https://63070c4c3a2114bac7586bf6.mockapi.io/books?page=${page}&limit=5&${category}`,
        );
        setBooks(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, categoryId]);

  return (
    <div>
      <Main />
      <Shop
        onClickForItem={(obj: ObjType) => addToCart(obj)}
        onClickForFavorite={(obj: ObjType) => onAddTofavorites(obj)}
        categoryId={categoryId}
        books={books}
        isLoading={isLoading}
        page={page}
        setCategoryId={setCategoryId}
        setPage={setPage}
        search={search}
      />
    </div>
  );
};
