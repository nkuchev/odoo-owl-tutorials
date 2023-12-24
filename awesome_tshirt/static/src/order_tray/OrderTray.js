/** @odoo-module **/

import { registry } from "@web/core/registry";

import { Component, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";


export class OrderTray extends Component {
    setup() {
        this.action = useService("action");
        this.clientService = useService("awesome_tshirt.statistics");
        onWillStart(async () => {
            this.statistics = await this.clientService.loadStatistics();
        });
    }
    onClick() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: this.env._t("New Orders"),
            res_model: "awesome_tshirt.order",
            views: [[false, 'list'], [false, 'form'], [false, 'kanban']],
            domain: "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]",
        });
    }
}

OrderTray.template = "awesome_tshirt.OrderTray"

export const systrayItem = {
    Component: OrderTray,
};

registry.category("systray").add("awesome_tshirt.order_tray", systrayItem, { sequence: 1000 });
