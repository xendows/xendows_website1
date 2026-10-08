/* =========================================================
   XENDOWS FRONT-END SECURITY / HARDENING
========================================================= */

"use strict";


/*
 * IMPORTANT:
 *
 * This file provides client-side deterrence and basic
 * browser-side protections.
 *
 * It CANNOT:
 *
 * - stop Kali Linux
 * - stop penetration-testing tools
 * - hide HTML/CSS/JavaScript
 * - hide PDFs or images
 * - prevent DevTools
 * - prevent source inspection
 * - prevent packet interception
 * - provide authentication
 * - provide server-side authorization
 * - protect secrets
 * - stop all hacking techniques
 *
 * Real security must be implemented server-side.
 */


/* =========================================================
   DISABLE CONTEXT MENU
========================================================= */

document.addEventListener(
    "contextmenu",
    function(event) {

        event.preventDefault();

    }
);


/* =========================================================
   BLOCK COMMON VIEW-SOURCE / DEVTOOLS SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        /*
         * F12
         */

        if (event.key === "F12") {

            event.preventDefault();

            return false;

        }


        /*
         * Ctrl + Shift + I
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "i"
        ) {

            event.preventDefault();

            return false;

        }


        /*
         * Ctrl + Shift + J
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "j"
        ) {

            event.preventDefault();

            return false;

        }


        /*
         * Ctrl + Shift + C
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "c"
        ) {

            event.preventDefault();

            return false;

        }


        /*
         * Ctrl + U
         */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "u"
        ) {

            event.preventDefault();

            return false;

        }

    }
);


/* =========================================================
   DISABLE DRAGGING OF IMAGES
========================================================= */

document.addEventListener(
    "dragstart",
    function(event) {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   PREVENT THE PAGE FROM BEING EMBEDDED IN AN IFRAME
========================================================= */

try {

    if (window.top !== window.self) {

        window.top.location =
            window.self.location;

    }

} catch (error) {

    /*
     * Ignore cross-origin frame errors.
     * Real frame protection should use
     * Content-Security-Policy:
     * frame-ancestors 'self'
     */

}


/* =========================================================
   BASIC EXTERNAL URL PROTECTION
========================================================= */

function isSafeLocalURL(url) {

    try {

        const parsed =
            new URL(
                url,
                window.location.href
            );


        /*
         * Allow only http/https and local
         * same-origin navigation.
         */

        if (
            parsed.protocol !== "http:" &&
            parsed.protocol !== "https:"
        ) {

            return false;

        }


        if (
            parsed.origin !==
            window.location.origin
        ) {

            return false;

        }


        return true;

    } catch (error) {

        return false;

    }

}


/* =========================================================
   PROTECT LOCAL PDF LINKS
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const link =
            event.target.closest("a");

        if (!link) {

            return;

        }


        const href =
            link.getAttribute("href");

        if (!href) {

            return;

        }


        /*
         * Prevent javascript: URLs.
         */

        if (
            href
                .trim()
                .toLowerCase()
                .startsWith("javascript:")
        ) {

            event.preventDefault();

            return false;

        }

    }
);


/* =========================================================
   SECURITY STATUS
========================================================= */

console.log(
    "Xendows front-end hardening loaded."
);