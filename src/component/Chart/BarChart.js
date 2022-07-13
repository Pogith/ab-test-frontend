import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3";

export default function BarChart({ resultData }) {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 60 };
    const chartWidth = 500 - margin.left - margin.right;
    const chartHeight = 400 - margin.top - margin.bottom;
    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth + margin.right + margin.left)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .style("border", "1px solid black");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(resultData.length))
      .range([0, chartWidth + margin.right + margin.left + margin.top])
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

    const yMaxValue = d3.max(resultData, (d) => d.visitCount);
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
      .style("color", "white")
      .style("width", "20px")
      .style("height", "20px")
      .style("text-align", "center")
      .style("border-radius", "10px")
      .style("background-color", "blue");

    const defaultBarColor = "#69b3a2";

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
        select(e.currentTarget).attr("fill", "yellow");

        tooltip.style("visibility", "visible").text(`${d.visitCount}`);
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
      .attr("y", (d) => yScale(d.visitCount))
      .attr("height", (d) => yScale(0) - yScale(d.visitCount))
      .delay((d, i) => i * 100);

    svg
      .append("text")
      .attr("x", -(chartHeight / 2))
      .attr("y", margin.left / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Visitors");

    svg
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight + margin.top)
      .attr("text-anchor", "middle")
      .text("Test URL");
  }, []);

  return (
    <div id="bar-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
}
