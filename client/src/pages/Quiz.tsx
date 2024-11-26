import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Quiz: React.FC = ({ userId }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [quizResults, setQuizResults] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [noMoreQuestions, setNoMoreQuestions] = useState(false);

    const { currentUser, loading, error } = useSelector(
        (state) => state.user
    );
    const curUser = currentUser._id
    console.log(`curUser`, curUser)
    console.log(`currentQuestion`, currentQuestion)


    // Fetch the first question on component mount
    // useEffect(() => {
    //     const fetchFirstQuestion = async () => {
    //         const res = await fetch(`http://localhost:3000/api/quiz/${curUser}`);
    //         const data = await res.json();
    //         setCurrentQuestion(data.question);
    //     };

    //     fetchFirstQuestion();
    // }, [userId]);
    useEffect(() => {
        const fetchFirstQuestion = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/quiz/${curUser}`);
                if (!res.ok) {
                    // Handle server errors or missing data
                    throw new Error('Failed to fetch the first question');
                }
                const data = await res.json();

                if (data.message) {
                    // Handle error message from backend
                    console.error(data.message);
                    return;
                }

                setCurrentQuestion(data.question); // Set the first question from the response
                // Optionally, if needed, set user performance data here as well
            } catch (err) {
                console.error("Error fetching first question:", err);
            }
        };

        fetchFirstQuestion();
    }, [curUser]); // Make sure this is tracking the actual userId


    // const submitAnswer = async () => {
    //     const isCorrect = currentQuestion?.correctOption === answer;
    //     const quizId = new Date().toISOString(); // Use timestamp as a unique quiz ID
    //     console.log(`quizId`, quizId)
    //     console.log(`quizId`, typeof (quizId))

    //     // Save the user's answer and get the next question
    //     const res = await fetch('http://localhost:3000/api/quiz/submit', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             userId: curUser,
    //             questionId: currentQuestion._id,
    //             selectedOption: answer,
    //             isCorrect,
    //             quizId,
    //         }),
    //     });

    //     const data = await res.json();

    //     if (data.message === "Server error") {
    //         console.error("There was an error submitting the quiz.");
    //         return;
    //     }

    //     setQuizResults((prevResults) => [...prevResults, { ...data.quizResult }]);
    //     setCurrentQuestion(data.nextQuestion); // Proceed with the next question
    // };
    const submitAnswer = async () => {
        const isCorrect = currentQuestion?.correctOption === answer;
        const quizId = new Date().toISOString(); // Use timestamp as a unique quiz ID
        console.log(`quizId`, quizId);
        console.log(`quizId`, typeof (quizId));

        // Save the user's answer and get the next question
        const res = await fetch('http://localhost:3000/api/quiz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userId: curUser,
                questionId: currentQuestion._id,
                selectedOption: answer,
                isCorrect,
                quizId,
            }),
        });

        const data = await res.json();

        if (data.message === "Server error") {
            console.error("There was an error submitting the quiz.");
            return;
        }

        // If no more questions are available, end the quiz
        if (data.message === "No more questions available") {
            console.log("Quiz complete. No more questions.");
            // Handle quiz completion (e.g., show results, redirect, etc.)
            return;
        }
        if (data.message == "No more questions available")
            setNoMoreQuestions(true);

        // Update state with the results and next question
        setQuizResults((prevResults) => [...prevResults, { ...data.quizResult }]);
        setCurrentQuestion(data.nextQuestion); // Proceed with the next question
    };



    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex'>
            <div style={{ width: '50%' }}>
                <div className=' flex flex-col px-4 py-12 max-w-2xl mx-auto'>
                    <h2 className='text-3xl mx-auto font-bold mb-4 text-slate-800'>{currentQuestion.questionText}</h2>
                    <div className='flex flex-col justify-center'>
                        {currentQuestion.options.map((option, index) => (
                            <button className='flex justify-start m-2 border bg-slate-700 hover:bg-slate-500 rounded-lg' key={index} onClick={() => setAnswer(index)}>
                                <p className='mx-auto p-3 text-white'>{option}</p>
                            </button>
                        ))}
                    </div>
                    <div className='mt-20'>
                        <button className=' border mx-auto bg-blue-700 w-full hover:bg-blue-500 rounded-lg p-2' onClick={submitAnswer}><p className='text-white'>Submit Answer</p></button>
                    </div>
                </div>
            </div>
            <div style={{ width: '50%' }}>
                <div className=' flex flex-col px-4 py-12 max-w-2xl mx-auto'>
                    <h2 className='text-3xl mx-auto font-bold mb-4 text-slate-800'>Quiz Results</h2>
                    {quizResults.map((result, index) => (
                        <div style={{ padding: 4 }} key={index}>
                            <p className='text-slate-800'>Question {index + 1}: {result.score === 1 ? 'Correct ✅' : 'Incorrect ❌'}</p>
                        </div>
                    ))}
                </div>
                {
                    noMoreQuestions && <p>No More Questions Available</p>
                }
            </div>
        </div>
    );
};

export default Quiz;
