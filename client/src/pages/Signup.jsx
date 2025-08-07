import {Link ,useNavigate} from 'react-router-dom';
import { TextInput,Label,Button} from 'flowbite-react';
import {useState} from 'react';
import { Alert } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import Oauth from '../Component/Oauth.jsx';

const Signup = () => {
  const [formData,setFormData]=useState({});
  const [errorMessages,setErrorMessages]=useState(null);
  const [loading,setLoading]=useState(false);
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessages("Please fill in all fields");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)){
      return setErrorMessages("Please enter a valid email address");
    }
    if(formData.password.length < 6 || formData.password.length > 1024){
      return setErrorMessages("Password must be at least 6 characters and at most 1024 characters");
    } 
    if(formData.username.length < 3 || formData.username.length > 30){
      return setErrorMessages("Username must be at least 3 characters and at most 30 characters");
    }
    if(!/^[a-zA-Z0-9_]+$/.test(formData.username)){
      return setErrorMessages("Username can only contain letters, numbers, and underscores");
    }
    if(formData.username.includes(" ")){
      return setErrorMessages("Username cannot contain spaces");
    }
    if(formData.email.includes(" ")){
      return setErrorMessages("Email cannot contain spaces");
    }
    try{
      setLoading(true);
      setErrorMessages(null);
      const res = await fetch('/api/auth/sign-up',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
         if(data.statusCode === 409){
          setLoading(false); 
          return setErrorMessages(data.message); 
         }
         else{
            setLoading(false);
            return setErrorMessages(data.message);
         }
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch(error){
        setErrorMessages(error.message);
        setLoading(false);
    }
  }
  return (
    <div className="flex-1 flex justify-center align-middle mt-20 mb-20">
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>your username</Label>
              <TextInput type="text" placeholder="Username" id='username' autoComplete="username" onChange={handleChange}/>
            </div>
            <div>
              <Label>your email</Label>
              <TextInput type="text" placeholder="name@company.com" id='email' autoComplete="email" onChange={handleChange}/>
            </div>
            <div>
              <Label>your password</Label>
              <TextInput type="password" placeholder="Password" id='password' autoComplete='new-password' onChange={handleChange}/>
            </div>

            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" type="submit" disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ):'sign-up'
            }
            </Button>
            <Oauth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">sign-in</Link>
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

export default Signup




