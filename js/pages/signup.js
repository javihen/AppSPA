/**
 * COMPONENTE DE SIGNUP
 * Pantalla para crear nueva cuenta de administrador
 */

class SignupPage {
    
    static render() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-purple-500 flex items-center justify-center p-4">
                <div class="w-full max-w-md">
                    <!-- Card de Signup -->
                    <div class="card p-8 shadow-2xl">
                        <!-- Header -->
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                                Crear Cuenta
                            </h1>
                            <p class="text-gray-600 mt-2">Registra una nueva administradora</p>
                        </div>

                        <!-- Formulario -->
                        <form id="signupForm" class="space-y-6">
                            <!-- Email -->
                            <div>
                                <label class="form-label">
                                    📧 Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    id="emailSignup"
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
                                    id="passwordSignup"
                                    class="form-input" 
                                    placeholder="Mínimo 6 caracteres"
                                    minlength="6"
                                    required
                                />
                            </div>

                            <!-- Confirm Password -->
                            <div>
                                <label class="form-label">
                                    🔐 Confirmar Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    id="confirmPasswordSignup"
                                    class="form-input" 
                                    placeholder="Confirma tu contraseña"
                                    minlength="6"
                                    required
                                />
                            </div>

                            <!-- Admin Code -->
                            <div>
                                <label class="form-label">
                                    🔑 Código de Administrador
                                </label>
                                <input 
                                    type="password" 
                                    id="adminCodeSignup"
                                    class="form-input" 
                                    placeholder="Código secreto"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Se requiere código de administrador</p>
                            </div>

                            <!-- Botón Signup -->
                            <button 
                                type="submit" 
                                class="w-full btn-primary text-lg py-3 font-bold"
                            >
                                Crear Cuenta
                            </button>
                        </form>

                        <!-- Back to Login -->
                        <div class="mt-6">
                            <button 
                                type="button" 
                                onclick="window.currentPage = 'login'; App.render();"
                                class="w-full px-4 py-2 text-pink-600 font-semibold hover:underline"
                            >
                                ← Volver a Login
                            </button>
                        </div>

                        <!-- Info -->
                        <div class="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
                            <p class="text-xs text-blue-800">
                                <strong>Nota:</strong> El código de administrador es necesario para crear una cuenta. Contacta al propietario del sistema.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Inicializar eventos
     */
    static init() {
        const form = document.getElementById('signupForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSignup();
            });
        }
    }

    /**
     * Manejar registro
     */
    static async handleSignup() {
        try {
            const email = document.getElementById('emailSignup').value.trim();
            const password = document.getElementById('passwordSignup').value;
            const confirmPassword = document.getElementById('confirmPasswordSignup').value;
            const adminCode = document.getElementById('adminCodeSignup').value;

            // Validaciones
            if (!email || !password || !confirmPassword || !adminCode) {
                throw new Error('Por favor completa todos los campos');
            }

            if (!HelpersFunctions.validarEmail(email)) {
                throw new Error('Email inválido');
            }

            if (password !== confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            if (password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }

            HelpersFunctions.mostrarLoader();

            // Registrar usuario
            const user = await AuthService.signup(email, password, adminCode);
            
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showSuccess('Cuenta creada exitosamente', '¡Bienvenida!');

            // Ir a login
            setTimeout(() => {
                window.currentPage = 'login';
                App.render();
            }, 1000);

        } catch (error) {
            HelpersFunctions.ocultarLoader();
            HelpersFunctions.showError(error.message || 'Error en registro');
        }
    }
}

// Exportar
window.SignupPage = SignupPage;
