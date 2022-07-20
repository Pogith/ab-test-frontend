import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3";

import Head from "../common/Head/Head";

export default function TimeChart({ resultData }) {
  const svgRef = useRef();
  const sortedTime = resultData?.sort((a, b) => a.time - b.time);

  useEffect(() => {
    const chartWidth = 700;
    const chartHeight = 400;
    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .style("padding", "40px")
      .style("border", "1px solid black")
      .style("border-radius", "10px")
      .style("box-shadow", "10px 10px 5px -2px rgba(103, 103, 103, 0.7)");

    const xScale = d3
      .scaleTime()
      .domain([
        new Date(sortedTime[0]?.time),
        new Date(sortedTime[sortedTime.length - 1]?.time),
      ])
      .range([50, 600]);

    const yScale = d3.scaleLinear().domain([0, 9]).range([330, 50]);

    const xAxisSVG = svg.append("g").attr("transform", "translate(0, 330)");

    const yAxisSVG = svg.append("g").attr("transform", "translate(50 , 0)");

    const xAxis = d3.axisBottom(xScale).tickSize(10).ticks(10);

    const yAxis = d3.axisLeft(yScale).tickSizeOuter(10).ticks(10);

    xAxis(xAxisSVG);
    yAxis(yAxisSVG);

    const tooltip = d3
      .select("#time-chart")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("color", "white")
      .style("border-radius", "5px")
      .style("background", "black");

    svg
      .selectAll("circle")
      .data(resultData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(new Date(d.time.toString().split(".")[0])))
      .attr("cy", (d) => yScale(d.count))
      .attr("r", 5)
      .style("fill", "red")
      .on("mouseover", (e, d) => {
        select(e.currentTarget).style("fill", "blue");

        tooltip.style("visibility", "visible").text(`${d.time}`);
      })
      .on("mousemove", (e) => {
        tooltip
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 150 + "px");
      })
      .on("mouseout", (e) => {
        select(e.currentTarget).style("fill", "red");

        tooltip.style("visibility", "hidden");
      });

    svg
      .append("text")
      .attr("x", -(chartHeight / 2))
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(`Visitor Count: All ${resultData.length} people`);

    svg
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight - 30)
      .attr("text-anchor", "middle")
      .text("Visit Time");
  }, []);

  return (
    <div>
      <div>
        <Head message={"Visit Time"} />
      </div>
      <div id="time-chart">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
