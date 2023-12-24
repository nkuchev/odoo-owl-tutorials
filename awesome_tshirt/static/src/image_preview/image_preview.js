/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { CharField } from "@web/views/fields/char/char_field";


class ImagePreview extends Component {}

ImagePreview.template = "awesome_tshirt.ImagePreview";
ImagePreview.components = { CharField };
ImagePreview.supportedTypes = ["char"];
// ImagePreview.props = {
//     ...standardFieldProps,
// }

registry.category("fields").add("ImagePreview", ImagePreview);
