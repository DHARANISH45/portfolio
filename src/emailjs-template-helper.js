// EmailJS Template Helper for debugging template issues

/**
 * Debugging tool to help diagnose issues with EmailJS templates
 * and parameter matching
 */

// This function exports a sample template that works well with the Contact.jsx implementation
export function getRecommendedTemplate() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4a5568;
      color: white;
      padding: 15px 20px;
      border-radius: 5px 5px 0 0;
    }
    .content {
      border: 1px solid #e2e8f0;
      border-top: none;
      padding: 20px;
      border-radius: 0 0 5px 5px;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
    .message-content {
      background-color: #f7fafc;
      padding: 15px;
      border-radius: 5px;
      border-left: 3px solid #4a5568;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.8em;
      color: #718096;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Contact Form Submission</h2>
  </div>
  
  <div class="content">
    <div class="field">
      <span class="label">Name:</span>
      {{from_name}}
    </div>
    
    <div class="field">
      <span class="label">Email:</span>
      <a href="mailto:{{reply_to}}">{{reply_to}}</a>
    </div>
    
    <div class="field">
      <span class="label">Message:</span>
      <div class="message-content">
        {{message}}
      </div>
    </div>
    
    <div class="field">
      <span class="label">Timestamp:</span>
      {{timestamp}}
    </div>
  </div>
  
  <div class="footer">
    <p>This message was sent from your portfolio website contact form.</p>
  </div>
</body>
</html>
  `;
}

// This function helps validate the parameters sent to EmailJS
export function validateTemplateParams(params) {
  const requiredFields = ['from_name', 'reply_to', 'message'];
  const missingFields = requiredFields.filter(field => !params[field]);
  
  const result = {
    valid: missingFields.length === 0,
    missingFields,
    params,
    issues: []
  };
  
  // Check for empty values
  Object.entries(params).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      result.issues.push(`Field "${key}" has empty value`);
    }
  });
  
  return result;
}

// For browser console debugging
if (typeof window !== 'undefined') {
  window.emailjsTemplateHelper = {
    getRecommendedTemplate,
    validateTemplateParams,
    checkTemplateCompatibility: (params) => {
      console.log('Checking template compatibility with params:', params);
      const validation = validateTemplateParams(params);
      console.log('Validation result:', validation);
      
      if (!validation.valid) {
        console.error(`Missing required fields: ${validation.missingFields.join(', ')}`);
      }
      
      if (validation.issues.length > 0) {
        console.warn('Template parameter issues:', validation.issues);
      }
      
      return validation;
    }
  };
  
  console.log('%c EmailJS Template Helper Available:', 'background: #333; color: #bada55; font-size: 14px; padding: 5px;');
  console.log('%c Use window.emailjsTemplateHelper.getRecommendedTemplate() to get HTML template', 'color: #bada55');
  console.log('%c Use window.emailjsTemplateHelper.checkTemplateCompatibility(params) to validate params', 'color: #bada55');
}
