/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Ignorar archivos de prueba de pdf-parse
      config.resolve.alias = {
        ...config.resolve.alias,
        'canvas': false,
      };
    }
    
    // Ignorar módulos problemáticos durante el build
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;
