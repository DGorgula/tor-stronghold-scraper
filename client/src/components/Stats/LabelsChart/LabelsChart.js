import * as React from 'react';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, Stack } from '@devexpress/dx-react-chart';

export default class LabelsChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    };
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
        this.props.rawData?.forEach((labelData, i) => {
            switch (labelData.type) {
                case "highest":
                    newDataState.push({ highestScore: labelData.score, highestLabel: labelData.label })
                    break;
                case "lowest":
                    newDataState.push({ lowestScore: labelData.score, lowestLabel: labelData.label })
                    break;
                case "average":
                    newDataState.push({ averageScore: labelData.score, averageLabel: labelData.label })
                    break;
                default:
                    break;
            }
            if (i === this.props.rawData.length - 1) {
                this.setState({ data: newDataState });
            }
        });
    }
    render() {
        const { data: chartData } = this.state;
        const format = scale => scale.tickFormat(null, '%');
        const series = [
            { name: 'Highest', key: 'Highest', color: '#85b625' },
            { name: 'Average', key: 'Average', color: '#822555' },
            { name: 'Lowest', key: 'Lowest', color: '#42a5f5' }
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
                    width={this.props.chosen ? 700 : 400}
                    onMouseOver={() => {
                        if (!this.props.chosen) {
                            this.props.displayChart(<LabelsChart rawData={this.props.rawData} chosen={true} displayChart={this.props.displayChart} />)
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
                    <ArgumentAxis />
                    <ValueAxis tickFormat={format} />

                    <BarSeries
                        name="highest"
                        color="#85b625"
                        valueField="highestScore"
                        argumentField="highestLabel"
                    />
                    <BarSeries
                        name="average"
                        color="#822555"
                        valueField="averageScore"
                        argumentField="averageLabel"
                    />
                    <BarSeries
                        name="lowest"
                        color="#42a5f5"
                        valueField="lowestScore"
                        argumentField="lowestLabel"
                    />
                    <table>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    <Title text="Label Scores" />
                    <Animation />
                    <Stack />
                </Chart>
            </div>
        );
    }
}