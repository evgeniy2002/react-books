import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContext from '../context';
import { Favorites } from '../pages/Favorites';
import { Home } from '../pages/Home';
import { Drawer } from './Drawer/Drawer';
import { Header } from './header';
import { IContext, ObjType } from './types/types';

export const AppRouter: React.FC = (): React.ReactElement => {
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);
  const [books, setBooks] = React.useState<ObjType[]>([]);
  const [cartItems, setCartItems] = React.useState<ObjType[]>([]);
  const [favoriteItems, setFavoriteItems] = React.useState<ObjType[]>([]);
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponce, favoriteResponce, booksResponce] = await Promise.all([
          axios.get('https://63070c4c3a2114bac7586bf6.mockapi.io/cart'),
          axios.get('https://63070c4c3a2114bac7586bf6.mockapi.io/favorites'),
          axios.get('https://63070c4c3a2114bac7586bf6.mockapi.io/books'),
        ]);

        setCartItems(cartResponce.data);
        setBooks(booksResponce.data);
        setFavoriteItems(favoriteResponce.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  const addToCart = async (obj: ObjType) => {
    try {
      const findItem = cartItems.find((el) => Number(el.parentId) === Number(obj.id));

      if (findItem) {
        setCartItems((prev) => prev.filter((el) => Number(el.parentId) !== Number(obj.id)));
        await axios.delete('https://63070c4c3a2114bac7586bf6.mockapi.io/cart/' + findItem.id);
      } else {
        let { data } = await axios.post('https://63070c4c3a2114bac7586bf6.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(error);
    }
  };
  const onDeleteItem = async (id: number) => {
    try {
      await axios.delete('https://63070c4c3a2114bac7586bf6.mockapi.io/cart/' + id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error);
    }
  };
  const onAddTofavorites = async (obj: ObjType) => {
    try {
      if (favoriteItems.find((el) => el.id === obj.id)) {
        axios.delete('https://63070c4c3a2114bac7586bf6.mockapi.io/favorites/' + obj.id);
        // setFavoriteItems((prev) => prev.filter((el) => el.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://63070c4c3a2114bac7586bf6.mockapi.io/favorites',
          obj,
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(error);
    }
  };
  const checkItemCartAdded = (id: number) => {
    return cartItems.some((el) => Number(el.parentId) === Number(id));
  };

  const context: IContext = { books, cartItems, favoriteItems, checkItemCartAdded };

  return (
    // <div className="wrapper">
    <AppContext.Provider value={context}>
      <>
        <Drawer
          onClickCart={() => setCartOpened(false)}
          items={cartItems}
          cartOpened={cartOpened}
          onRemoveItem={onDeleteItem}
        />

        <div className="container">
          <Header
            onClickCart={() => setCartOpened(true)}
            search={search}
            setSearch={setSearch}
            cartItems={cartItems}
            favoriteItems={favoriteItems}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setCartItems={setCartItems}
                  setFavoriteItems={setFavoriteItems}
                  search={search}
                  onAddTofavorites={onAddTofavorites}
                  addToCart={addToCart}
                  cartItems={cartItems}
                  books={books}
                  setBooks={setBooks}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  search={search}
                  onClickForItem={(obj: ObjType) => addToCart(obj)}
                  onClickForFavorite={(obj: ObjType) => onAddTofavorites(obj)}
                />
              }
            />
          </Routes>
        </div>
      </>
    </AppContext.Provider>
    // </div>
  );
};
