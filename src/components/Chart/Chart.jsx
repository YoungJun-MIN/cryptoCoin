import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { select, scaleTime, extent, scaleLinear, min, max, line, area, curveLinear, axisBottom, axisLeft, timeFormat, timeDay, timeHour, bisector, pointer } from "d3";
import useResizeObserver from "@hooks/useResizeObserver"
import styles from '@components/Chart/Chart.module.css';
import debounce from "@/utils/debounce";
import { formatCurrency } from "@/utils/formatCurrency";

const selectPriceData = (state) => state.coinData.coinPrice.prices;
export default function Chart({ selectedTime }) {
  const prices = useSelector(selectPriceData);
  const svgRef = useRef();
  const tooltipRef = useRef();
  const wrapperRef = useRef();
  const chartContent = useRef();
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
    const day7Format = timeFormat("%d. %b");
    const day1Format = (d) => {
      const date = timeFormat("%d. %b")(d);
      const time = timeFormat("%H:%M")(d);
      return time === "00:00" ? date : time;
    };
    const xAxis = axisBottom(xScale)
      .tickSizeOuter(0)
      .ticks(selectedTime === '7D' ? timeDay.every(1) : timeHour.every(3)) // 7D는 일 단위, 24H는 시간 단위
      .tickFormat(selectedTime === '7D' ? day7Format : day1Format);
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

    //tooltip설정
    const circle = svg
      .selectAll(".circle")
      .data([null])
      .join("circle")
      .attr("r", 0)
      .attr("fill", "gray")
      .style("stoke", "#F3FAFF")
      .attr("opacity", 0.7)

    //tooltip line 설정
    let tooltipLine = svg.selectChild("#tooltop-line-y");
    if(tooltipLine.empty()) {
      tooltipLine = svg
      .append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-y")
      .attr("stroke", "#D5DBE0")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", 2.2);
    }

    const toolTip = () => {
      const target = svgContent;

      const handleMouseMove = (event) => {
        const svgRect = svg.node().getBoundingClientRect();
        let xCoordinate = event.clientX - svgRect.left; // 브라우저 기준 좌표 -> SVG 좌표로 변환
      
        if (xCoordinate < 0) xCoordinate = 0;
        if (xCoordinate > innerWidth) xCoordinate = innerWidth;

        const scaledX = xScale.invert(xCoordinate);
        const bisect = bisector((d) => new Date(d[0])).left;
        const index = bisect(prices, scaledX, 0);
        const [date, number] = prices[index];
        const [day, month, dateOfMonth, ,time] = new Date(date).toString().split(" ");
        const timeStamp = `${day}, ${month} ${dateOfMonth}, ${time.slice(0, -3)}`;

        //circle위치변경
        circle
          .attr("cx", xCoordinate)
          .attr("cy", yScale(number))
          .attr("r", 5);

        //line위치변경
        tooltipLine
          .style("display", "block")
            .attr("x1", xCoordinate)
            .attr("x2", xCoordinate)
            .attr("y2", innerHeight);

        //tooltip div 위치 및 내용 업데이트
        tooltipRef.current.style.display = "flex";
        tooltipRef.current.style.left = `${xCoordinate}px`;
        tooltipRef.current.style.top = `${yScale(number) - 50}px`;
        tooltipRef.current.querySelector("#xValue").innerText = `${timeStamp}`;
        tooltipRef.current.querySelector("#yValue").innerText = `${formatCurrency(Math.round(number))}`;
        tooltipRef.current.style.transition = "All 1s ease"
      }
      const debounceMouseMove = debounce(handleMouseMove, 10);

      //태그에 debounce함수적용
      target.on("mousemove", debounceMouseMove);
    }

    svgContent
    .selectAll(".myArea")
    .data([prices])
    .join("path")
    .attr("class", "myArea")
    .attr("stroke", "none")
    .attr("stroke-width", 2)
    .attr("fill", "url(#gradienta)")
    .attr("d", areaGenerator)
    .call(toolTip);

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
          <g ref={chartContent} className={`chart__content`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <div ref={tooltipRef} className={`tooltipBox ${styles.tooltipBox}`}>
          <span id="xValue"></span>
          <span id="yValue"></span>
        </div>
      </div>
    </>
  )
}