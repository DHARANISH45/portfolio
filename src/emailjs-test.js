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
}
