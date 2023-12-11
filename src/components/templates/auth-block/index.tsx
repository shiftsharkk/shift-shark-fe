import React, { useState } from "react";
import { Link } from "react-router-dom";

import TwoSectionContainer from "../../atoms/two-sections-container";

import GetOtpForm from "../../molecules/get-otp-form";
import VerifyOtpForm from "../../molecules/verify-otp-form";

import logo from "../../../assets/logo.svg";

type Props = {
  type: "login" | "register";
};

const AuthBlock: React.FC<Props> = ({ type = "login" }) => {
  const [requestId, setRequestId] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="tw-grid tw-place-items-center | lg:tw-px-4 lg:tw-py-4 | tw-min-h-screen">
      <TwoSectionContainer
        leftChild={
          <div>
            <img
              src={logo}
              alt="shift shark logo"
              className="tw-absolute tw-top-6 tw-left-6"
            />
            <div className="tw-absolute lg:tw-relative tw-bottom-6 tw-left-6">
              <h1 className="tw-font-bold tw-text-3xl">
                {type === "login" ? "Welcome Back!" : "Hello there!"}
              </h1>
              <h2>Enter you phone number to continue</h2>
            </div>
          </div>
        }
        rightChild={
          <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-start lg:tw-justify-center">
            <h3 className="tw-text-3xl tw-font-bold tw-text-left lg:tw-text-center tw-w-full">
              {type === "login" ? "Login" : "Register"}
            </h3>
            {!requestId ? (
              <GetOtpForm setRequestId={setRequestId} setPhone={setPhone} />
            ) : (
              <VerifyOtpForm
                requestId={requestId}
                setRequestId={setRequestId}
                type={type}
                phone={phone}
              />
            )}
            {type === "login" ? (
              <p className="tw-text-sm">
                Don't have an account?{" "}
                <Link className="tw-font-bold" to={"?intent=register"}>
                  Create an account
                </Link>
              </p>
            ) : (
              <p className="tw-text-sm">
                Already have an account?{" "}
                <Link className="tw-font-bold" to={"?intent=login"}>
                  Login here
                </Link>
              </p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default AuthBlock;
