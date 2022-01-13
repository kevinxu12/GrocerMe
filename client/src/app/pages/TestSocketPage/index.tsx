/**
 * @file A Testing Landing Page
 * @author Kevin Xu
 */
import React, { useContext, useEffect, useState } from 'react';
import { SocketAsyncWrapper, SocketContext } from 'utils/socket';

/**
 * @returns {React.FC} Login Page Component
 */
const TestSocketPage = () => {
  const socket = useContext(SocketContext);
  const [_, setTest] = useState<Object>({});
  useEffect(() => {
    /**
     * Test function to listen to a socket thats emitted
     */
    async function listen(): Promise<void> {
      const data: Object = await SocketAsyncWrapper(socket, 'test');
      await setTest(data);
      console.log(data);
    }
    listen();
  });
  return <div>Hi</div>;
};

export default TestSocketPage;
