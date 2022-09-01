const RowSelectModal = ({
  onRowSelectModal,
  dateData,
  merchantData,
  totalData,
  paymentMethodData,
  frequencyData,
  commentsData,
  setNewCommentsData,
  saveImage,
  setNewRowData,
  closeOnRowSelectModal,
  setImageData,
  imageUrl,
}) => {
  return (
    <>
      {onRowSelectModal && (
        <>
          <div className='overlay  db'></div>
          <div className='rowselectmodal  ph2 h-75 w-100 w-50-l overflow-auto '>
            <main className=' h-auto w-auto center '>
              <article className=''>
                <div className='fl di pl3 w-50 '>
                  <h2>EXPENSES</h2>
                  <ul className='list  black-50 pl0'>
                    <li className='pv3 pr3 pl1 pl3-l  '>
                      <b className='db f5 mb1 '>Merchant</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {merchantData}
                      </span>
                    </li>
                    <li className='pv3 pr3 pl1 pl3-l '>
                      <b className='db f5 mb1'>Total</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {totalData}
                      </span>
                    </li>
                    <li className=' pv3 pr3 pl1 pl3-l'>
                      <b className='db f5 mb1 '>Date</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {dateData}
                      </span>
                    </li>
                    <li className='pv3 pr3 pl1 pl3-l '>
                      <b className='db f5 mb1 '>Payment Method</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {paymentMethodData}
                      </span>
                    </li>
                    <li className='pv3 pr3 pl1 pl3-l '>
                      <b className='db f5 mb1 '>Frequency</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {frequencyData}
                      </span>
                    </li>

                    <li className='pv3 pr3 pl1 pl3-l '>
                      <div className='measure'>
                        <label htmlFor='name' className='f6 b db mb2'>
                          Comments
                        </label>
                        <input
                          id='name'
                          className='input-reset ba b--black-20 pa2 mb2 h3 db w-100'
                          type='text'
                          defaultValue={commentsData}
                          aria-describedby='name-desc'
                          onChange={(e) => {
                            setNewCommentsData(e.target.value);
                            setNewRowData(true);
                          }}
                        />
                      </div>
                    </li>

                    <li className='    center  mb0 pv3 pr3 pl1 pl3-l  mt3-l       fl-l dib-l   '>
                      <p
                        className='f5  ma0 dib link dim br3 w-100 ph3 pv2 w-100 tc     di-l white bg-blue'
                        onClick={saveImage}
                      >
                        Save
                      </p>
                    </li>
                    <li className='center  mb0 mt3-l pv3 pr3 pl1 pl3-l dib-l fr-l'>
                      <p
                        className='f5  dib ma0 b link dim br3 ph3 pv2 w-100 tc  di-l blue bg-light-gray pointer'
                        onClick={closeOnRowSelectModal}
                      >
                        Close
                      </p>
                    </li>
                  </ul>
                </div>
                <div className='fr di w-50  pa2 ma1  br2 ba  b--dashed b--black-30  center '>
                  <article className='   dark-gray min-w-100 '>
                    <div className=' h-25'>
                      <div className='flex mt1'>
                        <input
                          accept='image/*'
                          type='file'
                          id='select-image'
                          className='dn'
                          onChange={(e) => setImageData(e.target.files[0])}
                        />
                        <label htmlFor='select-image' className='center'>
                          <p className='f6 dim link br-pill ph3 pv2 mb2 dib white bg-blue'>
                            Select Receipt
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className=''>
                      <p className='f4 b'>Receipt:</p>
                      <img
                        src={imageUrl}
                        className='  br2  br--top'
                        alt='Receipt'
                      />
                    </div>
                  </article>
                </div>
              </article>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default RowSelectModal;
