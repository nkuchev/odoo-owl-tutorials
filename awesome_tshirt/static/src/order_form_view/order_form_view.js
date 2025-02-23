/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { formView } from '@web/views/form/form_view';
import { FormController } from '@web/views/form/form_controller';
import { useDebounced } from "@web/core/utils/timing";


class OrderFormController extends FormController {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.notificationService = useService("notification");
        this.debouncedPrintLabel = useDebounced(this.printLabel, 500);
    }

    async printLabel() {
        const result = await this.orm.call(this.model.root.resModel, "print_label", [this.model.root.resId])
        if (result) {
            this.notificationService.add(this.env._t("Label successfully printed"));
        } else {
            this.notificationService.add(this.env._t("Could not print the label"), {
                type: "danger",
                sticky: true,
            });
        }

        return result;
    }

    get isPrintBtnPrimary() {
        return (
            this.model.root.data &&
            this.model.root.data.customer_id &&
            this.model.root.data.state === "printed"
        );
    }
}

OrderFormController.template = "awesome_tshirt.order_form_view";

export const orderFormView = {
    ...formView,
    Controller: OrderFormController,
}


registry.category("views").add("awesome_tshirt.order_form_view", orderFormView);
