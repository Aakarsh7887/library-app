import LibraryBackend from "../apis/backendApi";

export const addBook = async (book) => {
  const { data } = await LibraryBackend.post("/book/add", { ...book });
  return data;
};

export const getAllBooks = async () => {
  const { data } = await LibraryBackend.get("/book/get-books");
  return data;
};
