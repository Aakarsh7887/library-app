import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signUpScreen';
import HomeScreen from './screens/homeScreeen';
import AddBookForm from './screens/addBookForm';
import BookScreen from './screens/bookScreen';
import IssueBook from './screens/bookIssueForm';
import IssuedBooks from './screens/issuedBooks';

const router = createBrowserRouter([
  {path: "/login", element: <LoginScreen />},
  {path: "/signup", element: <SignupScreen />},
  {path: "/", element: <HomeScreen />},
  {path: "/add-book", element: <AddBookForm />},
  {path: "/books", element: <BookScreen/>},
  {path:"/issue-book", element: <IssueBook/>},
  {path:"/issued-book-list",element: <IssuedBooks/>},
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
