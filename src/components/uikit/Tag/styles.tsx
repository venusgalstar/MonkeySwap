// @ts-nocheck
import { ThemeUIStyleObject } from 'theme-ui'
import styled from '@emotion/styled'

const getThemeTextColor = ({ outline, variant = 'primary' }: any) => (outline ? variant : '#ffffff')

export const StyledTag = styled.div`
  align-items: center;
  background-color: ${({ outline, variant = 'primary' }) => (outline ? 'transparent' : variant)};
  border: 2px solid ${({ variant = 'primary' }) => variant};
  border-radius: 16px;
  color: ${getThemeTextColor};
  display: inline-flex;
  font-size: 14px;
  font-weight: 300;
  height: 28px;
  line-height: 1.5;
  padding: 0 8px;
  white-space: nowrap;

  svg {
    fill: ${getThemeTextColor};
  }
`

export const styles: Record<'listTagCont' | 'tagText', (props: { variant?: any }) => ThemeUIStyleObject> = {
  listTagCont: ({ variant = 'ape' }) => ({
    alignItems: 'center',
    background: (theme) => theme?.colors?.listTagBg?.[variant],
    borderRadius: '3px',
    display: 'inline-flex',
    height: '15px',
    padding: '0 5px',
  }),
  tagText: ({ variant = 'ape' }) => ({
    color: (theme) =>
      theme?.colors?.listTagTextColor?.[variant]
        ? theme?.colors?.listTagTextColor?.[variant]
        : theme?.colors?.primaryBright,
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '15px',
  }),
}
