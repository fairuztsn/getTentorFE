import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Dummy user login (ubah ke null jika ingin simulasi user belum login)
const dummyUser = {
  id: "dummy123",
  displayName: "Test User",
  photoURL: "/images/default-avatar.png",
};

export default function TutorProfile() {
  const { id } = useParams();
  const [tentor, setTentor] = useState(null);

  useEffect(() => {
    const fetchTentorData = async() => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tentors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data;
        setTentor({
          name: data.nama,
          position: "Principal Software Engineer Manager @ Microsoft",
          experience: "5+ years of experience in software development",
          rating: data.averageRating,// "5.0 (254 Reviews)",
          location: "Jakarta - Kelapa Gading",
          email: data.email,
          phone: data.noTelp,
          about: "With 4+ years of experience in the industry, I have worked as a tester, a lead/manager, and as a developer. I have worked on large teams (OneDrive, Power Automate), as well as taking a v1 product from inception to running at a global scale. Additionally, I specialize in mentoring junior developers and creating comprehensive learning programs tailored to individual needs. My approach focuses on practical, real-world applications of theoretical concepts to ensure my students are well-prepared for professional environments.",
          skills: data.listMataKuliah.map(mk => mk.nama),
          profilePictureUrl: data.fotoUrl,
        });
      } catch (error) {
        alert('Error! Baca console pls');
        console.error(error);
      }
    }

    fetchTentorData();
  }, []);
  
  const navigate = useNavigate();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });
  const [visibleReviews, setVisibleReviews] = useState(1);
  const reviewsPerLoad = 2;

  const initialReviews = [
    {
      id: 1,
      userId: "user1",
      name: "Hoshino Takanashi",
      avatar: "/images/hoshino.png",
      date: new Date("October 1, 2025").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: 5,
      comment: `"Hmm... the new mentor? They're kinda strict, but not in a bad way, I guess..."`
    },
    {
      id: 2,
      userId: "user2",
      name: "John Doe",
      avatar: "/images/default-avatar.png",
      date: new Date("September 15, 2025").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: 4,
      comment: "Great tutor! Very knowledgeable and patient. Explained complex concepts in a way that was easy to understand."
    },
    {
      id: 3,
      userId: "user3",
      name: "Jane Smith",
      avatar: "/images/default-avatar.png",
      date: new Date("August 20, 2025").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: 5,
      comment: "Absolutely fantastic! The tutor went above and beyond to help me understand the material. Highly recommend!"
    },
    {
      id: 4,
      userId: "user4",
      name: "Anonymous",
      avatar: "/images/default-avatar.png",
      date: new Date("July 10, 2025").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: 3,
      comment: "Good tutor overall, but sometimes explanations could be clearer. Still helped me pass my course though."
    }
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const maxLength = 150;
  const canExpand = true; //tentor?.about?.length > maxLength;
  // const displayText = isExpanded ? tentor?.about : `${tentor?.about.substring(0, maxLength)}${canExpand ? "..." : ""}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to submit a review");
      navigate("/login");
      return;
    }

    const newReviewObj = {
      id: reviews.length + 1,
      userId: currentUser.id,
      name: currentUser.displayName || "Anonymous",
      avatar: currentUser.photoURL || "/images/default-avatar.png",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: newReview.rating,
      comment: newReview.comment
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + reviewsPerLoad);
  };

  const toggleAllReviews = () => {
    if (showAllReviews) {
      setVisibleReviews(1);
    } else {
      setVisibleReviews(reviews.length);
    }
    setShowAllReviews(!showAllReviews);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, visibleReviews);

  return (
    <div className="bg-white bg-cover bg-center font-sans">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute top-0 left-1/2 w-screen bg-white-100 -translate-x-1/2" style={{ height: '63%' }} />
          <div className="relative flex items-start px-4 pt-4 pb-8 gap-6">
            <div className="relative -mt-[-20px]">
              <img
                src={tentor?.profilePictureUrl}
                alt="Profile"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg z-10"
              />
            </div>
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="border rounded-xl p-6 shadow bg-white/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{tentor?.name}</h1>
                <p className="text-blue-600 hover:underline text-base">{tentor?.position}</p>
                <p className="text-base text-gray-500">{tentor?.experience}</p>
              </div>
              <div className="space-y-3">
                <p>⭐ {tentor?.rating}</p>
                <p>📧<a href={`mailto:${tentor?.email}`} className="text-blue-600 underline">
                   {tentor?.email}
                </a></p>
                <p>📞 {tentor?.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <img src="/images/book.png" alt="Skills" className="h-10 w-10" />
              {tentor?.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200 text-sm bg-white/50 backdrop-blur-sm">
                  {skill}
                </span>
              ))}
            </div>

            <div className="bg-white/50 border rounded-lg p-4 backdrop-blur-sm shadow relative">
              <h3 className="text-2xl font-bold mb-3">About</h3>
              <div className={`text-gray-700 text-base leading-relaxed transition-all duration-300 ${
                isExpanded ? 'max-h-[400px] overflow-y-auto' : 'max-h-[120px] overflow-hidden'
              }`}>
                {tentor?.about}
              </div>
              {canExpand && (
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 absolute bottom-2 right-4 bg-white/80 px-3 py-1 rounded-full">
                  {isExpanded ? (
                    <><span className="hidden md:inline">Show Less</span><span className="md:hidden">▲</span></>
                  ) : (
                    <><span className="hidden md:inline">Read More</span><span className="md:hidden">▼</span></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <section className="mt-10 text-left bg-white/50 backdrop-blur-sm border rounded px-4 py-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">What mentees say...</h2>
            {reviews.length > 1 && (
              <button onClick={toggleAllReviews} className="text-sm text-blue-600 hover:text-blue-800">
                {showAllReviews ? "Hide Reviews" : "Show All Reviews"}
              </button>
            )}
          </div>

          <button
            className="w-full px-4 py-2 border rounded-full hover:bg-gray-100 transition bg-white/50 backdrop-blur-sm mb-6"
            onClick={() => {
              setShowReviewForm(!showReviewForm);
            }}
          >
            {showReviewForm ? "Cancel Review" : "Add Your Review"}
          </button>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-4 border rounded-lg bg-white/70">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex items-center">
                  <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    className="p-2 border rounded mr-2"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <span className="text-yellow-500 text-xl">{renderStars(newReview.rating)}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Your Review</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded h-24"
                  placeholder="Share your experience with this tentor?..."
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-black rounded-full hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          )}

          {displayedReviews.length > 0 ? (
            displayedReviews.map(review => (
              <div key={review.id} className="mb-8 p-4 border-b">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-2">{renderStars(review.rating)}</span>
                      <span className="text-xs text-gray-500">• {review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm text-left">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          )}

          {!showAllReviews && visibleReviews < reviews.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreReviews}
                className="px-4 py-2 border rounded-full hover:bg-gray-100 transition bg-white/50 backdrop-blur-sm"
              >
                Load More ({reviews.length - visibleReviews} remaining)
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
