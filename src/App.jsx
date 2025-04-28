// Package Imports
import React, { useState, useEffect, useCallback } from 'react';
import * as FlexWebChat from '@twilio/flex-webchat-ui';

// Component Imports
import Interactives from './components/Interactives';

// Component
const App = ({ configuration }) => {
  // State
  const [manager, setManager] = useState(null);

  // Functions
  const getManager = useCallback(async () => {
    // Init Flex Webchat Manager
    const manager = await FlexWebChat.Manager.create(configuration);
    // Append custom Interactives Component
    FlexWebChat.MessageList.Content.add(
      <Interactives
        key="interactives"
        manager={manager}
      />
    );
    // Set manager on state
    setManager(manager);
  }, [configuration]);

  // Effects
  useEffect(() => {
    getManager();
  }, [getManager]);


  // Render
  return (
    <>
      {manager ? (
        <FlexWebChat.ContextProvider manager={manager}>
          <FlexWebChat.RootContainer />
        </FlexWebChat.ContextProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;