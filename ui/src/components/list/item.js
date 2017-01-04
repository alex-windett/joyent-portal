const Button = require('../button');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const height = ({
  collapsed
}) => {
  return collapsed ? remcalc(48) : remcalc(126);
};

const Box = styled(Row)`
  height: ${height}
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;

const Nav = styled.nav`
  flex: 0 0 ${remcalc(47)};
  border-left: 1px solid ${colors.borderSecondary};
`;

const Main = styled.article`
  flex-grow: 1;
`;

const OptionsButton = styled(Button)`
  border-width: 0;
  box-shadow: none;
  width: ${remcalc(47)};
  height: ${remcalc(46)};

  &:focus {
    border-width: 0;
  }

  &:hover {
    border-width: 0;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    border-width: 0;
  }
`;

module.exports = ({
  children
}) => (
  <Box collapsed>
    <Main>
      {children}
    </Main>
    <Nav>
      <OptionsButton rect secondary>
        <span>…</span>
      </OptionsButton>
    </Nav>
  </Box>
);
