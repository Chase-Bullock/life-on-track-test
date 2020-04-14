import React from 'react';
import { useStore } from '../store/store';

const Header = () => {
  const [state, dispatch] = useStore();
  
  return (
    <nav>
    <div className="nav-wrapper" style={{marginLeft:10}}>
      <a className="left brand-logo">
        Life on Track
      </a>
      <ul className="right">
      { state.token ? 
        <li>
        <div>{`Hi, ${state.user.displayName}`}</div>
        </li> :
        <li>
          <a>Login with Google</a>
        </li>
      }
      </ul>
    </div>
    </nav>
  );
}

export default Header;

