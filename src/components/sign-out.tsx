import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

function SignOutBtn() {
    return (
        <Button className='cursor-pointer' onClick={() => signOut({ callbackUrl: '/sign-in' })}>Deconnexion</Button>
    )
}

export default SignOutBtn;