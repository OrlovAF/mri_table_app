import React from 'react';
import './Panel.scss';

interface PanelProps {

}

const Panel: React.FC<PanelProps> = ({ children }) => {
  return (
    <div className="panel__container">{ children }</div>
  )
};

export default Panel;