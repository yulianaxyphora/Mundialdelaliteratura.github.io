document.addEventListener("DOMContentLoaded", function () {

    const menuPrincipal = document.querySelector(".menu-principal");

    const enlacesMenu = document.querySelectorAll(".enlaces-menu a");

    const enlacesInternos = document.querySelectorAll('a[href^="#"]');

    const botonMenu = document.querySelector(".boton-menu");

    const contenedorMenu = document.querySelector(".enlaces-menu");

    const secciones = document.querySelectorAll("main section");

    const videoFondo = document.querySelector(".video-fondo");

    const imagenesGaleria = document.querySelectorAll(".imagen-galeria");

    const tarjetas = document.querySelectorAll(
        ".tarjeta-nosotros, .tarjeta-taller, .detalle-taller"
    );

    const formularioNeon = document.querySelector(".formulario-neon");

    const botonEnviarNeon = document.querySelector(".boton-enviar-neon");

    const camposFormularioNeon = document.querySelectorAll(
        ".grupo-campo input, .grupo-campo textarea"
    );


    function obtenerAlturaMenu() {

        if (menuPrincipal) {

            return menuPrincipal.offsetHeight;

        }

        return 0;

    }


    enlacesInternos.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const destinoId = enlace.getAttribute("href");

            if (!destinoId || destinoId === "#") {

                return;

            }

            const destino = document.querySelector(destinoId);

            if (!destino) {

                return;

            }

            evento.preventDefault();

            const alturaMenu = obtenerAlturaMenu();

            const posicion =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaMenu -
                18;

            window.scrollTo({

                top: Math.max(posicion, 0),

                behavior: "smooth"

            });

            if (contenedorMenu) {

                contenedorMenu.classList.remove("abierto");

            }

            if (botonMenu) {

                botonMenu.classList.remove("activo");

                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    function obtenerSeccionActual() {

        const alturaMenu = obtenerAlturaMenu();

        const puntoLectura =
            window.scrollY +
            alturaMenu +
            170;

        let seccionActual = "inicio";

        const inicio = document.querySelector("#inicio");

        const nosotros = document.querySelector("#nosotros");

        const talleres = document.querySelector("#talleres");

        const informacionTalleres =
            document.querySelector("#informacion-talleres");

        const galeria = document.querySelector("#galeria");

        const contacto = document.querySelector("#contacto");


        if (
            inicio &&
            puntoLectura <
            inicio.offsetTop + inicio.offsetHeight
        ) {

            return "inicio";

        }


        if (
            nosotros &&
            puntoLectura >= nosotros.offsetTop &&
            puntoLectura <
            nosotros.offsetTop + nosotros.offsetHeight
        ) {

            return "nosotros";

        }


        if (
            talleres &&
            puntoLectura >= talleres.offsetTop &&
            informacionTalleres &&
            puntoLectura <
            informacionTalleres.offsetTop +
            informacionTalleres.offsetHeight
        ) {

            return "talleres";

        }


        if (
            galeria &&
            puntoLectura >= galeria.offsetTop &&
            puntoLectura <
            galeria.offsetTop + galeria.offsetHeight
        ) {

            return "galeria";

        }


        if (
            contacto &&
            puntoLectura >= contacto.offsetTop
        ) {

            return "contacto";

        }


        return seccionActual;

    }


    function actualizarMenuActivo() {

        const seccionActual = obtenerSeccionActual();

        enlacesMenu.forEach(function (enlace) {

            enlace.classList.remove("activo");

            if (
                enlace.getAttribute("href") ===
                "#" + seccionActual
            ) {

                enlace.classList.add("activo");

            }

        });

    }


    function actualizarMenuSuperior() {

        if (!menuPrincipal) {

            return;

        }

        if (window.scrollY > 60) {

            menuPrincipal.classList.add("menu-desplazado");

        } else {

            menuPrincipal.classList.remove("menu-desplazado");

        }

    }


    if (botonMenu && contenedorMenu) {

        botonMenu.addEventListener("click", function () {

            const abierto =
                contenedorMenu.classList.toggle("abierto");

            botonMenu.classList.toggle(
                "activo",
                abierto
            );

            botonMenu.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

        });

    }


    document.addEventListener("click", function (evento) {

        if (
            menuPrincipal &&
            contenedorMenu &&
            botonMenu &&
            !menuPrincipal.contains(evento.target)
        ) {

            contenedorMenu.classList.remove("abierto");

            botonMenu.classList.remove("activo");

            botonMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    const elementosRevelar = document.querySelectorAll(

        ".encabezado-seccion, " +
        ".introduccion-nosotros, " +
        ".tarjeta-nosotros, " +
        ".tarjeta-taller, " +
        ".detalle-taller, " +
        ".elemento-galeria, " +
        ".mensaje-contacto, " +
        ".datos-contacto, " +
        ".panel-formulario-neon, " +
        ".intro-formulario, " +
        ".formulario-neon"

    );


    elementosRevelar.forEach(function (elemento) {

        elemento.classList.add("revelar");

    });


    const observador = new IntersectionObserver(

        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },

        {

            threshold: 0.10,

            rootMargin: "0px 0px -40px 0px"

        }

    );


    elementosRevelar.forEach(function (elemento) {

        observador.observe(elemento);

    });


    const barraProgreso =
        document.createElement("div");

    barraProgreso.id =
        "barra-progreso";

    document.body.appendChild(
        barraProgreso
    );


    function actualizarBarraProgreso() {

        const desplazamiento =
            window.scrollY ||
            document.documentElement.scrollTop;

        const alturaDocumento =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        let porcentaje = 0;

        if (alturaDocumento > 0) {

            porcentaje =
                desplazamiento /
                alturaDocumento *
                100;

        }

        barraProgreso.style.width =
            porcentaje + "%";

    }


    const botonArriba =
        document.createElement("button");

    botonArriba.id =
        "volver-arriba";

    botonArriba.type =
        "button";

    botonArriba.innerHTML =
        "↑";

    botonArriba.setAttribute(
        "aria-label",
        "Volver al inicio"
    );

    document.body.appendChild(
        botonArriba
    );


    botonArriba.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );


    function actualizarBotonArriba() {

        if (window.scrollY > 550) {

            botonArriba.classList.add(
                "mostrar"
            );

        } else {

            botonArriba.classList.remove(
                "mostrar"
            );

        }

    }


    let visorActivo = null;


    imagenesGaleria.forEach(function (imagen) {

        imagen.addEventListener(
            "click",
            function () {

                abrirVisor(imagen);

            }

        );

    });


    function abrirVisor(imagen) {

        cerrarVisor();

        const figura =
            imagen.closest("figure");

        let texto = imagen.alt;

        if (
            figura &&
            figura.querySelector("figcaption")
        ) {

            texto =
                figura.querySelector(
                    "figcaption"
                ).innerText;

        }

        const visor =
            document.createElement("div");

        visor.classList.add(
            "visor-imagen"
        );

        const contenido =
            document.createElement("div");

        contenido.classList.add(
            "contenido-visor"
        );

        const imagenGrande =
            document.createElement("img");

        imagenGrande.src =
            imagen.src;

        imagenGrande.alt =
            imagen.alt;

        const descripcion =
            document.createElement("p");

        descripcion.classList.add(
            "descripcion-visor"
        );

        descripcion.textContent =
            texto;

        const cerrar =
            document.createElement("button");

        cerrar.type =
            "button";

        cerrar.classList.add(
            "cerrar-visor"
        );

        cerrar.innerHTML =
            "×";

        cerrar.setAttribute(
            "aria-label",
            "Cerrar imagen"
        );

        contenido.appendChild(
            imagenGrande
        );

        contenido.appendChild(
            descripcion
        );

        visor.appendChild(
            contenido
        );

        visor.appendChild(
            cerrar
        );

        document.body.appendChild(
            visor
        );

        document.body.classList.add(
            "sin-scroll"
        );

        visorActivo =
            visor;


        cerrar.addEventListener(
            "click",
            cerrarVisor
        );


        visor.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target === visor
                ) {

                    cerrarVisor();

                }

            }

        );

    }


    function cerrarVisor() {

        if (!visorActivo) {

            return;

        }

        visorActivo.remove();

        visorActivo = null;

        document.body.classList.remove(
            "sin-scroll"
        );

    }


    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                visorActivo
            ) {

                cerrarVisor();

            }

        }

    );


    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener(
            "mouseenter",
            function () {

                tarjeta.classList.add(
                    "seleccionado"
                );

            }

        );


        tarjeta.addEventListener(
            "mouseleave",
            function () {

                tarjeta.classList.remove(
                    "seleccionado"
                );

            }

        );

    });


    camposFormularioNeon.forEach(function (campo) {

        campo.addEventListener(
            "focus",
            function () {

                const grupo =
                    campo.closest(".grupo-campo");

                if (grupo) {

                    grupo.classList.add(
                        "campo-activo"
                    );

                }

            }

        );


        campo.addEventListener(
            "blur",
            function () {

                const grupo =
                    campo.closest(".grupo-campo");

                if (grupo) {

                    grupo.classList.remove(
                        "campo-activo"
                    );

                }

            }

        );

    });


    if (formularioNeon && botonEnviarNeon) {

        formularioNeon.addEventListener(
            "submit",
            function () {

                botonEnviarNeon.textContent =
                    "Enviando...";

                botonEnviarNeon.classList.add(
                    "enviando"
                );

                botonEnviarNeon.disabled =
                    true;

            }

        );

    }


    if (videoFondo) {

        videoFondo.muted = true;

        videoFondo.defaultMuted = true;

        videoFondo.setAttribute(
            "muted",
            ""
        );

        videoFondo.setAttribute(
            "playsinline",
            ""
        );

        const reproduccion =
            videoFondo.play();

        if (
            reproduccion &&
            typeof reproduccion.catch ===
            "function"
        ) {

            reproduccion.catch(
                function () {

                    videoFondo.muted = true;

                }

            );

        }

    }


    window.addEventListener(
        "scroll",
        function () {

            actualizarMenuSuperior();

            actualizarMenuActivo();

            actualizarBarraProgreso();

            actualizarBotonArriba();

        },

        {

            passive: true

        }

    );


    window.addEventListener(
        "resize",
        function () {

            actualizarMenuActivo();

            actualizarBarraProgreso();

            if (
                window.innerWidth > 850 &&
                contenedorMenu &&
                botonMenu
            ) {

                contenedorMenu.classList.remove(
                    "abierto"
                );

                botonMenu.classList.remove(
                    "activo"
                );

                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    );


    actualizarMenuSuperior();

    actualizarMenuActivo();

    actualizarBarraProgreso();

    actualizarBotonArriba();

});
