const React = require('react');
const ReactRedux = require('react-redux');
const PeopleSection = require('@components/people-list');
const selectors = require('@state/selectors');
const Section = require('./section');
const actions = require('@state/actions');

const {
  connect
} = ReactRedux;

const {
  peopleByOrgIdSelector,
  orgUISelector,
  membersSelector
} = selectors;

const {
  handleInviteToggle,
  handlePeopleStatusTooltip
} = actions;

const People = (props) => {

  return (
    <Section {...props}>
      <PeopleSection {...props} />
    </Section>
  );
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  people: peopleByOrgIdSelector(params.org)(state),
  orgUI: orgUISelector(state),
  platformMembers: membersSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleToggle: () => dispatch(handleInviteToggle()),
  handleStatusTooltip: (id) => dispatch(handlePeopleStatusTooltip(id))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
