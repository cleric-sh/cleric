import React from 'react'
import DocLink from 'components/DocLink'
import styles from './Button.module.scss'

type ButtonProps = {
  className?: string;
  link?: { target: string };
  href?: string;
  secondary? : string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, link, href, secondary }) => {
  const secondaryClass = secondary ? styles.secondary : null;
  className = `${styles.button} ${className} ${secondaryClass}`.trim()
  
  if (link) {
    return (
      <DocLink {...{ className, link }}>
        {children}
      </DocLink>
    )
  }

  if (href) {
    return (
      <a {...{ className, href }}>
        {children}
      </a>
    )
  }

  return null
}
