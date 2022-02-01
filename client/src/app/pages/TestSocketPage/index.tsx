/**
 * @file A Testing Page to demonstrate how socket might work
 * @author Kevin Xu
 */
import { useSocket } from 'context/SocketContext';
import React, { useEffect, useState } from 'react';

/**
 * Example handler for when a socket message is received
 *
 * @param {Object} payload payload passed by socket emit
 * @param {string[]} sampleList the current value of a state, based off of ref
 * @param {Function} setSampleList update the value of the state / ref
 */
const payloadHandler = (
  payload: any,
  sampleList: string[],
  setSampleList,
) => {};
/**
 * @returns {React.FC} Test component demonstrating how socket can work
 */
const TestSocketPage = () => {
  const socket = useSocket();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sampleList, setSampleList] = useState([]);
  const sampleListRef = React.useRef<string[]>(sampleList);
  React.useEffect(() => {
    // This effect executes on every render (no dependency array specified).
    // Any change to the "participants" state will trigger a re-render
    // which will then cause this effect to capture the current "participants"
    // value in "participantsRef.current".
    sampleListRef.current = sampleList;
  });

  useEffect(() => {
    /**
     * Example of a handler that works for this component
     *
     * @param {any} payload Payload sent from socket
     */
    const socketHandler = payload => {
      payloadHandler(payload, sampleListRef.current, setSampleList);
    };
    socket.on('test', socketHandler);
    return () => {
      socket.off('test', socketHandler);
    };
  });
  return <div>Hi</div>;
};

export default TestSocketPage;
