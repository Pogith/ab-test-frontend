import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select, text } from "d3";

import Head from "../common/Head/Head";

export default function PieChart({ resultData, message }) {
  const svgRef = useRef();

  const countSum = resultData.reduce((previous, current) => {
    return previous + current.count;
  }, 0);

  useEffect(() => {
    const circle = {
      width: 500,
      height: 350,
      thickness: 100,
    };
    const radius = Math.min(circle.width, circle.height) / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", circle.width)
      .attr("height", circle.height)
      .style("padding", "25px")
      .style("border", "1px solid black")
      .style("border-radius", "10px")
      .style("box-shadow", "10px 10px 5px -2px rgba(103, 103, 103, 0.7)");

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${circle.width / 2}, ${circle.height / 2})`
      );

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);
    const data = d3.pie().value((d) => d.count)(resultData);
    const arc = d3
      .arc()
      .innerRadius(radius - circle.thickness)
      .outerRadius(radius);

    const arcs = g
      .selectAll("arc")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "arc");

    const tooltip = d3
      .select("#pie-chart")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("color", "white")
      .style("border-radius", "5px")
      .style("background-color", "black");

    arcs
      .append("path")
      .attr("fill", (d, i) => color(d.value))
      .attr("d", arc)
      .transition()
      .duration(1000)
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate(d.startAngle, d.endAngle);

        return (t) => {
          d.endAngle = interpolate(t);

          return arc(d);
        };
      });

    arcs
      .select("path")
      .attr("fill", (d, i) => color(d.value))
      .attr("d", arc)
      .on("mouseover", (e, d) => {
        select(e.currentTarget).attr("fill", "red");

        tooltip
          .style("visibility", "visible")
          .text(
            `${d.data.name}: ${Math.round((d.data.count / countSum) * 100)}%`
          );
      })
      .on("mousemove", (e, d) => {
        tooltip
          .style("top", e.pageY - 30 + "px")
          .style("left", e.pageX - 30 + "px");
      })
      .on("mouseout", (e, d) => {
        select(e.currentTarget).attr("fill", color(d.value));

        tooltip.style("visibility", "hidden");
      });

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .text((d) => d.data.name)
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .attr("fill", "#fff")
      .attr("text-anchor", "middle");
  }, []);

  return (
    <div>
      <div>
        <Head message={message} />
      </div>
      <div id="pie-chart">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
