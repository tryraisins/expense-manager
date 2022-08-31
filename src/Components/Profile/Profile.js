import profile from "../../assets/profile.webp";

const Profile = () => {
  return (
    <article className='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
      <div className='tc'>
        <img
          src={profile}
          className='br-100 h3 w3 dib'
          title='Profile'
          alt='Profile Pic'
        />
        <h1 className='f4'>John Smith</h1>
        <hr className='mw3 bb bw1 b--black-10' />
      </div>
      <div className='lh-copy measure center f6 black-70'>
        <p className=' f5 mt0'>Business Analyst in Accounting Department</p>
        <p className=' f5 mt0'>
          <i className='fa-solid fa-location-crosshairs mr1' />
          Nigeria
        </p>
      </div>
    </article>
  );
};

export default Profile;
