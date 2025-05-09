// Package Imports
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

// Component Imports
import Buttons from './Buttons';
import Dropdown from './Dropdown';
import Calendar from './Calendar';

// Consts
const defaultCurInteractives = { type: '' };

// Component
const Interactives = ({ manager, messageList, channelSid }) => {
  console.log(manager, messageList, channelSid)
  // Refs
  const interactivesContainer = useRef(null);

  const [curInteractives, setCurInteractives] = useState(
    defaultCurInteractives
  );

  // Effects
  useEffect(() => {
    if (
      messageList.length > 0 &&
      !messageList[messageList.length - 1].isFromMe &&
      messageList[messageList.length - 1].source.state.attributes
        .interactiveWebchatOptions
    ) {
      const lastMessageAttributes =
        messageList[messageList.length - 1].source.state.attributes
          .interactiveWebchatOptions;
      setCurInteractives(lastMessageAttributes);
    } else {
      setCurInteractives(defaultCurInteractives);
    }
  }, [messageList]);

  useEffect(() => {
    if (curInteractives !== defaultCurInteractives) {
      interactivesContainer.current.scrollIntoView();
    }
  }, [curInteractives]);

  // Functions
  const sendMessage = async (message) => {
    const curChannel = await manager.chatClient.getChannelBySid(channelSid);
    curChannel.sendMessage(message);
  };

  // Render
  return (
    <>
      {curInteractives !== defaultCurInteractives ? (
        <div ref={interactivesContainer}>
          {curInteractives.type === 'buttons' ? (
            <Buttons
              curInteractives={curInteractives}
              sendMessage={sendMessage}
            />
          ) : curInteractives.type === 'dropdown' ? (
            <Dropdown
              curInteractives={curInteractives}
              sendMessage={sendMessage}
            />
          ) : curInteractives.type === 'calendar' ? (
            <Calendar
              curInteractives={curInteractives}
              sendMessage={sendMessage}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

// Redux
const mapStateToProps = (state) => {
  return {
    messageList:
      state.flex.chat.channels[state.flex.session.channelSid].messages,
    channelSid: state.flex.session.channelSid,
  };
};

export default connect(mapStateToProps)(Interactives);