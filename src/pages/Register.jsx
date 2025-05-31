import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const isNumeric = (str) => !isNaN(str);
const isValidEmail = (email) => {
  // Format: Simple regex untuk pengecekan email basic
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhoneNumber = (number) => {
  // Format: 08xxxxxxxxxx, hanya angka, panjang 10-12 karakter
  return /^[0-9]{10,12}$/.test(number);
};

const isValidGPA = (gpa) => {
  // Hanya angka desimal dari 0.00 sampai 4.00, maksimal dua angka di belakang koma
  return /^([0-3](\.\d{1,2})?|4(\.0{1,2})?)$/.test(gpa);
};

const isValidFullName = (name) => /^[A-Za-zÀ-ÿ ']+$/.test(name.trim());

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function RegisterForm() {
  const [role, setRole] = useState("mentee");
  const [showTentorExtraForm, setShowTentorExtraForm] = useState(false);
  const [formData, setFormData] = useState({
    nim: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gpa: "",
    experience: [""],
    profilePicture: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (e.target.type === "file") {
      const file = files[0];
  
      if (file && !file.type.startsWith("image/")) {
        setErrorMessage("Hanya file gambar yang diperbolehkan.");
        return;
      }
  
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInitialRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.nim || !isNumeric(formData.nim) || parseInt(formData.nim) <= 0 ) {
      setErrorMessage("NIM harus diisi dan berupa angka positif.");
      return;
    }

    if (formData.nim.length > 12) {
      setErrorMessage("NIM maksimal 12 digit.");
      return;
    }

    if (!isValidFullName(formData.fullName)) {
      setErrorMessage("Nama lengkap hanya boleh berisi huruf dan spasi.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Format email tidak valid.");
      return;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setErrorMessage("Nomor telepon tidak valid. Gunakan 10-13 digit angka.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }

    if (role === "tentor") {
      setShowTentorExtraForm(true);
    } else {
      handleFinalRegister();
    }
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = value;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addExperienceField = () => {
    setFormData(prev => ({ ...prev, experience: [...prev.experience, ""] }));
  };

  const removeExperienceField = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleFinalRegister = async () => {
    try {
      if (role === "tentor") {
        // Validasi Format input GPA
        const gpacoma = formData.gpa.replace(",", ".");
        if (!isValidGPA(formData.gpa)) {
          setErrorMessage("IPK harus berupa angka antara 0.00 hingga 4.00 (gunakan titik sebagai pemisah desimal).");
          return;
        }
        // Validasi pengalaman hanya jika ada lebih dari satu field pengalaman
        if (formData.experience.length > 1) {
          const emptyExperience = formData.experience.some(exp => !exp.trim());
          if (emptyExperience) {
            setErrorMessage("Harap lengkapi semua kolom pengalaman mengajar. Jika tidak ingin mengisi sama sekali, hapus kolom tambahan yang kosong.");
            return;
          }
        }


      }
      const requestData = {
        nim: formData.nim,
        nama: formData.fullName,
        email: formData.email,
        password: formData.password,
        noTelp: formData.phoneNumber,
        ipk: formData.gpa,
        pengalaman: formData.experience.map(e => e.trim()), // TODO: Handle delimeter or toList or toString
        fotoUrl: formData.profilePicture ? formData.profilePicture.name : null
      };

      // 1. Register dulu
      const registerResponse = await axios.post(
        `${BACKEND_URL}/api/${role}s/register`,
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // 2. Ambil token
      const token = registerResponse.data.token;
  
      // 3. Upload image if Tentor dan ada file
      if (role === "tentor" && formData.profilePicture && formData.profilePicture instanceof File) {
        const formToUpdate = new FormData();
        formToUpdate.append("file", formData.profilePicture);
  
        await axios.put(
          `${BACKEND_URL}/api/tentors/update-profile`,
          formToUpdate,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }
  
      // 4. Simpen token
      localStorage.setItem("token", token);

      // 5. Redirect success
      setSuccessMessage("Registrasi berhasil!");
      setTimeout(() => {
        navigate(role === "tentor" ? "/profile" : "/");
      }, 2000);
  
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Registrasi gagal. Silakan coba lagi.";
      setErrorMessage(message);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/2 overflow-hidden rounded-l-2xl h-auto">
          <img
            src={`/images/Frame 8.png`}
            alt="Register Illustration"
            className="bg-blue w-full h-full object-cover"
            style={{ minHeight: "100%" }}
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Bergabung dengan Kami</h1>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Buat Akun Baru</h2>

          <div className="flex justify-center space-x-8 border-b mb-8">
            {["mentee", "tentor"].map((r) => (
              <div
                key={r}
                className={`cursor-pointer pb-2 text-lg font-semibold transition-colors duration-200 ${
                  role === r
                    ? "text-black border-b-2 border-blue"
                    : "text-gray-500 border-b-2 border-gray-300"
                }`}
                onClick={() => {
                  setRole(r);
                  setShowTentorExtraForm(false);
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}

            {!showTentorExtraForm ? (
              <>
              <div>
                  <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
                  <input
                    id="nim"
                    name="nim"
                    type="number"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="Masukkan NIM"
                    value={formData.nim}
                    onChange={handleInputChange}
                    maxLength={12}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    maxLength={12}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleInitialRegister}
                  className="w-full py-3 px-6 text-white bg-blue rounded-lg font-semibold shadow-md"
                >
                  {`Daftar sebagai ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">IPK</label>
                  <input
                    id="gpa"
                    name="gpa"
                    type="text"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    placeholder="Contoh: 3.75"
                    value={formData.gpa}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pengalaman Mengajar</label>
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder={`Pengalaman ${index + 1}`}
                        value={exp}
                        onChange={(e) => handleExperienceChange(index, e.target.value)}
                      />
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperienceField(index)}
                          className="ml-2 text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperienceField}
                    className="mt-1 text-blue-500 text-sm hover:underline"
                  >
                    + Tambah pengalaman
                  </button>
                </div>


                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Foto Profil</label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleFinalRegister}
                  className="w-full py-3 px-6 text-white bg-blue rounded-lg font-semibold shadow-md"
                >
                  Selesaikan Pendaftaran Tentor
                </button>
              </>
            )}

            <div className="text-m text-center text-gray-600">
              <span>Sudah punya akun? </span>
              <a href="./login" className="text-blue hover:underline">Masuk di sini!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
