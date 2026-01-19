/**
 * COMPONENTE DE LOGIN
 * Pantalla de iniciar sesión
 */

class LoginPage {
    
    static render() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 flex items-center justify-center p-4">
                <div class="w-full max-w-md">
                    <!-- Card de Login -->
                    <div class="card p-8 shadow-2xl">
                        <!-- Logo/Header -->
                        <div class="text-center mb-8">
                            <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                                SPA Manager
                            </h1>
                            <p class="text-gray-600 mt-2">Sistema de Gestión de Spa</p>
                        </div>

                        <!-- Formulario -->
                        <form id="loginForm" class="space-y-6">
                            <!-- Email -->
                            <div>
                                <label class="form-label">
                                    📧 Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    id="emailLogin"
                                    class="form-input" 
                                    placeholder="admin@spa.com"
                                    required
                                />
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="form-label">
                                    🔐 Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    id="passwordLogin"
                                    class="form-input" 
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <!-- Botón Login -->
                            <button 
                                type="submit" 
                                class="w-full btn-primary text-lg py-3 font-bold"
                            >
                                Iniciar Sesión
                            </button>
                        </form>

                        <!-- Divider -->
                        <div class="relative my-6">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">¿No tienes cuenta?</span>
                            </div>
                        </div>

                        <!-- Botón Sign Up -->
                        <button 
                            type="button" 
                            onclick="window.currentPage = 'signup'; App.render();"
                            class="w-full px-4 py-2 rounded-lg border-2 border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 transition-colors"
                        >
                            Crear Cuenta
                        </button>

                        <!-- Demo Notice -->
                        <div class="mt-6 p-4 bg-purple-100 rounded-lg border border-purple-300">
                            <p class="text-sm text-purple-800">
                                <strong>Demo:</strong> Usa email: demo@spa.com (primero crea una cuenta)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Inicializar eventos del login
     */
    static init() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin();
            });
        }
    }

    /**
     * Manejar el login
     */
    static async handleLogin() {
        try {
            const email = document.getElementById('emailLogin').value.trim();
            const password = document.getElementById('passwordLogin').value;

            // Validar campos
            if (!email || !password) {
                throw new Error('Por favor completa todos los campos');
            }

            if (!HelpersFunctions.validarEmail(email)) {
                throw new Error('Email inválido');
            }

            HelpersFunctions.mostrarLoader();

            // Intentar login
            const user = await AuthService.login(email, password);
            
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showSuccess('¡Bienvenida!', 'Sesión iniciada');

            // Ir al dashboard
            setTimeout(() => {
                window.currentUser = user;
                window.currentPage = 'dashboard';
                App.render();
            }, 1000);

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message || 'Error en login');
        }
    }
}

// Exportar
window.LoginPage = LoginPage;
