import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: ['90%', '50%', '800px'],
    width: ['200px'],
    maxWidth: '800px',
    height: ['500px', '500px', 'auto'],
  },
}

export const dynamicStyles: Record<string, (props: any) => ThemeUIStyleObject> = {
  newsletterCon: ({ isModal, isMobile, status }) => ({
    marginTop: isModal && isMobile && '25px',
    height: isModal && !isMobile && '350px',
    width: ['100%', '100%', (isModal && '60%') || '100%'],
    margin: 0,
    paddingBottom: 0,
    padding: ['', '', '', isModal && '20px'],
    alignItems: [isModal && 'center', isModal && 'center', isModal && 'center', 'center'],
    justifyContent: [(!isModal && 'flex-start') || '', '', 'center'],
    background: !isModal && 'white2',
    flexDirection: status === 'error' && 'column',
  }),
  bodyCon: ({ isModal, isMobile, isMd }) => ({
    width: '100%',
    borderTop: !isModal && '5px solid',
    borderTopColor: 'white3',
    py: !isModal && '15px',
    px: !isModal && (isMobile || isMd) && '20px',
    justifyContent: !isModal && !isModal && 'center',
  }),
  privacy: ({ isModal }) => ({
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: (isModal && '10px') || '5px',
    ':hover': {
      cursor: 'pointer',
    },
  }),
  input: ({ isModal, isLg, isXl, isMd, status }) => ({
    border: 'none',
    paddingRight: '5px',
    ':focus': { outline: 'none' },
    width: [
      (isModal && '190px') || '230px',
      (isModal && '230px') || '280px',
      (isModal && '270px') || (isLg && '224px') || (isXl && '245px'),
    ],
    paddingLeft: '10px',
    '@media screen and (min-width: 425px) and (max-width: 768px)': {
      width:
        (isModal && '230px') || (!isModal && ((isMd && '212px') || (isLg && '224px') || (isXl && '245px'))) || '280px',
    },
    '@media screen and (max-width: 320px)': {
      paddingLeft: '5px',
      width: (isModal && '140px') || '173px',
    },
    '::placeholder': {
      opacity: (status === 'success' && 0.8) || 0.5,
      fontStyle: 'italic',
      fontSize: ['12px', '14px'],
      lineHeight: '14px',
      fontWeight: status === 'success' && 500,
      color: (status === 'success' && 'success') || 'text',
    },
  }),
}

export const styles: Record<string, ThemeUIStyleObject> = {
  input: {
    border: 'none',
    paddingRight: '5px',
    ':focus': { outline: 'none' },
  },
  privacyLink: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    fontStyle: 'italic',
    textDecoration: 'underline',
    mr: '5px',
  },
  submit: {
    border: 'none',
    background: 'white4',
    width: '75px',
    height: '42px',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    mt: '5px',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    width: '100%',
  },

  modalBody: {
    marginTop: '30px',
    flexDirection: ['column', 'column', 'row'],
    width: '100%',
    justifyContent: ['flex-start', 'flex-start', 'space-between'],
  },
  showApe: {
    alignSelf: ['center', 'center', ''],
    width: ['230px', '230px', '46%'],
    height: ['230px', '230px', '400px'],
    marginTop: '-20px',
    background: `url(images/marketing-modals/emailApe.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  content: {
    width: ['100%', '90%'],
    justifyContent: ['space-between', '', '', 'center'],
    alignItems: ['flex-start', '', ''],
    flexDirection: ['column', 'column', 'column', 'row'],
    maxWidth: ['375px', '375px', '375px', '1200px'],
  },
  left: {
    flexDirection: 'column',
    width: '100%',
    marginTop: ['10px', '10px', 0],
  },
  latestText: {
    fontWeight: 700,
    fontSize: ['16px'],
    lineHeight: ['24px', '24px'],
  },
  formCon: {
    flexDirection: 'column',
    width: '100%',
    mt: ['15px', '15px', '15px', '0px'],
  },
  form: {
    background: 'white3',
    height: '42px',
    borderRadius: '10px',
    paddingLeft: ['8px', '10px', '24px'],
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}

export default styles
