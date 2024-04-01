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
        'card-premium-start': '#4776E6',
        'card-premium-end': '#8E54E9',
        'card-red-start': '#C84E89',
        'card-red-end': '#F15F79',
       
      },
      backgroundImage: _theme => ({
        'card-blue-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'card-red-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'card-premium-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',


      }),
      gradientColorStops: theme => theme('colors'),
    },
  },
  variants: {},
  plugins: [],
}
