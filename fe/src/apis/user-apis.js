import LibraryBackend from "../apis/backendApi";

export const loginUser = async ({ email, password }) => {
  const { data } = await LibraryBackend.post("/user/login", {
    email,
    password,
  });
  return data;
};

export const signUpUser = async (userData) => {
  const { data } = await LibraryBackend.post("/user/signup", userData);
  return data;
};

export const logoutUser = async () => {
  const response = await LibraryBackend.get("/user/logout");
  return response;
};

export const getStudents = async () => {
  const { data } = await LibraryBackend.get("/user/get-students");
  return data;
};
