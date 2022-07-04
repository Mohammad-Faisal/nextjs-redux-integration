import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        margin: "20px",
        gridRowGap: "20px",
      }}
    >
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      await store.dispatch(setAuthState(false));

      console.log("State on server", store.getState());

      return {
        props: {
          authState: false,
        },
      };
    }
);

export default Home;
