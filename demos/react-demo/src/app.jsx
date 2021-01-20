import React, { useEffect } from 'react';
import { Store, StoreContext, StoreProvider } from '@mile-hi-labs/react-data';
import { SessionProvider } from '@mile-hi-labs/react-session';
import { ToastProvider } from 'contexts/toast-context';
import * as Adapters from 'adapters';
import * as Serializers from 'serializers';
import * as Models from 'models';
import Router from 'router';

const apiDomain = 'https://library-api.milehilabs.dev';
const store = new Store({ apiDomain: apiDomain, adapters: Adapters, serializers: Serializers, models: Models });

const App = (props) => {

  // Render
  return (
    <StoreProvider context={store}>
    	<SessionProvider store={store}>
      	<ToastProvider>
        	<Router />
      	</ToastProvider>
    	</SessionProvider>
    </StoreProvider>
  );
}

export default App;
