/** @odoo-module **/

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";
import { session } from "@web/session";


export const ClientService = {
    orderStats: session.order_stats || {},
    dependencies: ["rpc"],
    async: ["loadStatistics"],
    start(env, { rpc }) {
        return {
            loadStatistics:  memoize(() => {
                if (this.orderStats) {
                    return this.orderStats;
                } else {
                    return rpc("/awesome_tshirt/statistics");
                }
            }),
        }
    },
};

registry.category("services").add("awesome_tshirt.statistics", ClientService);
