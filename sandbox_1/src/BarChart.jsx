import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import {
  getInitialData,
  getAppendedData,
  getTruncatedData,
  getUpdatedData
} from "./helpers";
import "./barchart.css";

const BAR_HEIGHT = 25;
const BAR_PADDING = 2;
const BAR_COLOR = "#348AA7";
const scaleWidth = value => value * 5;

function BarGroup({ data, state }) {
  const barWidth = scaleWidth(state.value);
  const midY = BAR_HEIGHT * 0.5;

  return (
    <g className="bar-group" transform={`translate(0, ${state.y})`}>
      <rect
        y={BAR_PADDING * 0.5}
        width={barWidth}
        height={BAR_HEIGHT - BAR_PADDING}
        style={{ fill: BAR_COLOR, opacity: state.opacity }}
      />
      <text
        className="value-label"
        x={barWidth - 6}
        y={midY}
        alignmentBaseline="middle"
      >
        {state.value.toFixed(0)}
      </text>
      <text
        className="name-label"
        x="-6"
        y={midY}
        alignmentBaseline="middle"
        style={{ opacity: state.opacity }}
      >
        {data.name}
      </text>
    </g>
  );
}

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: getInitialData()
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  addItem() {
    this.setState(({ items }) => ({
      items: getAppendedData(items)
    }));
  }

  removeItem() {
    this.setState(({ items }) => ({
      items: getTruncatedData(items)
    }));
  }

  updateItems() {
    this.setState(({ items }) => ({
      items: getUpdatedData(items)
    }));
  }

  startTransition(_item, itemIndex) {
    return { value: 0, y: itemIndex * BAR_HEIGHT, opacity: 0 };
  }

  enterTransition(item) {
    return { value: [item.value], opacity: [1], timing: { duration: 250 } };
  }

  updateTransition(item, itemIndex) {
    return { value: [item.value], y: [itemIndex * BAR_HEIGHT], timing: { duration: 300 } };
  }

  leaveTransition() {
    return { y: [-BAR_HEIGHT], opacity: [0], timing: { duration: 250 } };
  }

  render() {
    return (
      <div>
        <div id="menu">
          <button onClick={this.addItem}>Add item</button>
          <button onClick={this.removeItem}>Remove item</button>
          <button onClick={this.updateItems}>Update values</button>
        </div>
        <svg width="800" height="2200">
          <g className="chart" transform="translate(100,10)">
            <NodeGroup
              data={this.state.items}
              keyAccessor={item => item.name}
              start={this.startTransition}
              enter={this.enterTransition}
              update={this.updateTransition}
              leave={this.leaveTransition}
            >
              {nodeEntries => (
                <g>
                  {nodeEntries.map(({ key, data, state }) => (
                    <BarGroup key={key} data={data} state={state} />
                  ))}
                </g>
              )}
            </NodeGroup>
          </g>
        </svg>
      </div>
    );
  }
}

export default BarChart;
