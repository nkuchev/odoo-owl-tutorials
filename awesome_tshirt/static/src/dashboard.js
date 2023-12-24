/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { Card } from "./card/card";
import { StatsChart } from "./stats_chart/StatsChart";
import { sprintf } from "@web/core/utils/strings";


class AwesomeDashboard extends Component {
    setup() {
        this.action = useService("action");
        this.clientService = useService("awesome_tshirt.statistics");

        this.keyToString = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        };
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        onWillStart(async () => {
            this.statistics = await this.clientService.loadStatistics();
        });
        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: 'awesome_tshirt.order',
            views: [[false, 'list'], [false, 'form'], [false, 'kanban']],
            domain: domain,
        });
    }

    openNewOrders() {
        this.openOrders(this.env._t("New Orders"), "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]");
    }

    openCancelledOrders() {
        this.openOrders(this.env._t("Cancelled Orders"),"[('size','=', ]");
    }
    onSizeClick(size) {
        const actionName = sprintf(this.env._t("Orders by %s size"), size);
        this.openOrders(this.env._t("Test Click"), `[('size','=', '${size}')]`);
    }

}

AwesomeDashboard.components = { Layout, Card, StatsChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
