/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { BooleanField } from "@web/views/fields/boolean/boolean_field";


class WarningBooleanField extends Component {}

WarningBooleanField.template = "awesome_tshirt.WarningBooleanField";
WarningBooleanField.components = { BooleanField };
WarningBooleanField.supportedTypes = ["boolean"];

registry.category("fields").add("warning_boolean", WarningBooleanField);
