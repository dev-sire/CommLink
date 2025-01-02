'use client'

import { useState } from "react"
import { SignInFlow } from "../type"
import { SignInCard } from "./sign-in-card"
import { SignUpCard } from "./sign-up-card"

const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn")

  return (
    <div className="flex h-full items-center justify-center bg-[#001a6e]">
      <div className="md:h-auto md:w-[420px]">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  )
}
export default AuthScreen