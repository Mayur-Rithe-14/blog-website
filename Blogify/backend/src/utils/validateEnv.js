const requiredEnvVariables = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIENT_URL",
];

const validateEnv = () => {
  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
};

export default validateEnv;
