import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Kolb } from "../../config";
import { LetterFrequency } from "../../types";

const frequency = (d) => d.frequency;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  letters: LetterFrequency[];
  margin?: typeof defaultMargin;
};

export default function PieChart({
  width,
  height,
  letters,
  margin = defaultMargin
}: PieProps) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a, b) => b - a;

  const getLetterFrequencyColor = scaleOrdinal({
    domain: Kolb,
    range: [
      "rgba(144, 187, 144,1)",
      "rgba(144, 187, 144,0.8)",
      "rgba(144, 187, 144,0.6)",
      "rgba(144, 187, 144,0.4)"
    ]
  });
  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={letters}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { letter } = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);
              const arcFill = getLetterFrequencyColor(letter);
              return (
                <g key={`arc-${letter}-${index}`}>
                  <path d={arcPath} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="black"
                      fontWeight={"bold"}
                      fontSize={15}
                      textAnchor="middle"
                    >
                      {`${arc.data.letter} (${arc.data.frequency}%)`}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}
