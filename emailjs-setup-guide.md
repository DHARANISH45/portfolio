# EmailJS Troubleshooting Guide for Portfolio Contact Form

## Current Configuration

Your contact form is currently configured with these EmailJS parameters:

- **Service ID:** `service_njarydg`
- **Template ID:** `template_xuzthgo`
- **Public Key:** `xbsKln-p-eEju1bh1`

## Common Issues and Solutions

### 1. Verify Your EmailJS Dashboard Settings

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Check that your service, template, and public key match the values in your code
3. Make sure your EmailJS account is active and verified

### 2. Check Template Variables

Your EmailJS template must contain these **exact** variables:
- `{{from_name}}` - For the sender's name
- `{{reply_to}}` - For the sender's email address
- `{{message}}` - For the message content

### 3. Debug Network Issues

1. Open browser developer tools (F12) and go to the Network tab
2. Fill in the contact form and submit
3. Look for the EmailJS API call (to api.emailjs.com)
4. Check the response status and error details

### 4. Common EmailJS Error Causes

- **Account limits:** Free tier has 200 emails/month
- **Invalid credentials:** Double-check service ID, template ID, and public key
- **CORS issues:** Some content blockers may interfere with EmailJS
- **Template mismatch:** Variables in code don't match template variables
- **Service connection issues:** Email service may need re-authentication

### 5. JavaScript Console Errors

Check your browser console for specific error messages from EmailJS:
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Look for any red error messages when submitting the form

## Updated Implementation

The current implementation uses:

```jsx
// Initializing EmailJS
useEffect(() => {
  emailjs.init('xbsKln-p-eEju1bh1');
}, []);

// Sending email with form submission
emailjs.sendForm(
  'service_njarydg',
  'template_xuzthgo',
  formRef.current,
  'xbsKln-p-eEju1bh1'
)
```

## Input Fields Configuration

Your form input fields MUST have these specific name attributes:
- `name="from_name"` for the name input
- `name="reply_to"` for the email input
- `name="message"` for the message textarea
  'YOUR_PUBLIC_KEY' // Replace with your actual public key
)
```

3. Replace all three instances with your actual values from your EmailJS account

## Testing Your Form

Once you've completed the setup:

1. Run your development server (`npm run dev`)
2. Navigate to your contact form
3. Fill out the form and submit
4. You should see the success message if everything is configured correctly
5. Check your inbox for the received email

## Testing EmailJS Directly

For troubleshooting, try this direct method to test EmailJS outside of your React component:

```javascript
// In browser console or a separate test file
emailjs.init('xbsKln-p-eEju1bh1');

emailjs.send(
  'service_njarydg',
  'template_xuzthgo',
  {
    from_name: 'Test User',
    reply_to: 'test@example.com',
    message: 'This is a test message'
  },
  'xbsKln-p-eEju1bh1'
).then(
  response => console.log('SUCCESS!', response.status, response.text),
  error => console.log('FAILED...', error)
);
```

## Alternative Implementation with Direct API

If you're still experiencing issues, try this alternate approach:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  const errors = validateForm();
  setFormErrors(errors);
  
  if (Object.keys(errors).length === 0) {
    setIsSubmitting(true);
    
    try {
      // Direct API call to EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'service_njarydg',
          template_id: 'template_xuzthgo',
          user_id: 'xbsKln-p-eEju1bh1',
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message
          }
        })
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setFormErrors({ 
        submit: "Failed to send message. Please try again or contact directly via email."
      });
    }
  }
};
```

## Final Checklist

- [ ] Verified EmailJS account status (active/verified)
- [ ] Confirmed all three credentials (service ID, template ID, public key)
- [ ] Checked template variables match form field names
- [ ] Tested with direct EmailJS API call
- [ ] Checked browser console for specific errors
- [ ] Verified CORS is not being blocked
- [ ] Checked monthly email quota hasn't been exceeded

Need more help? Visit [EmailJS documentation](https://www.emailjs.com/docs/) for detailed guides.
