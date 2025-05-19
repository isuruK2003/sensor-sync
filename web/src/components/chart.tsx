import React, { useEffect, useRef } from 'react';
import { SensorData } from '../app/sensor-data';
import * as d3 from 'd3';

interface D3LinePlotProps {
    sensorData: SensorData[];
    height?: number;
    width?: number;
    className?: string;
}

export function D3LinePlot({ sensorData, height, width, className }: D3LinePlotProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const initialized = useRef(false);

    const xScaleRef = useRef(d3.scaleLinear());
    const yScaleRef = useRef(d3.scaleLinear());

    const colors: Record<keyof Pick<SensorData, 'x' | 'y' | 'z'>, string> = {
        x: 'rgb(255, 99, 132)',
        y: 'rgb(53, 162, 235)',
        z: 'rgb(75, 192, 192)'
    };

    useEffect(() => {
        if (!svgRef.current || sensorData.length === 0) return;

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        width = width ? width : svgRef.current.clientWidth;
        height = height ? height : svgRef.current.clientHeight;

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);

        if (!initialized.current) {
            svg.attr('width', width).attr('height', height);

            const g = svg.append('g')
                .attr('class', 'main-group')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`);
            g.append('g').attr('class', 'y-axis');

            ['x', 'y', 'z'].forEach(axisKey => {
                g.append('path')
                    .attr('class', `line-${axisKey}`)
                    .attr('fill', 'none')
                    .attr('stroke-width', 2);
            });

            initialized.current = true;
        }

        const g = svg.select<SVGGElement>('.main-group');

        // Update scales
        const xExtent = d3.extent(sensorData, d => d.t) as [number, number];
        const allValues = sensorData.flatMap(d => [d.x, d.y, d.z]);
        const yMin = d3.min(allValues) ?? 0;
        const yMax = d3.max(allValues) ?? 0;

        const xScale = xScaleRef.current.domain(xExtent).range([0, innerWidth]);
        const yScale = yScaleRef.current.domain([yMin, yMax]).range([innerHeight, 0]);

        const axisBottom = d3.axisBottom(xScale).ticks(6);
        const axisLeft = d3.axisLeft(yScale).ticks(6);

        g.select<SVGGElement>('.x-axis').call(axisBottom);
        g.select<SVGGElement>('.y-axis').call(axisLeft);

        const lineGenerator = (key: keyof SensorData) =>
            d3.line<SensorData>()
                .x(d => xScale(d.t))
                .y(d => yScale(d[key]))
                .curve(d3.curveCardinal);


        (['x', 'y', 'z'] as const).forEach(axisKey => {
            g.select<SVGPathElement>(`.line-${axisKey}`)
                .datum(sensorData)
                .attr('stroke', colors[axisKey])
                .attr('d', lineGenerator(axisKey));
        });

    }, [sensorData]);

    return <svg ref={svgRef} className={className} />;
}
