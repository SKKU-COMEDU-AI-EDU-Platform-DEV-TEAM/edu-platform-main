//https://github.com/EliEladElrom/react-tutorials/tree/master/bubble-chart/src
import React from "react";
import * as d3 from "d3";
import { Simulation, SimulationNodeDatum } from "d3-force";
import uuid from "react-uuid";
import { Box, Link } from "@chakra-ui/react";
import { Types, User } from "../../types";
import { schemePaired, schemeTableau10 } from "d3";
import styles from "./BubbleChart.module.css";
import icon from "./quizIcon.jpg";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";

interface IBubbleChartState {
  data: Types.ForceData[];
}
interface IBubbleChartProps {
  bubblesData: Types.Data[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  textCompleteColor: string;
  complete: number[];
  minValue: number;
  maxValue: number;
  metaverse: string[];
  type?: number;
  selectedCircle: (link: string) => void;
  metaverseLearningCheck: (week: number) => void;
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
                  onClick={() => this.props.metaverseLearningCheck(week)}
                  fill={
                    week < 11
                      ? schemePaired[week - 1]
                      : schemeTableau10[week - 11]
                  }
                />
                <text
                  fill={
                    this.props.complete.indexOf(week) == -1
                      ? this.props.textFillColor
                      : this.props.textCompleteColor
                  }
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
                fill={
                  this.props.complete.indexOf(week) == -1
                    ? this.props.textFillColor
                    : this.props.textCompleteColor
                }
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
            ????????? ?????????????????? ????????? ?????? ???????????? ???????????????!
            <p>????????? ?????? ???</p>
          </div>
          <div className={styles.textBox}>
            <h2>?????? ?????????????????? <b>????????? ?????? ????????? ????????? ??????, ?????? ????????? ?????? ?????? ?????? ?????? ?????? ????????? ????????? ??????</b> ???????????? ????????????.</h2>
            <h2>????????? ????????? ????????? ????????? ???????????? ????????? ???????????? ?????? ????????? ?????????. ??? <b>????????? ?????? ??????(??????)??? ????????? ?????? ????????? ???</b>?????????!</h2>
            <h2>?????? <b>????????? ????????? ????????? ?????? ???????????? ???????????? ??????</b>????????? ????????? ???????????? ??? ????????????.</h2>
            <h2>?????????????????? ????????? ???????????? ?????????????????? ????????? ?????? ????????? ??????????????????!</h2>
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
