import { Helmet } from 'react-helmet-async';

import ClientsPage from 'src/sections/clients/view/clients-view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Client </title>
      </Helmet>

      <ClientsPage />
    </>
  );
}
