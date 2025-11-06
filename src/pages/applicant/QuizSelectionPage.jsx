import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/applicant/Footer";

const QuizSelectionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get applicant data from navigation state or localStorage
  const applicantData = location.state?.applicantData || 
    JSON.parse(localStorage.getItem("applicantData") || "{}");

  useEffect(() => {
    // Redirect if no department selected
    if (!applicantData.department) {
      navigate("/");
      return;
    }

    // Fetch quizzes for the department
    fetchQuizzes();
  }, [applicantData.department]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      // Backend running on port 3000
      const response = await fetch(
        `http://localhost:3000/api/quiz/get/${applicantData.department}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }

      const result = await response.json();
      setQuizzes(result.data || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      alert("Failed to load quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleProceed = () => {
    if (!selectedQuiz) {
      alert("Please select a quiz to continue");
      return;
    }

    // Store selected quiz info
    localStorage.setItem("selectedQuiz", JSON.stringify(selectedQuiz));

    // Navigate to instructions page with quiz data
    navigate("/instructions", {
      state: {
        applicantData,
        selectedQuiz
      }
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  const getDepartmentName = (deptId) => {
    const deptMap = {
      '60': 'Engineering',
      '61': 'Business Operations',
      '62': 'Finance',
      '63': 'Marketing',
      '64': 'Human Resources',
      '65': 'IT Support',
      '66': 'Design',
      '67': 'Legal',
      '68': 'Customer Service',
      '69': 'Product Management'
    };
    return deptMap[deptId] || 'Unknown Department';
  };

  const formatTimeLimit = (minutes) => {
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>

          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              <span className="text-cyan-600">Select</span>{" "}
              <span className="text-black">Your Quiz</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {applicantData.firstName && applicantData.lastName && (
                <>Welcome, {applicantData.firstName} {applicantData.lastName}! </>
              )}
              Available quizzes for{" "}
              <span className="font-semibold text-gray-900">
                {getDepartmentName(applicantData.department)}
              </span>
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && quizzes.length === 0 && (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-gray-200">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Quizzes Available
              </h3>
              <p className="text-gray-600">
                There are currently no quizzes available for this department.
              </p>
            </div>
          )}

          {/* Quiz List */}
          {!loading && quizzes.length > 0 && (
            <div className="space-y-4 mb-8">
              {quizzes.map((quiz) => (
                <button
                  key={quiz.quiz_id}
                  onClick={() => handleQuizSelect(quiz)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-200 border-2 ${
                    selectedQuiz?.quiz_id === quiz.quiz_id
                      ? "bg-cyan-50 border-cyan-600 shadow-lg"
                      : "bg-white border-gray-200 hover:border-cyan-300 hover:shadow-md"
                  }`}
                  style={
                    selectedQuiz?.quiz_id === quiz.quiz_id
                      ? { boxShadow: "4px 4px 0px 0px rgba(6, 182, 212, 0.4)" }
                      : {}
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {quiz.quiz_name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{formatTimeLimit(quiz.time_limit)}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedQuiz?.quiz_id === quiz.quiz_id
                          ? "border-cyan-600 bg-cyan-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedQuiz?.quiz_id === quiz.quiz_id && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Proceed Button */}
          {!loading && quizzes.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleProceed}
                disabled={!selectedQuiz}
                className={`font-semibold px-10 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                  selectedQuiz
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                style={
                  selectedQuiz
                    ? { boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 1)" }
                    : {}
                }
              >
                Continue
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizSelectionPage;