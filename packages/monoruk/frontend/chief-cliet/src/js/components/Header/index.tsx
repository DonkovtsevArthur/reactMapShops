import * as React from 'react';
import AddFran from '../AddFran';

export interface HeaderProps {
  openDialogAddFran(): void;
  openAccess(): void;
}

const Header: React.StatelessComponent<HeaderProps> = props => (
  <header>
    <button className="access" onClick={props.openAccess}>
      <i className="fa fa-gear" />
    </button>
    <AddFran openDialogAddFran={props.openDialogAddFran} />
  </header>
);

export default Header;
