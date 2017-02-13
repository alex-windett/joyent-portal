const React = require('react');
const constants = require('../../shared/constants');
const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledInput = styled.input`
  visibility: hidden;
  display: none;

  &:disabled + span::before,
  &:checked + span::before {
    background-color: #646464;
  }
  &:disabled + span {
    background-color: ${colors.backgroundInactive};
  }
  &:disabled + span::before {
    opacity: 0.3;
  }
`;

const StyledLabel = styled.label`

  ${props => props.styles}
`;

const StyledContent = styled.div`
  margin-left: ${remcalc(45)};
  padding-top: ${remcalc(10)};
`;

const StyledSpan = styled.span`
  color: #646464;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: ${remcalc(10)};
    height: ${remcalc(10)};
    box-shadow: 0 0 0 ${remcalc(1)} #646464;
    border: ${remcalc(8)} solid ${colors.brandInactive};
    top: ${remcalc(5)};
    left: ${remcalc(5)};
    border-radius: 100%;
  }

  &:hover {
    &::after {
      opacity: 0.3;
    }
  }
`;

const Radio = ({
  checked,
  children,
  className,
  defaultChecked,
  disabled = false,
  form,
  id,
  label,
  name,
  onChange,
  readOnly,
  required,
  selectionDirection,
  style,
  tabIndex,
  value
}) => {

  return (
    <StyledLabel styles={style}>
      <StyledInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        form={form}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        selectionDirection={selectionDirection}
        tabIndex={tabIndex}
        type='radio'
        value={value}
      />
      <StyledSpan>
        <StyledContent>
          {children}
        </StyledContent>
      </StyledSpan>
    </StyledLabel>
  );
};

Radio.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  form: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selectionDirection: React.PropTypes.string,
  style: React.PropTypes.object,
  tabIndex: React.PropTypes.string,
  value: React.PropTypes.string.isRequired
};

module.exports = Radio;
