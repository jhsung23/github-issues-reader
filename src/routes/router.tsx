import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { Error, Fallback } from '@/components/common';
import { IssueDetailPage, IssuePage } from '@/pages';
import { logError } from '@/utils';

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
        element: (
          <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
            <IssueDetailPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

export default router;
