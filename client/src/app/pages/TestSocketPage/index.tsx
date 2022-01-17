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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTest] = useState<Object>({});
  useEffect(() => {
    /**
     * Test function to listen to a socket thats emitted
     */
    async function listen(): Promise<void> {
      const data = await SocketAsyncWrapper<Object>(socket, 'test');
      if (data) {
        await setTest(data);
      }
      console.log(data);
    }
    listen();
  });
  return <div>Hi</div>;
};

export default TestSocketPage;
