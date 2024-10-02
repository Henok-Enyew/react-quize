import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, active, ready, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    case "tick":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining > 0 ? state.status : "finished",
      };
    default:
      throw new Error("Unknown Command");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function fetchQuestions() {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      dispatch({ type: "dataRecieved", payload: data });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <MainSection dispatch={dispatch}>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secRemaining={secRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            />

            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "restartQuiz" })}
            >
              Restart
            </button>
          </>
        )}
      </MainSection>
    </div>
  );
}
