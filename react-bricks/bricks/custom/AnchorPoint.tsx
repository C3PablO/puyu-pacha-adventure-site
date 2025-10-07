import React from 'react'
import { types } from 'react-bricks/rsc'
import { Padding } from '../react-bricks-ui/shared/components/Container'
import { sectionPaddingsEditProps } from '../react-bricks-ui/LayoutSideProps'

interface AnchorPointProps {
  anchorId: string
  paddingTop: Padding
  paddingBottom: Padding
}

const getPaddingClass = (top: Padding, bottom: Padding): string => {
  const paddingMap: Record<Padding, string> = {
    '20': 'pt-12 lg:pt-20 pb-12 lg:pb-20',
    '16': 'pt-12 lg:pt-16 pb-12 lg:pb-16',
    '12': 'pt-12 pb-12',
    '10': 'pt-10 pb-10',
    '8': 'pt-8 pb-8',
    '6': 'pt-6 pb-6',
    '0': 'pt-0 pb-0',
  }

  // If top and bottom are the same, use a simpler combined class
  if (top === bottom) {
    return paddingMap[top] || ''
  }

  // Otherwise, combine individual classes
  const topClass = {
    '20': 'pt-12 lg:pt-20',
    '16': 'pt-12 lg:pt-16',
    '12': 'pt-12',
    '10': 'pt-10',
    '8': 'pt-8',
    '6': 'pt-6',
    '0': 'pt-0',
  }[top] || ''

  const bottomClass = {
    '20': 'pb-12 lg:pb-20',
    '16': 'pb-12 lg:pb-16',
    '12': 'pb-12',
    '10': 'pb-10',
    '8': 'pb-8',
    '6': 'pb-6',
    '0': 'pb-0',
  }[bottom] || ''

  return `${topClass} ${bottomClass}`
}

const AnchorPoint: types.Brick<AnchorPointProps> = ({
  anchorId,
  paddingTop,
  paddingBottom,
}) => {
  return (
    <>
      <style>{`
        .anchor-point-admin {
          display: none;
        }
        #react-bricks-brick .anchor-point-admin {
          min-height: 40px;
          padding: 8px 12px;
          border: 2px dashed #94a3b8;
          background-color: #f1f5f9;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #475569;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        #react-bricks-brick .anchor-point-icon {
          width: 16px;
          height: 16px;
          color: #64748b;
        }
        .anchor-point-published {
          height: 0;
          width: 0;
          overflow: hidden;
        }
      `}</style>
      <div aria-hidden="true" className={`anchor-point-admin ${getPaddingClass(paddingTop, paddingBottom)}`}>
        <svg className="anchor-point-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <div
        id={anchorId || undefined}
        aria-hidden="true"
        className={`anchor-point-published ${getPaddingClass(paddingTop, paddingBottom)}`}
      />
    </>
  )
}

AnchorPoint.schema = {
  name: 'anchor-point',
  label: 'Anchor Point',
  category: 'layout',
  tags: ['anchor', 'link', 'navigation'],
  getDefaultProps: () => ({
    anchorId: '',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  sideEditProps: [
    {
      groupName: 'Settings',
      defaultOpen: true,
      props: [
        {
          name: 'anchorId',
          label: 'Anchor ID',
          type: types.SideEditPropType.Text,
          helperText: 'Enter a unique ID (e.g., "section-about"). Link to it using #section-about',
        },
      ],
    },
    {
      groupName: 'Padding',
      defaultOpen: false,
      props: [...sectionPaddingsEditProps],
    },
  ],
}

export default AnchorPoint
