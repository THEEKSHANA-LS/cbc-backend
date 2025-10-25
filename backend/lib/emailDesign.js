// --- Header ---
function emailHeader(title) {
    return `
      <div style="background-color: #FF9013; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">${title}</h1>
      </div>
    `;
  }
  
  // --- Body ---
  function emailBody(message, otp) {
    return `
      <div style="padding: 30px; text-align: center; color: #334443;">
        <p style="font-size: 16px;">${message}</p>
        <div style="margin: 30px 0;">
          <span style="display: inline-block; background-color: #FF9013; color: white; font-size: 24px; font-weight: bold; padding: 15px 25px; border-radius: 8px;">${otp}</span>
        </div>
        <p style="font-size: 14px;">If you did not request this, please ignore this email.</p>
      </div>
    `;
  }
  
  // --- Footer ---
  function emailFooter(companyName) {
    return `
      <div style="background-color: #334443; color: white; text-align: center; padding: 15px; font-size: 12px;">
        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
      </div>
    `;
  }
  
  // --- Full Email ---
  export default function generateOtpEmail(otp) {
    const header = emailHeader("Reset Your Password");
    const body = emailBody("You requested to reset your password. Use the OTP below to proceed. This OTP is valid for 10 minutes only.", otp);
    const footer = emailFooter("Your Company Name");
  
    return `
      <div style="font-family: Arial, sans-serif; background-color: #FFF7DD; padding: 30px; color: #334443;">
        <div style="max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          ${header}
          ${body}
          ${footer}
        </div>
      </div>
    `;
  }
  