import React, { Fragment, Component } from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";
import Links from "./LinksMove";
import Nodes from "./NodesMove";

export default class TreeDemo extends Component {
  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "diagonal",
    stepPercent: 0.5
  };

  render() {
    const {
      data,
      width,
      height,
      events = false,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
      }
    } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    if (width < 10) return null;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    let origin;
    let treeWidth;
    let treeHeight;

    if (layout === "polar") {
      origin = {
        x: chartWidth / 2,
        y: chartHeight / 2
      };
      treeWidth = 2 * Math.PI;
      treeHeight = Math.min(chartWidth, chartHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        treeWidth = chartWidth;
        treeHeight = chartHeight;
      } else {
        treeWidth = chartHeight;
        treeHeight = chartWidth;
      }
    }

    const treeRoot = hierarchy(data, entry => (entry.isExpanded ? entry.children : null));

    return (
      <Fragment>
        <div style={{ margin: "10px 0px" }}>
          <span style={{ marginRight: 10 }}>
            <label>orientation:</label>
            <select
              onChange={e => this.setState({ orientation: e.target.value })}
              value={orientation}
              disabled={layout === "polar"}
            >
              <option value="vertical">vertical</option>
              <option value="horizontal">horizontal</option>
            </select>
          </span>
          <span>
            <label>link:</label>
            <select
              onChange={e => this.setState({ linkType: e.target.value })}
              value={linkType}
            >
              <option value="diagonal">diagonal</option>
              <option value="step">step</option>
              <option value="line">line</option>
            </select>
          </span>
        </div>
        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fff" to="#aaa" />
          <rect width={width} height={height} rx={14} fill="#888" />
          <Tree
            top={margin.top}
            left={margin.left}
            root={treeRoot}
            size={[treeWidth, treeHeight]}
            separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}
          >
            {({ data }) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={data.links()}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                />

                <Nodes
                  nodes={data.descendants()}
                  layout={layout}
                  orientation={orientation}
                  onNodeClick={node => {
                    if (!node.data.isExpanded) {
                      node.data.x0 = node.x;
                      node.data.y0 = node.y;
                    }
                    node.data.isExpanded = !node.data.isExpanded;
                    this.forceUpdate();
                  }}
                />
              </Group>
            )}
          </Tree>
        </svg>
      </Fragment>
    );
  }
}
