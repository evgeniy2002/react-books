
export type ObjType = {
  id: number,
  name: string,
  price: number,
  image: string
  parentId?: number
}
export type BooksType = {
  category: number;
  name: string;
  price: number;
  image: string;
};

export type IContext = {
  favoriteItems?: ObjType[] | undefined;
  books?: ObjType[] | undefined
  cartItems?: ObjType[] | undefined
  checkItemCartAdded?: any
};
