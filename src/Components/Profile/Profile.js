import profile from "../../assets/profile.webp";

const Profile = () => {
  return (
    <article className=' center h-100 w-100  w-40-l bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
      <div className='tc'>
        <img
          src={profile}
          className='br-100 h3 w3 dib'
          title='Profile'
          alt='Profile Pic'
        />
        <h1 className='f3'>John Smith</h1>
      </div>
      <ul class='list pl0 ml0 center mw6 ba tc b--light-silver f4 br2'>
        <li class='ph3   bb b--light-silver '>
          <p className=' flex justify-between ma0 '>
            <p className='w-60 w-50-l b br b--light-silver  ma0 pv2 ttu'>
              Job description
            </p>
            <p className=' w-40 w-50-l   ma0 mv2 '>Business Analyst</p>
          </p>
        </li>
        <li class='ph3   bb b--light-silver '>
          <p className=' flex justify-between ma0 '>
            <p className='w-60 w-50-l b br b--light-silver   ma0 pv2  ttu'>
              Department
            </p>
            <p className='w-40 w-50-l    ma0 mv2 '>Accounting</p>
          </p>
        </li>
        <li class='ph3   bb b--light-silver '>
          <p className=' flex justify-between ma0 '>
            <p className='w-60 w-50-l b br b--light-silver  ma0 pv2  ttu'>
              Location
            </p>
            <p className='w-40 w-50-l    ma0 mv2 link '>Nigeria</p>
          </p>
        </li>
      </ul>
    </article>
  );
};

export default Profile;
