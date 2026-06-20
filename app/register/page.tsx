import { registerUser } from "@/actions/auth";

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
