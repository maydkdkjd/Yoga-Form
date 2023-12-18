function completePayment(userData) {
    // Simulate a random outcome (success or failure)
    const isPaymentSuccessful = Math.random() < 0.9;
    const delay = Math.random() * 1700;
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isPaymentSuccessful) {
          resolve({ success: true, message: 'Payment successful' });
        } else {
          reject({ success: false, message: 'Payment failed' });
        }
      }, delay);
    });
  }

 
module.exports = completePayment