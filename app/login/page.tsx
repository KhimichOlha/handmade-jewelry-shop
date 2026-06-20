"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleLogin(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Невірна пошта або пароль");
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="mx-auto max-w-md px-8 py-10">
      <h1 className="text-3xl font-bold">Вхід</h1>

      <form action={handleLogin} className="mt-8 flex flex-col gap-4">
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

        {error && <p className="text-red-600">{error}</p>}

        <button className="rounded bg-black p-3 text-white">Увійти</button>
      </form>
    </main>
  );
}
