const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const match = require('../../shared/match');
const React = require('react');
const Styled = require('styled-components');

const {
  colors,
  boxes
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled,
  css
} = Styled;

const styles = {
  primaryBorder: colors.brandPrimary,
  secondaryColor: colors.brandSecondary,
  ...colors
};

const background = match({
  secondary: styles.background,
  disabled: styles.inactiveBackground,
}, styles.brandPrimary);

const border = match({
  secondary: styles.border,
  disabled: styles.inactiveBorder
}, styles.primaryBorder);

const color = match({
  secondary: styles.secondaryColor,
  disabled: styles.inactiveColor
}, styles.white);

const style = css`
  border-radius: ${remcalc(boxes.borderRadius)};
  box-shadow: ${boxes.bottomShaddow};
  font-size: ${remcalc(16)};
  min-width: ${remcalc(120)};
  padding: ${remcalc('18 24')};

  background-color: ${background} !important;
  border: solid 1px ${border};
  color: ${color} !important;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  ${style}
`;

const StyledAnchor = styled.a`
  display: inline-block;
  ${style}
`;


const Button = module.exports = (props) => {
  return props.href ? (
    <StyledAnchor {...props} />
  ) : (
    <StyledButton {...props} />
  );
};

Button.propTypes = {
  href: React.PropTypes.string
};

module.exports = Button;
