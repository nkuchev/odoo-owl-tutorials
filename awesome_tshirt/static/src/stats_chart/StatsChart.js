/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef, onWillUnmount } from "@odoo/owl";
import { getColor } from "@web/views/graph/colors";
import { loadJS } from "@web/core/assets";

export class StatsChart extends Component {
    setup() {
        this.statsCanvasRef = useRef("stats-canvas");
        this.chart = null;

        this.labels = Object.keys(this.props.values);
        this.data = Object.values(this.props.values);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    onWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    onPartClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onSizeClick(this.labels[clickedIndex]);
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.statsCanvasRef.el, {
            type: "pie",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.env._t(this.props.label),
                        data: this.data,
                        backgroundColor: this.color,
                    },
                ],
            },
            options: {
                onClick: this.onPartClick.bind(this),
            },
        });
    }
}

StatsChart.template = "awesome_tshirt.StatsChart"
StatsChart.props = {
    values: { type: Object },
    onSizeClick: { type: Function },
};
