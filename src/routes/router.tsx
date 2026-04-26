import { createBrowserRouter } from 'react-router';
import App from '../App';
import AllBooks from '../pages/AllBooks';
import BorrowSummary from '../pages/BorrowSummary';
import AddBook from '../pages/AddBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AllBooks />,
      },
      {
        path: '/all_books',
        element: <AllBooks />,
      },
      {
        path: '/borrowed',
        element: <BorrowSummary />,
      },
      {
        path: '/add_book',
        element: <AddBook />,
      },
    ],
  },
]);
export default router;