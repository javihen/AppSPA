/**
 * APLICACIÓN PRINCIPAL
 * Coordinador de rutas y página de la aplicación
 */

class App {
    
    static currentPage = 'login';
    static currentUser = null;

    /**
     * Inicializar aplicación
     */
    static async init() {
        // Escuchar cambios de autenticación
        AuthService.onAuthStateChanged(async (user) => {
            window.currentUser = user;
            
            if (user) {
                // Usuario autenticado
                this.currentPage = 'dashboard';
            } else {
                // Usuario no autenticado
                this.currentPage = 'login';
            }
            
            this.render();
        });
    }

    /**
     * Renderizar página actual
     */
    static async render() {
        const app = document.getElementById('app');
        let html = '';

        try {
            switch (this.currentPage) {
                case 'login':
                    html = LoginPage.render();
                    app.innerHTML = html;
                    LoginPage.init();
                    break;

                case 'signup':
                    html = SignupPage.render();
                    app.innerHTML = html;
                    SignupPage.init();
                    break;

                case 'dashboard':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await Dashboard.render();
                    app.innerHTML = html;
                    Dashboard.init();
                    break;

                case 'clientas':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await ClientasPage.render();
                    app.innerHTML = html;
                    ClientasPage.init();
                    break;

                case 'empleadas':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await EmpleadasPage.render();
                    app.innerHTML = html;
                    EmpleadasPage.init();
                    break;

                case 'servicios':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await ServiciosPage.render();
                    app.innerHTML = html;
                    ServiciosPage.init();
                    break;

                case 'atenciones':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await AtencioneesPage.render();
                    app.innerHTML = html;
                    AtencioneesPage.init();
                    break;

                case 'reportes':
                    if (!window.currentUser) {
                        this.currentPage = 'login';
                        this.render();
                        return;
                    }
                    html = await ReportesPage.render();
                    app.innerHTML = html;
                    await ReportesPage.init();
                    break;

                default:
                    this.currentPage = 'dashboard';
                    this.render();
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            HelpersFunctions.showError('Error cargando página: ' + error.message);
        }
    }

    /**
     * Cambiar página
     */
    static changePage(page) {
        this.currentPage = page;
        this.render();
    }

    /**
     * Cerrar sesión
     */
    static async logout() {
        try {
            const result = await HelpersFunctions.confirmDelete('¿Deseas cerrar sesión?');
            if (!result.isConfirmed) return;

            HelpersFunctions.mostrarLoader();
            await AuthService.logout();
            HelpersFunctions.ocultarLoader();
            
            HelpersFunctions.showSuccess('Sesión cerrada correctamente');
            
            this.currentPage = 'login';
            this.render();
        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message);
        }
    }
}

// Inicializar cuando esté listo el DOM
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Exportar
window.App = App;
