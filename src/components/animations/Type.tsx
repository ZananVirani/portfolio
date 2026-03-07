import Typewriter from "typewriter-effect";
// import useLocales from "../../hooks/useLocales";

function Type() {
  // const { translate } = useLocales();
  return (
    <Typewriter
      options={{
        strings: [
          "Curious Learner",
          "Positive",
          "Real-World Problem Solver",
          "Aspiring Product Manager",
          "Effective Communicator",
          "Analytical Thinker",
          "Team Player",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
