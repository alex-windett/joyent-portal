const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');
const Button = require('../button');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const StyledButton = styled(Button)`
  position: absolute;
  left: ${remcalc(24)};
  bottom: ${remcalc(24)};
`;

const AddMetricButton = ({
  children,
  disabled,
  metric,
  onClick
}) => {
  const onButtonClick = (e) => onClick(metric);
  return disabled ?
     (
       <StyledButton
         disabled
         name='add-metric-button'
       >
         {children}
       </StyledButton>
     ) : (
       <StyledButton
         name='add-metric-button'
         onClick={onButtonClick}
         secondary
       >
         {children}
       </StyledButton>
    );
};

AddMetricButton.propTypes = {
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  metric: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

module.exports = AddMetricButton;
