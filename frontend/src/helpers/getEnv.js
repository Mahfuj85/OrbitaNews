export const getEnv = (envName) => {
  const env = import.meta.env;
  return env[envName];
};
