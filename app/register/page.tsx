// Define the server action locally to avoid a missing-module import error.
async function registerUser(formData: FormData) {
  'use server';
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  // Basic placeholder behavior: log the received values.
  // Replace with real registration logic or import once the module is available.
  console.log('Register user', { name, email, password });
}

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-8 py-10">
      <h1 className="text-3xl font-bold">Реєстрація</h1>

      <form action={registerUser} className="mt-8 flex flex-col gap-4">
        <input name="name" placeholder="Ім’я" className="border p-3" required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="border p-3"
          required
        />

        <button className="rounded bg-black p-3 text-white">
          Зареєструватися
        </button>
      </form>
    </main>
  );
}
