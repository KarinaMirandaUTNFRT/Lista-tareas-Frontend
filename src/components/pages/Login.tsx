import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { alertaExito, alertaError } from "../../helpers/alertas";
import { inputClass } from "../../helpers/estilos";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { setUsuarioLogueado } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navegacion = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    //1- si los datos del formulario son correctos y coinciden con las credenciales del admin loguear al usuario
    if (
      data.email === import.meta.env.VITE_EMAIL &&
      data.password === import.meta.env.VITE_PASSWORD
    ) {
      setUsuarioLogueado(true);
      alertaExito("Bienvenido Administrador", "Ingresando al sistema");
      //redirecciono al admin
      navegacion("/administrador");
    } else {
      alertaError("Ocurrió un error", "Credenciales incorrectas");
    }
  };

  return (
    <section className="flex grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Accede al panel de control de{" "}
            <span className="text-blue-500 font-semibold">MI EMPRESA</span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass(!!errors.email, "py-3")}
                placeholder="correo@dominio.com"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message: "Email no válido",
                  },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.email?.message}
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={inputClass(!!errors.password, "py-3")}
                placeholder="••••••••"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                    message:
                      "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo.",
                  },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-blue-500 transition-all active:scale-95"
            >
              Ingresar al sistema
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
