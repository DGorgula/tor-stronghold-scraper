import * as React from 'react';
import {
    Chart,
    Title,
    ScatterSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { scaleTime } from 'd3-scale';

export default class DetailedLabelChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.rawData !== this.props.rawData) {
            this.getData();
            return;
        }
    }
    getData = () => {
        const newDataState = [];
        let pasteHighestLabel;
        this.props.rawData?.forEach((pasteData, i) => {
            pasteData.labels.forEach(l => {
                if (!pasteHighestLabel) return pasteHighestLabel = l;
                if (l.score > pasteHighestLabel?.score) {
                    pasteHighestLabel = l;
                }
            })
            newDataState.push({ [pasteHighestLabel.label]: pasteHighestLabel.score, date: new Date(pasteData.date).toLocaleDateString() })
            if (i === this.props?.rawData.length - 1) {
                this.setState({ data: newDataState });
            }
        })

    }
    render() {
        const { data: chartData } = this.state;
        const format = scale => scale.tickFormat(null, '%');
        const series = [
            { name: 'Children', key: 'children', color: '#42a5f5' },
            { name: 'Business', key: 'Business', color: '#822555' },
            { name: 'Government', key: 'Government', color: '#c45a5f' },
            { name: 'Other', key: 'Other', color: '#85b625' },
        ];
        const items = series.map(({ name, key, color }) => {
            return (
                <tr key={key}>
                    <td>
                        <svg width="10" height="10">
                            <circle cx="5" cy="5" r="5" fill={color} />
                        </svg>
                    </td>
                    <td>{name}</td>
                </tr>
            )
        });
        return (
            <div className="chart-container" >
                <Chart
                    data={chartData}
                    height={this.props.chosen ? 400 : 300}
                    width={this.props.chosen ? 700 : 500}
                    onMouseOver={() => {
                        if (!this.props.chosen) {
                            this.props.displayChart(<DetailedLabelChart rawData={this.props.rawData} chosen={true} displayChart={this.props.displayChart} />)
                        }
                    }} onMouseLeave={(e) => {
                        if (e.relatedTarget && e.relatedTarget.className && e.relatedTarget.className.includes && !e.relatedTarget.className.includes("chosen-stats")) {
                            this.props.displayChart(null)
                        }
                        else if (this.props.chosen) {
                            this.props.displayChart(null)
                        }
                    }}
                >
                    <ArgumentAxis showGrid factory={scaleTime} />
                    <ValueAxis tickFormat={format} />
                    <ScatterSeries
                        color="#85b625"
                        valueField="other"
                        argumentField="date"
                    />
                    <ScatterSeries
                        color="#42a5f5"
                        valueField="children"
                        argumentField="date"
                    />
                    <ScatterSeries
                        color="#822555"
                        valueField="business"
                        argumentField="date"
                    />
                    <ScatterSeries
                        color="#c45a5f"
                        valueField="goverment"
                        argumentField="date"
                    />
                    <table>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    <Title text="Detailed Label Scores" />
                    <Animation />
                </Chart>
            </div>
        );
    }
}
