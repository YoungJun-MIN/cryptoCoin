import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { select, scaleTime, timeParse, extent, scaleLinear, min, max, line, area, curveLinear } from "d3";
import priceData from "@api/price.json"
const selectPriceData = (state) => state.coinData;
export default function Chart() {
  const coinData = useSelector(selectPriceData);
  const svgRef = useRef();
  const wrapperRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select(".chart__content");
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    console.log(width);
    console.log(height);
    const xScale = scaleTime()
      .domain(extent(priceData, (item) => {
          const [timeStamp] = item;
          return new Date(timeStamp)
        }
      ))
      .range([0, width - 0]);

    const yScale = scaleLinear()
      .domain([min(priceData, (item) => {
          const [, price] = item;
          return price;
        }), max(priceData, (item) => {
          const [,price] = item;
          return price;
        })
      ])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((item) => {
        const [timeStamp] = item;
        return xScale(new Date(timeStamp));
      })
      .y((item) => {
        const [,price] = item;
        return yScale(price);
      })
      .curve(curveLinear);

    const areaGenerator = area()
    .x((item) => {
      const [timeStamp] = item;
      return xScale(new Date(timeStamp));
    })
    .y0(height)
    .y1((item) => {
      const [,price] = item;
      return yScale(price);
    })
    .curve(curveLinear);

    svgContent
    .selectAll(".myArea")
    .data([priceData])
    .join("path")
    .attr("class", "myArea")
    .attr("stroke", "none")
    .attr("stroke-width", 2)
    .attr("fill", "url(#gradienta)")
    .attr("d", areaGenerator)

    svgContent
    .selectAll(".myLine")
    .data([priceData])
    .join("path")
    .attr("class", "myLine")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", lineGenerator)
  }, [])
  return (
    <>
      <div id="chart__container" ref={wrapperRef}>
        <svg ref={svgRef} width="100%" height="100%">
          <defs>
            <linearGradient id="gradienta" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#84CBFF", stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: "#DCDCDC", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <g className="chart__content"></g>
        </svg>
      </div>
    </>
  )
}