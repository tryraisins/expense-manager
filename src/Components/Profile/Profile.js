import profile from "../../assets/profile.webp";
import "./Profile.css";

const Profile = () => {
  return (
    <div className='bg-near-white w-100   profile relative'>
      <div className='w-90 w-40-l br4 ba b--moon-gray card absolute'>
        <article className='cf  '>
          <article className='  br--top br4 br--moon-gray bg-near-white mv0 bg-moon-gray   '>
            <div class='tc'>
              <img
                src={profile}
                className='br-100 h4 w4 dib  pa2'
                title='Profile Image'
                alt='Profile'
              />
              <h1 className='f3 black-90 mb2'>Seun Sowemimo</h1>
            </div>
          </article>
          <article className='  mv0 tc br--bottom br4 bg-moon-gray '>
            <div className='pa3 bt b--black-10'>
              <dl class='f5 lh-title mv2'>
                <dt class='dib b'>Job: </dt>
                <dd class='dib ml0 pl1  '>Senior Frontend Developer</dd>
              </dl>
              <dl class='f5 lh-title mv2'>
                <dt class='dib b'>Department: </dt>
                <dd class='dib ml0 pl1'>Software Development</dd>
              </dl>
              <dl class='f5 lh-title mv2'>
                <dt class='dib b'>Location: </dt>
                <dd class='dib ml0 pl1'>Lagos, Nigeria</dd>
              </dl>
            </div>
          </article>
        </article>
      </div>
    </div>
  );
};

export default Profile;
