/* =========================================================
   XENDOWS
   Main Website JavaScript
========================================================= */

"use strict";


/* =========================================================
   RESOURCE DATA
========================================================= */

const resources = [

    {
        number: "01",
        title: "Note Title 01",
        image: "note-01.jpeg",
        pdf: "note-01.pdf"
    },

    {
        number: "02",
        title: "Note Title 02",
        image: "note-02.jpg",
        pdf: "note-02.pdf"
    },

    {
        number: "03",
        title: "Note Title 03",
        image: "note-03.jpg",
        pdf: "note-03.pdf"
    },

    {
        number: "04",
        title: "Note Title 04",
        image: "note-04.jpg",
        pdf: "note-04.pdf"
    },

    {
        number: "05",
        title: "Note Title 05",
        image: "note-05.jpg",
        pdf: "note-05.pdf"
    },

    {
        number: "06",
        title: "Note Title 06",
        image: "note-06.jpg",
        pdf: "note-06.pdf"
    },

    {
        number: "07",
        title: "Note Title 07",
        image: "note-07.jpg",
        pdf: "note-07.pdf"
    },

    {
        number: "08",
        title: "Note Title 08",
        image: "note-08.jpg",
        pdf: "note-08.pdf"
    },

    {
        number: "09",
        title: "Note Title 09",
        image: "note-09.jpg",
        pdf: "note-09.pdf"
    },

    {
        number: "10",
        title: "Note Title 10",
        image: "note-10.jpg",
        pdf: "note-10.pdf"
    },

    {
        number: "11",
        title: "Note Title 11",
        image: "note-11.jpg",
        pdf: "note-11.pdf"
    },

    {
        number: "12",
        title: "Note Title 12",
        image: "note-12.jpg",
        pdf: "note-12.pdf"
    }

];


/* =========================================================
   DETECT CURRENT PAGE
========================================================= */

const currentPage = window.location.pathname.toLowerCase();

const isCoursesPage =
    currentPage.includes("courses.html");


/* =========================================================
   PATHS
========================================================= */

const assetImagePath = isCoursesPage
    ? "../assets/images/"
    : "assets/images/";

const assetPdfPath = isCoursesPage
    ? "../assets/pdfs/"
    : "assets/pdfs/";

const pdfViewerPath = isCoursesPage
    ? "pdf-viewer.html"
    : "pages/pdf-viewer.html";


/* =========================================================
   CREATE RESOURCE CARD
========================================================= */

function createResourceCard(resource) {

    const card = document.createElement("article");

    card.className = "resource-card";


    /* ---------------------------------------------
       Image area
    ---------------------------------------------- */

    const imageArea = document.createElement("div");

    imageArea.className = "resource-image-area";


    /* ---------------------------------------------
       Image
    ---------------------------------------------- */

    const image = document.createElement("img");

    image.className = "resource-image";

    image.src =
        assetImagePath +
        resource.image;

    image.alt =
        resource.title;


    /* ---------------------------------------------
       Title
    ---------------------------------------------- */

    const title = document.createElement("div");

    title.className = "resource-title";

    title.textContent =
        resource.title;


    imageArea.appendChild(image);

    imageArea.appendChild(title);


    /* ---------------------------------------------
       Actions
    ---------------------------------------------- */

    const actions = document.createElement("div");

    actions.className = "resource-actions";


    /* ---------------------------------------------
       PDF viewer URL
    ---------------------------------------------- */

    const pdfPath =
        assetPdfPath +
        resource.pdf;

    const viewerURL =
        pdfViewerPath +
        "?pdf=" +
        encodeURIComponent(pdfPath);


    /* ---------------------------------------------
       View button
    ---------------------------------------------- */

    const viewButton =
        document.createElement("a");

    viewButton.className =
        "resource-button";

    viewButton.href =
        viewerURL;

    viewButton.target =
        "_blank";

    viewButton.rel =
        "noopener noreferrer";

    viewButton.textContent =
        "View";


    /* ---------------------------------------------
       Download button
    ---------------------------------------------- */

    const downloadButton =
        document.createElement("a");

    downloadButton.className =
        "resource-button";

    downloadButton.href =
        pdfPath;

    downloadButton.download =
        resource.pdf;

    downloadButton.textContent =
        "Download";


    /* ---------------------------------------------
       Add actions
    ---------------------------------------------- */

    actions.appendChild(viewButton);

    actions.appendChild(downloadButton);


    /* ---------------------------------------------
       Add card content
    ---------------------------------------------- */

    card.appendChild(imageArea);

    card.appendChild(actions);


    return card;

}


/* =========================================================
   RENDER RESOURCES
========================================================= */

function renderResources() {

    const notesContainer =
        document.getElementById("notesContainer");

    const coursesContainer =
        document.getElementById("coursesContainer");


    let container = null;


    if (notesContainer) {

        container =
            notesContainer;

    }


    if (coursesContainer) {

        container =
            coursesContainer;

    }


    if (!container) {

        return;

    }


    resources.forEach(function(resource) {

        const card =
            createResourceCard(resource);

        container.appendChild(card);

    });

}


/* =========================================================
   MOBILE HAMBURGER
========================================================= */

function setupHamburger() {

    const hamburger =
        document.getElementById("hamburger");

    const navOptions =
        document.getElementById("navOptions");


    if (!hamburger || !navOptions) {

        return;

    }


    hamburger.addEventListener(
        "click",
        function() {

            const isOpen =
                navOptions.classList.toggle("show");


            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    /* Close menu after navigation */

    const links =
        navOptions.querySelectorAll(".nav-link");


    links.forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                navOptions.classList.remove(
                    "show"
                );

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

function closeMenuOutside() {

    document.addEventListener(
        "click",
        function(event) {

            const hamburger =
                document.getElementById("hamburger");

            const navOptions =
                document.getElementById("navOptions");


            if (!hamburger || !navOptions) {

                return;

            }


            if (
                !navOptions.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {

                navOptions.classList.remove(
                    "show"
                );

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderResources();

        setupHamburger();

        closeMenuOutside();

    }
);