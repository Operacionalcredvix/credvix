/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Adicione a seção de cores aqui
      colors: {
        'credvix-orange': '#F37021',
        'help-purple': '#000000', // No seu CSS estava como preto
      },
    },
  },
  plugins: [],
};
export default config;