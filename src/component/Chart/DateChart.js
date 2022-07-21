import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3";

import Head from "../common/Head/Head";

export default function DateChart({ resultData }) {
  const svgRef = useRef();

  useEffect(() => {
    const sortedDate = resultData.sort((a, b) => a.data - b.date);

    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 15, bottom: 25, left: 25 };

    let maxVisitCount = 0;

    resultData?.forEach((data) => {
      const currentMaxCount = d3.max(resultData, (d) => d.count);

      if (maxVisitCount < currentMaxCount) maxVisitCount = currentMaxCount;
    });

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("padding", "40px")
      .style("border", "1px solid black")
      .style("border-radius", "10px")
      .style("box-shadow", "10px 10px 5px -2px rgba(103, 103, 103, 0.7)");

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(sortedDate, (d) => d.date))
      .range([50, width - margin.left - margin.right]);

    const yScale = d3.scaleLinear().domain([0, maxVisitCount]).range([330, 50]);

    const xAxisSVG = svg.append("g").attr("transform", "translate(0, 330)");

    const yAxisSVG = svg.append("g").attr("transform", "translate(50 , 0)");

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat("%y-%b-%d"))
      .tickValues(sortedDate.map((d) => d.date));

    const yAxis = d3.axisLeft(yScale).tickSizeOuter(10).ticks(10);

    xAxis(xAxisSVG);
    yAxis(yAxisSVG);

    const tooltip = d3
      .select("#line-chart")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("width", "20px")
      .style("height", "20px")
      .style("text-align", "center")
      .style("color", "white")
      .style("border-radius", "20px")
      .style("background", "black");

    svg
      .selectAll("circle")
      .data(sortedDate)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.count))
      .attr("r", 5)
      .style("fill", "steelblue")
      .on("mouseover", (e, d) => {
        select(e.currentTarget).style("fill", "red");

        tooltip.style("visibility", "visible").text(`${d.count}`);
      })
      .on("mousemove", (e) => {
        tooltip
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 10 + "px");
      })
      .on("mouseout", (e) => {
        select(e.currentTarget).style("fill", "steelblue");

        tooltip.style("visibility", "hidden");
      });

    svg
      .append("path")
      .datum(sortedDate)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.date))
          .y((d) => yScale(d.count))
      );

    svg
      .append("text")
      .attr("x", -(height / 2))
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Date Visit Count");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 30)
      .attr("text-anchor", "middle")
      .text("Date");
  }, []);

  return (
    <div>
      <div>
        <Head message={"Visit Date"} />
      </div>
      <div id="line-chart">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
