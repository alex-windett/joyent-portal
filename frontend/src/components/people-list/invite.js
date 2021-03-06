const React = require('react');
const styled = require('styled-components');

const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const Button = require('@ui/components/button');

const {
  default: Styled
} = styled;

// TOOD: Require from UI Components - causes issue ATM.
const Select = require('react-select');
require('react-select/dist/react-select.css');

const SelectWrapper = Styled.div`
  
  .Select-menu-outer {
    margin-top: 48px;
  }
  
  .Select-arrow {
    position: relative;
    top: -4px;
  }
`;

const Invite = React.createClass({

  propTypes: {
    addMemember: React.PropTypes.func,
    handleToggle: React.PropTypes.func,
    parentIndex: React.PropTypes.number,
    platformMembers: React.PropTypes.array,
  },

  getInitialState() {
    return {
      selectValue: '',
      members: []
    };
  },

  getFormattedPlatformMembers() {
    return this.props.platformMembers.map((m) => ({
      value: m.email,
      label: m.name
    }));
  },

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      member: {
        name: this.state.selectValue.label,
        email: this.state.selectValue.value,
        role: 'Unassigned',
        status: 'Sent invitation',
      },
      parentIndex: this.props.parentIndex,
    };

    this.props.addMemember(data, () => {
      this.setState({
        selectValue: ''
      });
    });
  },

  render() {

    const {
      handleToggle,
      // UI = {},
      // people = [],
    } = this.props;

    const InputStyle = {
      float: 'left',
      width: '75%',
      minHeight: '50px',
      marginBottom: '20px',
      paddingTop: '10px'
    };

    const AddButtonStyle = {
      float: 'right',
      width: '20%'
    };

    const styleInline = {
      display: 'inline-block'
    };

    const selectData = this.getFormattedPlatformMembers();

    const handleSelectChange = (v) => {
      this.setState({
        selectValue: v
      });
    };

    return (
      <Row>
        <Column md={6}>
          <p>Search for a person by name or email or enter an email address
            to invite someone new.</p>

          <Row>
            <Column xs={12}>
              <form onSubmit={this.handleSubmit}>
                <SelectWrapper>
                  <Select.Creatable
                    aria-label="member select"
                    onChange={handleSelectChange}
                    onNewOptionClick={handleSelectChange}
                    options={selectData}
                    placeholder="Enter an email address or password"
                    style={InputStyle}
                    value={this.state.selectValue}
                  />
                </SelectWrapper>
                <Button
                  secondary
                  style={AddButtonStyle}
                  type="submit"
                >
                  Add
                </Button>
              </form>
            </Column>
          </Row>

          <Button
            onClick={handleToggle}
            secondary
            style={styleInline}
          >
            Cancel
          </Button>

          <Button
            style={styleInline}
          >
            Send Invitation(s)
          </Button>
        </Column>
      </Row>
    );
  },
});

module.exports = Invite;