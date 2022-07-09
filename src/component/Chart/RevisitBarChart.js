import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as d3 from "d3";
import { select } from "d3";

import { testResultState } from "../../recoil/atom";

export default function RevisitBarChart() {
  const svgRef = useRef();
  const resultData = useRecoilValue(testResultState);

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 60 };
    const chartWidth = 500 - margin.left - margin.right;
    const chartHeight = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .style("border", "1px solid black");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(resultData.length))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.8);

    svg
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((index) => resultData[index].url)
          .tickSizeOuter(0)
      );

    const yMaxValue = d3.max(resultData, (data) => data.revisitCount);
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
      .style("border-radius", "5px")
      .style("background-color", "black");

    const defaultBarColor = "blue";

    svg
      .append("g")
      .attr("fill", defaultBarColor)
      .selectAll("rect")
      .data(resultData)
      .join("rect")
      .attr("x", (data, index) => xScale(index))
      .attr("y", (data) => yScale(data.revisitCount))
      .attr("height", (data) => yScale(0) - yScale(data.revisitCount))
      .attr("width", xScale.bandwidth())
      .on("mouseover", (e, d) => {
        select(e.currentTarget).attr("fill", "red");

        tooltip.style("visibility", "visible").text(`${d.revisitCount}`);
      })
      .on("mousemove", (e) => {
        tooltip
          .style("top", e.pageY - 20 + "px")
          .style("left", e.pageX - 10 + "px");
      })
      .on("mouseout", (e) => {
        select(e.currentTarget).attr("fill", defaultBarColor);

        tooltip.style("visibility", "hidden");
      });

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
    <div id="bar-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
}
