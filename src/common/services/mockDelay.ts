/**
 * Used to mock a delay in response time for tests
 */
export const mockDelay = async (customDuration?: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, customDuration || 500);
  });
};
