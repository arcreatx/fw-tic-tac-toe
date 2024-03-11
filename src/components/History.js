import React from 'react';

function History({history, handleClick}) {
  const buttonList = history.map(( _, index) => (<button onClick={() => handleClick(index)}>Go to step {index}</button>));
  return (
    <div>
      {buttonList}
    </div>
  )
}

export default History