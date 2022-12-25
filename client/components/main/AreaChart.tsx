import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { AreaClosed, Circle, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { LEVEL } from "../../config";
import { ChartProps, LineProps } from "../../types";

export const AreaAxis = (props: ChartProps & LineProps) => {
  const { width, height, margin, data } = props;

  const xScale = scaleLinear({
    domain: [1, data.length],
    range: [0, width - margin.right - margin.left],
    nice: true
  });

  const yScale = scaleLinear({
    domain: [0, LEVEL],
    range: [height - margin.bottom - margin.top, 0],
    nice: true
  });

  return (
    <>
      <AxisBottom
        scale={xScale}
        stroke={"gray"}
        tickLabelProps={() => ({
          fill: "gray",
          fontSize: 11,
          textAnchor: "middle"
        })}
        tickLineProps={{
          stroke: "gray"
        }}
        top={height - margin.bottom}
        left={margin.left}
        numTicks={data.length}
      />
      <AxisLeft
        stroke="gray"
        scale={yScale}
        hideZero={true}
        top={margin.top}
        left={margin.left}
        tickLabelProps={() => ({
          fill: "gray",
          fontSize: 11,
          textAnchor: "end",
          verticalAnchor: "middle"
        })}
        tickLineProps={{
          stroke: "gray"
        }}
      />
    </>
  );
};

export const AreaMark = (props: ChartProps & LineProps) => {
  const { data, width, height, margin, color } = props;

  const xScale = scaleLinear({
    domain: [0, data.length - 1],
    range: [0, width - margin.right - margin.left],
    nice: true
  });

  const yScale = scaleLinear({
    domain: [0, LEVEL],
    range: [height - margin.bottom - margin.top, 0],
    nice: true
  });

  return (
    <Group left={margin.left} top={margin.top}>
      <LinearGradient
        id={`area-gradien-${color}`}
        from={color}
        to={color}
        fromOpacity={0.6}
        toOpacity={0}
      />
      <AreaClosed
        data={data}
        x={(d, i) => xScale(i) ?? 0}
        y={(d) => yScale(d) ?? 0}
        yScale={yScale}
        strokeWidth={1}
        fill={`url(#area-gradien-${color})`}
        curve={curveNatural}
      />
      <LinePath
        data={data}
        x={(d, i) => xScale(i) ?? 0}
        y={(d) => yScale(d) ?? 0}
        strokeWidth={2}
        stroke={color}
        curve={curveNatural}
      />
      {data.map((d, i) => (
        <Circle
          key={`line${i}`}
          cx={xScale(i) ?? 0}
          cy={yScale(d) ?? 0}
          r={4}
          fill={color}
          stroke={color}
        />
      ))}
    </Group>
  );
};
