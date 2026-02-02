import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  icon,
  className = '',
  variant = 'default',
  hoverable = true,
  onClick = null
}) => {
  const cardClass = `
    card 
    card-${variant} 
    ${hoverable ? 'card-hoverable' : ''} 
    ${onClick ? 'card-clickable' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClass} onClick={onClick}>
      {(icon || title || subtitle) && (
        <div className="card-header">
          {icon && <div className="card-icon">{icon}</div>}
          <div className="card-header-text">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
