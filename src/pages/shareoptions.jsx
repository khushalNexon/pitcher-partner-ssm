import { Helmet } from 'react-helmet-async';

import { ShareOptionsView } from 'src/sections/shareoptions';

// ----------------------------------------------------------------------

export default function ShareOptionsPage() {
  return (
    <>
      <Helmet>
        <title>ShareOptionsPage</title>
      </Helmet>
      <ShareOptionsView />
    </>
  );
}
