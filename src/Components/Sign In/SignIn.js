import React from "react";

const SignIn = ({ changeState }) => {
  return (
    <article className='br2 ba  bg-light-gray b--light-gray w-100 w-50-m w-25-l mw5 mt2 center tc'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f4' htmlFor='email-address'>
                Username
              </label>
              <input
                className='pa2 input-reset ba  hover-black w-100'
                type='email'
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f4' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba   hover-black w-100'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className=''>
            <p
              className='b ph3 dim pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
              type='text'
              onClick={() => changeState("signedin")}
            >
              Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
