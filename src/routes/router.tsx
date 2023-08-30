import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { IssuePage, IssueDetailPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
