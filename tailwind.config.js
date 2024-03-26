/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['Nunito'],
      },
      backgroundImage: {
        'clearDay': ['url(images/weatherBackgrounds/Weather=Clear, Moment=Day.png)'],
        'clearNight': ['url(images/weatherBackgrounds/Weather=Clear, Moment=Night.png)'],
        'cloudyDay': ['url(images/weatherBackgrounds/Weather=Cloudy, Moment=Day.png)'],
        'cloudyNight': ['url(images/weatherBackgrounds/Weather=Cloudy, Moment=Night.png)'],
        'fewCloudsDay': ['url(images/weatherBackgrounds/Weather=Few Clouds, Moment=Day.png)'],
        'fewCloudsNight': ['url(images/weatherBackgrounds/Weather=Few Clouds, Moment=Night.png)'],
        'fewCloudsNight': ['url(images/weatherBackgrounds/Weather=Few Clouds, Moment=Night.png)'],
        'rainDay': ['url(images/weatherBackgrounds/Weather=Rain, Moment=Day.png)'],
        'rainNight': ['url(images/weatherBackgrounds/Weather=Rain, Moment=Night.png)'],
        'stormDay': ['url(images/weatherBackgrounds/Weather=Storm, Moment=Day.png)'],
        'stormNight': ['url(images/weatherBackgrounds/Weather=Storm, Moment=Night.png)'],
      }
    },
  },
  plugins: [],
};
