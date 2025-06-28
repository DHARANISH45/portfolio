// EmailJS Diagnostic Utility
// Run this file directly in Node.js or call the diagnostic function from your app

import emailjs from '@emailjs/browser';

// EmailJS Credentials from your app
const SERVICE_ID = 'service_njarydg';
const TEMPLATE_ID = 'template_xuzthgo';
const PUBLIC_KEY = 'xbsKln-p-eEju1bh1';

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(PUBLIC_KEY);
}

async function runEmailJSDiagnostics() {
  console.log('=== EmailJS Diagnostic Tool ===');
  console.log('Running diagnostics for your EmailJS setup...\n');
  
  // 1. Check credentials format
  console.log('1. Credential Format Check:');
  if (!SERVICE_ID.startsWith('service_')) {
    console.error('❌ Service ID format appears incorrect. Should start with "service_"');
  } else {
    console.log('✅ Service ID format appears correct');
  }
  
  if (!TEMPLATE_ID.startsWith('template_')) {
    console.error('❌ Template ID format appears incorrect. Should start with "template_"');
  } else {
    console.log('✅ Template ID format appears correct');
  }
  
  if (PUBLIC_KEY.length < 10) {
    console.error('❌ Public Key appears too short or invalid');
  } else {
    console.log('✅ Public Key length appears valid');
  }
  
  console.log('\n2. Testing API Connection:');
  try {
    // Send a test email using direct API method
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: 'Diagnostic Test',
        reply_to: 'diagnostic@test.com',
        message: 'This is an automated diagnostic test from the EmailJS diagnostic utility'
      },
      PUBLIC_KEY
    );
    
    console.log('✅ API Connection Successful!');
    console.log(`✅ Response Status: ${response.status}`);
    console.log(`✅ Response Text: ${response.text}`);
    
  } catch (error) {
    console.error('❌ API Connection Failed');
    console.error('Error details:', error);
    
    // Provide specific error analysis
    if (error.text && error.text.includes('invalid service ID')) {
      console.error('❌ The service ID appears to be invalid or not found in your account');
    }
    if (error.text && error.text.includes('invalid template ID')) {
      console.error('❌ The template ID appears to be invalid or not found in your account');
    }
    if (error.text && error.text.includes('invalid user ID')) {
      console.error('❌ The public key appears to be invalid');
    }
  }
  
  console.log('\n=== Diagnostic Complete ===');
  console.log('Check the results above to troubleshoot your EmailJS connection');
}

// Auto-run diagnostics if this file is run directly
if (typeof window !== 'undefined' && document.getElementById('run-diagnostics')) {
  runEmailJSDiagnostics();
}

export { runEmailJSDiagnostics };
