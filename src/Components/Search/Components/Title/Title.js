const Title = () => {
  return (
    <div>
      <nav className=' flex justify-between bb b--black-20  '>
        <p className='flex items-center pa1'>Filter Expenses</p>
        <div className='flex-grow blue dim pa1 link pointer flex items-left'>
          <p>Clear Filters</p>
        </div>
      </nav>
    </div>
  );
};

export default Title;
