import profile from "../../assets/profile.webp";

const Profile = () => {
  return (
    <article className=' center h-50 w-50 bg-white br3 pa3 pa4-ns mv3 ba b--black-10'>
      <div className='tc'>
        <img
          src={profile}
          className='br-100 h3 w3 dib'
          title='Profile'
          alt='Profile Pic'
        />
        <h1 className='f3'>John Smith</h1>
        <hr className='mw3 bb bw1 b--black-10' />
      </div>
      <div className='lh-copy measure center mt-5 f6 tc black'>
        <p className=' f4 mt3'>
          {" "}
          <span className='b'> Job Description:</span> Business Analyst
        </p>
        <p className=' f4 mt3'>
          <span className='b'> Department:</span> Accounting
        </p>
        <p className=' f4 mt3'>
          <i className='fa-solid fa-location-crosshairs mr1' />
          <span className='b'> Location:</span> Nigeria
        </p>
      </div>
    </article>
  );
};

export default Profile;
