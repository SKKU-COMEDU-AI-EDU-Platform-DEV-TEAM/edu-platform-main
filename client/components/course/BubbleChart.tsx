//https://github.com/EliEladElrom/react-tutorials/tree/master/bubble-chart/src
import React from "react";
import * as d3 from "d3";
import { Simulation, SimulationNodeDatum } from "d3-force";
import uuid from "react-uuid";
import { Box, Link } from "@chakra-ui/react";
import { Types } from "../../types";
import { schemePaired, schemeTableau10 } from "d3";
import styles from "./BubbleChart.module.css";
import icon from "./quizIcon.jpg";

interface IBubbleChartState {
  data: Types.ForceData[];
}
interface IBubbleChartProps {
  bubblesData: Types.Data[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  minValue: number;
  maxValue: number;
  metaverse: string[];
  type?: number;
  selectedCircle: (link: string) => void;
}

class BubbleChart extends React.Component<
  IBubbleChartProps,
  IBubbleChartState
> {
  public forceData: Types.ForceData[];

  private simulation: Simulation<SimulationNodeDatum, undefined> | undefined;
  constructor(props: IBubbleChartProps) {
    super(props);
    this.state = {
      data: []
    };
    this.forceData = this.setForceData(props);
  }

  componentDidMount() {
    this.animateBubbles();
  }

  componentDidUpdate(
    prevProps: IBubbleChartProps,
    prevState: IBubbleChartState
  ) {
    if (
      JSON.stringify(prevProps.bubblesData) !==
      JSON.stringify(this.props.bubblesData)
    ) {
      this.forceData = this.setForceData(this.props);
      this.animateBubbles();
    }
  }

  setForceData = (props: IBubbleChartProps) => {
    const d = [];
    for (let i = 0; i < props.bubblesData.length; i++) {
      d.push({ size: props.bubblesData[i].size * 18 });
    }
    return d;
  };

  animateBubbles = () => {
    if (this.props.bubblesData.length > 0) {
      this.simulatePositions(this.forceData);
    }
  };

  radiusScale = (value: d3.NumberValue) => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.props.minValue, this.props.maxValue]);
    return fx(value);
  };

  simulatePositions = (data: Types.ForceData[]) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data as SimulationNodeDatum[])
      .velocityDecay(0.05)
      .force("x", d3.forceX())
      .force("y", d3.forceY().strength(0.4))
      .force(
        "collide",
        d3.forceCollide((d: SimulationNodeDatum) => {
          return this.radiusScale((d as Types.ForceData).size) + 2;
        })
      )
      .on("tick", () => {
        this.setState({ data });
      });
  };

  renderBubbles = (data: []) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      const { props } = this;
      const fontSize =
        this.radiusScale((item as unknown as Types.ForceData).size) / 4;
      const week = props.bubblesData[index].week;
      const link =
        props.type == 1
          ? `/course/${week}/lecture/1`
          : props.type == 2
          ? `/course/${week}/quiz`
          : props.type == 3
          ? `/course/${week}/game`
          : props.metaverse[week];

      return (
        <g
          key={`g-${uuid()}`}
          transform={`translate(${props.width / 2 + item.x - 70}, ${
            props.height / 2 + item.y
          })`}
        >
          {props.type == 4 ? (
            <Link href={link} isExternal>
              <>
                <circle
                  style={{ cursor: "pointer" }}
                  r={this.radiusScale(
                    (item as unknown as Types.ForceData).size
                  )}
                  fill={
                    week < 11
                      ? schemePaired[week - 1]
                      : schemeTableau10[week - 11]
                  }
                />
                <text
                  fill={this.props.textFillColor}
                  textAnchor="middle"
                  fontSize={`${fontSize}px`}
                  fontWeight="bold"
                >
                  {props.bubblesData[index].name}
                </text>
              </>
            </Link>
          ) : (
            <>
              <circle
                style={{ cursor: "pointer" }}
                r={this.radiusScale((item as unknown as Types.ForceData).size)}
                onClick={() => this.props.selectedCircle(link)}
                fill={
                  week < 11
                    ? schemePaired[week - 1]
                    : schemeTableau10[week - 11]
                }
              />
              <text
                fill={this.props.textFillColor}
                textAnchor="middle"
                fontSize={`${fontSize}px`}
                fontWeight="bold"
              >
                {props.bubblesData[index].name}
              </text>
            </>
          )}
        </g>
      );
    });
  };

  render() {
    return (
      <div>
        <div>
          <div className={styles.textTitle}>
            <img src={icon.src} alt="icon" />
            아래의 버블차트에서 당신의 학습 콘텐츠를 선택하세요!
            <p>자세히 보기 ▼</p>
          </div>
          <div className={styles.textBox}>
            <h2>현재 당신에게 필요한 학습 주제의 버블은 크게, 충분히 학습하였거나 아직 학습 단계가 아닌 주제의 버블은 작게 표시되어 있습니다.</h2>
            <h2>멀티 모달의 다채로운 버블차트에서 당신에게 적합한 학습 주제를 선택해보세요!</h2>
          </div>
        </div>
        <Box
          style={{ background: this.props.backgroundColor, cursor: "pointer" }}
        >
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data as [])}
          </svg>
        </Box>
      </div>
    );
  }
}

export default BubbleChart;
