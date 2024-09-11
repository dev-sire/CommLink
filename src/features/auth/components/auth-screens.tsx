'use client'

import { useState } from "react"
import { SignInFlow } from "../type"

const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn")

  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58]">
        AuthScreen
    </div>
  )
}
export default AuthScreen