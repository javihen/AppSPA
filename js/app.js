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
    // Verificar modo demo y mostrar banner
    if (DatabaseService.isLocalStorage) {
        const banner = document.createElement('div');
        banner.id = 'demo-banner';
        banner.innerHTML = `
            <div style="background: linear-gradient(90deg, #ec4899 0%, #a78bfa 100%); color: white; padding: 10px; text-align: center; font-weight: bold; position: fixed; top: 0; left: 0; right: 0; z-index: 9999; font-size: 14px;">
                📱 Modo DEMO: Los datos se guardan en tu navegador | <a href="#" onclick="localStorage.clear(); location.reload(); return false;" style="color: white; text-decoration: underline; margin-left: 10px;">Limpiar datos</a>
            </div>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
        document.body.style.paddingTop = '45px'; // Espacio para el banner
    }
    
    App.init();
});

// Exportar
window.App = App;
