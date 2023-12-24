/** @odoo-module **/

import { registry } from "@web/core/registry";
import { session } from "@web/session";

const { reactive } = owl;


export const ClientService = {
    orderStats: session.order_stats || {},
    dependencies: ["rpc"],
    async: ["loadStatistics"],
    async start(env, { rpc }) {
        const statistics = reactive({});

        if (this.orderStats) {
            Object.assign(statistics, this.orderStats);
        } else {
            Object.assign(statistics, await rpc("/awesome_tshirt/statistics"));
        }

        setInterval(async () => {
            Object.assign(statistics, await rpc("/awesome_tshirt/statistics"));
        }, 30000);

        return {
            statistics,
        }
    },
};

registry.category("services").add("awesome_tshirt.statistics", ClientService);
