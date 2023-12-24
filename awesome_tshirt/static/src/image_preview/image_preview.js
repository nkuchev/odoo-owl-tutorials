/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { CharField } from "@web/views/fields/char/char_field";
import { useService } from "@web/core/utils/hooks";
import { useCommand } from "@web/core/commands/command_hook";


class ImagePreview extends Component {
    setup() {
        this.commandService = useService("command");
        useCommand(
            this.env._t("Open image in new tab"),
            () => {
                if (this.props.value) {
                    window.open(this.props.value, "_blank");
                }
            }
        )
    }
}

ImagePreview.template = "awesome_tshirt.ImagePreview";
ImagePreview.components = { CharField };
ImagePreview.supportedTypes = ["char"];
// ImagePreview.props = {
//     ...standardFieldProps,
// }

registry.category("fields").add("ImagePreview", ImagePreview);
