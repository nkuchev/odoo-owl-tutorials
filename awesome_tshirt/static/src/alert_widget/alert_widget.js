/** @odoo-module **/

import { registry } from "@web/core/registry";
import { markup, Component } from "@odoo/owl";

export class AlertWidget extends Component {
    get warnings() {
        const warningsList = [];
        if (this.props.record.data.image_url.length === 0) {
            warningsList.push(
                markup("There is no <b>image</b>")
            );
        }
        if (this.props.record.data.amount > 100) {
            warningsList.push(markup("Add promotional <b>material</b>"));
        }
        return warningsList;
    }
}

AlertWidget.template = "awesome_tshirt.AlertWidget";
AlertWidget.fieldDependencies = {
    image_url: { type: "char" },
    amount: { type: "float" },
};

registry.category("view_widgets").add("alert_widget", AlertWidget);
