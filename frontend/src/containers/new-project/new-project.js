const React = require('react');
const ReactRedux = require('react-redux');

const selectors = require('@state/selectors');
const PropTypes = require('@root/prop-types');
const NewProjectForm = require('@components/new-project');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const NewProject = (props) => {

  const {
    org,
    push
  } = props;

  const onCancel = (values) =>
    push(`/${org.id}/projects`);

  const onSubmit = (values) =>
    push(`/${org.id}/new-project/billing`);

  return (
    <NewProjectForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      org={org}
    />
  );
};

NewProject.propTypes = {
  org: PropTypes.org.isRequired,
  push: React.PropTypes.func
};
// TODO we'll need to know whether there any cards
// otherwise go to new billing straight away
const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  router: state.app.router
});

const mapDispatchToProps = (dispatch) => ({});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
