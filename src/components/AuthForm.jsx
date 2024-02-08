// import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user Account"}</h1>

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create a new user Account" : "Login"}
          </Link>
          <button>{isLogin ? "Login to App" : "Create Account"}</button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
