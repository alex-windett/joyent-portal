const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');
const d3 = require('d3');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

function rightRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + y // Move to top left (absolute)
       + 'h ' + (width - radius) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius // Relative arc
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius // Relative arch
       + 'h ' + (radius - width) // Horizontal lint to (relative)
       + 'z '; // path back to start
}

function leftRoundedRect(x, y, width, height, radius) {
  return 'M' + (x + width) + ',' + y // Move to (absolute) start at top-right
       + 'v ' + height // Vertical line to (relative)
       + 'h ' + (radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius // Relative arc
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius // Relative arch
       + 'z '; // path back to start
}

function topRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + -(y - height) // Move to (absolute) start at bottom-right
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius // Relative arc
       + 'h ' + -(radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius // Relative arc
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'h ' + (radius - width) // Horizontal line to (relative)
       + 'z '; // path back to start
}

function bottomRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + -(y - height) // Move to (absolute) start at bottom-right
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'h ' + (radius + width) // Horizontal line to (relative)
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'a ' + -radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius // Relative arc
       + 'h ' + (radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius // Relative arc
       + 'z '; // path back to start
}

function rect(x, y, width, height, radius) {
  return 'M' + x + ',' + -(y - height - 2 * radius) // Move to (absolute) start at bottom-right
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'h ' + (width + radius + 2) // Horizontal line to (relative)
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'h ' + (radius - width) // Horizontal line to (relative)
       + 'z '; // path back to start
}

const StyledSVGContainer = styled.svg`
  & {
    .links line {
      stroke: #343434;
      stroke-opacity: 1;
    }

    .health, .health_warn {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      text-align: center;
    }

    .health_warn {
      font-size: 15px;
    }

    .stat {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }

    .node_statistics {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }

    .node_statistics p {
      margin: 0 0 0 0;
      color: rgba(255, 255, 255, 0.8);
    }

    .primary, .secondary {
      font-family: "Libre Franklin";
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
    }
  }
`;

class TopologyGraph extends React.Component {
  constructor(props) {
    super(props);

    this.svg = null;
  }

  componentDidUpdate() {
    const {
      width,
      height,
      graph = {
        nodes: [],
        links: []
      },
    } = this.props;

    const svg = d3.select(this.svg);

    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody()
        .strength(() => -50)
        .distanceMin(() => 30))
      .force('link', d3.forceLink().distance(() => 200).id((d) => d.id))
      // TODO manually handle looking for collisions in the tick, we then get the BBox
      // and keep moving things for a while to try to get a fit.
      .force('collide', d3.forceCollide().radius((d) => 220 + 0.5).iterations(15))
      .force('center', d3.forceCenter(width * 1/3, height * 1/3));

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function createNode(elm) {
      const width = 170;
      const topHeight = 47;
      const radius = 4;

      // Box where label will live
      elm.append('path')
      .attr('class', 'node')
        .attr('d', topRoundedRect('0', '0', width, topHeight, radius))
        .attr('stroke', '#343434')
        .attr('stroke-width', '1px')
        .attr('fill', '#464646');

      // Hover-over text for a node's label.
      var text = elm.append('g');

      text.append('text')
      .attr('class', 'info_text')
        .attr('x', '12')
        .attr('y', '30')
        .attr('text-anchor', 'start')
        .attr('fill', '#fff')
        .text(d => d.id);

      text.append('circle')
      .attr('class', 'alert')
        .attr('cx',  function() {
          return d3
            .select(this.parentNode)
            .select('.info_text')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('cy', '24')
        .attr('stroke-width', '0px')
        .attr('fill', (d) =>
          d.id === 'Memcached' ? 'rgb(217, 77, 68)' : 'rgb(0,175,102)')
        .attr('r', '9px');

      // An icon or label that exists within the circle, inside the infobox
      text.append('text')
      .attr('class', 'health')
        .attr('x', function() {
          return d3
            .select(this.parentNode)
            .select('.info_text')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('y', '29')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text((d) => d.id === 'Memcached' ? '!' : '❤');

      // Box where stats will live
      var stats = elm.append('g');
      stats.append('path')
      .attr('class', 'node')
        .attr('d', (d) => d.id === 'Percona'
          ? rect('0', '-39', width, 78, 2)
          : bottomRoundedRect('0', '-39', width, 78, 4))
        .attr('stroke', '#343434')
        .attr('stroke-width', '1px')
        .attr('fill', '#464646');

      var html = stats
        .append('switch')
        .append('foreignObject')
          .attr('requiredFeatures',
            'http://www.w3.org/TR/SVG11/feature#Extensibility')
          .attr('x', 12)
          .attr('y', 57)
          .attr('width', 160)
          .attr('height', 70)
          // From here everything will be rendered with react using a ref.
          // However for now these values are hard-coded.
        .append('xhtml:div')
          .attr('class', 'node_statistics');
          // Remove with react + dyanmic data.

      html.append('p')
        .text('CPU: 48%');
      html.append('p')
        .text('Memory: 54%');
      html.append('p')
        .text('Network: 1.75kb/sec');

      elm.call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));

      elm.append('title')
          .text(function(d) { return d.id; });
    }

    function createExtendedNode(elm) {
      const width = 170;
      const radius = 4;
      const topHeight = 47;

      elm.append('path')
      .attr('class', 'node')
        .attr('d', topRoundedRect('0', '0', width, topHeight, radius))
        .attr('stroke', '#343434')
        .attr('stroke-width', '1px')
        .attr('fill', '#464646');

      // Hover-over text for a node's label.
      const text = elm.append('g');

      text.append('text')
      .attr('class', 'info_text')
        .attr('x', '12')
        .attr('y', '30')
        .attr('text-anchor', 'start')
        .attr('fill', '#fff')
        .text(d => d.id);

      // Box where stats will live
      const stats = elm.append('g');
      const primary = stats.append('g');

      primary.append('path')
      .attr('class', 'node')
        .attr('d', rect('0', '-39', width, 114, 2))
        .attr('stroke', '#343434')
        .attr('stroke-width', '1px')
        .attr('fill', '#464646');

      primary.append('text')
      .attr('class', 'primary')
        .attr('x', '12')
        .attr('y', '70')
        .attr('text-anchor', 'start')
        .attr('fill', '#fff')
        .text('Primary');

      primary.append('circle')
      .attr('class', 'alert')
        .attr('cx', function() {
          return d3
            .select(this.parentNode)
            .select('.primary')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('cy', '64')
        .attr('stroke-width', '0px')
        .attr('fill', 'rgb(227, 130, 0)')
        .attr('r', '9px');

      // An icon or label that exists within the circle, inside the infobox
      primary.append('text')
      .attr('class', 'health_warn')
        .attr('x', function() {
          return d3
            .select(this.parentNode)
            .select('.primary')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('y', '69')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text('☇');

      const html = primary
        .append('switch')
        .append('foreignObject')
          .attr('requiredFeatures',
            'http://www.w3.org/TR/SVG11/feature#Extensibility')
          .attr('x', 12)
          .attr('y', 87)
          .attr('width', 160)
          .attr('height', 70)
          // From here everything will be rendered with react using a ref.
          // However for now these values are hard-coded.
        .append('xhtml:div')
          .attr('class', 'node_statistics');

      // TODO power with props.
      html.append('p')
        .text('CPU: 48%');
      html.append('p')
        .text('Memory: 54%');
      html.append('p')
        .text('Network: 1.75kb/sec');

      const secondary = stats.append('g');
      secondary.append('path')
      .attr('class', 'node')
        .attr('d', bottomRoundedRect('0', '-149', width, 114, 4))
        .attr('stroke', '#343434')
        .attr('stroke-width', '1px')
        .attr('fill', '#464646');

      secondary.append('text')
      .attr('class', 'secondary')
        .attr('x', '12')
        .attr('y', '183')
        .attr('text-anchor', 'start')
        .attr('fill', '#fff')
        .text('Secondary');
      secondary.append('circle')
      .attr('class', 'alert')
        .attr('cx', function() {
          return d3
            .select(this.parentNode)
            .select('.secondary')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('cy', '177')
        .attr('stroke-width', '0px')
        .attr('fill', 'rgb(0,175,102)')
        .attr('r', '9px');

      // An icon or label that exists within the circle, inside the infobox
      secondary.append('text')
      .attr('class', 'health')
        .attr('x', function() {
          return d3
            .select(this.parentNode)
            .select('.secondary')
            .node()
            .getBBox()
            .width + 30;
        })
        .attr('y', '182')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text('❤');

      const secondaryStats = secondary
        .append('switch')
        .append('foreignObject')
          .attr('requiredFeatures',
            'http://www.w3.org/TR/SVG11/feature#Extensibility')
          .attr('x', 12)
          .attr('y', 200)
          .attr('width', 160)
          .attr('height', 70)
          // From here everything will be rendered with react using a ref.
          // However for now these values are hard-coded.
        .append('xhtml:div')
          .attr('class', 'node_statistics');

      // TODO power by props
      secondaryStats.append('p')
        .text('CPU: 48%');
      secondaryStats.append('p')
        .text('Memory: 54%');
      secondaryStats.append('p')
        .text('Network: 1.75kb/sec');

      elm.call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));
    }

    // Drawing the links between nodes
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
        .attr('stroke-width', '2px');

    // And svg group, to contain all of the attributes in @antonas' first prototype
    svg.selectAll('.node')
      .data(graph.nodes)
      .enter()
      .append('g')
      .attr('class', 'node_group');

    svg.selectAll('.node_group').each(function(d) {
      // Create different type of node for services with Primaries + Secondaries
      // We could extend this further to allow us to have as many nested services
      // as wanted.
      // TODO handle this per prop
      if (d.id === 'Percona') {
        createExtendedNode(d3.select(this));
      } else {
        createNode(d3.select(this));
      }
    });

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.links);

    function contrain(dimension, r, z) {
      return Math.max(0, Math.min(dimension - r, z));
    }

    function ticked() {
      link
        .attr('x1', function(d) {
          let x;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.source.index) return;
            x = d3.select(this).node().getBBox().width;
          });
          return contrain(width, x, d.source.x) + 80;
        })
        .attr('y1', function(d) {
          let y;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.source.index) return;
            y = d3.select(this).node().getBBox().height;
          });
          return contrain(height, y, d.source.y) + 24;
        })
        .attr('x2', function(d) {
          let x;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.target.index) return;
            x = d3.select(this).node().getBBox().width;
          });
          return contrain(width, x, d.target.x) + 80;
        })
        .attr('y2', function(d) {
          let y;
          svg.selectAll('.node_group').each(function(_, i) {
            if (i !== d.target.index) return;
            y = d3.select(this).node().getBBox().height;
          });
          return contrain(height, y, d.target.y) + 24;
        });

      svg.selectAll('.node_group')
         .attr('transform', function(d) {
           const x = d3.select(this).node().getBBox().width;
           const y = d3.select(this).node().getBBox().height;
           return 'translate(' + contrain(width, x, d.x) + ','
             + contrain(height, y, d.y) + ')';
         });
    }
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const refCb = (elm) => this.svg = elm;

    return (
      <StyledSVGContainer
        height={height}
        innerRef={refCb}
        width={width}
      />
    );
  }

}

TopologyGraph.propTypes = {
  graph: React.PropTypes.object,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

module.exports = TopologyGraph;
