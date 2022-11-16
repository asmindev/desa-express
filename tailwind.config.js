/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ejs}'],
    theme: {
        extend: {
            fontFamily: {
                'open-sans': ['Open Sans', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    // eslint-disable-next-line global-require
    plugins: [require('daisyui')],
}
