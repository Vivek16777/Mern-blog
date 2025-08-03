import {Link ,useNavigate} from 'react-router-dom';
import { TextInput,Label,Button} from 'flowbite-react';
import {useState} from 'react';
import { Alert } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import {signInStart,signInSuccess,signInFailure} from '../Redux/user/userSlice.js';
import { useDispatch,useSelector } from 'react-redux';
const Signin = () => {
  const [formData,setFormData]=useState({});
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  const Navigate = useNavigate();
  const {loading, error: errorMessages}=useSelector(state=> state.user);
  const dispatch = useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please fill in all fields"));
    }
    
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        Navigate('/');
      }
    } catch(error){
        dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="flex flex-1 justify-center align-middle background-gray-100">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 background-color-black-transparent'>
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>your email</Label>
              <TextInput type="email" placeholder="name@company.com" id='email' autoComplete="email" onChange={handleChange}/>
            </div>
            <div>
              <Label>your password</Label>
              <TextInput type="password" placeholder="********" id='password' autoComplete='new-password' onChange={handleChange}/>
            </div>

            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" type="submit" disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ):'sign-in'
            }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an account?</span>
            <Link to='/sign-up' className="text-blue-500">sign-up</Link>
          </div>
          {
            errorMessages && (
              <Alert className="mt-5" color="failure">
                {errorMessages}
              </Alert>
            )
          }
      </div>
    </div>
    </div>
  )
}

export default Signin