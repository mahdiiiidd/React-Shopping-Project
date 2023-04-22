import React, { useEffect, useState } from 'react'
import './Register.css'

import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AbcIcon from '@mui/icons-material/Abc';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import InputBox from '../../Components/Forms/InputBox/InputBox';
import registerIcon from '../../images/illustrations/Mobile login-bro.svg'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CaptchaCode from '../../Components/CaptchaCode/CaptchaCode';

import { useSnackbar } from 'notistack';



export default function Register() {


  const userNamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^09[1-9]\d+$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordError2, setPasswordError2] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState(null);
  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordValue2, setPasswordValue2] = useState('');

  const [captchaNum, setCaptchaNum] = useState(null)
  const [inputCaptchaCode, setInputCaptchacode] = useState(null)

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowPassword2 = () => setShowPassword2(show => !show);


  const validationHandler = () => {

    !nameValue ? setNameError(true) : setNameError(false)
    !userNamePattern.test(userNameValue) ? setUserNameError(true) : setUserNameError(false)
    !emailPattern.test(emailValue) ? setEmailError(true) : setEmailError(false)
    !phonePattern.test(phoneValue) ? setPhoneError(true) : setPhoneError(false)
    !passwordPattern.test(passwordValue) ? setPasswordError(true) : setPasswordError(false)
    !passwordPattern.test(passwordValue2) ? setPasswordError2(true) : setPasswordError2(false)


    if (
      userNamePattern.test(userNameValue) &&
      emailPattern.test(emailValue) &&
      phonePattern.test(phoneValue) &&
      passwordPattern.test(passwordValue) &&
      passwordPattern.test(passwordValue2)
    ) {
      if (passwordValue === passwordValue2) {

        if (captchaNum === +inputCaptchaCode) {
          enqueueSnackbar('شما با موفقیت ثبت نام شدید!', { variant: "success", autoHideDuration: 4000 })
          localStorage.setItem('isLogin',true);
          localStorage.setItem('userName',nameValue);
          setInputCaptchacode('')
          setInterval(() => {
            navigate('/React-Shopping-Project');
          }, 5000);
        }
      }
    }
  }

  useEffect(() => {

    setInterval(() => {
      setNameError(false)
      setUserNameError(false)
      setEmailError(false)
      setPhoneError(false)
      setPasswordError(false)
      setPasswordError2(false)
    }, 15000);

  }, [
    nameError,
    userNameError,
    emailError,
    phoneError,
    passwordError,
    passwordError2

  ])
  useEffect(() => {


    nameValue && setNameError(false)
    userNameValue && setUserNameError(false)
    emailValue && setEmailError(false)
    phoneValue && setPhoneError(false)
    passwordValue && setPasswordError(false)
    passwordValue2 && setPasswordError2(false)


  }, [
    nameValue,
    emailValue,
    phoneValue,
    userNameValue,
    passwordValue,
    passwordValue2

  ])



  return (
    <div className='background-body'>
      <div className='container'>
        <div className="register-form-wrapper">

          <div className="register-form-rightside">
            <div className="register-form-header">
              <h3>فرم ثبت نام شاپینگ کالا</h3>
              <div className="reg-btn-no-account">
                <span>حساب کاربری دارید؟ همین حالا وارد شوید:</span>
                <Link to='/React-Shopping-Project/login' className='reg-btn-no-account-btn'>ورود</Link>
              </div>
            </div>

            <div className="register-form-inputs">
              <InputBox
                id="name"
                name="name"
                label="نام و نام خانوادگی"
                type="text"
                icon={<AbcIcon />}
                changeHandler={event => setNameValue(event.target.value)}
                value={nameValue}
                errorHandler={nameError}
                helperTextHandler={nameError && "نام و نام خانوادگی را وارد نمایید!"}
              />

              <InputBox
                id="email"
                name="email"
                label="ایمیل"
                type="email"
                icon={<EmailIcon />}
                changeHandler={event => setEmailValue(event.target.value)}
                value={emailValue}
                errorHandler={emailError}
                helperTextHandler={emailError && "لطفا فرمت مخصوص ایمیل را وارد نمایید!"}
              />
              <InputBox
                id="phone"
                name="phone"
                label="شماره همراه"
                type="number"
                icon={<PhoneIphoneIcon />}
                changeHandler={event => setPhoneValue(event.target.value)}
                value={phoneValue}
                errorHandler={phoneError}
                helperTextHandler={phoneError && "شماره همراه خود را با پیش شماره 09 شروع کنید!"}
              />
              <InputBox
                id="userName"
                name="userName"
                label="نام کاربری"
                type="text"
                icon={<PersonIcon />}
                changeHandler={event => setUserNameValue(event.target.value)}
                value={userNameValue}
                errorHandler={userNameError}
                helperTextHandler={userNameError && "نام کاربری خود را با عدد و حروف بنویسید!"}
              />
              <InputBox
                id="password"
                name="password"
                label="رمزعبور"
                type={showPassword ? 'text' : 'password'}
                icon={showPassword ? <VisibilityOff /> : <Visibility />}
                changeHandler={event => setPasswordValue(event.target.value)}
                value={passwordValue}
                handleClickShowPassword={handleClickShowPassword}
                errorHandler={passwordError}
                helperTextHandler={passwordError && "رمزعبور شما باید حداقل 8 کاراکتر و تشکیل شده از حرف و عدد باشد!"}
              />

              <InputBox
                id="password2"
                name="password2"
                label="تکرار رمزعبور"
                type={showPassword2 ? 'text' : 'password'}
                icon={showPassword2 ? <VisibilityOff /> : <Visibility />}
                changeHandler={event => setPasswordValue2(event.target.value)}
                value={passwordValue2}
                errorHandler={passwordError2}
                helperTextHandler={passwordError2 && "رمزعبور شما باید حداقل 8 کاراکتر و تشکیل شده از حرف و عدد باشد!"}
                handleClickShowPassword={handleClickShowPassword2}
              />


            </div>
            <CaptchaCode
              captchaNum={captchaNum}
              setCaptchaNum={setCaptchaNum}
              inputCaptchaCode={inputCaptchaCode}
              setInputCaptchacode={setInputCaptchacode}
            />
            <Button onClick={validationHandler} className="register-form-btn">

              ثبت نام

            </Button>
          </div>
          <img className='register-icon' src={registerIcon} alt="" />
        </div>
      </div>
    </div>
  )
}