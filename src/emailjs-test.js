// Test file for EmailJS configuration
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('xbsKln-p-eEju1bh1');

// Test function to send an email
export function testEmailSend() {
  return emailjs.send(
    'service_njarydg',
    'template_xuzthgo',
    {
      from_name: 'Test User',
      reply_to: 'test@example.com',
      message: 'This is a test message from the EmailJS test script'
    }
  );
}

// Log any errors during initialization
if (typeof window !== 'undefined') {
  console.log('EmailJS initialization complete');
  
  // Make the helper functions available in the browser console for debugging
  window.testEmailSend = testEmailSend;
  window.checkEmailJSAccount = checkEmailJSAccount;
  
  // Add a console message for users
  console.log('%c EmailJS Debug Tools Available:', 'background: #333; color: #bada55; font-size: 14px; padding: 5px;');
  console.log('%c Use window.checkEmailJSAccount() to test your EmailJS account', 'color: #bada55');
  console.log('%c Use window.testEmailSend() to test sending an email', 'color: #bada55');
}

// Advanced debugging function to test if an account exists
export function checkEmailJSAccount(publicKey) {
  const key = publicKey || 'xbsKln-p-eEju1bh1'; // Use provided key or default
  
  console.log('Checking EmailJS account with key:', key);
  
  return emailjs.listServices(key)
    .then(response => {
      console.log('Account exists! Available services:', response);
      return {
        accountExists: true,
        services: response.services || [],
        message: 'EmailJS account is valid'
      };
    })
    .catch(error => {
      console.error('Error checking EmailJS account:', error);
      const isAccountNotFound = error.text && error.text.includes('Account not found');
      
      return {
        accountExists: false,
        error,
        message: isAccountNotFound ? 
          'Account not found. Please verify your public key or create a new EmailJS account.' :
          'Error verifying EmailJS account. See console for details.'
      };
    });
}
