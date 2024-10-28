"use client";

import { authenticate } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const { data } = useSession();

  if (data) router.push("/");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission here (e.g., API call)
    const fd = new FormData();
    fd.append("phone", phoneNumber);
    fd.append("pin", pin);

    const response = await authenticate(fd);

    if (!response) {
      window.location.href = callbackUrl;
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <Image
          width={80}
          height={80}
          src={"/images/logo/favicon.ico"}
          alt="Logo"
          className="sm:mx-auto sm:w-full sm:max-w-sm"
        />
        <h2 className="text-gray-900 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-gray-900 block text-sm font-medium leading-6"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                // required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="pin"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                PIN
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot PIN?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="pin"
                name="pin"
                type="password"
                autoComplete="current-password"
                // required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
