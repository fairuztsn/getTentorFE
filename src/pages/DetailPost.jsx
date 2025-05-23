import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

export default function TutorProfile() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  

  // Mock data that could later come from props or API
  const tutor = {
    name: "Ellen Joe",
    position: "Principal Software Engineer Manager @ Microsoft",
    experience: "5+ years of experience in software development",
    rating: "5.0 (254 Reviews)",
    location: "Jakarta - Kelapa Gading",
    email: "littlesharkgirl@gmail.com",
    phone: "0232587347",
    about: "With 4+ years of experience in the industry, I have worked as a tester, a lead/manager, and as a developer. I have worked on large teams (OneDrive, Power Automate), as well as taking a v1 product from inception to running at a global scale. Additionally, I specialize in mentoring junior developers and creating comprehensive learning programs tailored to individual needs. My approach focuses on practical, real-world applications of theoretical concepts to ensure my students are well-prepared for professional environments.",
    skills: ["PBO", "JARKOM"],
  };

  const reviews = [
    {
      id: 1,
      name: "Hoshino Takanashi",
      avatar: "/images/hoshino.png",
      date: "October 1, 2025",
      rating: "★★★★★",
      comment: `"Hmm... the new mentor? They're kinda strict, but not in a bad way, I guess.
              They actually remind me to eat lunch and not just nap through it... which is annoying,
              but also kinda sweet? They don't freak out when things go wrong, and they've got this
              calm vibe that keeps the rest of the squad grounded. Still, I wish they'd chill a bit
              more—life's too short to be that serious all the time, y'know? But yeah... they're reliable.
              I wouldn't say it out loud, but I think we're lucky to have them."`
    }
  ];

  // For Read More functionality
  const maxLength = 150;
  const canExpand = tutor.about.length > maxLength;
  const displayText = isExpanded ? tutor.about : `${tutor.about.substring(0, maxLength)}${canExpand ? "..." : ""}`;

  return (
    <div className="bg-[url('/images/carthe2.png')] bg-cover bg-center font-sans">
      <Header />
      
      {/* Container utama tanpa padding atas */}
      <div className="max-w-4xl mx-auto">
        {/* Profile Section - Full-width background tanpa gap */}
        <div className="relative">
          {/* Border abu-abu setengah tinggi tanpa gap */}
          <div 
            className="absolute top-0 left-1/2 w-screen bg-white-100 -translate-x-1/2"
            style={{ height: '63%' }}
          />
          
          {/* Konten profile */}
          <div className="relative flex items-start px-4 pt-4 pb-8 gap-6">
            {/* Foto profile yang menonjol keluar */}
            <div className="relative -mt-[-20px]">
              <img
                src="/images/ellenjoe.png"
                alt="Profile"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg z-10"
              />
            </div>
            
            {/* Tombol-tombol */}
            <div className="flex flex-col gap-12 pt-16 md:pt-24">
              <div className="border bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                ★ Star Tentor
              </div>
              <button className="border px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition bg-white/50 backdrop-blur-sm">
                🤍 Add to Fav
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Left Column - Tutor Info */}
          <div className="border rounded-xl p-6 shadow bg-white/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{tutor.name}</h1>
                <p className="text-blue-600 hover:underline text-base">
                  {tutor.position}
                </p>
                <p className="text-base text-gray-500">
                  {tutor.experience}
                </p>
              </div>
              
              <div className="space-y-3">
                <p>⭐ {tutor.rating}</p>
                <p>📍 {tutor.location}</p>
                <p>📧 {tutor.email}</p>
                <p>📞 {tutor.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Skills & About */}
          <div className="space-y-6">
            {/* Skills Tags */}
            <div className="flex items-center gap-4 flex-wrap">
              <img src="/images/book.png" alt="Skills" className="h-10 w-10" />
              {tutor.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200 text-sm bg-white/50 backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* About Section with Read More */}
            <div className="bg-white/50 border rounded-lg p-4 backdrop-blur-sm shadow relative"> {/* Tambahkan relative */}
  <h3 className="text-2xl font-bold mb-3">About</h3>
  
  {/* Container teks dengan tinggi tetap dan scroll internal */}
  <div 
    className={`text-gray-700 text-base leading-relaxed transition-all duration-300 ${
      isExpanded ? 'max-h-[400px] overflow-y-auto' : 'max-h-[120px] overflow-hidden'
    }`}
  >
    {tutor.about}
  </div>
  
  {canExpand && (
    <button 
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 absolute bottom-2 right-4 bg-white/80 px-3 py-1 rounded-full"
    >
      {isExpanded ? (
        <>
          <span className="hidden md:inline">Show Less</span>
          <span className="md:hidden">▲</span>
        </>
      ) : (
        <>
          <span className="hidden md:inline">Read More</span>
          <span className="md:hidden">▼</span>
        </>
      )}
    </button>
  )}
</div>

            {/* Review Button */}
            <button 
              className="w-full px-4 py-2 border rounded-full hover:bg-gray-100 transition bg-white/50 backdrop-blur-sm"
              onClick={() => navigate('/add-review')}
            >
              Add Your Review
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-10 text-left bg-white/50 backdrop-blur-sm border rounded px-4 py-2">
          <h2 className="text-2xl font-bold mb-6 text-left">What mentees say...</h2>
          
          {reviews.map(review => (
            <div key={review.id} className="mb-8 p-4 border-b">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-500">
                    {review.rating} • {review.date}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm text-left">
                {review.comment}
              </p>
            </div>
          ))}
          
          <button className="mt-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition bg-white/50 backdrop-blur-sm">
            Load More Reviews
          </button>
        </section>
      </div>
    </div>
  );
}