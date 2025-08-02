import {Link} from 'react-router-dom';
import { TextInput,Label,Button} from 'flowbite-react';

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Note's</span>
        <span className="ml-2 text-4xl font-semibold dark:text-white">Circle</span>
        <p className="text-sm mt-5 font-semibold mb-5">
            a collaborative platform where students can share, browse, and download academic notes across subjects.
            Empowering learners to support each other with organized, accessible, and editable study resources.
        </p>
        </Link>
      </div>
      <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label>your username</Label>
              <TextInput type="text" placeholder="Username" id='username' />
            </div>
            <div>
              <Label>your email</Label>
              <TextInput type="text" placeholder="name@company.com" id='email' />
            </div>
            <div>
              <Label>your password</Label>
              <TextInput type="text" placeholder="Password" id='password' />
            </div>

            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" type="submit">
            Sign up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">sign-in</Link>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Signup




