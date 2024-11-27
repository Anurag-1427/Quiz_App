import { RootState } from "../redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { assets } from "../assets";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


interface CurrentUser {
    _id: string;
}

interface TestHistory {
    date: string;
    ability: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
}

interface Question {
    id: string;
    question: string;
    options: string[];
    type: string;
}

const Quiz: React.FC = () => {
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [ability, setAbility] = useState<number | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const { currentUser } = useSelector((state: RootState) => state.user) as {
        currentUser: CurrentUser | null;
    };
    const userId = currentUser?._id;

    const data = {
        labels: testHistory.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Ability',
                data: testHistory.map(item => item.ability),
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
                fill: false,
                pointRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const data = tooltipItem.raw;
                        const testData = testHistory[tooltipItem.dataIndex];
                        return `Ability: ${data.toFixed(2)} | 
                            Total Questions: ${testData.totalQuestions} | 
                            Correct Answers: ${testData.correctAnswers} | 
                            Incorrect Answers: ${testData.incorrectAnswers}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ability',
                },
                beginAtZero: true,
            },
        },
    };

    const startTest = async () => {
        try {
            const response = await fetch("/api/quiz/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error(assets.localized_strings["NETWORK_ERROR"]);
            }
            setTestStarted(true);
            fetchNextQuestion();
            setShowHistory(false);
        } catch (error) {
            console.error("Error starting test:", error);
            alert(assets.localized_strings["TRY_AGAIN"]);
        }
    };

    const fetchNextQuestion = async () => {
        try {
            const response = await fetch(`/api/quiz/question?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (!response.ok) {
                throw new Error(assets.localized_strings["NETWORK_ERROR"]);
            }

            const data = await response.json();

            if (data.message === "Test complete") {
                setIsComplete(true);
                setAbility(data.ability);
            } else {
                setCurrentQuestion(data);
                setAnswer("");
            }
        } catch (error) {
            console.error("Error fetching question:", error);
            alert(assets.localized_strings["NEXT_QUESTION_ERROR"]);
        }
    };

    const submitAnswer = async () => {
        if (!answer) {
            alert(assets.localized_strings["ENTER_ANSWER"]);
            return;
        }
        try {
            const response = await fetch("/api/quiz/answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userId,
                    questionId: currentQuestion?.id,
                    answer: isNaN(Number(answer)) ? answer : parseFloat(answer),
                }),
            });

            if (!response.ok) {
                throw new Error(assets.localized_strings["NETWORK_ERROR"]);
            }

            fetchNextQuestion();
        } catch (error) {
            console.error("Error submitting answer:", error);
            alert(assets.localized_strings["TEST_NOT_SUBMIT_ERROR"]);
        }
    };

    const endTest = async () => {
        try {
            const response = await fetch("/api/quiz/endTest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error(assets.localized_strings["NETWORK_ERROR"]);
            }

            setTestStarted(false);
            setIsComplete(false);
            alert(assets.localized_strings["TEST_COMPLETE_STATS_SAVED"]);
        } catch (error) {
            console.error("Error ending test:", error);
            alert(assets.localized_strings["TEST_END_ERROR"]);
        }
    };

    const fetchTestHistory = async () => {
        try {
            const response = await fetch(`/api/quiz/testHistory?userId=${userId}`);

            if (!response.ok) {
                throw new Error(assets.localized_strings["NETWORK_ERROR"]);
            }

            const data = await response.json();
            setTestHistory(data);
            setShowHistory(!showHistory);
        } catch (error) {
            console.error("Error fetching test history:", error);
            alert(assets.localized_strings["TEST_HISTORY_GET_ERROR"]);
        }
    };


    let testContent: JSX.Element;
    if (!testStarted) {
        testContent = (
            <div className="flex justify-center gap-10">
                <button className="bg-blue-600 text-white p-2 rounded" onClick={startTest} style={{ marginLeft: "10px" }}>
                    {assets.localized_strings["START_TEST_TEXT"]}
                </button>
                <button className="bg-blue-600 text-white p-2 rounded" onClick={fetchTestHistory}>
                    {assets.localized_strings["VIEW_TEST_HISTORY"]}
                </button>
            </div>
        );
    } else if (isComplete) {
        testContent = (
            <div>
                <h2 className="mt-8 text-center text-3xl font-bold mb-10 text-slate-800">{assets.localized_strings["TEST_COMPLETE_TEXT"]}</h2>
                <p className="text-center text-xl mb-10 text-slate-800">{`${assets.localized_strings["ESTIMATED_ABILITY"]} ${ability?.toFixed(2)}`}</p>
                <div className="flex justify-center">
                    <button className="bg-blue-600 text-white p-2 rounded" onClick={endTest}>{assets.localized_strings["END_TEST_TEXT"]}</button>
                </div>
            </div>
        );
    } else {
        testContent = (
            <div>
                <div className="flex justify-center gap-5">
                    <h3 className="text-center text-3xl font-bold mb-10 text-slate-800">{assets.localized_strings["QUESTION_TEXT"]}: </h3>
                    <h3 className="text-center text-3xl font-bold mb-10 text-slate-800">{currentQuestion?.question}</h3>
                </div>

                {currentQuestion?.type === "multiple-choice" ? (
                    <div className="flex justify-center gap-5">
                        {currentQuestion?.options?.map((option, index) => (
                            <button
                                key={index}
                                className={`p-2 rounded ${selectedOption === option ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                onClick={() => {
                                    setAnswer(option);
                                    setSelectedOption(option);
                                }}
                            >
                                {option}
                            </button>
                        ))}
                        <button className="bg-blue-600 text-white p-2 rounded" onClick={submitAnswer}>
                            {assets.localized_strings["SUBMIT_ANSWER_TEXT"]}
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center gap-5">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter your answer"
                            className="rounded-xl text-center"
                            style={{ borderWidth: 1, borderColor: 'slate' }}
                        />
                        <button className="bg-blue-600 text-white p-2 rounded" onClick={submitAnswer}>
                            {assets.localized_strings["SUBMIT_ANSWER_TEXT"]}
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h1 className="mt-8 text-center text-3xl font-bold mb-10 text-slate-800">{assets.localized_strings["QUIZ_HEADER"]}</h1>
            {testContent}

            {showHistory && (
                <>
                    {testHistory.length > 0 && (
                        <div style={{ width: '50%', margin: 'auto' }}>
                            <h2 className="mt-8 text-center text-2xl font-bold mb-10 text-slate-800">Test History</h2>
                            <div className="flex justify-center">
                                <Line data={data} options={options} />
                            </div>
                        </div>
                    )}
                    {!testHistory.length && (
                        <h2 className="text-center text-2xl font-bold mb-10 text-slate-800">{assets.localized_strings["NO_TEST_HISTORY"]}</h2>
                    )}
                </>
            )}
        </div>
    );
};

export default Quiz;
