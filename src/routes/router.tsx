import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { Error } from '@/components/common';
import { IssueDetailPage, IssuePage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <IssuePage />,
      },
      {
        path: 'issues/:id',
        element: <IssueDetailPage />,
      },
    ],
  },
]);

export default router;
