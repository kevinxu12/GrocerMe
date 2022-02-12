/**
 * @file Mail helpers
 * @author Kevin Xu
 */
/**
 * Generate options for an acceptance email
 *
 * @param {string} email the email receiving the acceptance message
 * @returns {Object} Options object
 */
export const generateAcceptanceEmailOptions = (email: string) => ({
  to: email,
  subject: 'Your Supplier Request has been Accepted',
  text: 'Congrats, you are accepted',
});
