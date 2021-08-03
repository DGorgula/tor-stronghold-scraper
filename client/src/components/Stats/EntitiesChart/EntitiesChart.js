import * as React from 'react';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

export default class EntitiesChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    };
    componentDidMount(prevProps, prevState) {
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.rawData !== this.props.rawData) {
            this.getData();
        }
        if (prevState.data !== this.state.data && prevState.data.length > 0) {
            this.getData();
        }

    }

    getData = () => {
        const entityCount = {};
        const newDataState = [];
        this.props.rawData?.forEach((entity, i) => {
            if (entityCount[entity.type]) {
                entityCount[entity.type]++;
            }
            else {
                entityCount[entity.type] = 1
            }
            if (i === this.props.rawData.length - 1) {
                for (const key in entityCount) {
                    const entity = newDataState.find(e => {
                        return e.class === key
                    })
                    if (!entity) {
                        newDataState.push({ count: entityCount[key], class: key, })
                    }
                    else {
                        entity.count = entityCount[key];
                    }
                }
                this.setState({ data: newDataState, size: this.state.size })
            };
        })
    }
    render() {
        const { data: chartData } = this.state;
        const series = [
            { name: '', key: '', color: '' }
        ];
        const items = series.map(({ name, key, color }) => {
            return (
                <tr key={key}>
                    <td>
                    </td>
                    <td>{name}</td>
                </tr>
            )
        });
        return (
            <div className="chart-container">
                <Chart
                    data={chartData}
                    height={this.props.chosen ? 400 : 300}
                    width={this.props.chosen ? 700 : 400}
                    onMouseOver={() => {
                        if (!this.props.chosen) {
                            this.props.displayChart(<EntitiesChart rawData={this.props.rawData} chosen={true} displayChart={this.props.displayChart} />)
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
                    <ValueAxis />
                    <BarSeries
                        color="#42a5f5"
                        valueField="count"
                        argumentField="class"
                    />
                    <table>
                        <tbody className="empty">
                            {items}
                        </tbody>
                    </table>
                    <Title text="Pastes Classifications" />
                    <Animation />
                </Chart>
            </div>
        );
    }
}