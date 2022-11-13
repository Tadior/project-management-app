import React from 'react';
import { Link } from 'react-router-dom';

type magicButtonProps = {
  text: string;
  to?: string;
  href?: string;
};

const MagicBtn = (props: magicButtonProps) => {
  return (
    <button className="btn_magic">
      {!props.to ? (
        <a href={props.href} target="_blank" rel="noreferrer">
          {props.text}
        </a>
      ) : (
        <Link to={props.to}>{props.text}</Link>
      )}
      <div className="magic"></div>
    </button>
  );
};

export default MagicBtn;
