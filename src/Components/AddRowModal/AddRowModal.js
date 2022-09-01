const AddRowModal = ({
  addRowModal,
  handleChange,
  handleSubmit,
  closeAddRowModal,
}) => {
  return (
    <>
      {addRowModal && (
        <>
          <div className='overlay' />
          <div className='addrowmodal w-100 w-50-l'>
            <header className='flex justify-around'>
              <h2 className=' center '>ADD DATA</h2>
              <button onClick={closeAddRowModal} className='close-button  '>
                &times;
              </button>
            </header>
            <main className='modal__main center'>
              <form className='pa4 black-80 center'>
                {/* DATE */}
                <div className='measure center  mb4'>
                  <label htmlFor='date' className='f6 b  db mb2'>
                    DATE
                  </label>
                  <input
                    id='date'
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    type='date'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Date'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Add date of Transaction here
                  </small>
                </div>
                {/* MERCHANT */}
                <div className='measure  center mb4'>
                  <label htmlFor='merchant' className='f6 b db mb2'>
                    MERCHANT
                  </label>
                  <input
                    id='merchant'
                    className='input-reset ba b--black-20 pa2 h2 mb2 db w-100'
                    type='text'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Merchant'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Enter name of Merchant here
                  </small>
                </div>

                {/* TOTAL */}
                <div className='measure center mb4'>
                  <label htmlFor='total' className='f6 b db mb2'>
                    TOTAL{" "}
                    <span className='normal black-60 b'> (In Dollars)</span>
                  </label>

                  <input
                    type='number'
                    prefix='$'
                    onChange={handleChange}
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    name='Total'
                    id='total'
                    placeholder='$0.00'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Enter Amount Spent Here
                  </small>
                </div>

                {/* PAYMENT METHOD */}
                <div className='measure center mb4'>
                  <label htmlFor='payment-method' className='f6 b db mb2'>
                    PAYMENT METHOD{" "}
                  </label>
                  <input
                    id='payment-method'
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    type='text'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Payment Method'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2 '>
                    Enter Credit Card Type
                  </small>
                </div>

                {/* FREQUENCY */}
                <div className='measure center '>
                  <label htmlFor='frequency' className='f6 b  db mb2'>
                    FREQUENCY
                  </label>
                  <select
                    id='frequency'
                    name='Frequency'
                    className='pa2 w-100 mb2'
                    onChange={handleChange}
                  >
                    <option value=''></option>
                    <option value='Daily'>Daily</option>
                    <option value='Monthly'>Monthly</option>
                    <option value='Never' default={true}>
                      Never
                    </option>
                    <option value='Often'>Often</option>
                    <option value='Once'>Once</option>
                    <option value='Seldom'>Seldom</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Yearly'>Yearly</option>
                  </select>

                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Select Frequency of Transaction Here
                  </small>
                </div>

                {/* Add Button */}
                <div className=' flex  mt3 center' onClick={handleSubmit}>
                  <input
                    className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 tc center'
                    type='submit'
                    value='ADD DATA'
                  />
                </div>
              </form>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default AddRowModal;
