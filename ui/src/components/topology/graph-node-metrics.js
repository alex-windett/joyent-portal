const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledText = styled.text`
  fill: white;
  font-size: 12px;
  opacity: 0.8;
`;

const GraphNodeMetrics = ({
  metrics,
  metricsPosition
}) => {

  const metricSpacing = 18;
  const metricsText = metrics.map((metric, index) => (
    <StyledText
      key={index}
      x={0}
      y={12 + metricSpacing*index}
    >
      {`${metric.name}: ${metric.stat}`}
    </StyledText>
  ));

  return (
    <g transform={`translate(${metricsPosition.x}, ${metricsPosition.y})`}>
      {metricsText}
    </g>
  );
};

GraphNodeMetrics.propTypes = {
  metrics: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    stat: React.PropTypes.string
  })),
  metricsPosition: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  })
};

module.exports = GraphNodeMetrics;
