/** @odoo-module **/


import { ControlPanel } from "@web/search/control_panel/control_panel";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { useService } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";

patch(ControlPanel.prototype, "control_panel_big_brother", {
    setup() {
        this._super.apply();
        this.dialogService = useService("dialog");
    },
    onClickBigBrother() {
        this.dialogService.add(ConfirmationDialog, {
            body: this.env._t("Bafien is watching you. This interaction is recorded and may be used in legal proceedings if necessary. Do you agree to these terms?"),
            confirm: () => {},
        });
    },
});
