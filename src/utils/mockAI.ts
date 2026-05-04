export const simulateAIClassification = async (file: File | null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a random classification to simulate AI processing
      const types = ['Metal', 'Plastic', 'Chemical', 'Organic'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const confidence = (Math.random() * (0.99 - 0.85) + 0.85).toFixed(2);
      
      resolve({
        type: randomType,
        confidenceScore: parseFloat(confidence),
        suggestedPrice: Math.floor(Math.random() * 2000) + 100
      });
    }, 2500); // 2.5s delay for effect
  });
};

export const simulateAdaptiveLearning = async (correction: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
