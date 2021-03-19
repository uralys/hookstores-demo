const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const device = {
  mobileS: `screen and (min-width: ${size.mobileS})`,
  mobile: `screen and (min-width: ${size.mobileM})`,
  mobileL: `screen and (min-width: ${size.mobileL})`,
  tablet: `screen and (min-width: ${size.tablet})`,
  laptop: `screen and (min-width: ${size.laptop})`,
  laptopL: `screen and (min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`
};

export const mediaQueryTransition = `transition: all 0.4s`;
