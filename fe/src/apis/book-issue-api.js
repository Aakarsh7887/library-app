import LibraryBackend from "../apis/backendApi";

export const addNewIssue = async (book) => {
  const { data } = await LibraryBackend.post("/book-issue/issued", { ...book });
  return data;
};

export const getIssuedList = async (status = "ISSUED") => {
  const { data } = await LibraryBackend.get("/book-issue/issuedlistall", { params: {status} });
  return data;
};
export const getIssuedListForStudent = async (status = "ISSUED") => {
  const { data } = await LibraryBackend.get("/book-issue/issuedlist", { params: {status} });
  return data;
};