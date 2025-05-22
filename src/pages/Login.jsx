import { useState } from "react";

export default function LoginForm() {
  const [role, setRole] = useState("mentee");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`http://localhost:8080/api/${role}s/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "email": userEmail,
        "password": userPassword
      }),
    })

    // const data = await res.json()
    console.log(res)
    // if (res.status !== 200) {
    //   setErrorMessage(data.message)
    //   return
    // }

    // alert(data)
    
    // if (data.token) {
    //   localStorage.setItem('token', data.token)
    //   navigate('/dashboard')
    // }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2 overflow-hidden rounded-l-2xl h-auto">
          <img
            src={`/public/images/Frame 7.png`}
            alt="Login Illustration"
            className="bg-blue w-full h-full object-cover"
            style={{ minHeight: "100%" }}
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Selamat Datang
          </h1>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login ke Akun Anda
          </h2>

          {/* Role Tabs */}
          <div className="flex justify-center space-x-8 border-b mb-8">
            <div
              className={`cursor-pointer pb-2 text-lg font-semibold transition-colors duration-200 ${
                role === "mentee"
                  ? "text-black border-b-2 border-blue-500"
                  : "text-gray-500 border-b-2 border-gray-300"
              }`}
              onClick={() => setRole("mentee")}
            >
              Mentee
            </div>
            <div
              className={`cursor-pointer pb-2 text-lg font-semibold transition-colors duration-200 ${
                role === "tentor"
                  ? "text-black border-b-2 border-blue-500"
                  : "text-gray-500 border-b-2 border-gray-300"
              }`}
              onClick={() => setRole("tentor")}
            >
              Tentor
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-blue hover:bg-blue-dark rounded-lg font-semibold shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLogin}
            >
              {`Masuk sebagai ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>

            <div className="text-sm text-center text-gray-600">
              <a href="#" className="text-blue-500 hover:underline">
                Lupa Password?
              </a>
              <br />
              <a href="./register" className="text-blue-500 hover:underline">
                Belum punya akun? Daftar!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
