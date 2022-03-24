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

/**
 * Generates option for an item acceptance email
 *
 * @param {string} email the email receiving the item acceptance message
 * @param {string} title The title of the item request product
 * @returns {Object} Options object
 */
export const generateItemAcceptanceEmailOptions = (email: string, title: string) => ({
  to: email,
  subject: `Your Item Request has been Accepted`,
  text: `Congrats, your request to sell ${title} has been accepted`,
});
