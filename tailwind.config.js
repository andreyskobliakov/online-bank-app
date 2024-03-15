module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'card-blue-start': '#36D1DC',
        'card-blue-end': '#5B86E5',
        'card-gold-start': '#CDAF75',
        'card-gold-middle': '#E8CA9E',
        'card-gold-end': '#D3A273',
        'card-credit-start': '#BE5869',
        'card-credit-end': '#403A3E',
      },
      backgroundImage: theme => ({
         'card-blue-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
         'card-gold-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
         'card-credit-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      }),
      gradientColorStops: theme => theme('colors'),
    },
  },
  variants: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["cupcake", "dark", "night"],
  },
}
