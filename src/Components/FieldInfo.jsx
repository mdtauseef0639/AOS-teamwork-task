import React from 'react'
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'



export default function FieldInfo({label}) {

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover right</Popover.Header>
          <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Body>
        </Popover>
      );
  return (
    <div>
        <OverlayTrigger trigger="hover" placement="left" overlay={popover}>
    {label}
  </OverlayTrigger>
    </div>
  )
}
