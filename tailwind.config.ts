import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC0A2D',
        'type-bug': '#A7B723',
        'type-dark': '#75574C',
        'type-dragon': '#7037FF',
        'type-electric': '#F9CF30',
        'type-fairy': '#E69EAC',
        'type-fighting': '#C12239',
        'type-fire': '#F57D31',
        'type-flying': '#A891EC',
        'type-ghost': '#70559B',
        'type-normal': '#AAA67F',
        'type-grass': '#74CB48',
        'type-ground': '#DEC16B',
        'type-ice': '#9AD6DF',
        'type-poison': '#A43E9E',
        'type-psychic': '#FB5584',
        'type-rock': '#B69E31',
        'type-steel': '#B7B9D0',
        'type-water': '#6493EB',
        'gray-dark': '#212121',
        'gray-medium': '#666666',
        'gray-light': '#E0E0E0',
        'gray-background': '#EFEFEF',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'headline': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'subtitle-1': ['14px', { lineHeight: '16px', fontWeight: '700' }],
        'subtitle-2': ['12px', { lineHeight: '16px', fontWeight: '700' }],
        'subtitle-3': ['10px', { lineHeight: '16px', fontWeight: '700' }],
        'body-1': ['14px', { lineHeight: '16px', fontWeight: '400' }],
        'body-2': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'body-3': ['10px', { lineHeight: '16px', fontWeight: '400' }],
        'caption': ['8px', { lineHeight: '12px', fontWeight: '400' }],
      },
      boxShadow: {
        'elevation-2': '0px 1px 3px 1px rgba(0, 0, 0, 0.2)',
        'elevation-6': '0px 2px 6px 2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
export default config
