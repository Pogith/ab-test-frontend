import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3";

import Head from "../common/Head/Head";

export default function RevisitBarChart({ resultData }) {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 60 };
    const chartWidth = 500 - margin.left - margin.right;
    const chartHeight = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth + margin.right + margin.left)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .style("border", "1px solid black")
      .style("border-radius", "10px")
      .style("box-shadow", "10px 10px 5px -2px rgba(103, 103, 103, 0.7)");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(resultData.length))
      .range([20, chartWidth + margin.right + margin.left + margin.top])
      .padding(0.8);

    svg
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((i) => resultData[i].url)
          .tickSizeOuter(0)
      );

    const yMaxValue = d3.max(resultData, (d) => d.revisitCount);
    const yScale = d3
      .scaleLinear()
      .domain([0, yMaxValue])
      .range([chartHeight, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left})`)
      .call(d3.axisLeft(yScale));

    const tooltip = d3
      .select("#bar-chart")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("width", "20px")
      .style("height", "20px")
      .style("text-align", "center")
      .style("color", "white")
      .style("border-radius", "10px")
      .style("background-color", "black");

    const defaultBarColor = "darkcyan";

    svg
      .append("g")
      .attr("fill", defaultBarColor)
      .selectAll("rect")
      .data(resultData)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(0))
      .attr("height", (d) => yScale(0) - chartHeight)
      .on("mouseover", (e, d) => {
        select(e.currentTarget).attr("fill", "red");

        tooltip.style("visibility", "visible").text(`${d.revisitCount}`);
      })
      .on("mousemove", (e) => {
        tooltip
          .style("top", e.pageY - 25 + "px")
          .style("left", e.pageX - 10 + "px");
      })
      .on("mouseout", (e) => {
        select(e.currentTarget).attr("fill", defaultBarColor);

        tooltip.style("visibility", "hidden");
      });

    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => yScale(d.revisitCount))
      .attr("height", (d) => yScale(0) - yScale(d.revisitCount))
      .delay((d, i) => i * 100);

    svg
      .append("text")
      .attr("x", -(chartHeight / 2))
      .attr("y", margin.left / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Revisitors");

    svg
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight + margin.top)
      .attr("text-anchor", "middle")
      .text("Test URL");
  }, []);

  return (
    <div>
      <div>
        <Head message={"Revisit"} />
      </div>
      <div id="bar-chart">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
