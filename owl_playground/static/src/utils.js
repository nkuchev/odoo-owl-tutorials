/** @odoo-module **/

import { useRef, useEffect } from "@odoo/owl";

export function useAutofocus(refName) {
    const ref = useRef(refName || "autofocus");
    useEffect(
      (el) => el && el.focus(),
      () => [ref.el]
    );
}
