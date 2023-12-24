from odoo import models


class IrHttp(models.AbstractModel):
    _inherit = "ir.http"

    def session_info(self):
        res = super().session_info()
        if self.env.user._is_internal():
            res["order_stats"] = self.env["awesome_tshirt.order"].get_statistics()
        return res
