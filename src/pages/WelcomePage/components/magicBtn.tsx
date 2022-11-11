import React from 'react';

type magicButtonProps = {
  text: string;
};

const MagicBtn = (props: magicButtonProps) => {
  return (
    <button className="btn_magic">
      <a href="#">{props.text}</a>
      <div className="magic"></div>
    </button>
  );
};

export default MagicBtn;
