const React = require('react');
const ReactRouter = require('react-router');

const Section = require('./section');
const Create = require('@containers/projects/create');
const Projects = require('@containers/projects');
const Project = require('@containers/project');

const {
  Match,
  Miss
} = ReactRouter;

module.exports = () => {
  const list = (props) => (
    <Section {...props}>
      <Projects {...props} />
    </Section>
  );

  const create = (props) => () => (
    <Project {...props} />
  );

  const show = (props) => (
    <div>
      <Match component={Create} pattern='/:org/projects/~create/:step?' />
      <Miss render={create(props)} />
    </div>
  );

  return (
    <div>
      <Match
        component={list}
        exactly
        pattern='/:org/projects'
      />
      <Match
        component={show}
        pattern='/:org/projects/:projectId/:section?'
      />
    </div>
  );
};
