import React from 'react'
import { NextRouter, withRouter } from 'next/router';
import {Button} from 'components/Button/Button'
import styles from './ExitPreviewButton.module.scss'

type ExitPreviewButtonProps = {
  router: NextRouter;
  className?: string;
}

const _ExitPreviewButton: React.FC<ExitPreviewButtonProps> = ({ router, className }) => {
  const previewExitUrl = '/api/exit-preview'
  const href = router.asPath ? `${previewExitUrl}?currentUrl=/docs${router.asPath}` : previewExitUrl

  className = `${styles.exitPreviewButton} ${className}`.trim();

  return (
    <Button {...{ className, href }}>
      Exit Preview
    </Button>
  )
}

export const ExitPreviewButton = withRouter(_ExitPreviewButton);