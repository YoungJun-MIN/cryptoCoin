import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { select, scaleTime, timeParse, extent, scaleLinear, min, max, line, area, curveLinear, axisBottom, axisLeft, timeFormat } from "d3";
import useResizeObserver from "@hooks/useResizeObserver"
import styles from '@components/Chart/Chart.module.css';
const selectPriceData = (state) => state.coinData.coinPrice.prices;
export default function Chart({ selectedTime }) {
  console.log(`selectedTime: `, selectedTime);
  const prices = useSelector(selectPriceData);
  console.log(`prices: `, prices);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select(".chart__content");
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    const margin = { top: 40, right: 40, bottom: 40, left: 50};
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = scaleTime()
      .domain(extent(prices, (item) => {
          const [timeStamp] = item;
          return new Date(timeStamp)
        }
      ))
      .range([0, innerWidth - 0]);

    const yScale = scaleLinear()
      .domain([min(prices, (item) => {
          const [, price] = item;
          return price * 0.99;
        }), max(prices, (item) => {
          const [,price] = item;
          return price * 1.01;
        })
      ])
      .range([innerHeight - 0, 0]);

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
    .y0(innerHeight)
    .y1((item) => {
      const [,price] = item;
      return yScale(price);
    })
    .curve(curveLinear);
    svg
      .attr("width", width - margin.left)
      .attr("height", height - margin.top)
      .attr("transform", `translate(${margin.left}, 20)`)

    // Axes
    const xAxis = axisBottom(xScale)
      .tickSizeOuter(0)
      .tickFormat(timeFormat("%H:%M"));
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickSize(-innerWidth) // 눈금선 길이 설정 (가로 길이)
      .tickPadding(10); // 눈금선과 레이블 사이에 10px 간격 추가
    svg.select(".y-axis")
    .call(yAxis)
    // .selectAll(".domain, .tick line") // y축 선과 눈금선 동시에 선택
    .selectAll(".domain") // y축선 제거
    .remove()

    svg.selectAll(".y-axis .tick line")
      .attr("stroke", "#ccc") // 그리드 선 색상 (연한 회색)
      .attr("stroke-dasharray", "3,3"); // 점선 스타일 (선택 사항)

    svgContent
    .selectAll(".myArea")
    .data([prices])
    .join("path")
    .attr("class", "myArea")
    .attr("stroke", "none")
    .attr("stroke-width", 2)
    .attr("fill", "url(#gradienta)")
    .attr("d", areaGenerator)

    svgContent
    .selectAll(".myLine")
    .data([prices])
    .join("path")
    .attr("class", "myLine")
    .attr("stroke", "#664DFF")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", lineGenerator)
  }, [dimensions, prices])
  return (
    <>
      <div id="chart__wrapper" className={`${styles.chartWrapper}`} ref={wrapperRef}>
        <svg ref={svgRef} className={`${styles.svg}`}>
          <defs>
            <linearGradient id="gradienta" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#A1B0FC", stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: "#D0B5FF", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <g className={`chart__content`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  )
}