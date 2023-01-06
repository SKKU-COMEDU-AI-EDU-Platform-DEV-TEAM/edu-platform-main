import { Point } from "@visx/point";
import { scaleLinear } from "@visx/scale";
import { Line, LineRadial } from "@visx/shape";
import { Text } from "@visx/text";
import { VALUE } from "../../config";

export const DATA_LENGTH = 8;
export const LEVEL = 10;

interface ChartProps {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

interface RadarProps {
  data: number[];
  color: string;
}

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (360 / length) + (length % 2 === 0 ? 0 : 360 / length / 2)
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step)
  }));
};

const genPolygonPoints = (data: number[], scale: (n: number) => number) => {
  const step = (Math.PI * 2) / data.length;
  const points: { x: number; y: number }[] = new Array(data.length).fill({
    x: 0,
    y: 0
  });
  const pointString: string = new Array(data.length + 1)
    .fill("")
    .reduce((res, _, i) => {
      if (i > data.length) return res;
      const xVal = scale(data[i - 1]) * Math.sin(i * step);
      const yVal = scale(data[i - 1]) * Math.cos(i * step);
      points[i - 1] = { x: xVal, y: yVal };
      res += `${xVal},${yVal} `;
      return res;
    });

  return { points, pointString };
};

const radialScale = scaleLinear<number>({
  domain: [360, 0],
  range: [0, Math.PI * 2]
});

export const RadarAxis = (props: ChartProps) => {
  const { width, height, margin } = props;
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;
  const radius = Math.min(xMax, yMax) / 2;
  const labelRadius = Math.min(xMax, yMax) / 2 + 10;

  const webs = genAngles(DATA_LENGTH);
  const points = genPoints(DATA_LENGTH, radius);
  const labelPoints = genPoints(DATA_LENGTH, labelRadius);

  const zeroPoint = new Point({ x: 0, y: 0 });

  return (
    <>
      {[...new Array(LEVEL)].map((_, i) => (
        <LineRadial
          key={`web-${i}`}
          data={webs}
          angle={(d) => radialScale(d.angle) ?? 0}
          radius={((i + 1) * radius) / LEVEL}
          fill="none"
          stroke={"#E2E2E2"}
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
        />
      ))}
      {[...new Array(6)].map((_, i) => (
        <Line
          key={`radar-line-${i}`}
          from={zeroPoint}
          to={points[i]}
          stroke={"#E2E2E2"}
        />
      ))}
      {labelPoints.map((value, i) => (
        <Text
          key={`radar-label-${i}`}
          x={labelPoints[i].x}
          y={labelPoints[i].y}
          fontSize={8}
          textAnchor={i === 0 || i === 3 ? "middle" : i < 3 ? "start" : "end"}
          verticalAnchor="middle"
          fill="gray"
          fontWeight="bold"
        >
          {VALUE[i]}
        </Text>
      ))}
    </>
  );
};

export const RadarMark = (props: ChartProps & RadarProps) => {
  const { width, height, margin, color, data } = props;
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;
  const radius = Math.min(xMax, yMax) / 2;

  const yScale = scaleLinear<number>({
    domain: [0, LEVEL],
    range: [0, radius]
  });

  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0);

  return (
    <>
      <polygon
        points={polygonPoints.pointString}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1}
      />
      {polygonPoints.points.map((point, i) => (
        <circle
          key={`radar-point-${i}`}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={color}
        />
      ))}
    </>
  );
};
