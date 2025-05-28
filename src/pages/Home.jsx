import React from 'react';

const HomepageNonLogin = () => {
  return (
    <div>
      <header className="bg-blue-100 p-4 flex justify-between items-center">
        <img src="/logo.svg" alt="GetTentor Logo" className="h-10" />
        <div>
          <button className="bg-white text-black font-bold px-4 py-2 rounded mr-2">Register</button>
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded">Login</button>
        </div>
      </header>

      <main className="p-8">
        <section className="flex flex-col md:flex-row items-center mb-16">
          <img src="/hero-image.jpg" alt="Hero" className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0" />
          <div className="md:ml-8">
            <h1 className="text-3xl font-bold mb-4">Tentoring dengan Pembimbing berdedikasi, ada di genggaman anda.</h1>
            <p className="mb-4">Kesulitan dalam belajar? Ingin mempelajari bagaimana bisa belajar secara efektif? Tertarik mempelajari keterampilan yang banyak dicari? Bekerja cerdas dengan tentor online yang mendampingi Anda.</p>
            <ul className="list-none space-y-2">
              <li>✅ Tentor berpengalaman</li>
              <li>✅ Jadwal tentoring fleksibel</li>
            </ul>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8">Temukan Tentor Ahli di Bidang Pilihan Anda!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/tentor-tech.svg" alt="Tentor Tech" className="mx-auto h-24" />
              <p className="mt-4 font-medium">Tentor Tech</p>
            </div>
            <div>
              <img src="/tentor-matkul.svg" alt="Tentor Mata Kuliah" className="mx-auto h-24" />
              <p className="mt-4 font-medium">Tentor Mata Kuliah</p>
            </div>
            <div>
              <img src="/tentor-design.svg" alt="Tentor Design" className="mx-auto h-24" />
              <p className="mt-4 font-medium">Tentor Design</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white p-8 rounded-lg text-center mb-16">
          <h2 className="text-xl font-bold mb-4">Start your own learning journey!</h2>
          <p className="mb-4">Siap memulai perjalanan belajar dan pengembangan diri Anda? Login atau Daftar sekarang.</p>
          <button className="bg-white text-blue-600 font-bold px-6 py-2 rounded">Login</button>
          <p className="mt-4">belum punya akun? <a href="#" className="text-yellow-300">Daftar di sini</a></p>
        </section>

        <section className="bg-green-100 p-6 rounded-lg">
          <div className="mb-2 text-yellow-500 text-xl">★★★★★</div>
          <blockquote>
            <p className="italic">“Memiliki akses ke pengetahuan dan pengalaman para tentor di GetTentor adalah kesempatan emas yang tidak boleh saya lewatkan...”</p>
            <footer className="mt-2 font-semibold">Brian Musangking - Mentee</footer>
          </blockquote>
        </section>
      </main>

      <footer className="bg-blue-100 p-4 text-center">
        <img src="/logo.svg" alt="Logo" className="mx-auto h-8 mb-2" />
        <p className="mb-2">Tempat terpercaya Anda untuk terhubung dengan tentor & profesional terbaik.</p>
        <div className="flex justify-center gap-4 text-xl">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </footer>
    </div>
  );
};

export default HomepageNonLogin;