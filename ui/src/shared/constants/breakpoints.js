const styled = require('styled-components');

const {
  css
} = styled;

// github.com/kristoferjoseph/flexboxgrid/blob/master/dist/flexboxgrid.css
const small = {
  upper: '48rem'
};

const medium = {
  upper: '64rem',
  lower: '48.1rem',
};

const large = {
  upper: '75rem',
  lower: '64.1rem',
};

const xlarge = {
  lower: '75.1rem',
};

const screen = 'only screen';

const screens = {
  // >= 768px
  'smallOnly': `${screen} and (max-width: ${small.upper})`,
  'small': `${screen} and (min-width: ${small.upper}})`,
  // >= 1024px
  'mediumOnly': `${screen} and (min-width: ${medium.lower})
                  and (max-width: ${medium.upper})`,
  'mediumDown': `${screen} and (max-width: ${medium.upper})`,
  'medium': `${screen} and (min-width: ${medium.lower})`,
  // >= 1200px
  'largeOnly': `${screen} and (min-width: ${large.lower})
                 and (max-width: ${large.upper})`,
  'largeDown': `${screen} and (max-width: ${large.upper})`,
  'large': `${screen} and (min-width: 75rem)`,

  'xlarge': `${screen} and (min-width: ${xlarge.lower})
             and (max-width: ${xlarge.upper})`,
  'xlargeUp': `${screen} and (min-width: ${xlarge.lower})`,
};

const breakpoints = Object.keys(screens).reduce((acc, label) => {
  return {
    ...acc,
    [label]: (...args) => css`
      @media ${screens[label]} {
        ${css(...args)}
      }
    `
  };
}, {});

module.exports = breakpoints;
